import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project, Analytics, Notification } from '../types';
import { useAuth } from './AuthContext';
import { generateProjectsForUser, generateAnalyticsForUser, generateNotificationsForUser } from '../utils/mockData';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface DataState {
  projects: Project[];
  analytics: Analytics | null;
  notifications: Notification[];
  addProject: (project: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateAnalytics: (updates: Partial<Analytics>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'userId' | 'timestamp'>) => void;
}

const DataContext = createContext<DataState | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setProjects([]);
      setAnalytics(null);
      setNotifications([]);
      return;
    }

    // Load or generate data for the current user
    const savedProjects = storage.get(`${STORAGE_KEYS.PROJECTS}_${user.id}`);
    const savedAnalytics = storage.get(`${STORAGE_KEYS.ANALYTICS}_${user.id}`);
    const savedNotifications = storage.get(`${STORAGE_KEYS.NOTIFICATIONS}_${user.id}`);

    let userProjects = savedProjects;
    if (!userProjects) {
      userProjects = generateProjectsForUser(user.id);
      storage.set(`${STORAGE_KEYS.PROJECTS}_${user.id}`, userProjects);
    }

    let userAnalytics = savedAnalytics;
    if (!userAnalytics) {
      userAnalytics = generateAnalyticsForUser(user.id, userProjects);
      storage.set(`${STORAGE_KEYS.ANALYTICS}_${user.id}`, userAnalytics);
    }

    let userNotifications = savedNotifications;
    if (!userNotifications) {
      userNotifications = generateNotificationsForUser(user.id, userProjects);
      storage.set(`${STORAGE_KEYS.NOTIFICATIONS}_${user.id}`, userNotifications);
    }

    setProjects(userProjects);
    setAnalytics(userAnalytics);
    setNotifications(userNotifications);
  }, [user, isAuthenticated]);

  const addProject = (projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    const newProject: Project = {
      ...projectData,
      id: `${user.id}-project-${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    storage.set(`${STORAGE_KEYS.PROJECTS}_${user.id}`, updatedProjects);

    // Update analytics
    if (analytics) {
      const updatedAnalytics = {
        ...analytics,
        totalProjects: analytics.totalProjects + 1,
        totalTasks: analytics.totalTasks + newProject.tasks.length,
      };
      setAnalytics(updatedAnalytics);
      storage.set(`${STORAGE_KEYS.ANALYTICS}_${user.id}`, updatedAnalytics);
    }

    // Add notification
    addNotification({
      type: 'created',
      title: 'Project Created',
      message: `${newProject.name} has been created`,
      read: false,
      projectId: newProject.id,
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    if (!user) return;

    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    );

    setProjects(updatedProjects);
    storage.set(`${STORAGE_KEYS.PROJECTS}_${user.id}`, updatedProjects);

    // Update analytics if status changed
    if (updates.status && analytics) {
      const updatedAnalytics = generateAnalyticsForUser(user.id, updatedProjects);
      setAnalytics(updatedAnalytics);
      storage.set(`${STORAGE_KEYS.ANALYTICS}_${user.id}`, updatedAnalytics);
    }

    // Add notification for status changes
    if (updates.status) {
      const project = projects.find(p => p.id === id);
      if (project) {
        addNotification({
          type: updates.status === 'completed' ? 'completed' : 
                updates.status === 'on-hold' ? 'on-hold' : 'updated',
          title: 'Project Updated',
          message: `${project.name} status changed to ${updates.status}`,
          read: false,
          projectId: id,
        });
      }
    }
  };

  const deleteProject = (id: string) => {
    if (!user) return;

    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    storage.set(`${STORAGE_KEYS.PROJECTS}_${user.id}`, updatedProjects);

    // Update analytics
    if (analytics) {
      const updatedAnalytics = generateAnalyticsForUser(user.id, updatedProjects);
      setAnalytics(updatedAnalytics);
      storage.set(`${STORAGE_KEYS.ANALYTICS}_${user.id}`, updatedAnalytics);
    }
  };

  const updateAnalytics = (updates: Partial<Analytics>) => {
    if (!analytics || !user) return;

    const updatedAnalytics = { ...analytics, ...updates };
    setAnalytics(updatedAnalytics);
    storage.set(`${STORAGE_KEYS.ANALYTICS}_${user.id}`, updatedAnalytics);
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'userId' | 'timestamp'>) => {
    if (!user) return;

    const newNotification: Notification = {
      ...notificationData,
      id: `${user.id}-notification-${Date.now()}`,
      userId: user.id,
      timestamp: new Date().toISOString(),
    };

    const updatedNotifications = [newNotification, ...notifications].slice(0, 20); // Keep only latest 20
    setNotifications(updatedNotifications);
    storage.set(`${STORAGE_KEYS.NOTIFICATIONS}_${user.id}`, updatedNotifications);
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    if (user) {
      storage.set(`${STORAGE_KEYS.NOTIFICATIONS}_${user.id}`, updatedNotifications);
    }
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    if (user) {
      storage.set(`${STORAGE_KEYS.NOTIFICATIONS}_${user.id}`, updatedNotifications);
    }
  };

  const value: DataState = {
    projects,
    analytics,
    notifications,
    addProject,
    updateProject,
    deleteProject,
    updateAnalytics,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};