import React, { useState, useRef, useEffect } from 'react';

const ContextMenu = ({ actions = [] }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKey}
        aria-haspopup="true"
        aria-expanded={open}
        className="p-1 rounded hover:bg-gray-100"
        title="More actions"
      >
        <span className="material-symbols-outlined text-lg">more_horiz</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="File actions"
          className="absolute right-0 z-20 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={() => { setOpen(false); a.onClick && a.onClick(); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                role="menuitem"
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
