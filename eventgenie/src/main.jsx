import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import Navbar from './Navbar.jsx';
import Footer from './Footer.Jsx';
import Services from './Services.jsx';
import Home from './Home.jsx';
import BudgetCalculator from './BudgetCalculator.jsx';
import LoginRegister from './LoginRegister.jsx';
import Profile from './Profile.jsx';
import MyCart from './MyCart.jsx';
import VendorDashboard from './VendorDashboard.jsx';
import AdminPortal from './AdminPortal.jsx';

function App() {
  const [servicesList, setServicesList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  // Authentication state
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentVendor, setCurrentVendor] = useState(null);
  const [vendorTab, setVendorTab] = useState('services');
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!currentCustomer;
  const isVendorLoggedIn = !!currentVendor;

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      const customerSession = localStorage.getItem('customerSession');
      const vendorSession = localStorage.getItem('vendorSession');
      const cartSession = localStorage.getItem('cartSession');

      if (customerSession) {
        try {
          setCurrentCustomer(JSON.parse(customerSession));
        } catch (error) {
          localStorage.removeItem('customerSession');
        }
      }

      if (vendorSession) {
        try {
          setCurrentVendor(JSON.parse(vendorSession));
        } catch (error) {
          localStorage.removeItem('vendorSession');
        }
      }

      // Load cart from localStorage
      if (cartSession) {
        try {
          setSelectedServices(JSON.parse(cartSession));
        } catch (error) {
          localStorage.removeItem('cartSession');
        }
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  // Fetch services from backend
  useEffect(() => {
    fetch('http://localhost:5001/api/services')
      .then(res => res.json())
      .then(data => setServicesList(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  // Login handler with API integration
  const login = async (username, password, type = 'customer') => {
    try {
      const endpoint = type === 'customer' ? '/api/customers/login' : '/api/vendors/login';
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (type === 'customer') {
          setCurrentCustomer(data.customer);
          localStorage.setItem('customerSession', JSON.stringify(data.customer));
          setCurrentVendor(null);
          localStorage.removeItem('vendorSession');
          return 'customer';
        } else {
          setCurrentVendor(data.vendor);
          localStorage.setItem('vendorSession', JSON.stringify(data.vendor));
          setCurrentCustomer(null);
          localStorage.removeItem('customerSession');
          return 'vendor';
        }
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData.message);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Register handler with API integration
  const register = async (user, type = 'customer') => {
    try {
      console.log('Registration started for:', type);
      console.log('User data:', user);

      const endpoint = type === 'customer' ? '/api/customers/register' : '/api/vendors/register';

      // Prepare data for API
      const userData = type === 'customer' ? {
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        profilePhoto: user.photo || ''
      } : {
        username: user.username,
        password: user.password,
        name: user.name,
        businessName: user.businessName,
        email: user.email,
        phone: user.phone,
        about: user.about,
        categories: user.services || [],
        profilePhoto: user.photo || ''
      };

      console.log('Prepared user data:', userData);

      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);

        if (type === 'customer') {
          setCurrentCustomer(data.customer);
          localStorage.setItem('customerSession', JSON.stringify(data.customer));
          setCurrentVendor(null);
          localStorage.removeItem('vendorSession');
          return true;
        } else {
          // For vendors, don't auto-login, just show success message
          alert('Vendor registration successful! Please wait for admin approval before you can log in.');
          return true;
        }
      } else {
        const errorData = await response.json();
        console.error('Registration error:', errorData.message);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Logout handler
  const logout = () => {
    setCurrentCustomer(null);
    setCurrentVendor(null);
    setSelectedServices([]); // Clear cart on logout
    localStorage.removeItem('customerSession');
    localStorage.removeItem('vendorSession');
    localStorage.removeItem('cartSession'); // Clear cart from localStorage
  };

  // Bookings: add a booking to the current customer and to the respective vendors
  const addBooking = async (services, selectedDate = null) => {
    if (!currentCustomer) return;

    // Use selected date or default to today
    const bookingDate = selectedDate || new Date().toISOString().split('T')[0];

    try {
      console.log('Booking services:', services);
      console.log('Booking date:', bookingDate);

      if (services.length === 1) {
        // Single service booking
        const service = services[0];
        const response = await fetch(`http://localhost:5001/api/customers/book-service/${currentCustomer.id}/${service._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookedForDate: bookingDate
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Booking failed for service:', service.name, errorData);

          // Enhanced error message
          const errorMessage = errorData.serviceName
            ? `${errorData.serviceName}: ${errorData.message}`
            : `Booking failed for ${service.name}: ${errorData.message}`;

          alert(errorMessage);
          return;
        }

        const result = await response.json();
        alert(`Successfully booked ${result.booking.serviceName}!`);
      } else {
        // Multiple services booking - use bulk booking API
        const servicesToBook = services.map(service => ({
          serviceId: service._id,
          bookedForDate: bookingDate
        }));

        const response = await fetch(`http://localhost:5001/api/customers/bulk-book-services/${currentCustomer.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            services: servicesToBook
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Bulk booking failed:', errorData);

          // Handle validation errors
          if (errorData.validationResults) {
            const unavailableServices = errorData.validationResults
              .filter(result => !result.available)
              .map(result => `${result.serviceName || result.serviceId}: ${result.error}`)
              .join('\n');

            alert(`Some services are not available:\n${unavailableServices}`);
          } else {
            alert(`Booking failed: ${errorData.message}`);
          }
          return;
        }

        const result = await response.json();
        console.log('Bulk booking result:', result);

        // Enhanced success/error reporting
        if (result.errors && result.errors.length > 0) {
          const successMessage = result.successfullyBooked > 0
            ? `Successfully booked ${result.successfullyBooked} service(s)!\n\n`
            : '';

          const errorMessages = result.errors
            .map(err => `${err.serviceName || err.serviceId}: ${err.error}`)
            .join('\n');

          alert(`${successMessage}Failed bookings:\n${errorMessages}`);
        } else {
          alert(`Successfully booked all ${result.successfullyBooked} services!`);
        }
      }

      setSelectedServices([]); // Clear cart after booking
      localStorage.removeItem('cartSession'); // Clear cart from localStorage
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    }
  };

  // Add or remove a service from selection
  const toggleService = (service) => {
    console.log('toggleService called with:', service);
    console.log('Current selectedServices:', selectedServices);

    // Validate service object
    if (!service || !service._id) {
      console.error('Invalid service object:', service);
      return;
    }

    setSelectedServices((prev) => {
      const exists = prev.find((s) => s._id === service._id);
      console.log('Service exists in cart:', !!exists);

      let newCart;
      if (exists) {
        console.log('Removing service from cart');
        newCart = prev.filter((s) => s._id !== service._id);
      } else {
        console.log('Adding service to cart');
        newCart = [...prev, service];
      }

      // Save to localStorage
      try {
        localStorage.setItem('cartSession', JSON.stringify(newCart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
      return newCart;
    });
  };

  // Clear all selected services
  const clearSelectedServices = () => {
    setSelectedServices([]);
    localStorage.removeItem('cartSession');
  };

  // Show loading screen while checking session
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} isVendorLoggedIn={isVendorLoggedIn} currentCustomer={currentCustomer} currentVendor={currentVendor} logout={logout} vendorTab={vendorTab} setVendorTab={setVendorTab} selectedServices={selectedServices} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services selectedServices={selectedServices} toggleService={toggleService} />} />
        <Route path="/budget-calculator" element={<BudgetCalculator selectedServices={selectedServices} clearSelectedServices={clearSelectedServices} isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<LoginRegister login={login} register={register} isLoggedIn={isLoggedIn} isVendorLoggedIn={isVendorLoggedIn} />} />
        <Route path="/profile" element={<Profile customer={currentCustomer} logout={logout} toggleService={toggleService} />} />
        <Route path="/mycart" element={<MyCart selectedServices={selectedServices} clearSelectedServices={clearSelectedServices} isLoggedIn={isLoggedIn} addBooking={addBooking} toggleService={toggleService} />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard vendor={currentVendor} isVendorLoggedIn={isVendorLoggedIn} logout={logout} servicesList={servicesList} setServicesList={setServicesList} vendorTab={vendorTab} setVendorTab={setVendorTab} />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
); 