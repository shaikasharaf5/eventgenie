const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services with filtering
router.get('/', async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            minRating,
            maxRating,
            foodType,
            search,
            date
        } = req.query;

        console.log('Service filter request:', {
            category,
            minPrice,
            maxPrice,
            minRating,
            maxRating,
            foodType,
            search,
            date
        });

        // Build filter object
        let filter = {};

        // Category filter
        if (category && category !== 'all') {
            filter.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        // Food type filter (for catering services)
        if (foodType && foodType !== 'all' && category === 'catering') {
            filter.foodType = foodType;
        }

        // Search filter
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { provider: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Get services with filters
        let services = await Service.find(filter);

        console.log(`Found ${services.length} services before date filtering`);

        // Date filter - show only services available for the selected date
        if (date) {
            services = services.map(service => {
                // Check if the service is already booked for this date
                const isBooked = service.bookings && service.bookings.some(booking =>
                    booking.bookedForDate === date && booking.status !== 'cancelled'
                );
                // Check if the service is blocked for this date
                const isBlocked = service.blockedDates && service.blockedDates.includes(date);
                // Add availability information to the service object
                return {
                    ...service.toObject(),
                    isAvailable: !isBooked && !isBlocked,
                    availabilityStatus: isBlocked ? 'Blocked' : (isBooked ? 'Booked' : 'Available'),
                    selectedDate: date
                };
            });

            console.log(`After date filtering for ${date}: ${services.filter(s => s.isAvailable).length} services available out of ${services.length} total`);
        } else {
            // When no date is selected, mark all services as available but with a note
            services = services.map(service => ({
                ...service.toObject(),
                isAvailable: true,
                availabilityStatus: 'Date not selected',
                selectedDate: null
            }));
        }

        // Rating filter (applied after fetching since it requires calculation)
        if (minRating || maxRating) {
            services = services.filter(service => {
                if (!service.reviews || service.reviews.length === 0) {
                    return minRating ? parseFloat(minRating) === 0 : true;
                }

                const avgRating = service.reviews.reduce((sum, review) => sum + review.rating, 0) / service.reviews.length;

                if (minRating && avgRating < parseFloat(minRating)) return false;
                if (maxRating && avgRating > parseFloat(maxRating)) return false;

                return true;
            });
        }

        // Sort by average rating (highest first)
        services.sort((a, b) => {
            const ratingA = a.reviews && a.reviews.length > 0
                ? a.reviews.reduce((sum, review) => sum + review.rating, 0) / a.reviews.length
                : 0;
            const ratingB = b.reviews && b.reviews.length > 0
                ? b.reviews.reduce((sum, review) => sum + review.rating, 0) / b.reviews.length
                : 0;
            return ratingB - ratingA;
        });

        console.log(`Returning ${services.length} services after all filters`);

        res.json(services);
    } catch (error) {
        console.error('Error in services route:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get services by category
router.get('/category/:category', async (req, res) => {
    try {
        const services = await Service.find({ category: req.params.category });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get services by vendor
router.get('/vendor/:vendorUsername', async (req, res) => {
    try {
        const services = await Service.find({ vendorUsername: req.params.vendorUsername });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new service (for vendors)
router.post('/', async (req, res) => {
    try {
        const { name, provider, vendorUsername, price, category, foodType, images, description, address } = req.body;

        // Validate required fields
        if (!name || !provider || !vendorUsername || !price || !category || !images || !description || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate images array
        if (!Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        const service = new Service({
            name,
            provider,
            vendorUsername,
            price,
            category,
            foodType: foodType || 'both',
            images,
            description,
            address
        });

        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update service
router.put('/:id', async (req, res) => {
    try {
        const { name, provider, vendorUsername, price, category, foodType, images, description, address } = req.body;

        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Update fields if provided
        if (name) service.name = name;
        if (provider) service.provider = provider;
        if (vendorUsername) service.vendorUsername = vendorUsername;
        if (price) service.price = price;
        if (category) service.category = category;
        if (foodType) service.foodType = foodType;
        if (images) service.images = images;
        if (description) service.description = description;
        if (address) service.address = address;

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Book a service for a specific date
router.post('/:id/book', async (req, res) => {
    const { bookedForDate } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        // Check if the date is already booked
        const isAlreadyBooked = service.bookings.some(
            (booking) => booking.bookedForDate === bookedForDate && booking.status !== 'canceled'
        );

        if (isAlreadyBooked) {
            return res.status(400).json({ message: 'Date already booked' });
        }

        // Add the new booking
        service.bookings.push({
            bookedForDate,
            dateBooked: new Date()
        });
        await service.save();

        res.status(200).json({ message: 'Booking successful', service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add review to service
router.post('/:id/review', async (req, res) => {
    try {
        const { user, rating, comment } = req.body;
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Check if user has already reviewed this service
        const existingReview = service.reviews.find(review => review.user === user);
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this service' });
        }

        // Add review
        service.reviews.push({
            user,
            rating,
            comment,
            date: new Date()
        });

        await service.save();
        res.json({ message: 'Review added successfully', service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get service reviews
router.get('/:id/reviews', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search services
router.get('/search/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const services = await Service.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { provider: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Block service for specific dates
router.post('/:id/block', async (req, res) => {
    const { dates } = req.body; // Array of YYYY-MM-DD strings
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        service.blockedDates = Array.from(new Set([...(service.blockedDates || []), ...dates]));
        await service.save();
        res.status(200).json({ message: 'Service blocked for selected dates', blockedDates: service.blockedDates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Unblock service for specific dates
router.post('/:id/unblock', async (req, res) => {
    const { dates } = req.body; // Array of YYYY-MM-DD strings
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        service.blockedDates = (service.blockedDates || []).filter(date => !dates.includes(date));
        await service.save();
        res.status(200).json({ message: 'Service unblocked for selected dates', blockedDates: service.blockedDates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bulk block services for specific dates
router.post('/bulk-block', async (req, res) => {
    const { serviceIds, dates } = req.body; // serviceIds: array of service IDs, dates: array of YYYY-MM-DD
    if (!Array.isArray(serviceIds) || !Array.isArray(dates) || serviceIds.length === 0 || dates.length === 0) {
        return res.status(400).json({ message: 'serviceIds and dates must be non-empty arrays' });
    }
    try {
        const results = [];
        for (const id of serviceIds) {
            const service = await Service.findById(id);
            if (!service) {
                results.push({ id, success: false, error: 'Service not found' });
                continue;
            }
            service.blockedDates = Array.from(new Set([...(service.blockedDates || []), ...dates]));
            await service.save();
            results.push({ id, success: true, blockedDates: service.blockedDates });
        }
        res.status(200).json({ message: 'Bulk block completed', results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Bulk unblock services for specific dates
router.post('/bulk-unblock', async (req, res) => {
    const { serviceIds, dates } = req.body;
    if (!Array.isArray(serviceIds) || !Array.isArray(dates) || serviceIds.length === 0 || dates.length === 0) {
        return res.status(400).json({ message: 'serviceIds and dates must be non-empty arrays' });
    }
    try {
        const results = [];
        for (const id of serviceIds) {
            const service = await Service.findById(id);
            if (!service) {
                results.push({ id, success: false, error: 'Service not found' });
                continue;
            }
            service.blockedDates = (service.blockedDates || []).filter(date => !dates.includes(date));
            await service.save();
            results.push({ id, success: true, blockedDates: service.blockedDates });
        }
        res.status(200).json({ message: 'Bulk unblock completed', results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin middleware (simple header check for demo)
function isAdmin(req, res, next) {
    if (req.headers['x-admin'] === 'true') {
        return next();
    }
    return res.status(403).json({ message: 'Admin access required' });
}

// Admin bulk block
router.post('/admin/bulk-block', isAdmin, async (req, res) => {
    const { serviceIds, dates } = req.body;
    if (!Array.isArray(serviceIds) || !Array.isArray(dates) || serviceIds.length === 0 || dates.length === 0) {
        return res.status(400).json({ message: 'serviceIds and dates must be non-empty arrays' });
    }
    try {
        const results = [];
        for (const id of serviceIds) {
            const service = await Service.findById(id);
            if (!service) {
                results.push({ id, success: false, error: 'Service not found' });
                continue;
            }
            service.blockedDates = Array.from(new Set([...(service.blockedDates || []), ...dates]));
            await service.save();
            results.push({ id, success: true, blockedDates: service.blockedDates });
        }
        res.status(200).json({ message: 'Admin bulk block completed', results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin bulk unblock
router.post('/admin/bulk-unblock', isAdmin, async (req, res) => {
    const { serviceIds, dates } = req.body;
    if (!Array.isArray(serviceIds) || !Array.isArray(dates) || serviceIds.length === 0 || dates.length === 0) {
        return res.status(400).json({ message: 'serviceIds and dates must be non-empty arrays' });
    }
    try {
        const results = [];
        for (const id of serviceIds) {
            const service = await Service.findById(id);
            if (!service) {
                results.push({ id, success: false, error: 'Service not found' });
                continue;
            }
            service.blockedDates = (service.blockedDates || []).filter(date => !dates.includes(date));
            await service.save();
            results.push({ id, success: true, blockedDates: service.blockedDates });
        }
        res.status(200).json({ message: 'Admin bulk unblock completed', results });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
