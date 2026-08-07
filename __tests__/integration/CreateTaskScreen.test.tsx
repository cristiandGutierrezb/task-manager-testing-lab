import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { http, HttpResponse } from 'msw';

import { CreateTaskScreen } from '../../src/screens/CreateTaskScreen';
import { server } from '../../src/mocks/server';

const metrics = {
  frame: {
    x: 0,
    y: 0,
    width: 390,
    height: 844,
  },
  insets: {
    top: 47,
    left: 0,
    right: 0,
    bottom: 34,
  },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <CreateTaskScreen />
    </SafeAreaProvider>
  );

describe('CreateTaskScreen - Integración', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  // Valida el registro exitoso de un bug con los datos principales del formulario.
  it('registra un bug exitosamente y muestra confirmación', async () => {
    renderScreen();

    fireEvent.changeText(
      screen.getByPlaceholderText('Título del bug'),
      'Reportar bug en Login'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Módulo'),
      'Login'
    );

    fireEvent.press(screen.getByText('Alta'));

    fireEvent.changeText(
      screen.getByPlaceholderText('Descripción del problema'),
      'El usuario no puede iniciar sesión'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Resultado esperado'),
      'El usuario debe ingresar correctamente'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Resultado obtenido'),
      'Se muestra error al iniciar sesión'
    );

    await act(async () => {
      fireEvent.press(screen.getByText('Guardar bug'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Bug registrado exitosamente')
      ).toBeTruthy();
    });

    expect(
      screen.getByText('Reportar bug en Login')
    ).toBeTruthy();
  });

  // Simula mediante MSW un error 500 al registrar el bug.
  it('muestra un mensaje de error cuando la API falla', async () => {
    server.use(
      http.post('https://api.taskmanager.com/bugs', () => {
        return HttpResponse.json(
          { message: 'Error interno del servidor' },
          { status: 500 }
        );
      })
    );

    renderScreen();

    fireEvent.changeText(
      screen.getByPlaceholderText('Título del bug'),
      'Validar módulo de pagos'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Módulo'),
      'Pagos'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Descripción del problema'),
      'Se presenta un error al procesar el pago'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Resultado esperado'),
      'El pago debe procesarse correctamente'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Resultado obtenido'),
      'El sistema muestra un error'
    );

    await act(async () => {
      fireEvent.press(screen.getByText('Guardar bug'));
    });

    await waitFor(() => {
      expect(
        screen.getByText('Error al registrar el bug')
      ).toBeTruthy();
    });

    expect(
      screen.queryByText('Validar módulo de pagos')
    ).toBeNull();
  });

  // Valida el estado inicial cuando todavía no existen bugs registrados.
  it('muestra el mensaje cuando no existen bugs registrados', () => {
    renderScreen();

    expect(
      screen.getByText('No hay bugs registrados')
    ).toBeTruthy();
  });
});