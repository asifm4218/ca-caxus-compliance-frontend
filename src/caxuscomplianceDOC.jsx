// DocumentsRepository.jsx — FULL FINAL PACK 🔥
import React, { useState, useRef } from 'react';
import { PageTitle, SectionTitle, Paragraph } from './components/Typography';
import Toolbar from './components/documents/Toolbar';
import Tile from './components/documents/Tile';
import ActivityFeed from './components/documents/ActivityFeed';
import Breadcrumbs from './components/documents/Breadcrumbs';

const BG = 'bg-gray-50';

// ======================= MOCK HIERARCHY =======================
const MOCK = [
  {
    id: 'c1',
    name: 'Acme Corp',
    subclasses: [
      {
        id: 'c1-s1', name: 'Finance',
        subfolders: [
          { id: 'c1-s1-f1', name: 'GST Filings', files:[
            { id:'f1',name:'GSTR-3B Oct 2025.pdf', url:'#' },
            { id:'f2',name:'GSTR-1 Oct 2025.pdf', url:'#' }
          ]},
          { id:'c1-s1-f2', name:'TDS', files:[{ id:'f3',name:'TDS Challan Q3.pdf', url:'#' }]}
        ]
      },
      {
        id:'c1-s2', name:'HR',
        subfolders:[{ id:'c1-s2-f1', name:'Contracts', files:[{ id:'f4',name:'Employment-RA.pdf', url:'#' }] }]
      }
    ]
  },
  {
    id:'c2', name:'Beta Traders',
    subclasses:[
      { id:'c2-s1', name:'Accounts',
        subfolders:[{ id:'c2-s1-f1', name:'Invoices', files:[{ id:'f5',name:'Invoice-1023.pdf', url:'#' }] }]
      }
    ]
  }
];

const stats = [
  { title: 'Total Documents', value: '1,204' },
  { title: 'Auto-Synced', value: '890' },
  { title: 'Pending Review', value: '15' },
  { title: 'Processed / Filed', value: '300' },
];


// ======================= FILE PREVIEW MODAL =======================
const FileModal = ({ file, onClose }) => {
  if (!file) return null;

  const isPDF   = file.name.endsWith(".pdf");
  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(file.name);
  const isText  = /\.(txt|md|log)$/i.test(file.name);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-xl p-5 w-[580px] max-h-[85vh] shadow-xl overflow-auto animate-fadeIn">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{file.name}</h2>
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">✖</button>
        </div>

        {/* PREVIEW BLOCKS */}
        {isPDF && <iframe title="pdf" src={file.url} className="h-[70vh] w-full" />}
        {isImage && <img src={file.url} alt="" className="rounded-lg" />}

        {isText && (
          <pre className="bg-gray-100 p-3 rounded text-sm">
            {file.content || "Text preview cannot render inline."}
          </pre>
        )}

        {!isImage && !isPDF && !isText && (
          <div className="text-center text-gray-600 py-6">📄 Preview not available — download to view.</div>
        )}

        <div className="pt-4 flex justify-end gap-2">
          <button
            onClick={()=>{
              const a=document.createElement("a");
              a.href=file.url; a.download=file.name; a.click();
            }}
            className="px-4 py-1 rounded bg-blue-600 text-white"
          >Download</button>
        </div>
      </div>
    </div>
  );
};


