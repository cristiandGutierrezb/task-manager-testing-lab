import { TaskSchema, TaskListSchema, DeleteTaskErrorSchema } from '../../src/schemas/taskSchema';

describe('API Contract - Tasks', () => {
  it('la respuesta de GET /tasks cumple con el esquema esperado', () => {
    const apiResponse = [
      { id: '1', title: 'Tarea 1', status: 'pending' },
      { id: '2', title: 'Tarea 2', status: 'completed' },
    ];
    const result = TaskListSchema.safeParse(apiResponse);
    expect(result.success).toBe(true);
  });

  it('detecta cuando la API devuelve un campo con tipo incorrecto', () => {
    const invalidResponse = { id: 123, title: 'Test', status: 'pending' };
    const result = TaskSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('detecta cuando la API omite un campo requerido', () => {
    const incompleteResponse = { id: '1', status: 'pending' };
    const result = TaskSchema.safeParse(incompleteResponse);
    expect(result.success).toBe(false);
  });

  it('detecta cuando la API envía un status inválido', () => {
    const invalidStatus = { id: '1', title: 'Test', status: 'archived' };
    const result = TaskSchema.safeParse(invalidStatus);
    expect(result.success).toBe(false);
  });

  it('el cuerpo de error de DELETE /tasks/:id cumple con el esquema esperado', () => {
    // DELETE /tasks/:id responde 204 sin cuerpo en éxito; el contrato con
    // campos y tipos reales está en la respuesta de error (Actividad 4).
    const errorResponse = { error: 'No se pudo eliminar la tarea' };
    const result = DeleteTaskErrorSchema.safeParse(errorResponse);
    expect(result.success).toBe(true);
  });

  it('detecta cuando el error de DELETE /tasks/:id no tiene el campo error', () => {
    const invalidError = { message: 'No se pudo eliminar la tarea' };
    const result = DeleteTaskErrorSchema.safeParse(invalidError);
    expect(result.success).toBe(false);
  });
});
