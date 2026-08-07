import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';

const mockTask = {
  id: '1',
  title: 'Estudiar React Native con Testing Library',
  status: 'pending' as const,
};

const mockOnDelete = jest.fn();
const mockOnToggle = jest.fn();

describe('TaskCard', () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnToggle.mockClear();
  });

  it('muestra el título de la tarea', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />
    );

    expect(
      screen.getByText('Estudiar React Native con Testing Library')
    ).toBeTruthy();
  });

  it('muestra el estado "Pendiente" para tareas pendientes', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('○ Pendiente')).toBeTruthy();
  });

  it('muestra el estado "Completada" para tareas completadas', () => {
    const completedTask = {
      ...mockTask,
      status: 'completed' as const,
    };

    render(
      <TaskCard
        task={completedTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />
    );

    expect(screen.getByText('✓ Completada')).toBeTruthy();
  });

  it('llama a onDelete con el id correcto al presionar "Eliminar"', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />
    );

    fireEvent.press(screen.getByText('Eliminar'));

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('llama a onToggle al presionar el estado de la tarea', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />
    );

    fireEvent.press(screen.getByText('○ Pendiente'));

    expect(mockOnToggle).toHaveBeenCalledWith('1');
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});