import React from 'react';

const Breadcrumbs = ({ path = [], onCrumb }) => {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <button className="text-gray-500" onClick={() => onCrumb([])}>Companies</button>
      {path.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-gray-300">/</span>
          <button className="text-gray-700 hover:underline" onClick={() => onCrumb(path.slice(0, i + 1))}>{p.name}</button>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
