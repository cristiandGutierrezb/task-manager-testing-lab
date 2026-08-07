import { http, HttpResponse } from 'msw';
import { Task } from '../types';

const API_URL = 'https://api.taskmanager.com';

let tasks: Task[] = [];

// Limpia los datos después de cada prueba
export const resetTasks = () => {
  tasks = [];
};

export const handlers = [

  // Handler existente para crear una tarea básica
  http.post(`${API_URL}/tasks`, async ({ request }) => {
    const { title } = (await request.json()) as {
      title: string;
    };

    const task: Task = {
      id: String(tasks.length + 1),
      title,
      module: '',
      priority: 'medium',
      description: '',
      expectedResult: '',
      actualResult: '',
      status: 'pending',
    };

    tasks.push(task);

    return HttpResponse.json(task, {
      status: 201,
    });
  }),

  // Handler existente para consultar las tareas
  http.get(`${API_URL}/tasks`, () => {
    return HttpResponse.json(tasks);
  }),

  // Nuevo handler para registrar un bug con información completa
  http.post(`${API_URL}/bugs`, async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      module: string;
      priority: 'low' | 'medium' | 'high';
      description: string;
      expectedResult: string;
      actualResult: string;
    };

    const bug: Task = {
      id: String(tasks.length + 1),
      title: body.title,
      module: body.module,
      priority: body.priority,
      description: body.description,
      expectedResult: body.expectedResult,
      actualResult: body.actualResult,
      status: 'pending',
    };

    tasks.push(bug);

    return HttpResponse.json(bug, {
      status: 201,
    });
  }),
];