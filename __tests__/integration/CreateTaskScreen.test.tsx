import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { http, HttpResponse } from 'msw';
import { CreateTaskScreen } from '../../src/screens/CreateTaskScreen';
import { server } from '../../src/mocks/server';

const API_URL = 'https://api.taskmanager.com';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CreateTaskScreen />
    </SafeAreaProvider>
  );

describe('CreateTaskScreen - Integración', () => {
  it('crea una tarea exitosamente y muestra confirmación', async () => {
    await renderScreen();

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Estudiar pruebas de integración'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(screen.getByText('Tarea creada exitosamente')).toBeTruthy();
    });
  });

  it('carga y muestra las tareas existentes obtenidas de la API (éxito)', async () => {
    // Usa el handler por defecto de MSW (GET /tasks devuelve 2 tareas fijas).
    await renderScreen();

    await waitFor(() => {
      expect(screen.getByText('Tarea existente')).toBeTruthy();
      expect(screen.getByText('Otra tarea')).toBeTruthy();
    });
  });

  it('muestra un mensaje de error cuando la API falla al cargar las tareas', async () => {
    // Se sobreescribe el handler de GET /tasks solo para este test, simulando
    // una falla del backend real sin depender de red de verdad.
    server.use(
      http.get(`${API_URL}/tasks`, () => HttpResponse.json({ error: 'fallo' }, { status: 500 }))
    );

    await renderScreen();

    await waitFor(() => {
      expect(screen.getByText('No se pudieron cargar las tareas')).toBeTruthy();
    });
  });

  it('muestra el estado de lista vacía cuando la API no devuelve tareas', async () => {
    // Se sobreescribe el handler de GET /tasks para simular una cuenta nueva
    // sin tareas creadas todavía.
    server.use(http.get(`${API_URL}/tasks`, () => HttpResponse.json([])));

    await renderScreen();

    await waitFor(() => {
      expect(screen.getByText('No hay tareas aún')).toBeTruthy();
    });
  });

  it('elimina una tarea al confirmar el diálogo (éxito, handler DELETE nuevo)', async () => {
    // Usa el handler por defecto de MSW para DELETE /tasks/:id (devuelve 204).
    await renderScreen();

    await waitFor(() => {
      expect(screen.getByText('Tarea existente')).toBeTruthy();
    });

    await fireEvent.press(screen.getAllByText('Eliminar')[0]);
    await fireEvent.press(screen.getByLabelText('Confirmar eliminación'));

    await waitFor(() => {
      expect(screen.queryByText('Tarea existente')).toBeNull();
    });
  });

  it('muestra un error y conserva la tarea cuando la API falla al eliminarla', async () => {
    // Se sobreescribe el handler de DELETE /tasks/:id para simular una falla
    // del backend real al intentar borrar.
    server.use(
      http.delete(`${API_URL}/tasks/:id`, () =>
        HttpResponse.json({ error: 'fallo' }, { status: 500 })
      )
    );

    await renderScreen();

    await waitFor(() => {
      expect(screen.getByText('Tarea existente')).toBeTruthy();
    });

    await fireEvent.press(screen.getAllByText('Eliminar')[0]);
    await fireEvent.press(screen.getByLabelText('Confirmar eliminación'));

    await waitFor(() => {
      expect(screen.getByText('No se pudo eliminar la tarea')).toBeTruthy();
    });
    expect(screen.getByText('Tarea existente')).toBeTruthy();
  });
});
