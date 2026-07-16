import React, { useState } from 'react';
import { Search, Eye, X, Filter, Download } from 'lucide-react';

const initialOrders = [
  { id: 'ORD-1204', customer: 'Sarah Connor', product: 'Quantum Virtual Headset', date: 'Jul 16, 2026', amount: 299.99, status: 'Processing', email: 'sarah.c@sky.net', itemsCount: 1, address: '742 Evergreen Terrace, Springfield' },
  { id: 'ORD-1203', customer: 'John Doe', product: 'Apex Mechanical Keyboard', date: 'Jul 15, 2026', amount: 159.50, status: 'Delivered', email: 'john.doe@gmail.com', itemsCount: 2, address: '123 Fake Street, Metropolis' },
  { id: 'ORD-1202', customer: 'Bruce Wayne', product: 'Ultra-Wide Curved Monitor 34"', date: 'Jul 15, 2026', amount: 899.00, status: 'Shipped', email: 'bruce@waynecorp.com', itemsCount: 1, address: 'Wayne Manor, Gotham City' },
  { id: 'ORD-1201', customer: 'Diana Prince', product: 'Ergonomic Mesh Office Chair', date: 'Jul 14, 2026', amount: 349.99, status: 'Delivered', email: 'diana@themyscira.gov', itemsCount: 1, address: 'Avenue of the Gods, Washington DC' },
  { id: 'ORD-1200', customer: 'Clark Kent', product: 'Noise Cancelling Headphones', date: 'Jul 12, 2026', amount: 199.99, status: 'Cancelled', email: 'clark.k@dailyplanet.com', itemsCount: 1, address: '344 Clinton Street, Metropolis' },
  { id: 'ORD-1199', customer: 'Tony Stark', product: 'Smart Ring Tracker Pro', date: 'Jul 10, 2026', amount: 129.00, status: 'Delivered', email: 'tony@starkindustries.com', itemsCount: 3, address: '10880 Malibu Point, California' },
];

export default function RecentOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'Processing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Shipped':
        return 'bg-amber-700/10 text-amber-300 border-amber-700/20';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-455 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/40 matte-panel glow-gold overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Overview of customer purchase invoices</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors w-full sm:w-48"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-950/20">
              <th className="py-4.5 px-6">Order ID</th>
              <th className="py-4.5 px-6">Customer</th>
              <th className="py-4.5 px-6">Product</th>
              <th className="py-4.5 px-6">Purchase Date</th>
              <th className="py-4.5 px-6">Amount</th>
              <th className="py-4.5 px-6">Status</th>
              <th className="py-4.5 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/20 transition-colors group">
                  <td className="py-4 px-6 font-semibold text-amber-400 group-hover:text-amber-300 transition-colors font-mono">
                    {order.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">{order.customer}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">{order.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-350 font-semibold">
                    {order.product}
                  </td>
                  <td className="py-4 px-6 text-slate-450 text-xs font-medium">
                    {order.date}
                  </td>
                  <td className="py-4 px-6 font-bold text-white font-mono">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1.5 rounded-lg border border-slate-805 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800 text-slate-450 hover:text-amber-400 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-xs text-slate-500 font-medium">
                  No transaction records found matching filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Invoice Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedOrder(null)}
          />
          
          {/* Modal content */}
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-[#111216] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Transaction Statement</span>
                <h4 className="text-lg font-bold text-white mt-0.5 font-mono">{selectedOrder.id}</h4>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs">
              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/80">
                <div>
                  <span className="text-slate-500 block font-medium mb-1">Customer Info</span>
                  <span className="text-slate-200 font-bold block">{selectedOrder.customer}</span>
                  <span className="text-slate-400 mt-0.5 block">{selectedOrder.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium mb-1">Shipping Destination</span>
                  <span className="text-slate-350 font-semibold block leading-relaxed">{selectedOrder.address}</span>
                </div>
              </div>

              {/* Order breakdown */}
              <div className="space-y-2.5">
                <span className="text-slate-500 font-medium block">Invoice Summary</span>
                <div className="flex items-center justify-between py-2 border-y border-slate-800/60">
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-semibold">{selectedOrder.product}</span>
                    <span className="text-slate-500 mt-0.5">Quantity: {selectedOrder.itemsCount}x</span>
                  </div>
                  <span className="text-slate-200 font-bold font-mono">${selectedOrder.amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Status and summary */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Fulfillment Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block font-medium">Subtotal Amount</span>
                  <span className="text-base font-black text-amber-450 font-mono">${selectedOrder.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end border-t border-slate-800 pt-4">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Close Receipt
              </button>
              <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/10 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
