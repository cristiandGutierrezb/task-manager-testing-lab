import { renderHook, act } from '@testing-library/react-native';
import { useCreateTask } from '../../src/hooks/useCreateTask';
import { createTask } from '../../src/services/taskService';

/*Aqui se utiliza un mock para simular el servicio createTask y aislar el hook
de la implementación real. De esta forma se puede comprobar el comportamiento
de useCreateTask tanto en un caso exitoso como cuando ocurre un error.*/

jest.mock('../../src/services/taskService');
jest.mock('../../src/services/taskService', () => ({
  createTask: jest.fn(),
}));

describe('useCreateTask', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('iniciar con el estado idle y sin tareas', () => {

    const { result } = renderHook(() => useCreateTask());
    expect(result.current.status).toBe('idle');
    expect(result.current.tasks).toEqual([]);

  });

  it(' crear una tarea correctamente', async () => {
     
    (createTask as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Comprar leche',
      status: 'pending',
    });

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Comprar leche');
    });

    expect(result.current.status).toBe('success');
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Comprar leche');

  });

  it('debe cambiar el estado a error cuando el servicio falla', async () => {

    (createTask as jest.Mock).mockRejectedValue(
      new Error('Error al crear la tarea')
    );

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Comprar leche');
    });

    expect(result.current.status).toBe('error');
    expect(result.current.tasks).toEqual([]);

  });

  it('debe eliminar una tarea de la lista', async () => {

    (createTask as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Comprar leche',
      status: 'pending',
    });

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Comprar leche');
    });

    expect(result.current.tasks).toHaveLength(1);

    act(() => {
      result.current.removeTask('1');
    });

    expect(result.current.tasks).toHaveLength(0);

  });

});