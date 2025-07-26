import './style.css';
import { NavLink } from 'react-router-dom';

function Navbar({ isLoggedIn, isVendorLoggedIn, currentCustomer, currentVendor, logout, vendorTab, setVendorTab, selectedServices = [] }) {
    return (
        <header className="fade-in">
            <div className="logo">
                <h1>EventGenie</h1>
            </div>
            <nav>
                <ul className={isVendorLoggedIn ? 'flex gap-4 items-center' : ''} style={isVendorLoggedIn ? { margin: 0 } : {}}>
                    {isVendorLoggedIn ? (
                        <>
                            <li>
                                <a href="#" className={vendorTab === 'services' ? 'active' : ''} onClick={e => { e.preventDefault(); setVendorTab('services'); }}>
                                    <i className="fas fa-concierge-bell"></i> My Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className={vendorTab === 'bookings' ? 'active' : ''} onClick={e => { e.preventDefault(); setVendorTab('bookings'); }}>
                                    <i className="fas fa-calendar-check"></i> Bookings
                                </a>
                            </li>
                            <li>
                                <a href="#" className={vendorTab === 'block' ? 'active' : ''} onClick={e => { e.preventDefault(); setVendorTab('block'); }}>
                                    <i className="fas fa-ban"></i> Block Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className={vendorTab === 'profile' ? 'active' : ''} onClick={e => { e.preventDefault(); setVendorTab('profile'); }}>
                                    <i className="fas fa-user"></i> Profile
                                </a>
                            </li>
                        </>
                    ) : isLoggedIn ? (
                        <>
                            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                            <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
                            <li>
                                <NavLink to="/mycart" className={({ isActive }) => isActive ? 'active' : ''}>
                                    MyCart
                                    {selectedServices.length > 0 && (
                                        <span style={{
                                            background: '#e74c3c',
                                            color: 'white',
                                            borderRadius: '50%',
                                            padding: '2px 6px',
                                            fontSize: '0.7rem',
                                            marginLeft: '4px',
                                            minWidth: '16px',
                                            display: 'inline-block',
                                            textAlign: 'center'
                                        }}>
                                            {selectedServices.length}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                            <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
                            <li><NavLink to="/budget-calculator" className={({ isActive }) => isActive ? 'active' : ''}>Budget Calculator</NavLink></li>
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'btn btn-primary hover-effect active-login' : 'btn btn-primary hover-effect'}>Login/Register</NavLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
