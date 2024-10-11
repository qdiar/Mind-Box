import React from 'react';
import './FilterButton.scss';

interface FilterButtonsProps {
  currentFilter: 'all' | 'completed' | 'incomplete';
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
  clearCompletedTasks: () => void; // Добавляем функцию для очистки выполненных задач
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  setFilter,
  clearCompletedTasks,
}) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => setFilter('all')}
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter('incomplete')}
        className={`filter-btn ${currentFilter === 'incomplete' ? 'active' : ''}`}
      >
        Active
      </button>
      <button onClick={clearCompletedTasks} className="clear-completed-btn">
        Clear Completed
      </button>
    </div>
  );
};
