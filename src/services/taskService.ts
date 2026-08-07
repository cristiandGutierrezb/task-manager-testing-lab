import { Task } from '../types';

const API_URL = 'https://api.taskmanager.com';

interface BugData {
  title: string;
  module: string;
  priority: 'low' | 'medium' | 'high';
  description: string;
  expectedResult: string;
  actualResult: string;
}

let localTasks: Task[] = [];

export async function fetchTasks(): Promise<Task[]> {
  return localTasks;
}

export async function createBug(data: BugData): Promise<Task> {
  // Durante las pruebas Jest se utiliza MSW
  if (process.env.NODE_ENV === 'test') {
    const res = await fetch(`${API_URL}/bugs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error al registrar el bug');
    }

    return res.json();
  }

  // En Expo se registra localmente porque no existe una API real
  const bug: Task = {
    id: Date.now().toString(),
    title: data.title,
    module: data.module,
    priority: data.priority,
    description: data.description,
    expectedResult: data.expectedResult,
    actualResult: data.actualResult,
    status: 'pending',
  };

  localTasks = [bug, ...localTasks];

  return bug;
}