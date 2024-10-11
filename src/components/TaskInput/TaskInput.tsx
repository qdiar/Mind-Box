import React, { useState } from 'react';
import './TaskInput.scss';

interface TaskInputProps {
  onAdd: (task: string) => void;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  onAdd,
  isDropdownOpen,
  onToggleDropdown,
}) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim()) {
      onAdd(task);
      setTask('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && task.trim()) {
      handleAdd();
    }
  };

  return (
    <div className="task-input-container">
      <div className="input-wrapper">
        <div className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} onClick={onToggleDropdown}>
          <img src="/arrow-down-svgrepo-com.svg" alt="Toggle dropdown" />
        </div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="task-input"
        />
        <div className="btn-container">
          <button onClick={handleAdd} className="add-task-btn">
            Add
          </button>{' '}
        </div>
      </div>
    </div>
  );
};
