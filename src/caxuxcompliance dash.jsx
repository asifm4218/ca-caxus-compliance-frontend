import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle, SectionTitle, Paragraph } from './components/Typography';

const COLORS = {
    primary: '#24298dff',
    primaryDark: '#1E293B',
    secondaryText: '#64748B',
    background: '#F8FAFC',
    sidebarActiveBg: '#EEF2FF',
    sidebarHoverBg: '#F1F5F9',
    border: '#E2E8F0',
    dueDateTag: '#262b89ff',
};

// --- Stat Card ---
const StatCard = ({ title, value, subtext, icon }) => (
    <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '120px',
        borderRadius: '8px',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    }}>
        <div>
            <p style={{ fontSize: '14px', fontWeight: '500', color: COLORS.secondaryText, margin: 0 }}>{title}</p>
            <p style={{ color: COLORS.primaryDark, marginTop: '4px', fontSize: '24px', fontWeight: '700', marginBlockStart: '4px', marginBlockEnd: '0' }}>{value}</p>
        </div>
        <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>{subtext}</p>
        <div style={{ position: 'absolute', right: '16px', top: '16px', color: COLORS.primary }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: COLORS.secondaryText }}>description</span>
        </div>
    </div>
);

// --- Compliance Score Card ---
const ComplianceScoreCard = ({ score, maxScore, healthText }) => {
    const percentage = (score / maxScore) * 100;
    const dashArray = `${percentage}, 100`;
    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '120px',
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: COLORS.secondaryText, margin: 0 }}>Compliance Score</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: COLORS.primaryDark, marginTop: '4px' }}>{score} / {maxScore}</p>
                </div>
                <div style={{ position: 'relative', height: '40px', width: '40px' }}>
                    <svg style={{ height: '100%', width: '100%' }} viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3"></path>
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={COLORS.primary} strokeDasharray={dashArray} strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                </div>
            </div>
            <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>{healthText}</p>
        </div>
    );
};

// --- Task Item ---
const TaskItem = ({ text, dueDate }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <input
            type="checkbox"
            style={{
                marginTop: '3px',
                flexShrink: 0,
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                border: `1px solid ${COLORS.border}`,
                accentColor: COLORS.primary,
                cursor: 'pointer',
            }}
        />
        <div>
            <p style={{ fontSize: '14px', color: COLORS.primaryDark, margin: 0 }}>{text}</p>
            <span style={{
                borderRadius: '4px',
                backgroundColor: COLORS.dueDateTag,
                padding: '2px 8px',
                fontSize: '12px',
                color: 'white',
                display: 'inline-block',
                marginTop: '4px',
                fontWeight: '600',
            }}>
                Due: {dueDate}
            </span>
        </div>
    </div>
);

// --- Calendar ---
const DashboardCalendar = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 5));
    const monthYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    const currentMonthYear = monthYearFormatter.format(currentDate);
    const today = new Date();

    const goToFullCalendar = (e) => {
        e.preventDefault();
        navigate('/caxus/calendar');
    };

    const goToPreviousMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const goToNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} style={{ height: '40px' }} />);
        for (let d = 1; d <= totalDays; d++) {
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const hasDeadline = (month === 10 && year === 2025) && (d === 11 || d === 20);

            const content = isToday ? (
                <div style={{
                    display: 'flex', height: '30px', width: '30px', alignItems: 'center',
                    justifyContent: 'center', borderRadius: '9999px',
                    backgroundColor: COLORS.dueDateTag, color: 'white', fontWeight: '600'
                }}>{d}</div>
            ) : d;

            const dot = hasDeadline ? (
                <div style={{ position: 'absolute', bottom: '6px', height: '4px', width: '4px', borderRadius: '9999px', backgroundColor: COLORS.primary }}></div>
            ) : null;

            days.push(
                <div key={d} style={{
                    position: 'relative',
                    display: 'flex', height: '40px', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', color: COLORS.primaryDark, cursor: 'pointer'
                }}>
                    {content}
                    {dot}
                </div>
            );
        }
        return days;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            gridColumn: 'span 2 / span 2',
        }}>
            <SectionTitle>Upcoming Compliance Deadlines</SectionTitle>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button onClick={goToPreviousMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', color: COLORS.secondaryText }}>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <p style={{ color: COLORS.primaryDark, fontSize: '14px', fontWeight: '500', margin: 0 }}>{currentMonthYear}</p>
                    <button onClick={goToNextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', color: COLORS.secondaryText }}>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
                <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '12px', color: COLORS.secondaryText }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <p key={d} style={{ margin: 0 }}>{d}</p>)}
                </div>
                <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
                    {renderCalendarDays()}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '16px', textAlign: 'center', borderTop: `1px solid ${COLORS.border}` }}>
                    <button onClick={goToFullCalendar} style={{ fontSize: '14px', fontWeight: '500', color: COLORS.primary, border: 'none', background: 'none', cursor: 'pointer' }}>
                        Open Full Calendar
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Dashboard Component (header removed) ---
const DashboardMetrics = () => {
    const navigate = useNavigate();
    const statCards = [
        { title: 'GST Compliances', value: '12', subtext: '2 Overdue', icon: 'receipt_long' },
        { title: 'TDS Filings', value: '5', subtext: '1 Pending', icon: 'description' },
        { title: 'Pending Tasks', value: '8', subtext: '3 High Priority', icon: 'pending_actions' },
    ];
    const pendingTasks = [
        { text: 'File GSTR-3B for Sept 2024', dueDate: 'Oct 20, 2024' },
        { text: 'Submit TDS Challan for Q2', dueDate: 'Oct 30, 2024' },
        { text: 'Upload board resolution', dueDate: 'Nov 5, 2024' },
        { text: 'Verify ITC Reconciliation', dueDate: 'Nov 11, 2024' },
    ];

    const goToTaskManagement = () => navigate('/tasks');

    return (
        <div style={{
            fontFamily: "'Poppins', sans-serif",
            display: 'flex',
            height: '100vh',
            width: '100%',
            backgroundColor: COLORS.background,
            flexDirection: 'column',
        }}>
            {/* Header removed */}
            <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <PageTitle className="!mb-6">Dashboard</PageTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {statCards.map(card => <StatCard key={card.title} {...card} />)}
                        <ComplianceScoreCard score={92} maxScore={100} healthText="Excellent compliance health" />
                    </div>
                    <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        <DashboardCalendar />
                        <div style={{
                            display: 'flex', flexDirection: 'column', borderRadius: '8px', backgroundColor: 'white',
                            padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', gridColumn: 'span 1 / span 1',
                        }}>
                            <SectionTitle>Pending Tasks</SectionTitle>
                            <div style={{ marginTop: '16px', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {pendingTasks.map(task => <TaskItem key={task.text} {...task} />)}
                                </div>
                                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${COLORS.border}` }}>
                                    <button
                                        onClick={goToTaskManagement}
                                        style={{
                                            width: '100%', borderRadius: '6px', border: `1px solid ${COLORS.primary}`,
                                            padding: '8px 0', fontSize: '14px', fontWeight: '500',
                                            color: COLORS.primary, backgroundColor: 'white', cursor: 'pointer',
                                        }}>
                                        View All Tasks
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardMetrics;
