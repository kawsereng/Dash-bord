import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const salesData = [
  { name: 'Jan', Revenue: 18400, Orders: 420 },
  { name: 'Feb', Revenue: 22800, Orders: 510 },
  { name: 'Mar', Revenue: 31200, Orders: 720 },
  { name: 'Apr', Revenue: 28500, Orders: 650 },
  { name: 'May', Revenue: 39100, Orders: 890 },
  { name: 'Jun', Revenue: 48900, Orders: 1200 },
  { name: 'Jul', Revenue: 54239, Orders: 1400 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#dfb15b' }, // Gold
  { name: 'Fashion & Wear', value: 25, color: '#b45309' }, // Bronze
  { name: 'Home & Living', value: 18, color: '#0d9488' }, // Teal
  { name: 'Beauty & Cosmetics', value: 12, color: '#be123c' }, // Crimson
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="matte-panel p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">{label} Performance</p>
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-300">{item.name}:</span>
            <span className="text-sm font-bold text-white font-mono">
              {item.name === 'Revenue' ? `$${item.value.toLocaleString()}` : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue & Sales Trend Chart (Col span 2) */}
      <div className="lg:col-span-2 rounded-2xl p-5 border border-slate-800/40 matte-panel glow-gold flex flex-col justify-between">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/40">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Revenue & Orders Performance</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Monthly trajectory of sales revenue generated</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/45 p-1.5 rounded-lg border border-slate-800/80 text-xs">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-semibold">Revenue</span>
            <span className="px-2.5 py-1 text-slate-400 font-semibold">Orders</span>
          </div>
        </div>

        <div className="h-80 w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dfb15b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#dfb15b" stopOpacity={0.01}/>
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.25} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                className="font-mono"
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dx={-10}
                tickFormatter={(v) => `$${v/1000}k`}
                className="font-mono"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="Revenue" 
                stroke="#dfb15b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="Orders" 
                stroke="#0d9488" 
                strokeWidth={1.8}
                fillOpacity={1} 
                fill="url(#colorOrders)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Donut Chart (Col span 1) */}
      <div className="rounded-2xl p-5 border border-slate-800/40 matte-panel glow-teal flex flex-col justify-between">
        <div className="pb-4 border-b border-slate-800/40">
          <h3 className="text-base font-bold text-white tracking-tight">Sales by Category</h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Breakdown of order sales share</p>
        </div>

        <div className="h-60 w-full relative flex items-center justify-center mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#111216" strokeWidth={3} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Share']}
                contentStyle={{ 
                  backgroundColor: '#111216', 
                  border: '1px solid #1c1d24',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white font-mono">4.8k</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Total Sales</span>
          </div>
        </div>

        {/* Legend representation */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/40">
          {categoryData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2 py-1 hover:bg-slate-900/30 rounded-lg transition-colors">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-slate-400 truncate font-semibold">{item.name}</span>
                <span className="text-xs text-slate-200 font-bold font-mono">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
