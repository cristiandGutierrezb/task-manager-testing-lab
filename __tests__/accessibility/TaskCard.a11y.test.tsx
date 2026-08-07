import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';

const mockTask = {
  id: '1',
  title: 'Estudiar accesibilidad',
  module: 'Login',
  priority: 'medium' as const,
  description: 'Validar accesibilidad del componente',
  expectedResult: 'El lector de pantalla debe identificar los controles',
  actualResult: 'Los controles son identificados correctamente',
  status: 'pending' as const,
};

describe('TaskCard - Accesibilidad', () => {

  // Verifica que el botón de eliminar tenga una etiqueta descriptiva
  // que pueda ser anunciada por un lector de pantalla.
  it('el botón de eliminar tiene un accessibilityLabel descriptivo', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={jest.fn()}
        onToggle={jest.fn()}
      />
    );

    const deleteButton = screen.getByLabelText(
      'Eliminar tarea Estudiar accesibilidad'
    );

    expect(deleteButton).toBeTruthy();
  });

  // Verifica que el estado actual de la tarea pueda ser identificado
  // por el usuario mediante el texto mostrado en pantalla.
  it('el estado de la tarea es anunciado al lector de pantalla', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={jest.fn()}
        onToggle={jest.fn()}
      />
    );

    expect(screen.getByText('○ Pendiente')).toBeTruthy();
  });

});