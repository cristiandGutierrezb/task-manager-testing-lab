import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';
import { TaskList } from '@/components/TaskList';

describe('TaskForm', () => {

  it('llama a onSubmit con el título ingresado al presionar "Guardar"', () => {
    const mockOnSubmit = jest.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Mi nueva tarea'
    );

    fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith('Mi nueva tarea');
  });

  it('no llama a onSubmit si el campo está vacío', () => {
    const mockOnSubmit = jest.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('muestra el campo de texto vacío al iniciar', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByPlaceholderText(
      'Escribe el título de la tarea'
    );

    expect(input.props.value).toBe('');
  });

  it('muestra el texto ingresado en el campo', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByPlaceholderText(
      'Escribe el título de la tarea'
    );

    fireEvent.changeText(input, 'Comprar leche');

    expect(input.props.value).toBe('Comprar leche');
  });

  it('permite modificar el texto varias veces antes de guardar', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input = screen.getByPlaceholderText(
      'Escribe el título de la tarea'
    );

    fireEvent.changeText(input, 'Comprar');
    expect(input.props.value).toBe('Comprar');

    fireEvent.changeText(input, 'Comprar leche');
    expect(input.props.value).toBe('Comprar leche');
  });

});

describe('TaskList', () => {

  it('muestra el contador "1 tarea" cuando existe una sola tarea', () => {
    const task = {
      id: '1',
      title: 'Comprar leche',
      status: 'pending' as const,
    };

    render(<TaskList tasks={[task]} />);

    expect(screen.getByText('1 tarea')).toBeTruthy();
  });

  it('muestra el título de las tareas en la lista', () => {
    const tasks = [
      {
        id: '1',
        title: 'Comprar leche',
        status: 'pending' as const,
      },
      {
        id: '2',
        title: 'Estudiar Jest',
        status: 'completed' as const,
      },
    ];

    render(<TaskList tasks={tasks} />);

    expect(screen.getByText('Comprar leche')).toBeTruthy();
    expect(screen.getByText('Estudiar Jest')).toBeTruthy();
  });

});