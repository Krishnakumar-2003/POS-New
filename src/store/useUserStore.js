import { create } from 'zustand';

const initialUsers = [
    { id: 1, name: 'Admin User', email: 'admin@lumina.pos', role: 'Admin', status: 'Active', lastActive: 'Just now' },
    { id: 2, name: 'John Doe', email: 'john@lumina.pos', role: 'Manager', status: 'Active', lastActive: '2 hours ago' },
    { id: 3, name: 'Jane Smith', email: 'jane@lumina.pos', role: 'Cashier', status: 'Inactive', lastActive: '1 day ago' },
];

export const useUserStore = create((set) => ({
    users: initialUsers,
    addUser: (user) => set((state) => ({
        users: [...state.users, { ...user, id: state.users.length + 1, lastActive: 'Never' }]
    })),
    updateUser: (id, updatedUser) => set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u))
    })),
    deleteUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id)
    })),
}));
