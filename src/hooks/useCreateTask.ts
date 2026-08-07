import { useEffect, useState } from 'react';
import { createTask, deleteTask, fetchTasks } from '../services/taskService';
import { Task } from '../types';

export function useCreateTask() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Carga las tareas existentes desde la API al montar la pantalla.
  useEffect(() => {
    fetchTasks()
      .then((fetched) => setTasks(fetched))
      .catch(() => setLoadError('No se pudieron cargar las tareas'));
  }, []);

  const submit = async (title: string) => {
    setStatus('loading');
    try {
      const task = await createTask(title);
      setTasks((prev) => [task, ...prev]);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const removeTask = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setDeleteError('No se pudo eliminar la tarea');
    }
  };

  return { status, tasks, loadError, deleteError, submit, removeTask };
}
