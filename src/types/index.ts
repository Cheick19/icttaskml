export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskType = 'SYSTEM' | 'SERVER' | 'BUG' | 'DATABASE' | 'CODE' | 'SECURITY' | 'NETWORK' | 'OTHER';

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: Priority;
  status: Status;
  projectId?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: string[]; // Task IDs
}