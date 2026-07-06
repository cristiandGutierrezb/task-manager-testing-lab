import { useState } from 'react';
import { createTask } from '../services/taskService';

export function useCreateTask() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (title: string) => {
    setStatus('loading');
    try {
      await createTask(title);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return { status, submit };
}
