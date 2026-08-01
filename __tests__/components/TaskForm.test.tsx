import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm', () => {
  it('llama a onSubmit con el título ingresado al presionar "Guardar"', async () => {
    // Se aísla onSubmit: aquí solo interesa el comportamiento del formulario,
    // no qué hace el padre con el título.
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Mi nueva tarea'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith('Mi nueva tarea');
  });

  it('no llama a onSubmit si el campo está vacío', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('permite ubicar el input por testID y el botón por su rol de accesibilidad', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(screen.getByTestId('input-titulo'), 'Otra tarea');
    await fireEvent.press(screen.getByRole('button'));

    expect(mockOnSubmit).toHaveBeenCalledWith('Otra tarea');
  });
});
