import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useData } from '../../contexts/DataContext';
import Card from '../ui/Card';

const AnalyticsCharts: React.FC = () => {
  const { projects, analytics } = useData();

  // Generate chart data
  const monthlyData = React.useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = months.map((month, index) => ({
      month,
      projects: Math.floor(Math.random() * 20) + 5,
      earnings: Math.floor(Math.random() * 10000) + 5000,
      tasks: Math.floor(Math.random() * 50) + 20,
    }));
    return data;
  }, []);

  const statusData = React.useMemo(() => {
    if (!analytics) return [];
    return [
      { name: 'Completed', value: analytics.completedProjects, color: '#10B981' },
      { name: 'In Progress', value: analytics.inProgressProjects, color: '#3B82F6' },
      { name: 'On Hold', value: analytics.onHoldProjects, color: '#F59E0B' },
      { name: 'Planned', value: analytics.totalProjects - analytics.completedProjects - analytics.inProgressProjects - analytics.onHoldProjects, color: '#6B7280' },
    ].filter(item => item.value > 0);
  }, [analytics]);

  const recentActivity = React.useMemo(() => {
    return projects
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 7)
      .map((project, index) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] || `Day ${index + 1}`,
        activity: Math.floor(Math.random() * 30) + 10,
      }));
  }, [projects]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Project Trends */}
      <Card className="col-span-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Project Trends</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly project completion trends</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="projectGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(31 41 55)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Area
              type="monotone"
              dataKey="projects"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#projectGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Project Status Distribution */}
      <Card className="col-span-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Project Status</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Distribution by status</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(31 41 55)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Earnings Overview */}
      <Card className="col-span-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Earnings Overview</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly earnings tracking</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(31 41 55)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value) => [`$${value}`, 'Earnings']}
            />
            <Bar dataKey="earnings" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Activity Timeline */}
      <Card className="col-span-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly Activity</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Daily activity levels</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={recentActivity}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="day" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(31 41 55)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Area
              type="monotone"
              dataKey="activity"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#activityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;