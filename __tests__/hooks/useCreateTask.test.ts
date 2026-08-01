import { renderHook, act } from '@testing-library/react-native';
import { useCreateTask } from '../../src/hooks/useCreateTask';
import { createTask } from '../../src/services/taskService';

// Se mockea taskService para aislar el hook de la implementación real del
// servicio: hoy createTask nunca falla (crea la tarea localmente), y sin
// mockearlo no habría forma de ejercitar la rama de error del hook.
jest.mock('../../src/services/taskService');

const mockedCreateTask = createTask as jest.MockedFunction<typeof createTask>;

describe('useCreateTask', () => {
  beforeEach(() => {
    mockedCreateTask.mockReset();
  });

  it('inicia con status "idle" y sin tareas', async () => {
    const { result } = await renderHook(() => useCreateTask());
    expect(result.current.status).toBe('idle');
    expect(result.current.tasks).toEqual([]);
  });

  it('pasa a "success" y agrega la tarea cuando submit resuelve correctamente', async () => {
    const nuevaTarea = { id: '1', title: 'Comprar leche', status: 'pending' as const };
    mockedCreateTask.mockResolvedValueOnce(nuevaTarea);
    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Comprar leche');
    });

    expect(result.current.status).toBe('success');
    expect(result.current.tasks).toEqual([nuevaTarea]);
  });

  it('pasa a "error" cuando submit falla', async () => {
    mockedCreateTask.mockRejectedValueOnce(new Error('fallo de red'));
    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Comprar leche');
    });

    expect(result.current.status).toBe('error');
    expect(result.current.tasks).toEqual([]);
  });

  it('elimina una tarea por id con removeTask', async () => {
    const tarea = { id: '1', title: 'Comprar leche', status: 'pending' as const };
    mockedCreateTask.mockResolvedValueOnce(tarea);
    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Comprar leche');
    });
    await act(async () => {
      result.current.removeTask('1');
    });

    expect(result.current.tasks).toEqual([]);
  });
});
