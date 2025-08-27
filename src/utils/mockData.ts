import { User, Project, Task, Analytics, Notification } from '../types';

export const MOCK_USERS: User[] = [
  {
    "id": "1",
    "name": "Hafiz Muhammad Faizan",
    "email": "thehmfpk@gmail.com",
    "password": "password123",
    "contactNumber": "+923274877206",
    "address": "Lahore, Pakistan",
    "bio": "Full Stack Developer passionate about creating amazing user experiences",
    "socialLinks": {
      "github": "https://github.com/faizanpk",
      "linkedin": "https://linkedin.com/in/faizanpk",
      "twitter": "https://twitter.com/faizanpk"
    }
  },
  {
    "id": "2",
    "name": "Huma",
    "email": "huma@gmail.com",
    "password": "password123",
    "contactNumber": "+923044594915",
    "address": "Lahore, Pakistan",
    "bio": "UI/UX Designer with a focus on modern design principles",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/huma",
      "website": "https://huma.design"
    }
  },
  {
    "id": "3",
    "name": "Sofia",
    "email": "sofia@gmail.com",
    "password": "password123",
    "contactNumber": "+923000000001",
    "address": "Lahore, Pakistan",
    "bio": "Project Manager specializing in agile methodologies",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/sofia",
      "facebook": "https://facebook.com/sofia"
    }
  }
];

const PROJECT_NAMES = [
  'E-Commerce Platform', 'Mobile Banking App', 'Healthcare Dashboard', 'Social Media Analytics',
  'CRM System', 'Inventory Management', 'Learning Management', 'Project Tracker',
  'Customer Support Portal', 'Real Estate Platform', 'Food Delivery App', 'Travel Booking',
  'HR Management System', 'Financial Dashboard', 'Marketing Automation', 'Event Management',
  'Content Management', 'Video Streaming Platform', 'IoT Monitoring', 'Chat Application',
  'Document Management', 'Supply Chain Tracker', 'Fitness Tracker', 'Recipe Manager',
  'Task Automation', 'Budget Planner', 'Weather Forecast', 'News Aggregator',
  'Music Streaming', 'Photo Gallery', 'Calendar Scheduler', 'Email Client',
  'File Storage System', 'Performance Analytics', 'Security Monitor', 'API Gateway',
  'Notification Service', 'User Authentication', 'Payment Gateway', 'Backup Service',
  'Log Analyzer', 'Database Monitor', 'Cache Manager', 'Load Balancer',
  'CI/CD Pipeline', 'Testing Framework', 'Documentation Portal', 'Code Repository',
  'Bug Tracker', 'Feature Flags'
];

const DESCRIPTIONS = [
  'A comprehensive solution for modern business needs',
  'Streamlined workflow management system',
  'User-friendly interface with advanced features',
  'Scalable architecture for enterprise use',
  'Mobile-first responsive design',
  'Real-time data synchronization',
  'Advanced analytics and reporting',
  'Secure and compliant platform',
  'Intuitive user experience design',
  'High-performance application'
];

const TAGS = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API'];

function generateTasksForProject(projectId: string, count: number): Task[] {
  const taskNames = [
    'Setup project structure', 'Design database schema', 'Implement authentication',
    'Create user interface', 'Add search functionality', 'Optimize performance',
    'Write unit tests', 'Deploy to staging', 'Security audit', 'Documentation'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${projectId}-task-${i}`,
    name: taskNames[i % taskNames.length] + ` ${Math.floor(i / taskNames.length) + 1}`,
    completed: Math.random() > 0.6,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
}

export function generateProjectsForUser(userId: string): Project[] {
  const statusOptions: Project['status'][] = ['planned', 'in-progress', 'on-hold', 'completed'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const progress = status === 'completed' ? 100 : 
                    status === 'planned' ? 0 : 
                    Math.floor(Math.random() * 80) + 10;
    
    const taskCount = Math.floor(Math.random() * 8) + 3;
    const tasks = generateTasksForProject(`${userId}-project-${i}`, taskCount);
    
    return {
      id: `${userId}-project-${i}`,
      userId,
      name: PROJECT_NAMES[i % PROJECT_NAMES.length] + (Math.floor(i / PROJECT_NAMES.length) > 0 ? ` ${Math.floor(i / PROJECT_NAMES.length) + 1}` : ''),
      status,
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
      tags: TAGS.slice(0, Math.floor(Math.random() * 4) + 1),
      tasks,
      progress,
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      owner: MOCK_USERS.find(u => u.id === userId)?.name || 'Unknown'
    };
  });
}

export function generateAnalyticsForUser(userId: string, projects: Project[]): Analytics {
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const onHoldProjects = projects.filter(p => p.status === 'on-hold').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0);
  
  return {
    userId,
    totalProjects: projects.length,
    completedProjects,
    onHoldProjects,
    inProgressProjects,
    earnings: Math.floor(Math.random() * 100000) + 50000,
    totalTasks
  };
}

export function generateNotificationsForUser(userId: string, projects: Project[]): Notification[] {
  const notifications: Notification[] = [];
  const types: Notification['type'][] = ['created', 'updated', 'completed', 'on-hold'];
  
  for (let i = 0; i < 10; i++) {
    const project = projects[Math.floor(Math.random() * projects.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    notifications.push({
      id: `${userId}-notification-${i}`,
      userId,
      type,
      title: `Project ${type}`,
      message: `${project.name} has been ${type}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: Math.random() > 0.3,
      projectId: project.id
    });
  }
  
  return notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}