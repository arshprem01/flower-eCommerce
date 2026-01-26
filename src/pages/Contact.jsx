import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [searchParams] = useSearchParams();
    const serviceParam = searchParams.get('service');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const services = [
        { value: '', label: 'Select a service (optional)' },
        { value: 'consultation', label: 'Book a Consultation' },
        { value: 'wedding', label: 'Wedding Florals' },
        { value: 'corporate', label: 'Corporate Events' },
        { value: 'subscription', label: 'Weekly Subscriptions' },
        { value: 'editorial', label: 'Editorial & Shoots' },
        { value: 'gift', label: 'Gift Concierge' },
        { value: 'installation', label: 'Event Installation' }
    ];

    useEffect(() => {
        if (serviceParam) {
            setFormData(prev => ({ ...prev, service: serviceParam }));
        }
    }, [serviceParam]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would send this to a backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ firstName: '', lastName: '', email: '', service: '', message: '' });
        }, 3000);
    };

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
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="jane@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Service Interest</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                    >
                                        {services.map(s => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                        placeholder="Tell us what you need..."
                                    />
                                </div>

                                <button type="submit" className="w-full btn-primary py-4">Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
