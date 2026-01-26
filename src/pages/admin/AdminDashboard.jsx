import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, ShoppingCart, Plus } from 'lucide-react';
import { getProducts, getCategories } from '../../services/productService';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalValue: 0
    });

    useEffect(() => {
        const products = getProducts();
        const categories = getCategories();
        const totalValue = products.reduce((sum, p) => sum + p.price, 0);

        setStats({
            totalProducts: products.length,
            totalCategories: categories.length,
            totalValue: totalValue.toFixed(2)
        });
    }, []);

    const statCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: Package,
            color: 'bg-blue-500',
            link: '/admin/products'
        },
        {
            title: 'Categories',
            value: stats.totalCategories,
            icon: ShoppingCart,
            color: 'bg-green-500',
            link: '/admin/products'
        },
        {
            title: 'Total Inventory Value',
            value: `$${stats.totalValue}`,
            icon: TrendingUp,
            color: 'bg-purple-500',
            link: '/admin/products'
        }
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome to the OMKAR Flowers admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={index}
                            to={card.link}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                                </div>
                                <div className={`${card.color} p-4 rounded-xl text-white`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        to="/admin/products/new"
                        className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
                    >
                        <div className="bg-primary-500 p-3 rounded-lg text-white">
                            <Plus size={20} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Add New Product</p>
                            <p className="text-sm text-gray-500">Create a new flower arrangement</p>
                        </div>
                    </Link>
                    <Link
                        to="/admin/products"
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <div className="bg-gray-500 p-3 rounded-lg text-white">
                            <Package size={20} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">Manage Products</p>
                            <p className="text-sm text-gray-500">Edit or remove existing products</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
