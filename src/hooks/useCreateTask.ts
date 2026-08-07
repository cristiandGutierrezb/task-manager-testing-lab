import { useState } from 'react';
import { createBug } from '../services/taskService';
import { Task } from '../types';

export function useCreateTask() {
  const [status, setStatus] =
    useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [tasks, setTasks] = useState<Task[]>([]);

  const submit = async (data: {
    title: string;
    module: string;
    priority: 'low' | 'medium' | 'high';
    description: string;
    expectedResult: string;
    actualResult: string;
  }) => {
    setStatus('loading');

    try {
      // Envía la información del formulario al servicio.
      const bug = await createBug(data);

      setTasks((prev) => [bug, ...prev]);

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const removeTask = (id: string) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === 'pending'
                  ? 'completed'
                  : 'pending',
            }
          : task
      )
    );
  };

  return {
    status,
    tasks,
    submit,
    removeTask,
    toggleTask,
  };
}