import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from '../components/TaskList/TaskList';
import React from 'react';

const tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

describe('TaskList Component', () => {
  test('отображение списка задач', () => {
    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('переключение состояния задачи', () => {
    const onToggleMock = jest.fn();
    render(
      <TaskList tasks={tasks} onToggle={onToggleMock} onDelete={() => {}} onEdit={() => {}} />,
    );

    const checkCircle = screen
      .getAllByText('Task 1')[0]
      .parentElement?.querySelector('.check-circle');

    if (checkCircle) {
      fireEvent.click(checkCircle);
    }

    expect(onToggleMock).toHaveBeenCalledWith(1);
  });

  test('удаление задачи', () => {
    const onDeleteMock = jest.fn();
    render(
      <TaskList tasks={tasks} onToggle={() => {}} onDelete={onDeleteMock} onEdit={() => {}} />,
    );

    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });

  test('редактирование задачи', () => {
    const onEditMock = jest.fn();
    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} onEdit={onEditMock} />);

    const editButton = screen.getAllByText('Edit')[0];
    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue('Task 1');
    fireEvent.change(inputElement, { target: { value: 'Updated Task 1' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(onEditMock).toHaveBeenCalledWith(1, 'Updated Task 1');
  });
});
