import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ConfirmDeleteDialog } from '../../src/components/ConfirmDeleteDialog';

const noop = () => {};

describe('ConfirmDeleteDialog', () => {
  it('muestra el texto "Eliminar tarea" cuando el diálogo está visible', async () => {
    await render(
      <ConfirmDeleteDialog visible taskTitle="Estudiar" onConfirm={noop} onCancel={noop} />
    );
    expect(screen.getByText('Eliminar tarea')).toBeTruthy();
  });

  it('muestra el texto "¿Seguro que quieres eliminar `Cocinar`?" cuando el diálogo está visible', async () => {
    await render(
      <ConfirmDeleteDialog visible taskTitle="Cocinar" onConfirm={noop} onCancel={noop} />
    );
    expect(screen.getByText(`¿Seguro que quieres eliminar "Cocinar"? Esta acción no se puede deshacer.`)).toBeTruthy();
  });

  it('no renderiza el contenido del diálogo cuando visible es false', async () => {
    await render(
      <ConfirmDeleteDialog visible={false} taskTitle="Estudiar" onConfirm={noop} onCancel={noop} />
    );
    expect(screen.queryByText('Eliminar tarea')).toBeNull();
  });

  it('llama a onConfirm al presionar "Eliminar"', async () => {
    // Se aísla onConfirm: el diálogo solo debe avisar que se confirmó,
    // la lógica real de borrado no le compete a este componente.
    const onConfirm = jest.fn();
    await render(
      <ConfirmDeleteDialog visible taskTitle="Estudiar" onConfirm={onConfirm} onCancel={noop} />
    );
    await fireEvent.press(screen.getByLabelText('Confirmar eliminación'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('llama a onCancel al presionar "Cancelar"', async () => {
    const onCancel = jest.fn();
    await render(
      <ConfirmDeleteDialog visible taskTitle="Estudiar" onConfirm={noop} onCancel={onCancel} />
    );
    await fireEvent.press(screen.getByLabelText('Cancelar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
