import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="text-2xl font-serif font-bold text-gray-900">OMKAR</span>
                            <span className="text-primary-500 text-3xl">✿</span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed">
                            Crafting premium floral arrangements for life's most beautiful moments. Experience the magic of nature.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-6 text-gray-800">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link to="/shop" className="text-gray-500 hover:text-primary-600 transition-colors">All Flowers</Link></li>
                            <li><Link to="/shop?category=bouquets" className="text-gray-500 hover:text-primary-600 transition-colors">Luxury Bouquets</Link></li>
                            <li><Link to="/shop?category=weddings" className="text-gray-500 hover:text-primary-600 transition-colors">Wedding Collections</Link></li>
                            <li><Link to="/services" className="text-gray-500 hover:text-primary-600 transition-colors">Event Decoration</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-6 text-gray-800">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-500 hover:text-primary-600 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-500 hover:text-primary-600 transition-colors">Contact</Link></li>
                            <li><Link to="/terms" className="text-gray-500 hover:text-primary-600 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="text-gray-500 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif font-bold text-lg mb-6 text-gray-800">Newsletter</h3>
                        <p className="text-gray-500 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                            />
                            <button className="w-full btn-primary py-3 rounded-lg">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} OMKAR Flowers. All rights reserved.</p>
                    <div className="flex gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> <span>123 Floral Ave, New York, NY</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} /> <span>+1 (555) 123-4567</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
