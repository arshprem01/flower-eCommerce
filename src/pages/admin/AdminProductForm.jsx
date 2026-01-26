import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Image } from 'lucide-react';
import { getProductById, addProduct, updateProduct, getCategories } from '../../services/productService';

const AdminProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'bouquets',
        image: '',
        description: '',
        tags: ''
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setCategories(getCategories());

        if (isEditing) {
            const product = getProductById(id);
            if (product) {
                setFormData({
                    name: product.name,
                    price: product.price.toString(),
                    category: product.category,
                    image: product.image,
                    description: product.description,
                    tags: product.tags ? product.tags.join(', ') : ''
                });
            } else {
                navigate('/admin/products');
            }
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.image.trim()) newErrors.image = 'Image URL is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const productData = {
            name: formData.name.trim(),
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image.trim(),
            description: formData.description.trim(),
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        };

        // Simulate a small delay
        await new Promise(resolve => setTimeout(resolve, 300));

        if (isEditing) {
            updateProduct(id, productData);
        } else {
            addProduct(productData);
        }

        navigate('/admin/products');
    };

    const defaultCategories = ['bouquets', 'mixed', 'weddings', 'dried', 'potted'];
    const allCategories = [...new Set([...defaultCategories, ...categories])];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/admin/products')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Products</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p className="text-gray-500 mt-1">
                    {isEditing ? 'Update product information' : 'Create a new flower arrangement'}
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="e.g., Velvet Rose Bouquet"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Price & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${errors.price ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="89.99"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${errors.category ? 'border-red-500' : 'border-gray-200'}`}
                            >
                                {allCategories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL *
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all ${errors.image ? 'border-red-500' : 'border-gray-200'}`}
                                placeholder="/images/products/my-flower.png"
                            />
                            {formData.image && (
                                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        <p className="text-gray-400 text-sm mt-1">
                            Use a path like /images/products/filename.png or a full URL
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-200'}`}
                            placeholder="Describe your flower arrangement..."
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            placeholder="romantic, popular, gift"
                        />
                        <p className="text-gray-400 text-sm mt-1">
                            Optional: Add tags to help categorize the product
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>{isEditing ? 'Update Product' : 'Create Product'}</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
