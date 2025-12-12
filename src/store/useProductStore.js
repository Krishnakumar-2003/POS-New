import { create } from 'zustand';
import { products as initialProducts } from '../data/mockData';

export const useProductStore = create((set) => ({
    products: initialProducts,
    addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: state.products.length + 1 }]
    })),
    updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    })),
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
    })),
}));
