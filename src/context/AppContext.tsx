import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import { Task, Project, User, Status } from '../types';
import { Database } from '../lib/database.types';

interface AppContextType {
  tasks: Task[];
  projects: Project[];
  users: User[];
  currentUser: User | null;
  selectedStatus: Status | 'ALL';
  searchQuery: string;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  setSelectedStatus: (status: Status | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  getTasksByStatus: (status?: Status | 'ALL') => Task[];
  getFilteredTasks: () => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch current user's profile
  useEffect(() => {
    if (user) {
      const fetchCurrentUser = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching current user:', error);
          return;
        }

        if (data) {
          setCurrentUser({
            id: data.id,
            name: data.name,
            avatar: data.avatar_url,
          });
        }
      };

      fetchCurrentUser();
    }
  }, [user]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      if (data) {
        setUsers(data.map(profile => ({
          id: profile.id,
          name: profile.name,
          avatar: profile.avatar_url,
        })));
      }
    };

    fetchUsers();
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      if (data) {
        setProjects(data.map(project => ({
          id: project.id,
          name: project.name,
          description: project.description || '',
          tasks: [], // We'll populate this when fetching tasks
        })));
      }
    };

    fetchProjects();
  }, []);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      if (data) {
        setTasks(data.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description || '',
          type: task.type,
          priority: task.priority,
          status: task.status,
          assignedTo: task.assigned_to,
          createdAt: new Date(task.created_at!),
          updatedAt: new Date(task.updated_at!),
        })));

        // Update projects with task IDs
        const projectTaskMap = data.reduce((acc: Record<string, string[]>, task) => {
          if (task.project_id) {
            if (!acc[task.project_id]) {
              acc[task.project_id] = [];
            }
            acc[task.project_id].push(task.id);
          }
          return acc;
        }, {});

        setProjects(prev => prev.map(project => ({
          ...project,
          tasks: projectTaskMap[project.id] || [],
        })));
      }
    };

    fetchTasks();

    // Set up real-time subscription for tasks
    const tasksSubscription = supabase
      .channel('tasks_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tasks',
      }, async (payload) => {
        // Refresh tasks when changes occur
        await fetchTasks();
      })
      .subscribe();

    return () => {
      tasksSubscription.unsubscribe();
    };
  }, []);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .insert([{
        title: taskData.title,
        description: taskData.description,
        type: taskData.type,
        priority: taskData.priority,
        status: taskData.status,
        assigned_to: taskData.assignedTo,
        created_by: user.id,
      }]);

    if (error) throw error;
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId);

    if (error) throw error;
  };

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
  };

  const getTasksByStatus = (status: Status | 'ALL' = selectedStatus) => {
    if (status === 'ALL') return tasks;
    return tasks.filter((task) => task.status === status);
  };

  const getFilteredTasks = () => {
    const tasksByStatus = getTasksByStatus();
    
    if (!searchQuery) return tasksByStatus;
    
    return tasksByStatus.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const value = {
    tasks,
    projects,
    users,
    currentUser,
    selectedStatus,
    searchQuery,
    addTask,
    updateTask,
    deleteTask,
    setSelectedStatus,
    setSearchQuery,
    getTasksByStatus,
    getFilteredTasks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};