import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit2, X, SlidersHorizontal, Package, AlertTriangle } from 'lucide-react';

const initialProducts = [
  { id: 'PROD-101', name: 'Quantum Virtual Headset', category: 'Electronics', price: 299.99, stock: 45, image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=256&auto=format&fit=crop' },
  { id: 'PROD-102', name: 'Apex Mechanical Keyboard', category: 'Electronics', price: 159.50, stock: 8, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=256&auto=format&fit=crop' },
  { id: 'PROD-103', name: 'Ultra-Wide Curved Monitor 34"', category: 'Electronics', price: 899.00, stock: 12, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=256&auto=format&fit=crop' },
  { id: 'PROD-104', name: 'Ergonomic Mesh Office Chair', category: 'Furniture', price: 349.99, stock: 0, image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=256&auto=format&fit=crop' },
  { id: 'PROD-105', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 199.99, stock: 24, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=256&auto=format&fit=crop' },
  { id: 'PROD-106', name: 'Smart Ring Tracker Pro', category: 'Wearables', price: 129.00, stock: 65, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=256&auto=format&fit=crop' },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states for new product
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Electronics');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');

  // Delete handler
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Add Product handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductStock) return;

    const nextId = `PROD-${Math.floor(100 + Math.random() * 900)}`;
    const randomImg = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=256&auto=format&fit=crop';
    
    const newProduct = {
      id: nextId,
      name: newProductName,
      category: newProductCategory,
      price: parseFloat(newProductPrice),
      stock: parseInt(newProductStock),
      image: randomImg
    };

    setProducts([newProduct, ...products]);
    
    // Reset Form & Close Modal
    setNewProductName('');
    setNewProductPrice('');
    setNewProductStock('');
    setIsAddModalOpen(false);
  };

  // Stock status styling helper
  const getStockStatusStyle = (stock) => {
    if (stock === 0) return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    if (stock < 10) return 'bg-amber-505 bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  };

  const categories = ['All', 'Electronics', 'Furniture', 'Wearables'];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Product controls bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800/40 matte-panel">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors w-full sm:w-56"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Product Trigger */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-405 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>New Product</span>
        </button>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl border border-slate-800/40 matte-panel glow-gold overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:translate-y-[-4px]"
            >
              {/* Product Thumbnail */}
              <div className="h-48 relative overflow-hidden bg-slate-900">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${getStockStatusStyle(product.stock)}`}>
                    {getStockStatusText(product.stock)}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/60 text-amber-400 text-xs font-bold font-mono">
                  {product.id}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{product.category}</span>
                  <h4 className="text-base font-bold text-slate-200 mt-1 line-clamp-1 group-hover:text-white transition-colors">{product.name}</h4>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-xl font-black text-white font-mono">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-505 text-slate-450 font-medium">Stock: {product.stock} units</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between border-t border-slate-800/40 pt-4 mt-2">
                  <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 font-semibold transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Info</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-3xl matte-panel text-slate-500">
            <Package className="w-10 h-10 text-slate-650 text-slate-600 mb-3" />
            <span className="text-sm font-medium">No items found in catalog matching search query.</span>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          
          <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-[#111216] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div>
                <h4 className="text-lg font-bold text-white">Create New Catalog Item</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">Define attributes for the new product inventory entry.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Apex Pro Keyboard"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Category</label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors cursor-pointer"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Wearables">Wearables</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="249.99"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Starting Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  required
                  placeholder="50"
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-800 pt-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-800 text-slate-450 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4.5 py-2.5 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/10 transition-colors"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
