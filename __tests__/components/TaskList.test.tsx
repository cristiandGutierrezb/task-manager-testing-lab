import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskList } from '../../src/components/TaskList';

const mockTask = { id: '1', title: 'Tarea 1', status: 'pending' as const };
const anotherTask = { id: '2', title: 'Tarea 2', status: 'completed' as const };

describe('TaskList', () => {
  it('muestra un mensaje cuando la lista está vacía', async () => {
    await render(<TaskList tasks={[]} />);
    expect(screen.getByText('No hay tareas aún')).toBeTruthy();
  });

  it('no muestra el mensaje de lista vacía cuando hay tareas', async () => {
    await render(<TaskList tasks={[mockTask]} />);
    expect(screen.queryByText('No hay tareas aún')).toBeNull();
  });

  it('muestra el contador de tareas correctamente', async () => {
    await render(<TaskList tasks={[mockTask, anotherTask]} />);
    expect(screen.getByText('2 tareas')).toBeTruthy();
  });

  it('llama a onDelete con el id correcto al presionar "Eliminar" de una tarea de la lista', async () => {
    // Se aísla onDelete: a TaskList no le importa qué hace el padre con el id,
    // solo que se lo pase correctamente al eliminar una tarjeta.
    const mockOnDelete = jest.fn();
    await render(<TaskList tasks={[mockTask, anotherTask]} onDelete={mockOnDelete} />);

    await fireEvent.press(screen.getAllByText('Eliminar')[0]);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});
