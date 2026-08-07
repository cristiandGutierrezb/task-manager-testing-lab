import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm - Accesibilidad', () => {
  it('el campo de título tiene un accessibilityLabel descriptivo', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const input = screen.getByTestId('input-titulo');
    expect(input).toHaveProp('accessibilityLabel', 'Título de la tarea');
  });

  it('el botón "Guardar" tiene el rol accesible de botón', async () => {
    await render(<TaskForm onSubmit={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveProp('accessibilityRole', 'button');
  });
});
