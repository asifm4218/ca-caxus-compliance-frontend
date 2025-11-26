import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle, SectionTitle } from './components/Typography';

const COLORS = {
    primary: '#2563EB',
    primaryDark: '#1E3A8A',
    primaryHover: '#1E40AF',
    textDark: '#111827',
    textGrey: '#6B7280',
    borderGrey: '#E5E7EB',
    background: '#F8FAFC',
    activeBg: '#E0E7FF',
    hoverBg: '#EEF2FF',
    tipBg: '#EFF6FF',
    gst: '#2563EB',
    incomeTax: '#DC2626',
    esi: '#7C3AED',
    pf: '#16A34A',
    mca: '#EA580C',
    tds: '#0891B2',
};

const ComplianceButton = ({ label, color }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '48px',
        borderRadius: '6px',
        padding: '0 16px',
        color: 'white',
        backgroundColor: color,
        boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
        transition: 'background-color 0.2s',
        border: 'none',
        cursor: 'default',
    }}>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>Generate {label}</span>
    </div>
);

const EventTag = ({ label, color, title }) => (
    <div
        style={{
            height: '24px',
            cursor: 'pointer',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            borderRadius: '6px',
            backgroundColor: color,
            padding: '2px 10px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '500',
            color: 'white',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        }}
        title={title}
        onClick={() => console.log(`Viewing event: ${title}`)}
    >
        {label}
    </div>
);

const CalendarDayCell = ({ day, events, isPlaceholder, isToday }) => (
    <div
        style={{
            position: 'relative',
            height: '100px',
            borderRadius: '8px',
            border: `1px solid ${COLORS.borderGrey}`,
            padding: '8px',
            textAlign: 'right',
            fontSize: '12px',
            backgroundColor: isPlaceholder ? '#F9FAFB' : 'white',
            color: isPlaceholder ? '#9CA3AF' : COLORS.textGrey,
            cursor: isPlaceholder ? 'default' : 'pointer',
            boxShadow: isToday ? `inset 0 0 0 2px ${COLORS.primary}` : 'none',
        }}
    >
        {!isPlaceholder && (
            <>
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: isToday ? '700' : '400',
                        color: isToday ? COLORS.primaryDark : COLORS.textDark,
                    }}
                >
                    {day}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        display: 'flex',
                        width: 'calc(100% - 16px)',
                        flexDirection: 'column',
                        gap: '6px',
                        overflow: 'hidden',
                    }}
                >
                    {events.map((event, index) => (
                        <EventTag key={index} {...event} />
                    ))}
                </div>
            </>
        )}
        {isPlaceholder && <div>{day}</div>}
    </div>
);

const DateSelectionModal = ({ isOpen, type, onClose, onSchedule }) => {
    const [selectedDate, setSelectedDate] = useState('');
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '32px',
                    width: '400px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <h3 style={{ color: COLORS.primaryDark, fontSize: '20px', fontWeight: '700', marginTop: 0 }}>
                    Schedule New {type} Task
                </h3>
                <p style={{ color: COLORS.textGrey, fontSize: '14px', marginBottom: '16px' }}>
                    Select the date you want to fix the <b>{type}</b> compliance filing on the calendar.
                </p>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: `1px solid ${COLORS.borderGrey}`,
                        borderRadius: '4px',
                        fontSize: '16px',
                        color: COLORS.textDark,
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button
                        style={{
                            backgroundColor: COLORS.textGrey,
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                        onClick={() => { onClose(); setSelectedDate(''); }}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            backgroundColor: COLORS.primary,
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                        onClick={() => {
                            if (selectedDate) {
                                onSchedule(selectedDate, type);
                                setSelectedDate('');
                            }
                        }}
                        disabled={!selectedDate}
                    >
                        Fix Date
                    </button>
                </div>
            </div>
        </div>
    );
};

const ComplianceCalendarPage = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
    const [calendarEvents, setCalendarEvents] = useState({
        '2025-10-5': [{ label: 'ESI', color: COLORS.esi, title: 'ESI - Due on November 5' }],
        '2025-10-11': [{ label: 'GST', color: COLORS.gst, title: 'GST - Due on November 11' }],
        '2025-10-20': [{ label: 'GST', color: COLORS.gst, title: 'GST - Due on November 20' }],
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [complianceType, setComplianceType] = useState('');

    const complianceButtons = [
        { label: 'GST', color: COLORS.gst },
        { label: 'Income Tax', color: COLORS.incomeTax },
        { label: 'ESI', color: COLORS.esi },
        { label: 'PF', color: COLORS.pf },
        { label: 'MCA', color: COLORS.mca },
        { label: 'TDS', color: COLORS.tds },
    ];

    const goToPreviousMonth = () =>
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const goToNextMonth = () =>
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const prevDays = new Date(year, month, 0).getDate();

        const cells = [];
        for (let i = firstDay; i > 0; i--)
            cells.push(<CalendarDayCell key={`prev-${i}`} day={prevDays - i + 1} events={[]} isPlaceholder />);
        for (let d = 1; d <= totalDays; d++) {
            const dateKey = `${year}-${month}-${d}`;
            const events = calendarEvents[dateKey] || [];
            const today = new Date();
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            cells.push(<CalendarDayCell key={d} day={d} events={events} isToday={isToday} />);
        }
        while (cells.length < 42)
            cells.push(<CalendarDayCell key={`next-${cells.length}`} day={cells.length - totalDays} events={[]} isPlaceholder />);
        return cells;
    };

    const monthYearFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    const currentMonthYear = monthYearFormatter.format(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <PageTitle>Compliance Calendar</PageTitle>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {complianceButtons.map(btn => (
                            <ComplianceButton key={btn.label} {...btn} />
                        ))}
                    </div>
                    <div style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        backgroundColor: COLORS.tipBg,
                        padding: '16px 16px 16px 24px',
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: '4px',
                            backgroundColor: COLORS.primary,
                        }} />
                        <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: COLORS.primaryDark,
                            margin: 0,
                        }}>
                            Tip: Use the AGM Scheduler to set precise AGM dates and automatically calculate accurate MCA compliance deadlines.
                        </p>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        padding: '24px',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ width: '40px' }} />
                            <SectionTitle className="!mb-0">{currentMonthYear}</SectionTitle>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button onClick={goToPreviousMonth} style={{
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '50%',
                                    color: COLORS.textGrey,
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                }}>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button onClick={goToNextMonth} style={{
                                    height: '32px',
                                    width: '32px',
                                    borderRadius: '50%',
                                    color: COLORS.textGrey,
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                }}>
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '16px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: COLORS.textGrey,
                        }}>
                            {weekDays.map(day => <div key={day} style={{ padding: '8px 0' }}>{day}</div>)}
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '1px',
                        }}>
                            {renderCalendarGrid()}
                        </div>
                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: COLORS.primary,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                View All Compliance Events
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <DateSelectionModal
                isOpen={isModalOpen}
                type={complianceType}
                onClose={() => setIsModalOpen(false)}
                onSchedule={(date, type) => console.log('Scheduled', date, type)}
            />
        </div>
    );
};

export default ComplianceCalendarPage;
