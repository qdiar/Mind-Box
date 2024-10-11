import { render, screen, fireEvent } from '@testing-library/react';
import { TaskInput } from '../components/TaskInput/TaskInput';
import React from 'react';

describe('TaskInput Component', () => {
  test('добавление задачи при клике на кнопку Add', () => {
    const onAddMock = jest.fn();
    render(<TaskInput onAdd={onAddMock} isDropdownOpen={false} onToggleDropdown={() => {}} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    const addButton = screen.getByRole('button', { name: /Add/i });

    // Ввод текста в инпут
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(onAddMock).toHaveBeenCalledWith('New Task');
    expect(inputElement).toHaveValue('');
  });

  test('добавление задачи при нажатии Enter', () => {
    const onAddMock = jest.fn();
    render(<TaskInput onAdd={onAddMock} isDropdownOpen={false} onToggleDropdown={() => {}} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(inputElement, { target: { value: 'Task with Enter' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(onAddMock).toHaveBeenCalledWith('Task with Enter');
    expect(inputElement).toHaveValue('');
  });

  test('раскрытие/скрытие дропдауна при клике', () => {
    const onToggleDropdownMock = jest.fn();
    render(
      <TaskInput onAdd={() => {}} isDropdownOpen={false} onToggleDropdown={onToggleDropdownMock} />,
    );

    const dropdownIcon = screen.getByAltText('Toggle dropdown');

    // Нажимаем на иконку
    fireEvent.click(dropdownIcon);

    expect(onToggleDropdownMock).toHaveBeenCalled();
  });
});
