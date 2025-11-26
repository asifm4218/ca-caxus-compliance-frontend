// src/pages/DocumentsRepository.jsx
import React, { useState } from 'react';
import { PageTitle, SectionTitle, Paragraph } from '../components/Typography';
import Toolbar from '../components/documents/Toolbar';
import Tile from '../components/documents/Tile';
import ActivityFeed from '../components/documents/ActivityFeed';
import Breadcrumbs from '../components/documents/Breadcrumbs';

const BG = 'bg-gray-50';

const MOCK = [
  { id: 'templates', name: 'Pre-made Templates', subclasses: [] },
  {
    id: 'c1',
    name: 'Acme Corp',
    subclasses: [
      { id: 'c1-s1', name: 'Finance', subfolders: [ { id: 'c1-s1-f1', name: 'GST Filings', files: [{ id: 'f1', name: 'GSTR-3B Oct 2025.pdf' }] } ] },
    ],
  },
];

const stats = [
  { title: 'Total Documents', value: '1,204' },
  { title: 'Auto-Synced', value: '890' },
  { title: 'Pending Review', value: '15' },
  { title: 'Processed / Filed', value: '300' },
];

export default function DocumentsRepository() {
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [path, setPath] = useState([]);
  const [data, setData] = useState(MOCK);
  const fileInputRef = React.useRef(null);
  const [activityLog, setActivityLog] = useState([
    { icon: 'sync', title: '3 documents synced from Tally', time: '2h' },
  ]);

  const currentItems = () => {
    if (path.length === 0) return data.map(c => ({ ...c, type: 'folder' }));
    if (path.length === 1) {
      const comp = data.find(c => c.id === path[0].id);
      return (comp?.subclasses || []).map(s => ({ ...s, type: 'folder' }));
    }
    if (path.length === 2) {
      const comp = data.find(c => c.id === path[0].id);
      const sub = comp?.subclasses.find(s => s.id === path[1].id);
      return (sub?.subfolders || []).map(f => ({ ...f, type: 'folder' }));
    }
    if (path.length === 3) {
      const comp = data.find(c => c.id === path[0].id);
      const sub = comp?.subclasses.find(s => s.id === path[1].id);
      const folder = sub?.subfolders.find(f => f.id === path[2].id);
      return (folder?.files || []).map(file => ({ ...file, type: 'file' }));
    }
    return [];
  };

  const items = currentItems().filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const pushActivity = (entry) => setActivityLog(prev => [entry, ...prev].slice(0, 50));

  // Create folder -> behavior depends on path depth
  const handleCreateFolder = () => {
    const name = window.prompt('Folder name');
    if (!name) return;

    if (path.length === 0) {
      const newNode = { id: `n-${Date.now()}`, name, subclasses: [] };
      setData(prev => [newNode, ...prev]);
      pushActivity({ icon: 'create_new_folder', title: `Created folder ${name}`, time: 'now' });
      return;
    }

    if (path.length === 1) {
      setData(prev => prev.map(c => c.id === path[0].id ? { ...c, subclasses: [ ...(c.subclasses||[]), { id: `s-${Date.now()}`, name, subfolders: [] } ] } : c));
      pushActivity({ icon: 'create_new_folder', title: `Created folder ${name}`, time: 'now' });
      return;
    }

    if (path.length === 2) {
      setData(prev => prev.map(c => {
        if (c.id !== path[0].id) return c;
        return { ...c, subclasses: c.subclasses.map(s => s.id === path[1].id ? { ...s, subfolders: [ ...(s.subfolders||[]), { id: `f-${Date.now()}`, name, files: [] } ] } : s) };
      }));
      pushActivity({ icon: 'create_new_folder', title: `Created folder ${name}`, time: 'now' });
      return;
    }
  };

  const handleTriggerUpload = () => fileInputRef.current?.click();

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const name = file.name;

    // attach to focused folder if depth==3, else create a placeholder
    if (path.length === 3) {
      setData(prev => prev.map(c => {
        if (c.id !== path[0].id) return c;
        return { ...c, subclasses: c.subclasses.map(s => {
          if (s.id !== path[1].id) return s;
          return { ...s, subfolders: s.subfolders.map(f => f.id === path[2].id ? { ...f, files: [ ...(f.files||[]), { id: `file-${Date.now()}`, name } ] } : f) };
        }) };
      }));
    } else {
      // add a top-level upload placeholder container
      setData(prev => {
        const uploads = prev.find(p => p.id === 'uploads-root');
        if (uploads) return prev.map(p => p.id === 'uploads-root' ? { ...p, subclasses: [ ...(p.subclasses||[]), { id: `u-${Date.now()}`, name, subfolders: [] } ] } : p);
        return [ { id: 'uploads-root', name: 'Uploads', subclasses: [ { id: `u-${Date.now()}`, name, subfolders: [] } ] }, ...prev ];
      });
    }

    pushActivity({ icon: 'upload_file', title: `Uploaded ${name}`, time: 'now' });
    e.target.value = null;
  };

  const drillDown = (item) => {
    if (item.type === 'file') return alert('Open file: ' + item.name);
    setPath(prev => [...prev, { id: item.id, name: item.name }]);
  };

  const onCrumb = (newPath) => setPath(newPath);

  const activity = [
    { icon: 'sync', title: '3 documents synced from Tally', time: '2h' },
  ];

  return (
    <div className={`min-h-screen p-8 ${BG}`}>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-8">
        <main className="col-span-12 lg:col-span-9">
          <PageTitle>Documents Repository</PageTitle>
          <Paragraph className="mb-4">Centralized storage — navigate companies, departments and folders.</Paragraph>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(s => (
              <div key={s.title} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="text-sm text-gray-500">{s.title}</div>
                <div className="text-2xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <Breadcrumbs path={path} onCrumb={onCrumb} />
            <div className="flex items-center gap-3">
              <Toolbar view={view} setView={setView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <div className="flex gap-2">
                <button onClick={handleCreateFolder} className="bg-indigo-600 text-white px-3 py-2 rounded">New Folder</button>
                <button onClick={handleTriggerUpload} className="border border-gray-300 px-3 py-2 rounded">Upload</button>
                <input ref={fileInputRef} type="file" onChange={handleUpload} className="hidden" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm">
            {items.length === 0 ? (
              <div className="py-12 text-center text-gray-500">No items found.</div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {items.map(it => (
                  <Tile key={it.id} item={it} onOpen={drillDown} view="grid" />
                ))}
              </div>
            )}
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <SectionTitle>Recent Activity</SectionTitle>
            <ActivityFeed items={activityLog} />
          </div>
        </aside>
      </div>
    </div>
  );
}
