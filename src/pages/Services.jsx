import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Briefcase, Camera, Gift, Truck } from 'lucide-react';

const Services = () => {
    const allServices = [
        {
            icon: <Heart size={32} />,
            title: "Wedding Florals",
            slug: "wedding",
            description: "From the bridal bouquet to the reception centerpiece, we create cohesive floral designs that reflect your unique love story."
        },
        {
            icon: <Briefcase size={32} />,
            title: "Corporate Events",
            slug: "corporate",
            description: "Impress clients and colleagues with sophisticated floral installations for galas, product launches, and office spaces."
        },
        {
            icon: <Calendar size={32} />,
            title: "Weekly Subscriptions",
            slug: "subscription",
            description: "Keep your home or business blooming with fresh seasonal arrangements delivered to your door every week."
        },
        {
            icon: <Camera size={32} />,
            title: "Editorial & Shoots",
            slug: "editorial",
            description: "Creative botanical styling for brand campaigns, magazine editorials, and photo sessions."
        },
        {
            icon: <Gift size={32} />,
            title: "Gift Concierge",
            slug: "gift",
            description: "Personalized floral gifting service for birthdays, anniversaries, and special moments."
        },
        {
            icon: <Truck size={32} />,
            title: "Event Installation",
            slug: "installation",
            description: "Full-scale floral production and on-site installation for immersive event experiences."
        }
    ];

    return (
        <div className="bg-floral-white min-h-screen py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto text-lg"
                    >
                        Beyond selling flowers, we curate experiences. Let us transform your vision into living art.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
                            <Link
                                to={`/contact?service=${service.slug}`}
                                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                            >
                                Inquire Now →
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 bg-secondary-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to bring your vision to life?</h2>
                        <p className="text-secondary-200 mb-8 max-w-xl mx-auto">Book a consultation with our lead floral designer today.</p>
                        <Link
                            to="/contact?service=consultation"
                            className="inline-block px-8 py-3 bg-white text-secondary-900 rounded-full font-bold hover:bg-secondary-100 transition-colors"
                        >
                            Book Consultation
                        </Link>
                    </div>
                    {/* Abstract Circle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-800 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </div>
    );
};

export default Services;
