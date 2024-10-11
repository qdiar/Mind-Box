import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from '../components/ToDoMain/ToDoMain';
import React from 'react';

// Мок данных для тестирования
const mockTasks = [
  { id: 1, text: 'Test Task 1', completed: false },
  { id: 2, text: 'Test Task 2', completed: true },
];

describe('TodoApp Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Очищаем localStorage перед каждым тестом
  });

  test('добавление новой задачи', () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    // Проверяем, что задача добавлена в список
    expect(screen.getByText('New Task')).toBeInTheDocument();

    // Проверяем, что инпут очищен
    expect(input).toHaveValue('');
  });
});

test('удаление задачи', () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText('What needs to be done?');
  fireEvent.change(input, { target: { value: 'Task to Delete' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  const taskItem = screen.getByText('Task to Delete').closest('li');

  const deleteButton = taskItem?.querySelector('button:last-child');

  if (deleteButton) {
    fireEvent.click(deleteButton);
  }

  expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument();
});

test('сохранение и загрузка задач из localStorage', () => {
  localStorage.setItem('tasks', JSON.stringify(mockTasks));

  render(<TodoApp />);

  expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  expect(screen.getByText('Test Task 2')).toBeInTheDocument();
});
