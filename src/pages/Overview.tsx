import React, { useState } from 'react';
import { TrendingUp, Folder, CheckCircle, Clock, DollarSign, ListTodo, Settings, Edit2, Activity, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import AnalyticsCharts from '../components/charts/AnalyticsCharts';
import { formatCurrency, formatRelativeTime } from '../utils/formatters';

const Overview: React.FC = () => {
  const { analytics, updateAnalytics, projects, notifications } = useData();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    totalProjects: analytics?.totalProjects || 0,
    completedProjects: analytics?.completedProjects || 0,
    onHoldProjects: analytics?.onHoldProjects || 0,
    inProgressProjects: analytics?.inProgressProjects || 0,
    earnings: analytics?.earnings || 0,
    totalTasks: analytics?.totalTasks || 0,
  });

  const summaryCards = [
    {
      title: 'Total Projects',
      value: analytics?.totalProjects || 0,
      icon: Folder,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Completed',
      value: analytics?.completedProjects || 0,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'On Hold',
      value: analytics?.onHoldProjects || 0,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'In Progress',
      value: analytics?.inProgressProjects || 0,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Earnings',
      value: formatCurrency(analytics?.earnings || 0),
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Total Tasks',
      value: analytics?.totalTasks || 0,
      icon: ListTodo,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  const recentActivity = notifications.slice(0, 8).map(notification => {
    const project = projects.find(p => p.id === notification.projectId);
    return {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      time: formatRelativeTime(notification.timestamp),
      projectName: project?.name || 'Unknown Project',
      icon: notification.type === 'completed' ? CheckCircle : 
            notification.type === 'on-hold' ? Clock :
            notification.type === 'created' ? Folder : Edit2,
    };
  });

  const handleEditAnalytics = () => {
    setEditData({
      totalProjects: analytics?.totalProjects || 0,
      completedProjects: analytics?.completedProjects || 0,
      onHoldProjects: analytics?.onHoldProjects || 0,
      inProgressProjects: analytics?.inProgressProjects || 0,
      earnings: analytics?.earnings || 0,
      totalTasks: analytics?.totalTasks || 0,
    });
    setShowEditModal(true);
  };

  const handleSaveAnalytics = () => {
    updateAnalytics(editData);
    setShowEditModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button
          onClick={handleEditAnalytics}
          variant="outline"
          className="mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Settings className="h-4 w-4" />
          <span>Edit Analytics</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <Card 
            key={card.title} 
            className={`${card.bgColor} border-0 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} shadow-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Analytics Overview
        </h2>
        <AnalyticsCharts />
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Activity
          </h2>
        </div>
        
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <activity.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.projectName}
                  </p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-500">
                  {activity.time}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Analytics Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Analytics"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Total Projects"
              type="number"
              value={editData.totalProjects.toString()}
              onChange={(e) => setEditData({ ...editData, totalProjects: parseInt(e.target.value) || 0 })}
              min="0"
            />
            <Input
              label="Completed Projects"
              type="number"
              value={editData.completedProjects.toString()}
              onChange={(e) => setEditData({ ...editData, completedProjects: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="In Progress"
              type="number"
              value={editData.inProgressProjects.toString()}
              onChange={(e) => setEditData({ ...editData, inProgressProjects: parseInt(e.target.value) || 0 })}
              min="0"
            />
            <Input
              label="On Hold"
              type="number"
              value={editData.onHoldProjects.toString()}
              onChange={(e) => setEditData({ ...editData, onHoldProjects: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Earnings ($)"
              type="number"
              value={editData.earnings.toString()}
              onChange={(e) => setEditData({ ...editData, earnings: parseInt(e.target.value) || 0 })}
              min="0"
            />
            <Input
              label="Total Tasks"
              type="number"
              value={editData.totalTasks.toString()}
              onChange={(e) => setEditData({ ...editData, totalTasks: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSaveAnalytics} className="flex-1">
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowEditModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Overview;