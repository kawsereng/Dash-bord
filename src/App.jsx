import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCards from './components/KpiCards';
import AnalyticsCharts from './components/AnalyticsCharts';
import RecentOrders from './components/RecentOrders';
import ProductManagement from './components/ProductManagement';
import { 
  Users, 
  Settings as SettingsIcon, 
  Bell, 
  ShieldAlert, 
  Database, 
  ExternalLink,
  Search,
  CheckCircle,
  FileCode,
  DollarSign
} from 'lucide-react';

// Mock Customers data for the Customers tab
const initialCustomers = [
  { id: 'CUST-301', name: 'Sarah Connor', email: 'sarah.c@sky.net', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop', orders: 12, totalSpent: 3450.00, tier: 'VIP' },
  { id: 'CUST-302', name: 'John Doe', email: 'john.doe@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&auto=format&fit=crop', orders: 8, totalSpent: 1290.50, tier: 'Premium' },
  { id: 'CUST-303', name: 'Bruce Wayne', email: 'bruce@waynecorp.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128&auto=format&fit=crop', orders: 25, totalSpent: 18450.00, tier: 'VIP' },
  { id: 'CUST-304', name: 'Diana Prince', email: 'diana@themyscira.gov', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop', orders: 15, totalSpent: 5240.20, tier: 'VIP' },
  { id: 'CUST-305', name: 'Clark Kent', email: 'clark.k@dailyplanet.com', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=128&auto=format&fit=crop', orders: 4, totalSpent: 620.00, tier: 'Regular' },
  { id: 'CUST-306', name: 'Tony Stark', email: 'tony@starkindustries.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=128&auto=format&fit=crop', orders: 32, totalSpent: 24500.00, tier: 'VIP' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Customers states
  const [customers, setCustomers] = useState(initialCustomers);
  const [custSearch, setCustSearch] = useState('');

  // Settings states
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getTierColor = (tier) => {
    switch (tier) {
      case 'VIP': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Premium': return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-800';
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Neon Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-900/5 blur-[120px] pointer-events-none animate-drift-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/5 blur-[120px] pointer-events-none animate-drift-slow"></div>
      
      {/* COLLAPSIBLE SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* MAIN CONTENT WRAPPER */}
      <div 
        className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}
      >
        {/* HEADER CONTROLLER */}
        <Header 
          activeTab={activeTab} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* PAGE CONTENT ROUTER */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <>
              {/* Key Indicators */}
              <KpiCards />

              {/* Data Trends & Distribution charts */}
              <AnalyticsCharts />

              {/* Transaction Register */}
              <RecentOrders />
            </>
          )}

          {activeTab === 'products' && (
            /* Product Management view */
            <ProductManagement />
          )}

          {activeTab === 'orders' && (
            /* Standalone Orders table */
            <RecentOrders />
          )}

          {activeTab === 'customers' && (
            /* Customer Insights view */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800/40 matte-panel">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Customer Accounts</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Registry of premium store buyers</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-505 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={custSearch}
                    onChange={(e) => setCustSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors w-full"
                  />
                </div>
              </div>

              {/* Customers Registry Table */}
              <div className="rounded-2xl border border-slate-800/40 matte-panel glow-gold overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-850 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-950/20">
                        <th className="py-4.5 px-6">Customer Profile</th>
                        <th className="py-4.5 px-6">ID Number</th>
                        <th className="py-4.5 px-6">Loyalty Level</th>
                        <th className="py-4.5 px-6">Orders Placed</th>
                        <th className="py-4.5 px-6">Total Expenditures</th>
                        <th className="py-4.5 px-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm">
                      {customers.filter(c => c.name.toLowerCase().includes(custSearch.toLowerCase()) || c.email.toLowerCase().includes(custSearch.toLowerCase())).map((cust) => (
                        <tr key={cust.id} className="hover:bg-slate-900/20 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img src={cust.avatar} alt={cust.name} className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-200">{cust.name}</span>
                                <span className="text-[10px] text-slate-500">{cust.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-400 font-mono">{cust.id}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${getTierColor(cust.tier)}`}>
                              {cust.tier}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-slate-350 font-bold font-mono">{cust.orders}</td>
                          <td className="py-4 px-6 text-white font-extrabold font-mono">${cust.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="py-4 px-6 text-center">
                            <span className="inline-flex w-2 h-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/25"></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            /* Admin configurations */
            <div className="max-w-3xl space-y-6">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                {/* Store Profile */}
                <div className="rounded-2xl p-5 border border-slate-800/40 matte-panel glow-gold space-y-4">
                  <div className="border-b border-slate-850 pb-3">
                    <h3 className="text-base font-bold text-white tracking-tight">Store Attributes</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Manage public metadata configuration details.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1.5">Platform Title</label>
                      <input
                        type="text"
                        defaultValue="ApexCommerce Ltd."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1.5">Support Email Address</label>
                      <input
                        type="email"
                        defaultValue="support@apexcommerce.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Operations & Automation Toggles */}
                <div className="rounded-2xl p-5 border border-slate-800/40 matte-panel glow-teal space-y-4">
                  <div className="border-b border-slate-850 pb-3">
                    <h3 className="text-base font-bold text-white tracking-tight">System Controls</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Toggle background processes and maintenance states.</p>
                  </div>

                  <div className="space-y-3.5">
                    {/* Toggle: Maintenance Mode */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-850/50 hover:bg-slate-900/10 transition-colors">
                      <div className="flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200">Maintenance Lockout</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-medium">Redirect end-users to temporary offline page.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMaintenanceMode(!maintenanceMode)}
                        className={`w-11 h-6 rounded-full transition-colors duration-200 relative focus:outline-none border
                          ${maintenanceMode 
                            ? 'bg-amber-500 border-amber-400' 
                            : 'bg-slate-900 border-slate-800'
                          }`}
                      >
                        <span 
                          className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200
                            ${maintenanceMode ? 'transform translate-x-5' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Toggle: Auto Backup */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-850/50 hover:bg-slate-900/10 transition-colors">
                      <div className="flex items-start gap-3">
                        <Database className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200">Daily Cloud Archiving</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-medium">Automatically back up MySQL records to remote AWS storage.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAutoBackup(!autoBackup)}
                        className={`w-11 h-6 rounded-full transition-colors duration-200 relative focus:outline-none border
                          ${autoBackup 
                            ? 'bg-amber-500 border-amber-400' 
                            : 'bg-slate-900 border-slate-800'
                          }`}
                      >
                        <span 
                          className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200
                            ${autoBackup ? 'transform translate-x-5' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Toggle: Email Alerts */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-850/50 hover:bg-slate-900/10 transition-colors">
                      <div className="flex items-start gap-3">
                        <Bell className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-200">Automated Mail Alerts</span>
                          <span className="text-[10px] text-slate-500 mt-0.5 font-medium">Send real-time alerts when transactions exceed $1,000.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailNotif(!emailNotif)}
                        className={`w-11 h-6 rounded-full transition-colors duration-200 relative focus:outline-none border
                          ${emailNotif 
                            ? 'bg-amber-500 border-amber-400' 
                            : 'bg-slate-900 border-slate-800'
                          }`}
                      >
                        <span 
                          className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200
                            ${emailNotif ? 'transform translate-x-5' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* API Credentials */}
                <div className="rounded-2xl p-5 border border-slate-800/40 matte-panel glow-gold space-y-4">
                  <div className="border-b border-slate-850 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">API Webhook Keys</h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">Integration tokens for server synchronizations.</p>
                    </div>
                    <FileCode className="w-5 h-5 text-slate-500" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Public Endpoint Client ID</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value="pk_live_51MszSFK58Wz2NlzF8Wnfs9Kj942h"
                          className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 font-mono focus:outline-none"
                        />
                        <button type="button" className="px-3 py-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-350 flex items-center gap-1.5 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Docs</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Panel */}
                <div className="flex items-center justify-between gap-4">
                  {saveSuccess && (
                    <span className="text-xs text-teal-400 font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      <span>Configurations saved successfully.</span>
                    </span>
                  )}
                  <button 
                    type="submit"
                    className="ml-auto px-5 py-2.5 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.98] transition-all duration-150"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
