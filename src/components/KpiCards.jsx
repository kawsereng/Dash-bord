import React from 'react';
import { DollarSign, ShoppingBag, Users, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function KpiCards() {
  const stats = [
    {
      id: 1,
      name: 'Total Revenue',
      value: '$54,239.50',
      change: '+14.6%',
      isPositive: true,
      timeframe: 'vs last month',
      icon: DollarSign,
      color: 'from-amber-600 to-yellow-550',
      glow: 'glow-gold',
      progress: 78
    },
    {
      id: 2,
      name: 'Total Orders',
      value: '1,842',
      change: '+8.2%',
      isPositive: true,
      timeframe: 'vs last week',
      icon: ShoppingBag,
      color: 'from-teal-600 to-emerald-500',
      glow: 'glow-teal',
      progress: 62
    },
    {
      id: 3,
      name: 'Active Customers',
      value: '8,431',
      change: '+12.4%',
      isPositive: true,
      timeframe: 'vs last month',
      icon: Users,
      color: 'from-amber-700 to-amber-500',
      glow: 'glow-bronze',
      progress: 89
    },
    {
      id: 4,
      name: 'Conversion Rate',
      value: '3.42%',
      change: '-1.5%',
      isPositive: false,
      timeframe: 'vs last week',
      icon: Percent,
      color: 'from-rose-600 to-red-500',
      glow: 'glow-crimson',
      progress: 45
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.id} 
            className={`rounded-2xl p-5 border border-slate-800/40 matte-panel relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:border-slate-700/40 hover:shadow-xl group ${stat.glow}`}
          >
            {/* Background Decorative Accent */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-tr from-transparent to-white/[0.01] rounded-full blur-xl group-hover:to-white/[0.02] transition-all duration-300"></div>

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.name}</span>
                <h3 className="text-2xl font-bold text-white mt-1.5 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-slate-950 shadow-lg shrink-0`}>
                <Icon className="w-5.5 h-5.5" />
              </div>
            </div>

            {/* Performance Metric */}
            <div className="flex items-center gap-2 mt-4">
              <span className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-lg
                ${stat.isPositive 
                  ? 'bg-teal-500/10 text-teal-400' 
                  : 'bg-rose-500/10 text-rose-455 text-rose-400'
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 inline shrink-0" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 inline shrink-0" />
                )}
                {stat.change}
              </span>
              <span className="text-xs text-slate-500">{stat.timeframe}</span>
            </div>

            {/* Micro Progress Bar */}
            <div className="mt-4 pt-1">
              <div className="w-full h-1.5 bg-slate-900/80 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
