import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-floral-white min-h-screen py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-gray-600">We'd love to hear from you. Visit us or send us a message.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-sm">
                    {/* Info Section */}
                    <div className="bg-primary-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
                                <p className="text-primary-200">Fill out the form or reach out directly.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Phone className="text-primary-400" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="text-primary-400" />
                                    <span>hello@omkarflowers.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="text-primary-400" />
                                    <span>123 Floral Ave, New York, NY 10001</span>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Clock className="text-primary-400 shrink-0" />
                                    <div>
                                        <p>Mon - Fri: 9am - 7pm</p>
                                        <p>Sat: 10am - 5pm</p>
                                        <p>Sun: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full translate-y-1/3 -translate-x-1/3" />
                    </div>

                    {/* Form Section */}
                    <div className="p-12">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Jane" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="jane@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Tell us what you need..." ></textarea>
                            </div>

                            <button type="button" className="w-full btn-primary py-4">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
