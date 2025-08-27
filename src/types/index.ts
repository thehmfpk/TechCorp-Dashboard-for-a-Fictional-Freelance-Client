export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
  bio?: string;
  profilePicture?: string;
  socialLinks?: SocialLinks;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  status: 'planned' | 'in-progress' | 'on-hold' | 'completed';
  description: string;
  tags: string[];
  tasks: Task[];
  progress: number;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

export interface Task {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
}

export interface Analytics {
  userId: string;
  totalProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  inProgressProjects: number;
  earnings: number;
  totalTasks: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'created' | 'updated' | 'completed' | 'on-hold';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}