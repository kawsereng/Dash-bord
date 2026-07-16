import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', name: 'Products', icon: ShoppingBag },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out border-r border-slate-800/40 matte-panel flex flex-col justify-between
        ${sidebarOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Brand Logo Header */}
      <div>
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/10 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <span className="font-extrabold text-lg bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                ApexCommerce
              </span>
            )}
          </div>
          
          {/* Toggle Button for Desktop */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex p-1.5 rounded-lg border border-slate-850 hover:bg-slate-800/30 text-slate-500 hover:text-amber-400 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 px-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500 shadow-sm shadow-amber-500/5' 
                    : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-100'
                  }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 
                  ${isActive ? 'text-amber-400' : 'text-slate-450 group-hover:text-amber-400'}`} 
                />
                {sidebarOpen ? (
                  <span className="transition-opacity duration-200">{item.name}</span>
                ) : (
                  <span className="absolute left-20 bg-slate-950 border border-slate-800 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Details */}
      <div className="p-4 border-t border-slate-800/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
              alt="Profile" 
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/30"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-teal-555 w-3 h-3 bg-teal-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-slate-200 truncate">Nabila Jahan</span>
              <span className="text-xs text-slate-500 truncate">admin@apex.com</span>
            </div>
          )}
          {sidebarOpen && (
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors shrink-0">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
