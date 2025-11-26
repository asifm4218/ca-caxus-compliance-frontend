import React, { useState, useRef } from 'react';
import { PageTitle, SectionTitle, Paragraph } from './components/Typography';

// --- Color Palette based on the provided design image AND TaskManagement styles ---
const COLORS = {
    // Brand Colors
    primary: '#1E3A8A', // Deep Blue
    primaryLight: '#E0E7FF', // Light blue background for active nav
    // Text & Icons
    textDark: '#1F2937', 
    textGrey: '#6B7280', 
    textInactive: '#111827', 
    // Status Colors (from Tailwind standards)
    success: '#10B981', // Green 
    warning: '#F59E0B', // Yellow/Orange
    // Backgrounds & Surfaces
    background: '#F9FAFB', 
    sidebar: '#FFFFFF', 
    borderLight: '#E5E7EB', 
};

// Load Google Material Symbols for icons and Inter for typography (via Tailwind CDN)
const GlobalStyles = () => (
    <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </>
);

// --- Helper Components (Skipped for brevity, they remain unchanged) ---


const MetricCard = ({ icon, iconColor, bgColor, title, value, valueColor }) => (
    <div 
        className="p-4 flex items-center gap-3 rounded-xl" 
        style={{
            backgroundColor: COLORS.sidebar,
            border: `1px solid ${COLORS.borderLight}`,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
    >
        <div className={`flex items-center justify-center size-10 rounded-full ${bgColor}`}>
            <span className={`material-symbols-outlined ${iconColor} text-xl`}>{icon}</span>
        </div>
        <div>
            <p className="text-xs" style={{ color: COLORS.textGrey }}>{title}</p>
            <p className={`text-xl font-bold ${valueColor}`}>{value}</p> 
        </div>
    </div>
);

const StepperStep = ({ label, stepIndex, currentStep, isLast, primaryColor }) => {
    // 0: Received, 1: In Review, 2: Response Prepared, 3: Submitted, 4: Closed
    const isComplete = stepIndex < currentStep;
    const isActive = stepIndex === currentStep;

    let circleBg, barColor;

    if (isComplete) {
        circleBg = 'bg-green-500';
        barColor = 'bg-green-500';
    } else if (isActive) {
        circleBg = `bg-[${primaryColor}]`;
        barColor = `bg-[${primaryColor}]`;
    } else {
        circleBg = 'bg-gray-300';
        barColor = 'bg-gray-200';
    }

    return (
        <div className="flex flex-1 items-center">
            <div className="flex flex-col items-center relative min-w-[40px]">
                <div 
                    className={`w-3 h-3 rounded-full border-2 border-white ring-2 ${circleBg}`}
                    style={{
                        borderColor: COLORS.sidebar,
                        boxShadow: `0 0 0 2px ${isActive ? primaryColor : isComplete ? COLORS.success : COLORS.borderLight}`
                    }}
                ></div>
                <p className="text-[10px] mt-1.5 text-center leading-tight" style={{ color: isActive ? COLORS.textDark : COLORS.textGrey }}>{label}</p>
            </div>
            {!isLast && (
                <div className="flex-1 h-0.5">
                    <div className={`h-full ${barColor} w-full`} style={{backgroundColor: isComplete ? COLORS.success : isActive ? primaryColor : COLORS.borderLight}}></div>
                </div>
            )}
        </div>
    );
};


const NoticeDetailModal = ({ isOpen, onClose, notice, onAdvance }) => {
    if (!isOpen || !notice) return null;

    // Determine status text based on the step
    const getStatusText = (step) => {
        const steps = ['Received (Awaiting OCR)', 'In Review', 'Response Prepared', 'Submitted', 'Closed'];
        return steps[step] || 'Unknown';
    };
    
    // Determine the next action button label
    const getNextActionLabel = (step) => {
        switch (step) {
            case 1: return 'Generate Response Draft';
            case 2: return 'Mark Response Sent';
            case 3: return 'Close Notice';
            default: return 'No Further Action';
        }
    };

    const handleNextAction = () => {
        if (notice.currentStep < 4) {
            onAdvance(notice.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div 
                className="rounded-xl shadow-2xl p-6 w-full max-w-md relative"
                style={{ backgroundColor: COLORS.sidebar }}
            >
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.textDark }}>
                    {notice.type} Details
                </h3>

                <div className="space-y-3 text-sm">
                    {/* ID */}
                    <div className="flex justify-between items-center pb-2 border-b" style={{borderColor: COLORS.borderLight}}>
                        <span style={{ color: COLORS.textGrey }}>Notice ID:</span>
                        <span className="font-semibold" style={{ color: COLORS.textDark }}>{notice.id}</span>
                    </div>

                    {/* Due Date */}
                    <div className="flex justify-between items-center pb-2 border-b" style={{borderColor: COLORS.borderLight}}>
                        <span style={{ color: COLORS.textGrey }}>Due Date:</span>
                        <span className="font-semibold" style={{ color: COLORS.textDark }}>{notice.dueDate}</span>
                    </div>

                    {/* Status (Dynamic) */}
                    <div className="flex justify-between items-center">
                        <span style={{ color: COLORS.textGrey }}>Current Status:</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold`}
                            style={{ 
                                backgroundColor: notice.currentStep >= 2 ? '#D1FAE5' : '#FEF3C7', 
                                color: notice.currentStep >= 2 ? '#065F46' : '#92400E'
                            }}
                        >
                            {getStatusText(notice.currentStep)}
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button 
                        className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg shadow-md transition-colors"
                        style={{ backgroundColor: COLORS.primary, color: COLORS.sidebar, boxShadow: `0 4px 6px -1px rgba(30, 58, 138, 0.2)` }}
                    >
                        View Notice Document
                    </button>
                    {notice.currentStep < 4 && (
                         <button 
                            onClick={handleNextAction}
                            className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg border transition-colors hover:bg-gray-50"
                            style={{ 
                                backgroundColor: notice.currentStep === 1 ? COLORS.primaryLight : COLORS.sidebar, 
                                color: notice.currentStep === 1 ? COLORS.primary : COLORS.textDark, 
                                borderColor: COLORS.borderLight 
                            }}
                        >
                            {getNextActionLabel(notice.currentStep)}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Main NoticeManagement Component ---

const NoticeManagement = () => {
    
    // 1. **USE REF for File Input**
    const fileInputRef = useRef(null); 
    
    const WORKFLOW_STEPS = [
        'Received', 'In Review', 'Response Prepared', 'Submitted', 'Closed'
    ];
    
    const initialNotices = [
        {
            id: '#GST-FY24-1023', 
            type: 'GST ASMT-10', 
            dateIssued: '15 Jul 2024',
            dueDate: '14 Aug 2024', 
            assigned: 'R. Sharma',
            currentStep: 1, // Status: In Review
            typeColor: '#8B5CF6'
        },
        {
            id: '#MCA-FY24-0512', 
            type: 'MCA DIR-12', 
            dateIssued: '01 Aug 2024',
            dueDate: '30 Aug 2024', 
            assigned: 'S. Patil',
            currentStep: 3, // Status: Submitted
            typeColor: '#EF4444'
        },
    ];
    
    // STATE FOR NOTICES AND MODAL
    const [notices, setNotices] = useState(initialNotices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    // HANDLERS
    
    const handleAdvanceStep = (noticeId) => {
        setNotices(prevNotices => 
            prevNotices.map(notice => {
                if (notice.id === noticeId && notice.currentStep < WORKFLOW_STEPS.length - 1) {
                    const newStep = notice.currentStep + 1;
                    return { ...notice, currentStep: newStep };
                }
                return notice;
            })
        );
        setSelectedNotice(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
        }));
    };

    const handleViewDetails = (notice) => {
        setSelectedNotice(notice);
        setIsModalOpen(true);
    };
    
    // 3. **NEW HANDLER: Triggers the hidden file input click**
    const handleFileSelection = () => {
        fileInputRef.current.click();
    };

    // 4. **NEW HANDLER: Processes the file after selection**
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const fileName = files[0].name;
            const newNoticeId = '#UPLOAD-' + Math.floor(Math.random() * 9000 + 1000);
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            const newNotice = {
                id: newNoticeId,
                type: 'New Notice: ' + fileName.substring(0, 15), // Use file name as type
                dateIssued: today,
                dueDate: 'TBD (30 Days)', 
                assigned: 'Awaiting Assignment',
                currentStep: 0, // Initial status: Received
                typeColor: '#22C55E'
            };

            console.log(`Simulating upload for file: ${fileName}...`);
            alert(`File selected: ${fileName}. Starting OCR processing...`);
            
            // Simulate processing delay
            setTimeout(() => {
                setNotices(prevNotices => [
                    {...newNotice, currentStep: 1, assigned: 'Auto-Assigned'}, // Move to 'In Review'
                    ...prevNotices 
                ]);
                alert(`Processing complete! Notice ${newNoticeId} moved to 'In Review'.`);
            }, 1500); 
        }
        // Reset the input value to allow selecting the same file again
        event.target.value = null;
    };



    const metricCards = [
        { icon: 'description', iconColor: 'text-blue-600', bgColor: 'bg-blue-100', title: 'Total Notices', value: notices.length, valueColor: 'text-blue-600' },
        { icon: 'priority_high', iconColor: 'text-red-600', bgColor: 'bg-red-100', title: 'High Priority', value: notices.filter(n => n.currentStep < 2).length, valueColor: 'text-red-600' },
        { icon: 'hourglass_top', iconColor: 'text-yellow-600', bgColor: 'bg-yellow-100', title: 'Processing', value: notices.filter(n => n.currentStep > 0 && n.currentStep < 4).length, valueColor: 'text-yellow-600' },
        { icon: 'check_circle', iconColor: 'text-green-600', bgColor: 'bg-green-100', title: 'Processed', value: notices.filter(n => n.currentStep === 4).length, valueColor: 'text-green-600' },
    ];


    return (
        <>
            <GlobalStyles />
            <div className="font-sans relative flex min-h-screen w-full" style={{ backgroundColor: COLORS.background }}>
                {/* Main Content Area */}
                <main className="flex-1 px-12 py-8 grid grid-cols-12 gap-8">

                    {/* Left Column (Main Content) */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">

                        {/* Page Title (moved out of header for consistency) */}
                        <div className="flex flex-col gap-1">
                            <PageTitle>Notice Management</PageTitle>
                            <Paragraph>Upload and track compliance notices automatically using OCR and integrations.</Paragraph>
                        </div>

                        {/* Header */}
                        <header className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <button 
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                                    style={{ backgroundColor: COLORS.sidebar, color: COLORS.textDark, borderColor: COLORS.borderLight }}
                                >
                                    <span>🔄</span>
                                    <span>Auto Fetch from Portals</span>
                                </button>
                                <button 
                                    className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                                    style={{ backgroundColor: COLORS.sidebar, color: COLORS.textDark, borderColor: COLORS.borderLight }}
                                >
                                    <span>📧</span>
                                    <span>Check Email Notices</span>
                                </button>
                            </div>
                        </header>

                        {/* Upload Section */}
                        <section 
                            className="p-8 rounded-xl flex flex-col"
                            style={{ backgroundColor: COLORS.sidebar, border: `1px solid ${COLORS.borderLight}`, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
                        >
                            {/* 2. **HIDDEN FILE INPUT** */}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="application/pdf,image/jpeg,image/png"
                                multiple
                            />

                            <div className="flex flex-col items-start gap-1">
                                <p className="text-lg font-semibold" style={{ color: COLORS.textDark }}>Upload Notice for Processing</p>
                                <p className="text-sm" style={{ color: COLORS.textGrey }}>Upload GST, MCA, or TDS notices for automatic processing with Google Vision OCR.</p>
                            </div>
                            <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed rounded-xl my-6 py-10 text-center" style={{ borderColor: COLORS.borderLight }}>
                                <span className="material-symbols-outlined text-6xl" style={{ color: COLORS.primary }}>cloud_upload</span>
                                <p className="mt-2 font-semibold" style={{ color: COLORS.textDark }}>Drop notice files here or click to browse</p>
                                <p className="text-xs mt-1" style={{ color: COLORS.textGrey }}>Supports PDF, JPG, PNG (Max 10MB each)</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex h-8 items-center justify-center gap-x-2 rounded-full px-3" style={{ backgroundColor: '#D1FAE5' }}>
                                        <p className="text-sm font-medium" style={{ color: '#065F46' }}>Google Vision OCR</p>
                                    </div>
                                    <div className="flex h-8 items-center justify-center gap-x-2 rounded-full px-3" style={{ backgroundColor: '#DBEAFE' }}>
                                        <p className="text-sm font-medium" style={{ color: '#1E40AF' }}>Auto Response Gen</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleFileSelection} // NEW: Calls the function that clicks the hidden input
                                    className="flex items-center justify-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-lg shadow-sm transition-colors"
                                    style={{ backgroundColor: COLORS.primary, color: COLORS.sidebar, boxShadow: `0 4px 6px -1px rgba(30, 58, 138, 0.2)` }}
                                >
                                    <span>Select Files</span>
                                </button>
                            </div>
                        </section>

                        {/* Notice Detail Card (Table) */}
                        <section 
                            className="p-6 rounded-xl flex flex-col gap-4"
                            style={{ backgroundColor: COLORS.sidebar, border: `1px solid ${COLORS.borderLight}`, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
                        >
                            <SectionTitle>Key Notices ({notices.length} Total)</SectionTitle>
                            
                            {/* Table Header */}
                            <div className="grid grid-cols-7 gap-4 text-xs uppercase font-semibold pb-3 border-b" style={{ color: COLORS.textGrey, borderColor: COLORS.borderLight }}>
                                <span>Notice ID</span>
                                <span>Notice Type</span>
                                <span>Date Issued</span>
                                <span>Due Date</span>
                                <span>Status</span>
                                <span>Assigned</span>
                                <span>Action</span>
                            </div>
                            
                            {/* Table Rows (Dynamically rendered) */}
                            {notices.map(notice => (
                                <React.Fragment key={notice.id}>
                                    <div className="grid grid-cols-7 gap-4 items-center text-sm font-semibold py-2">
                                        <span style={{ color: COLORS.textDark }}>{notice.id}</span>
                                        <span style={{ color: COLORS.textDark }}>{notice.type}</span>
                                        <span style={{ color: COLORS.textGrey }}>{notice.dateIssued}</span>
                                        <span style={{ color: COLORS.textDark }}>{notice.dueDate}</span>
                                        <span style={{ 
                                            color: notice.currentStep === 4 ? COLORS.success : notice.currentStep < 2 ? COLORS.warning : COLORS.primary, 
                                            fontWeight: 700 
                                        }}>
                                            {WORKFLOW_STEPS[notice.currentStep]}
                                        </span>
                                        <span style={{ color: COLORS.primary }}>{notice.assigned}</span>
                                        <a
                                            className="hover:underline cursor-pointer"
                                            onClick={() => handleViewDetails(notice)}
                                            href="#"
                                            style={{ color: COLORS.primary }}
                                        >
                                            View Details
                                        </a>
                                    </div>
                                    
                                    {/* Stepper Status for the selected notice */}
                                    <div className="mt-2 mb-4 pt-4 border-t" style={{ borderColor: COLORS.borderLight }}>
                                        <div className="flex items-start justify-between">
                                            {WORKFLOW_STEPS.map((label, index) => (
                                                <StepperStep
                                                    key={label}
                                                    label={label}
                                                    stepIndex={index}
                                                    currentStep={notice.currentStep} 
                                                    isLast={index === WORKFLOW_STEPS.length - 1}
                                                    primaryColor={COLORS.primary}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                        </section>
                    </div>

                    {/* Right Column (Metrics and Controls) */}
                    <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                        <div 
                            className="p-5 rounded-xl flex flex-col"
                            style={{ backgroundColor: COLORS.sidebar, border: `1px solid ${COLORS.borderLight}`, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
                        >
                            <p className="text-base font-semibold" style={{ color: COLORS.textDark }}>Email Monitoring Active</p>
                            <p className="text-xs mt-0.5" style={{ color: COLORS.textGrey }}>Notices sent to registered email will be automatically detected.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {metricCards.map((card) => (
                                <MetricCard key={card.title} {...card} />
                            ))}
                        </div>

                        <div 
                            className="p-5 rounded-xl flex items-center justify-between"
                            style={{ backgroundColor: COLORS.sidebar, border: `1px solid ${COLORS.borderLight}`, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
                        >
                            <div className="flex items-center gap-2">
                                <span>🔔</span>
                                <span className="text-sm font-medium" style={{ color: COLORS.textDark }}>Enable Auto-Reminders</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox" value=""/>
                                <div 
                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                                    style={{ 
                                        backgroundColor: COLORS.borderLight, 
                                        transition: 'background-color 0.2s',
                                    }}
                                ></div>
                            </label>
                        </div>
                    </aside>
                </main>

                {/* The Modal Component */}
                <NoticeDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    notice={selectedNotice}
                    onAdvance={handleAdvanceStep}
                />
            </div>
        </>
    );
};

export default NoticeManagement;