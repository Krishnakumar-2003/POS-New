import { create } from 'zustand';

export const useTransactionStore = create((set) => ({
    transactions: [
        { id: 1, type: 'SALE', amount: 149.99, date: '2024-03-10T10:30:00', items: 1 },
        { id: 2, type: 'SALE', amount: 299.00, date: '2024-03-10T11:15:00', items: 1 },
        { id: 3, type: 'PURCHASE', amount: 1200.00, date: '2024-03-09T09:00:00', supplier: 'TechWholesale Ltd' },
        { id: 4, type: 'SALE', amount: 450.00, date: '2024-03-11T14:20:00', items: 1 },
        { id: 5, type: 'PURCHASE', amount: 800.00, date: '2024-03-11T16:45:00', supplier: 'OfficeDepot Pro' }
    ],
    addTransaction: (transaction) => set((state) => ({
        transactions: [{ ...transaction, id: state.transactions.length + 1, date: new Date().toISOString() }, ...state.transactions]
    })),
}));
