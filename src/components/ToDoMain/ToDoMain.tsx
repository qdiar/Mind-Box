import React, { useState, useRef, useEffect } from 'react';
import { TaskInput } from '../TaskInput/TaskInput';
import { TaskList } from '../TaskList/TaskList';
import { FilterButtons } from '../../UI/FilterButton/FilterButton';

import './ToDoMain.scss';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const [hasScroll, setHasScroll] = useState<boolean>(false);
  const taskListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks && storedTasks !== '[]') {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (tasks.length > 6) {
      setHasScroll(true);
    } else {
      setHasScroll(false);
    }
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="todo-app">
      <h1 className="todo-header">todos</h1>
      <div className="task-container">
        <TaskInput
          onAdd={addTask}
          onToggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
        />
        {isDropdownOpen && (
          <TaskList
            ref={taskListRef}
            tasks={filteredTasks}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={editTask}
            className={hasScroll ? 'has-scroll' : ''}
          />
        )}
        <div className="filter-section">
          <div className="items-left">
            {tasks.filter((task) => !task.completed).length} items left
          </div>
          <FilterButtons
            currentFilter={filter}
            setFilter={setFilter}
            clearCompletedTasks={clearCompletedTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
