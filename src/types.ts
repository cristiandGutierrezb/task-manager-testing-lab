export type TaskStatus = 'pending' | 'completed';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  module: string;
  priority: Priority;
  description: string;
  expectedResult: string;
  actualResult: string;
  status: TaskStatus;
  createdAt?: string;
}