import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any flowers yet.</p>
                <Link to="/shop" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-floral-white py-12 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                key={item.id}
                                className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center"
                            >
                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif font-bold text-gray-900 text-lg">
                                            <Link to={`/product/${item.id}`} className="hover:text-primary-600">{item.name}</Link>
                                        </h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3">${item.price.toFixed(2)}</p>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center border border-gray-200 rounded-full h-8">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-full flex items-center justify-center hover:bg-gray-50 rounded-l-full"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-full flex items-center justify-center hover:bg-gray-50 rounded-r-full"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="text-gray-900 font-bold ml-auto">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
                            <h3 className="font-serif font-bold text-xl mb-6">Order Summary</h3>

                            <div className="space-y-3 text-gray-600 mb-6 border-b border-gray-100 pb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-bold text-lg text-gray-900 mb-8">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <button className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                                Proceed to Checkout <ArrowRight size={18} />
                            </button>

                            <div className="mt-4 text-center">
                                <Link to="/shop" className="text-sm text-gray-500 hover:text-primary-600">Continue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
