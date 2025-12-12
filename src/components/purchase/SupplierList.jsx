import React from 'react';
import { Truck, Phone, Mail, MoreHorizontal } from 'lucide-react';

const mockSuppliers = [
    { id: 1, name: 'TechWholesale Ltd', contact: '+1 (555) 123-4567', email: 'orders@techwholesale.com', category: 'Electronics' },
    { id: 2, name: 'OfficeDepot Pro', contact: '+1 (555) 987-6543', email: 'support@officeprovision.com', category: 'Stationery' },
    { id: 3, name: 'Global Gadgets Inc', contact: '+1 (555) 456-7890', email: 'sales@globalgadgets.com', category: 'Accessories' },
];

const SupplierList = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary-600" />
                    Suppliers
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All
                </button>
            </div>
            <div className="divide-y divide-slate-100">
                {mockSuppliers.map((supplier) => (
                    <div key={supplier.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-semibold text-slate-800">{supplier.name}</h4>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                    {supplier.category}
                                </span>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-1 mt-3">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Phone className="w-3 h-3" />
                                {supplier.contact}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Mail className="w-3 h-3" />
                                {supplier.email}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupplierList;
