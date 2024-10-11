import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from '../components/TaskItem/TaskItem';
import React from 'react';

const task = {
  id: 1,
  text: 'Sample Task',
  completed: false,
};

describe('TaskItem Component', () => {
  test('отображение текста задачи', () => {
    render(<TaskItem task={task} onToggle={() => {}} />);

    expect(screen.getByText('Sample Task')).toBeInTheDocument();
  });

  test('переключение состояния задачи', () => {
    const onToggleMock = jest.fn();
    render(<TaskItem task={task} onToggle={onToggleMock} />);

    const checkCircle = document.querySelector('.check-circle');

    if (checkCircle) {
      fireEvent.click(checkCircle);
    }

    expect(onToggleMock).toHaveBeenCalledWith(1);
  });

  test('задача отображается как выполненная, если completed true', () => {
    const completedTask = { ...task, completed: true };
    render(<TaskItem task={completedTask} onToggle={() => {}} />);

    expect(screen.getByText('Sample Task')).toHaveClass('completed');
  });
});
