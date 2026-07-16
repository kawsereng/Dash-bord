import React, { useState } from 'react';
import { Search, Bell, Calendar, Menu, MessageSquare, Sun, Moon } from 'lucide-react';

export default function Header({ activeTab, sidebarOpen, setSidebarOpen }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Map of tab IDs to titles
  const tabTitles = {
    dashboard: 'Dashboard Overview',
    products: 'Product Inventory',
    orders: 'Order Processing',
    customers: 'Customer Demographics',
    settings: 'System Settings',
  };

  const notifications = [
    { id: 1, text: 'New order #1204 received', time: '5m ago', unread: true },
    { id: 2, text: 'Product "Quantum Headset" stock low', time: '1h ago', unread: true },
    { id: 3, text: 'Payout processed successfully', time: '5h ago', unread: false },
  ];

  return (
    <header className="h-20 border-b border-slate-800/40 matte-panel flex items-center justify-between px-6 sticky top-0 z-20 backdrop-blur-md">
      {/* Left side: Hamburger (mobile) and Section Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg border border-slate-800 hover:bg-slate-800/40 text-slate-400 hover:text-white transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {tabTitles[activeTab] || 'Dashboard'}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block mt-0.5 font-medium">Welcome back to your store administration portal.</p>
        </div>
      </div>

      {/* Right side: Search, Date, Notifications, Theme, Profile */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="relative hidden lg:block">
          <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-200 w-64
            ${searchFocused 
              ? 'border-amber-500/60 bg-slate-900/60 shadow-lg shadow-amber-500/5 w-72' 
              : 'border-slate-850 bg-slate-950/30'
            }`}
          >
            <Search className="w-4.5 h-4.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search anything..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent text-sm text-slate-200 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/40 border border-slate-850 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Messaging (visual check) */}
        <button className="p-2.5 rounded-xl border border-slate-850 hover:border-slate-800 bg-slate-950/20 hover:bg-slate-900/30 text-slate-450 hover:text-white transition-all duration-150">
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Notification Bell with relative dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2.5 rounded-xl border border-slate-850 hover:border-slate-800 bg-slate-950/20 hover:bg-slate-900/30 text-slate-450 hover:text-white transition-all duration-150 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-3">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  <button className="text-xs text-amber-400 hover:text-amber-300 font-medium">Mark all as read</button>
                </div>
                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer flex gap-3 items-start
                        ${notif.unread ? 'bg-amber-950/15 border border-amber-900/10' : 'hover:bg-slate-900/40'}`}
                    >
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notif.unread ? 'bg-amber-500' : 'bg-slate-600'}`} />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-slate-200 leading-snug">{notif.text}</span>
                        <span className="text-[10px] text-slate-500 mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
