import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Calendar } from 'lucide-react';
import { products, services } from '../data/products';
import { useCart } from '../context/CartContext';

const Home = () => {
    const { addToCart } = useCart();
    const featuredProducts = products.filter(p => p.tags.includes('popular') || p.tags.includes('luxury')).slice(0, 3);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary-50">
                <div className="absolute inset-0 z-0">
                    {/* Decorative floating elements */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
                    <div className="absolute top-40 right-20 w-48 h-48 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed" />
                    <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
                </div>

                <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="text-primary-600 font-medium tracking-wider uppercase">Nature's Finest</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
                            Let Flowers <br />
                            <span className="text-primary-500 italic">Speak for You</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                            Curating emotions through exquisite floral arrangements.
                            From weddings to everyday moments, we bring the magic of nature to your doorstep.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/shop" className="btn-primary flex items-center gap-2">
                                Shop Collection <ArrowRight size={20} />
                            </Link>
                            <Link to="/services" className="btn-outline">
                                Our Services
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-t-[150px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&q=80&w=800"
                                alt="Luxury Bouquet"
                                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Floating badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-10 -left-10 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3 animate-float-delayed"
                        >
                            <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Top Rated</p>
                                <p className="text-xs text-gray-500">5-star floral services</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Featured Collections</h2>
                        <p className="text-gray-500">Hand-picked favorites for every occasion</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {featuredProducts.map((product) => (
                            <motion.div key={product.id} variants={itemVariants} className="group">
                                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-500 hover:text-white"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-serif font-bold text-gray-900">{product.name}</h3>
                                <p className="text-primary-600 font-medium">${product.price.toFixed(2)}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link to="/shop" className="btn-outline">View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Services Highlight */}
            <section className="py-20 bg-floral-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />

                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center text-primary-500 mb-6">
                                    {service.icon === 'Heart' && <Heart size={28} />}
                                    {service.icon === 'Briefcase' && <Calendar size={28} />} {/* Fallback icon or change depending on import */}
                                    {service.icon === 'Calendar' && <Calendar size={28} />}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-500 mb-4">{service.description}</p>
                                <Link to="/services" className="text-primary-600 font-medium hover:underline">Learn More →</Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials or Trust */}
            <section className="py-20 bg-secondary-900 text-white relative isolate overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.secondary.800),theme(colors.secondary.900))] opacity-20" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-secondary-900 to-transparent" />

                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">"The most beautiful flowers <br /> I've ever seen."</h2>
                    <div className="flex justify-center gap-1 text-yellow-400 mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
                    </div>
                    <p className="text-secondary-200">Sarah Jenkins, Happy Customer</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
