import React, { useState, forwardRef } from 'react';
import { Task } from '../ToDoMain/ToDoMain';
import './TaskList.scss';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  className?: string;
}

export const TaskList = forwardRef<HTMLUListElement, TaskListProps>(
  ({ tasks, onToggle, onDelete, onEdit, className }, ref) => {
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');

    const startEditing = (task: Task) => {
      setEditingTaskId(task.id);
      setEditText(task.text);
    };

    const saveEdit = (id: number) => {
      onEdit(id, editText);
      setEditingTaskId(null);
    };

    return (
      <ul className={`task-list ${className || ''}`} ref={ref}>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div
              className={`check-circle ${task.completed ? 'checked' : ''}`}
              onClick={() => onToggle(task.id)}
            >
              {task.completed}
            </div>

            {editingTaskId === task.id ? (
              <input
                className="task-input"
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(task.id)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                autoFocus
              />
            ) : (
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
            )}

            <div className="task-actions">
              <button onClick={() => startEditing(task)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  },
);
