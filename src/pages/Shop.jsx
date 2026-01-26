import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag } from 'lucide-react';
import { getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useCart();

    const categories = [
        { id: 'all', name: 'All Flowers' },
        { id: 'bouquets', name: 'Bouquets' },
        { id: 'weddings', name: 'Weddings' },
        { id: 'dried', name: 'Dried Flowers' },
        { id: 'potted', name: 'Potted Plants' },
    ];

    // Load products from service (localStorage)
    useEffect(() => {
        const loadedProducts = getProducts();
        setProducts(loadedProducts);
    }, []);

    // Filter products
    useEffect(() => {
        let result = products;

        if (activeCategory !== 'all') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [activeCategory, searchQuery, products]);

    useEffect(() => {
        if (categoryParam) {
            setActiveCategory(categoryParam);
        }
    }, [categoryParam]);

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        setSearchParams(catId === 'all' ? {} : { category: catId });
    };

    return (
        <div className="bg-floral-white min-h-screen py-12 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Collection</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our hand-crafted arrangements, designed to bring beauty and elegance to any moment.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-6 rounded-2xl shadow-sm">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-primary-50 text-gray-700 hover:bg-primary-100'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-auto md:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search flowers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <Filter size={48} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No flowers found matching your criteria.</p>
                        <button onClick={() => { setActiveCategory('all'); setSearchQuery('') }} className="mt-4 text-primary-600 hover:underline">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={product.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product);
                                                }}
                                                className="w-full bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-primary-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag size={18} /> Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                    <Link to={`/product/${product.id}`} className="block p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{product.name}</h3>
                                            <span className="font-medium text-primary-600">${product.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Shop;
