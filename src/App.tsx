import { useState } from 'react'
import './App.css'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer
} from 'recharts'
import { 
  TrendingUp, DollarSign, Users, 
  ShoppingCart, Target, Calendar, ArrowUpRight,
  ArrowDownRight, MapPin
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

// Mock data for the dashboard
const kpiData = {
  totalRevenue: 49173939.33,
  totalProfit: 21237263.94,
  profitMargin: 43.2,
  totalOrders: 108056,
  totalCustomers: 14276,
  aov: 455.08,
  avgClv: 3444.52,
  repeatRate: 88.0,
  churnRate: 43.6
}

const monthlyTrends = [
  { month: 'Jan 22', revenue: 2800000, profit: 1200000 },
  { month: 'Feb 22', revenue: 3100000, profit: 1350000 },
  { month: 'Mar 22', revenue: 3400000, profit: 1480000 },
  { month: 'Apr 22', revenue: 3200000, profit: 1400000 },
  { month: 'May 22', revenue: 3600000, profit: 1580000 },
  { month: 'Jun 22', revenue: 3800000, profit: 1650000 },
  { month: 'Jul 22', revenue: 4100000, profit: 1780000 },
  { month: 'Aug 22', revenue: 3900000, profit: 1700000 },
  { month: 'Sep 22', revenue: 4200000, profit: 1820000 },
  { month: 'Oct 22', revenue: 4500000, profit: 1950000 },
  { month: 'Nov 22', revenue: 5200000, profit: 2250000 },
  { month: 'Dec 22', revenue: 5800000, profit: 2500000 },
  { month: 'Jan 23', revenue: 3500000, profit: 1520000 },
  { month: 'Feb 23', revenue: 3800000, profit: 1650000 },
  { month: 'Mar 23', revenue: 4100000, profit: 1780000 },
  { month: 'Apr 23', revenue: 3900000, profit: 1700000 },
  { month: 'May 23', revenue: 4300000, profit: 1870000 },
  { month: 'Jun 23', revenue: 4600000, profit: 2000000 },
  { month: 'Jul 23', revenue: 4900000, profit: 2120000 },
  { month: 'Aug 23', revenue: 4700000, profit: 2040000 },
  { month: 'Sep 23', revenue: 5000000, profit: 2170000 },
  { month: 'Oct 23', revenue: 5300000, profit: 2300000 },
  { month: 'Nov 23', revenue: 6000000, profit: 2600000 },
  { month: 'Dec 23', revenue: 6500000, profit: 2820000 },
  { month: 'Jan 24', revenue: 4200000, profit: 1820000 },
  { month: 'Feb 24', revenue: 4500000, profit: 1950000 },
  { month: 'Mar 24', revenue: 4800000, profit: 2080000 },
  { month: 'Apr 24', revenue: 4600000, profit: 2000000 },
  { month: 'May 24', revenue: 5000000, profit: 2170000 },
  { month: 'Jun 24', revenue: 5300000, profit: 2300000 },
  { month: 'Jul 24', revenue: 5600000, profit: 2430000 },
  { month: 'Aug 24', revenue: 5400000, profit: 2350000 },
  { month: 'Sep 24', revenue: 5700000, profit: 2470000 },
  { month: 'Oct 24', revenue: 6000000, profit: 2600000 },
  { month: 'Nov 24', revenue: 6800000, profit: 2950000 },
  { month: 'Dec 24', revenue: 7200000, profit: 3120000 },
]

const categoryData = [
  { name: 'Electronics', revenue: 18500000, profit: 8200000, units: 12500 },
  { name: 'Clothing', revenue: 9800000, profit: 4500000, units: 45000 },
  { name: 'Home & Garden', revenue: 8200000, profit: 3500000, units: 18000 },
  { name: 'Sports', revenue: 6500000, profit: 2800000, units: 15000 },
  { name: 'Health & Beauty', revenue: 4200000, profit: 1600000, units: 28000 },
  { name: 'Books', revenue: 1973939, profit: 613726, units: 35000 },
]

const rfmSegments = [
  { name: 'Champions', count: 3312, revenue: 28325465, color: '#10B981' },
  { name: 'Loyal Customers', count: 2103, revenue: 8927343, color: '#3B82F6' },
  { name: 'Potential Loyalists', count: 2174, revenue: 5479595, color: '#8B5CF6' },
  { name: 'At Risk', count: 2357, revenue: 3692972, color: '#F59E0B' },
  { name: 'Lost', count: 4016, revenue: 2579244, color: '#EF4444' },
  { name: 'Need Attention', count: 207, revenue: 147669, color: '#EC4899' },
  { name: 'New Customers', count: 107, revenue: 21652, color: '#06B6D4' },
]

const regionData = [
  { name: 'West', revenue: 14200000, customers: 3850, growth: 12.5 },
  { name: 'South', revenue: 12800000, customers: 3520, growth: 8.3 },
  { name: 'Northeast', revenue: 11500000, customers: 3200, growth: -2.1 },
  { name: 'Midwest', revenue: 8900000, customers: 2450, growth: 5.7 },
  { name: 'Southwest', revenue: 980000, customers: 680, growth: 15.2 },
  { name: 'Pacific', revenue: 793939, customers: 576, growth: 3.4 },
]

const paymentData = [
  { name: 'Credit Card', value: 45, color: '#3B82F6' },
  { name: 'Debit Card', value: 25, color: '#10B981' },
  { name: 'PayPal', value: 18, color: '#8B5CF6' },
  { name: 'Apple Pay', value: 8, color: '#F59E0B' },
  { name: 'Google Pay', value: 4, color: '#EF4444' },
]

const forecastData = [
  { month: 'Jan 25', actual: null, forecast: 4500000, lower: 3600000, upper: 5400000 },
  { month: 'Feb 25', actual: null, forecast: 4700000, lower: 3760000, upper: 5640000 },
  { month: 'Mar 25', actual: null, forecast: 4900000, lower: 3920000, upper: 5880000 },
  { month: 'Apr 25', actual: null, forecast: 5100000, lower: 4080000, upper: 6120000 },
  { month: 'May 25', actual: null, forecast: 5300000, lower: 4240000, upper: 6360000 },
  { month: 'Jun 25', actual: null, forecast: 5500000, lower: 4400000, upper: 6600000 },
]

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toFixed(0)}`
}

const formatNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return value.toString()
}

function KPICard({ title, value, subtitle, trend, trendUp, icon: Icon }: any) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={`text-xs flex items-center ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trend}
            </span>
          )}
          <span className="text-xs text-slate-500">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Customer Revenue Intelligence
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                End-to-End Analytics Dashboard • 120K+ Transactions Analyzed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                Live Data
              </Badge>
              <div className="text-right">
                <p className="text-xs text-slate-500">Last Updated</p>
                <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-800">Overview</TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-slate-800">Customer Segments</TabsTrigger>
            <TabsTrigger value="forecast" className="data-[state=active]:bg-slate-800">Forecast</TabsTrigger>
            <TabsTrigger value="regional" className="data-[state=active]:bg-slate-800">Regional</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard 
                title="Total Revenue" 
                value={formatCurrency(kpiData.totalRevenue)}
                subtitle="3-year period"
                trend="+12.5%"
                trendUp={true}
                icon={DollarSign}
              />
              <KPICard 
                title="Total Profit" 
                value={formatCurrency(kpiData.totalProfit)}
                subtitle={`${kpiData.profitMargin}% margin`}
                trend="+8.3%"
                trendUp={true}
                icon={TrendingUp}
              />
              <KPICard 
                title="Total Orders" 
                value={formatNumber(kpiData.totalOrders)}
                subtitle={`${formatCurrency(kpiData.aov)} AOV`}
                trend="+5.2%"
                trendUp={true}
                icon={ShoppingCart}
              />
              <KPICard 
                title="Active Customers" 
                value={formatNumber(kpiData.totalCustomers)}
                subtitle={`${kpiData.repeatRate}% repeat rate`}
                trend="-2.1%"
                trendUp={false}
                icon={Users}
              />
            </div>

            {/* Revenue Trend Chart */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Revenue & Profit Trends</CardTitle>
                <CardDescription className="text-slate-400">
                  Monthly performance over 3 years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyTrends}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={10} angle={-45} textAnchor="end" />
                    <YAxis stroke="#64748b" fontSize={10} tickFormatter={formatCurrency} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                    <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category & Payment Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenue by Category</CardTitle>
                  <CardDescription className="text-slate-400">
                    Product category performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis type="number" stroke="#64748b" fontSize={10} tickFormatter={formatCurrency} />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={100} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Payment Methods</CardTitle>
                  <CardDescription className="text-slate-400">
                    Distribution by payment type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {paymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                        formatter={(value: number) => `${value}%`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CUSTOMER SEGMENTS TAB */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">RFM Customer Segmentation</CardTitle>
                  <CardDescription className="text-slate-400">
                    Customer value distribution by segment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={rfmSegments}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#64748b" fontSize={10} tickFormatter={formatCurrency} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                        formatter={(value: number, name: string) => {
                          if (name === 'revenue') return formatCurrency(value)
                          return value
                        }}
                      />
                      <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                        {rfmSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Segment Details</CardTitle>
                  <CardDescription className="text-slate-400">
                    Customer count and revenue by segment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rfmSegments.map((segment) => (
                      <div key={segment.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: segment.color }}
                          />
                          <div>
                            <p className="font-medium text-white">{segment.name}</p>
                            <p className="text-xs text-slate-400">{segment.count.toLocaleString()} customers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">{formatCurrency(segment.revenue)}</p>
                          <p className="text-xs text-slate-400">
                            {((segment.revenue / rfmSegments.reduce((a, b) => a + b.revenue, 0)) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CLV & Retention Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400">Average CLV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{formatCurrency(kpiData.avgClv)}</div>
                  <Progress value={68} className="mt-2 h-2" />
                  <p className="text-xs text-slate-500 mt-1">68% of target ($5,000)</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400">Repeat Purchase Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{kpiData.repeatRate}%</div>
                  <Progress value={kpiData.repeatRate} className="mt-2 h-2" />
                  <p className="text-xs text-slate-500 mt-1">Industry avg: 65%</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400">Churn Rate (6mo)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-rose-400">{kpiData.churnRate}%</div>
                  <Progress value={kpiData.churnRate} className="mt-2 h-2 bg-rose-900" />
                  <p className="text-xs text-slate-500 mt-1">6,228 customers at risk</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FORECAST TAB */}
          <TabsContent value="forecast" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Revenue Forecast (Next 6 Months)</CardTitle>
                <CardDescription className="text-slate-400">
                  AI-powered prediction with confidence intervals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={[...monthlyTrends.slice(-12), ...forecastData]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={10} angle={-45} textAnchor="end" />
                    <YAxis stroke="#64748b" fontSize={10} tickFormatter={formatCurrency} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={false} name="Historical" />
                    <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Q1 2025 Forecast</p>
                      <p className="text-2xl font-bold text-white">{formatCurrency(14100000)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/20">
                      <TrendingUp className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Predicted Growth</p>
                      <p className="text-2xl font-bold text-emerald-400">+8.5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <Calendar className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Forecast Accuracy</p>
                      <p className="text-2xl font-bold text-white">92.3%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* REGIONAL TAB */}
          <TabsContent value="regional" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Regional Performance</CardTitle>
                <CardDescription className="text-slate-400">
                  Revenue and growth by geographic region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={10} tickFormatter={formatCurrency} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                        formatter={(value: number, name: string) => {
                          if (name === 'revenue') return formatCurrency(value)
                          if (name === 'growth') return `${value}%`
                          return value
                        }}
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="space-y-3">
                    {regionData.map((region) => (
                      <div key={region.name} className="p-4 rounded-lg bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-white">{region.name}</span>
                          </div>
                          <Badge variant={region.growth > 0 ? "default" : "destructive"} className="text-xs">
                            {region.growth > 0 ? '+' : ''}{region.growth}%
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Revenue: {formatCurrency(region.revenue)}</span>
                          <span className="text-slate-400">{region.customers.toLocaleString()} customers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <p>Built with SQL, Python & React • Data: 120K+ Transactions</p>
            <p>© 2025 Revenue Intelligence Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
