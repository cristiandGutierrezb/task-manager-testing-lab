import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
} from 'react-native';

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    module: string;
    priority: 'low' | 'medium' | 'high';
    description: string;
    expectedResult: string;
    actualResult: string;
  }) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [module, setModule] = useState('');
  const [priority, setPriority] =
    useState<'low' | 'medium' | 'high'>('medium');

  const [description, setDescription] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [actualResult, setActualResult] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title,
      module,
      priority,
      description,
      expectedResult,
      actualResult,
    });

    // Limpia los campos después de guardar el bug
    setTitle('');
    setModule('');
    setPriority('medium');
    setDescription('');
    setExpectedResult('');
    setActualResult('');
  };

  return (
    <View className="gap-3">

      <TextInput
        placeholder="Título del bug"
        value={title}
        onChangeText={setTitle}
        accessibilityLabel="Título del bug"
        testID="input-titulo"
        className="rounded-lg border border-gray-300 bg-white px-4 py-3"
      />

      <TextInput
        placeholder="Módulo"
        value={module}
        onChangeText={setModule}
        accessibilityLabel="Módulo afectado"
        className="rounded-lg border border-gray-300 bg-white px-4 py-3"
      />

      <Text className="font-medium">
        Prioridad
      </Text>

      <View className="flex-row gap-2">
        <Pressable
          onPress={() => setPriority('low')}
          accessibilityRole="button"
          accessibilityLabel="Prioridad baja"
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          <Text>Baja</Text>
        </Pressable>

        <Pressable
          onPress={() => setPriority('medium')}
          accessibilityRole="button"
          accessibilityLabel="Prioridad media"
          className="rounded-lg bg-yellow-200 px-4 py-2"
        >
          <Text>Media</Text>
        </Pressable>

        <Pressable
          onPress={() => setPriority('high')}
          accessibilityRole="button"
          accessibilityLabel="Prioridad alta"
          className="rounded-lg bg-red-200 px-4 py-2"
        >
          <Text>Alta</Text>
        </Pressable>
      </View>

      <TextInput
        placeholder="Descripción del problema"
        value={description}
        onChangeText={setDescription}
        multiline
        accessibilityLabel="Descripción del problema"
        className="min-h-20 rounded-lg border border-gray-300 bg-white px-4 py-3"
      />

      <TextInput
        placeholder="Resultado esperado"
        value={expectedResult}
        onChangeText={setExpectedResult}
        multiline
        accessibilityLabel="Resultado esperado"
        className="min-h-20 rounded-lg border border-gray-300 bg-white px-4 py-3"
      />

      <TextInput
        placeholder="Resultado obtenido"
        value={actualResult}
        onChangeText={setActualResult}
        multiline
        accessibilityLabel="Resultado obtenido"
        className="min-h-20 rounded-lg border border-gray-300 bg-white px-4 py-3"
      />

      <Pressable
        onPress={handleSubmit}
        accessibilityRole="button"
        accessibilityLabel="Guardar bug"
        className="rounded-lg bg-blue-600 py-3"
      >
        <Text className="text-center font-semibold text-white">
          Guardar bug
        </Text>
      </Pressable>

    </View>
  );
}