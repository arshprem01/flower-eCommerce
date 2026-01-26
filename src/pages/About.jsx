import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="relative h-[60vh] flex items-center justify-center bg-gray-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1599598425947-733d9d78404b?auto=format&fit=crop&q=80&w=1920" // Placeholder hero
                    alt="Florist working"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center px-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary-300 tracking-widest uppercase font-medium mb-4 block"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
                    >
                        Rooted in Passion
                    </motion.h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Bloom where you are planted.</h2>
                        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Founded in 2020, OMKAR Flowers began as a small home garden project and blossomed into a premier floral design studio. We believe that flowers are more than just decorations; they are a language of their own.
                            </p>
                            <p>
                                Our philosophy is simple: source the freshest local blooms, design with intention, and deliver happiness. Whether it's a single stem or a grand installation, we pour our hearts into every arrangement.
                            </p>
                            <p>
                                We are committed to sustainable practices, composting our green waste and minimizing single-use plastics in our packaging.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-primary-100 rounded-3xl transform rotate-3 -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&q=80&w=800"
                            alt="Flower Arrangement"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
