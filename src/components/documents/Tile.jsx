import React from 'react';
import ContextMenu from './ContextMenu';

const Tile = ({ item, onOpen, view = 'grid' }) => {
  const isFolder = item.type === 'folder';

  const actions = [
    { label: 'Open', onClick: () => onOpen(item) },
    { label: 'Download', onClick: () => alert('Download: ' + item.name) },
    { label: 'Rename', onClick: () => alert('Rename: ' + item.name) },
  ];

  if (view === 'list') {
    return (
      <div className="flex items-center justify-between rounded-md px-4 py-3 hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">{isFolder ? 'folder' : 'description'}</span>
          <div>
            <div className="font-medium">{item.name}</div>
            <div className="text-xs text-gray-500">{item.meta || ''}</div>
          </div>
        </div>
        <ContextMenu actions={actions} />
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onDoubleClick={() => onOpen(item)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(item); }}
      className="group relative flex h-36 w-36 cursor-pointer flex-col items-start justify-between rounded-lg border bg-white p-3 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-3xl">{isFolder ? 'folder' : 'description'}</span>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="truncate text-sm font-medium">{item.name}</div>
        <ContextMenu actions={actions} />
      </div>
    </div>
  );
};

export default Tile;
