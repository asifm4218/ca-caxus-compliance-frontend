import React from 'react';

const Toolbar = ({ view, setView, searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="relative w-64">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Search documents or folders"
            aria-label="Search documents"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setView('grid')}
          aria-pressed={view === 'grid'}
          className={`rounded-md p-2 ${view === 'grid' ? 'bg-blue-50' : ''}`}
          title="Grid view"
        >
          <span className="material-symbols-outlined">grid_view</span>
        </button>
        <button
          onClick={() => setView('list')}
          aria-pressed={view === 'list'}
          className={`rounded-md p-2 ${view === 'list' ? 'bg-blue-50' : ''}`}
          title="List view"
        >
          <span className="material-symbols-outlined">list</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
