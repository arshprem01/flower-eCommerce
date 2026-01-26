import { products as defaultProducts } from '../data/products';

const PRODUCTS_KEY = 'omkar_products';

// Initialize products from localStorage or defaults
export const getProducts = () => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    // Initialize with default products on first load
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
};

// Save products to localStorage
export const saveProducts = (products) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// Get a single product by ID
export const getProductById = (id) => {
    const products = getProducts();
    return products.find(p => p.id === parseInt(id));
};

// Add a new product
export const addProduct = (product) => {
    const products = getProducts();
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct = { ...product, id: newId };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    return newProduct;
};

// Update an existing product
export const updateProduct = (id, updatedData) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedData, id: parseInt(id) };
    saveProducts(products);
    return products[index];
};

// Delete a product
export const deleteProduct = (id) => {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== parseInt(id));
    saveProducts(filtered);
    return filtered;
};

// Get unique categories
export const getCategories = () => {
    const products = getProducts();
    return [...new Set(products.map(p => p.category))];
};

// Reset to default products
export const resetProducts = () => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    return defaultProducts;
};
