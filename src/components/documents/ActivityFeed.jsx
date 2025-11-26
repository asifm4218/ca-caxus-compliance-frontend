import React from 'react';

const ActivityFeed = ({ items = [] }) => {
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex-shrink-0">
            <span className="material-symbols-outlined text-gray-500">{it.icon}</span>
          </div>
          <div>
            <div className="text-sm font-medium">{it.title}</div>
            <div className="text-xs text-gray-500">{it.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
