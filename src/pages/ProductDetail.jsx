import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const product = getProductById(id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-3xl font-serif font-bold mb-4">Product Not Found</h2>
                <Link to="/shop" className="btn-primary">Back to Shop</Link>
            </div>
        );
    }

    const relatedProducts = getProducts()
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="min-h-screen bg-floral-white py-12 px-4">
            <div className="container mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Shop
                </button>

                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-12 shadow-sm mb-16">
                    {/* Image Gallery (Simplified for now) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl overflow-hidden shadow-lg"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover aspect-[4/5]"
                        />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-gray-400 text-sm">(5.0) 24 Reviews</span>
                        </div>

                        <p className="text-3xl text-primary-600 font-medium mb-8">${product.price.toFixed(2)}</p>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {product.description} Hand-picked fresh from our gardens and arranged with care by our expert florists.
                            Perfect for adding a touch of elegance to any setting.
                        </p>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center border border-gray-200 rounded-full">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:text-primary-600 transition-colors"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:text-primary-600 transition-colors"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 btn-primary py-4 flex items-center justify-center gap-2 text-lg"
                            >
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                        </div>

                        <div className="border-t border-gray-100 pt-6 space-y-3 text-sm text-gray-500">
                            <div className="flex justify-between">
                                <span>Category:</span>
                                <span className="font-medium text-gray-900 capitalize">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Availability:</span>
                                <span className="font-medium text-green-600">In Stock</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery:</span>
                                <span className="font-medium text-gray-900">Same day hidden local</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-center mb-8">You May Also Like</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedProducts.map((p) => (
                                <Link to={`/product/${p.id}`} key={p.id} className="group">
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm p-4 hover:shadow-lg transition-all">
                                        <div className="aspect-square rounded-lg overflow-hidden mb-4">
                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <h3 className="font-serif font-bold text-gray-900 group-hover:text-primary-600">{p.name}</h3>
                                        <p className="text-primary-500">${p.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
