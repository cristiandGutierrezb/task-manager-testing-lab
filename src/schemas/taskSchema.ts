import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  status: z.enum(['pending', 'completed']),
  createdAt: z.string().datetime().optional(),
});

export const TaskListSchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;

// Contrato del cuerpo de error de DELETE /tasks/:id (Actividad 4). El caso
// de éxito de ese endpoint responde 204 sin cuerpo, así que no hay nada que
// validar con Zod ahí; el contrato real con campos y tipos vive en el error.
export const DeleteTaskErrorSchema = z.object({
  error: z.string(),
});

export type DeleteTaskError = z.infer<typeof DeleteTaskErrorSchema>;
