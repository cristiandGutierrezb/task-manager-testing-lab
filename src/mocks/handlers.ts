import { http, HttpResponse } from 'msw';

const API_URL = 'https://api.taskmanager.com';

export const handlers = [
  http.post(`${API_URL}/tasks`, async ({ request }) => {
    const body = (await request.json()) as { title: string };
    return HttpResponse.json(
      { id: Date.now().toString(), title: body.title, status: 'pending' },
      { status: 201 }
    );
  }),

  http.get(`${API_URL}/tasks`, () => {
    return HttpResponse.json([
      { id: '1', title: 'Tarea existente', status: 'pending' },
      { id: '2', title: 'Otra tarea', status: 'completed' },
    ]);
  }),

  // Handler nuevo (Actividad 3): antes removeTask era 100% local, nunca
  // llegaba a la red. Este endpoint simula el borrado real en el backend.
  http.delete(`${API_URL}/tasks/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
