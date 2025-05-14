import { Task, User, Project } from '../types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'user3',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
];

export const tasks: Task[] = [
  {
    id: 'task1',
    title: 'System Update',
    description: 'System update action maintenance.',
    type: 'SYSTEM',
    priority: 'LOW',
    status: 'TODO',
    assignedTo: 'user1',
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-04-01'),
  },
  {
    id: 'task2',
    title: 'Server Setup',
    description: 'Proconfigure system deployment.',
    type: 'SERVER',
    priority: 'HIGH',
    status: 'TODO',
    assignedTo: 'user2',
    createdAt: new Date('2023-04-02'),
    updatedAt: new Date('2023-04-02'),
  },
  {
    id: 'task3',
    title: 'Bug Fixing',
    description: 'Bug fixes prenienics problems.',
    type: 'BUG',
    priority: 'HIGH',
    status: 'TODO',
    assignedTo: 'user3',
    createdAt: new Date('2023-04-03'),
    updatedAt: new Date('2023-04-04'),
  },
  {
    id: 'task4',
    title: 'Database Migration',
    description: 'Integrate migration processes.',
    type: 'DATABASE',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignedTo: 'user2',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-06'),
  },
  {
    id: 'task5',
    title: 'Code Review',
    description: 'Received service issue.',
    type: 'CODE',
    priority: 'LOW',
    status: 'DONE',
    assignedTo: 'user1',
    createdAt: new Date('2023-04-07'),
    updatedAt: new Date('2023-04-09'),
  },
  {
    id: 'task6',
    title: 'Security Audit',
    description: 'Security audit confirmed.',
    type: 'SECURITY',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignedTo: 'user3',
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-04-11'),
  },
];

export const projects: Project[] = [
  {
    id: 'project1',
    name: 'Network Infrastructure',
    description: 'Upgrade network infrastructure for HQ',
    tasks: ['task1', 'task2'],
  },
  {
    id: 'project2',
    name: 'CRM System',
    description: 'Customer relationship management system development',
    tasks: ['task3', 'task4', 'task5'],
  },
  {
    id: 'project3',
    name: 'Security Implementation',
    description: 'Implement security measures across systems',
    tasks: ['task6'],
  },
];