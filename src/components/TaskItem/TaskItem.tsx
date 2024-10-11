import React from 'react';
import { Task } from '../ToDoMain/ToDoMain';
import './TaskItem.scss';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <li className="task-item">
      <div
        className={`check-circle ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && <span>✔</span>}
      </div>
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
    </li>
  );
};