// ======================= MAIN COMPONENT =======================
export default function DocumentsRepository() {

  const [path, setPath] = useState([]);
  const [searchQuery,setSearchQuery]=useState('');
  const [view,setView]=useState("grid");
  const [selectedFile,setSelectedFile] = useState(null);
  const uploadRef = useRef(null);

  // ------------------ DIRECTORY MAPPING (DYNAMIC) ------------------
  const getCurrentLevel = () => {
    if(path.length===0) return MOCK;
    const comp = MOCK.find(c=>c.id===path[0]?.id);
    if(path.length===1) return comp?.subclasses || [];
    const sub = comp.subclasses.find(s=>s.id===path[1]?.id);
    if(path.length===2) return sub?.subfolders || [];
    if(path.length===3) return sub.subfolders.find(f=>f.id===path[2]?.id)?.files || [];
    return [];
  };

  const items = getCurrentLevel()
    .map(v=>({ ...v, type: path.length===3 ? "file" : "folder" }))
    .filter(i=>i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // ------------------ FOLDER NAVIGATION ------------------
  const drillDown = (item)=>{
    if(item.type==="file") return setSelectedFile(item);
    setPath(p=>[...p,{ id:item.id,name:item.name }]);
  };
  const onCrumb = p=> setPath(p);

  // ------------------ FILE UPDATE ACTIONS ------------------
  const update = (fn)=>{
    MOCK.forEach((c,i)=>{
      if(path[0]?.id===c.id){
        if(path.length===1) return fn(MOCK[i].subclasses);
        const s = MOCK[i].subclasses.findIndex(x=>x.id===path[1]?.id);
        if(path.length===2) return fn(MOCK[i].subclasses[s].subfolders);
        const f = MOCK[i].subclasses[s].subfolders.findIndex(x=>x.id===path[2]?.id);
        if(path.length===3) return fn(MOCK[i].subclasses[s].subfolders[f].files);
      }
    });
  };

  const renameFile = file=>{
    const newName = prompt("Rename:",file.name);
    if(newName){
      update(files=>{
        const f=files.find(x=>x.id===file.id);
        if(f) f.name=newName;
      });
      setSelectedFile(null);
    }
  };

  const deleteFile=file=>{
    if(confirm("Delete file permanently?"))
      update(files=> files.splice(files.findIndex(x=>x.id===file.id),1));
    setSelectedFile(null);
  };

  const downloadFile=file=>{
    const a=document.createElement("a");
    a.href=file.url; a.download=file.name; a.click();
  };

  // ------------------ DRAG & DROP UPLOAD ------------------
  const handleDrop=e=>{
    e.preventDefault();
    const files=[...e.dataTransfer.files];

    update(folder=>{
      files.forEach(f=>folder.push({
        id:"file_"+Math.random(), name:f.name, url:"#", size:f.size
      }))
    });

    alert(files.length+" File(s) uploaded");
  };


  // ======================= UI OUTPUT =======================
  return(
    <div className={`min-h-screen p-8 ${BG}`}>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-8">

        {/* MAIN */}
        <main className="col-span-12 lg:col-span-9">

          <PageTitle>Documents Repository</PageTitle>
          <Paragraph className="mb-4">Navigate Companies → Departments → Folders → Files</Paragraph>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map(x=>
              <div key={x.title} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-600">{x.title}</p>
                <p className="text-xl font-bold">{x.value}</p>
              </div>)}
          </div>

          <div className="flex items-center justify-between mb-3">
            <Breadcrumbs path={path} onCrumb={onCrumb}/>
            <Toolbar view={view} setView={setView} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          </div>

          {/* FILE ZONE — With Drag Drop */}
          <div
            className="rounded-xl bg-white p-4 shadow-sm min-h-[300px]"
            onDragOver={e=>e.preventDefault()}
            onDrop={handleDrop}
          >
            {items.length===0 ? 
              <p className="text-center text-gray-500 py-10">No items</p>
            :
              view==="list" ?
                <div className="space-y-2">
                  {items.map(it=><Tile key={it.id} item={it} onOpen={drillDown} view="list"/>)}
                </div>
                :
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {items.map(it=><Tile key={it.id} item={it} onOpen={drillDown} view="grid"/>)}
                </div>
            }
          </div>
        </main>

        {/* SIDE ACTIVITY */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <SectionTitle>Recent Activity</SectionTitle>
            <ActivityFeed items={[
              { icon:'sync',title:'3 Docs Auto-Synced',time:'2h' },
              { icon:'upload_file',title:'Sharma uploaded AGM Minutes',time:'1d' },
              { icon:'check_circle',title:'TDS Filed',time:'3d' }
            ]}/>
          </div>
        </aside>
      </div>

      {/* FILE PREVIEW MODAL */}
      {selectedFile && (
        <FileModal
          file={selectedFile}
          onClose={()=>setSelectedFile(null)}
        />
      )}

    </div>
  );
}
