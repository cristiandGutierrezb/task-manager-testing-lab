import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm - Accesibilidad', () => {

  it('el campo de título tiene una etiqueta accesible', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByLabelText('Título del bug');

    expect(input).toBeTruthy();
  });

  it('el botón Guardar tiene un rol accesible', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const saveButton = screen.getByRole('button', {
      name: 'Guardar bug',
    });

    expect(saveButton).toBeTruthy();
  });

});