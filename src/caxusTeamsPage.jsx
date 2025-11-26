import React from 'react';
import { PageTitle, SectionTitle, Paragraph } from './components/Typography';

// --- Custom Inline Styles based on Tailwind Config ---
const styles = {
  // Colors defined in tailwind.config
  primary: '#1E3A8A',
  backgroundLight: '#f6f6f8',
  white: '#ffffff',

  // Utility styles
  sidebarWidth: { width: '256px' }, // w-64
  borderRadius: {
    DEFAULT: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  // Box shadows
  shadowSm: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },

  // Fonts
  fontDisplay: 'Public Sans, sans-serif',
  
  // Transition
  transition: 'all 150ms ease-in-out',
};

// --- Data for Table and Components ---

const teamMembers = [
  {
    name: 'Adithya Ramani',
    email: 'adithya.ramani@gmail.com',
    role: 'Owner',
    lastActive: '2 hours ago',
    status: 'Active',
    avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCriORABQUXOpcJfiGcEZA91BZx5Cypm4mYdJe7qc0SdqOm3d_JYDALoeuWR2WXnG6TEuF9Na81P2JWkOxW4UVvUGxtWhF02OgOFiDfJ_KRaxq9YI1RgHM0Rsw0H_8KfG6Z1cdcF3IwTJMseTwQXKKHMEwJZAa4N2X46PKQaqvl_UhBHJcUmKi-YiZ626FERojc1MrbS15wJfpfJqn8fabS2IDc9bmo8OAncBzIsmgIUjWC92q_es2S5TGhpffoI-d1NnSg1s_fyPc',
    roleStyle: { backgroundColor: '#d1fae5', color: '#065f46' }, // bg-green-100 text-green-800
    statusColor: '#10b981', // bg-green-500
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@gmail.com',
    role: 'Admin',
    lastActive: 'Yesterday',
    status: 'Active',
    avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCriORABQUXOpcJfiGcEZA91BZx5Cypm4mYdJe7qc0SdqOm3d_JYDALoeuWR2WXnG6TEuF9Na81P2JWkOxW4UVvUGxtWhF02OgOFiDfJ_KRaxq9YI1RgHM0Rsw0H_8KfG6Z1cdcF3IwTJMseTwQXKKHMEwJZAa4N2X46PKQaqvl_UhBHJcUmKi-YiZ626FERojc1MrbS15wJfpfJqn8fabS2IDc9bmo8OAncBzIsmgIUjWC92q_es2S5TGhpffoI-d1NnSg1s_fyPc',
    roleStyle: { backgroundColor: '#dbeafe', color: '#1e40af' }, // bg-blue-100 text-blue-800
    statusColor: '#10b981',
  },
  {
    name: 'Anjali Desai',
    email: 'anjali.desai@gmail.com',
    role: 'Staff',
    lastActive: '3 days ago',
    status: 'Pending',
    avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBET3nC3VXJdKm1ntP0KnVqGwb4GkaWwNMkv0d1ZcFtilz1ohdxKjwqhj5vvirBuuihb6fej1SrZZXLqhYOXlELgIERcrWSR9Szv20zxru5PY0jxBTPiE6F1GIYVNVXjxYeDrP2tO7ECYdBW23n7RXXS8bL41Tx0f5WUU8Y4dUjpc26PF501byz0y-dyTMH9711kXzk2xJW2FY39g8pigPmF1TF88t6er-1MXEdt5bZ50md5fe7wDoOb7UmWfYshY04aGd5IwUMQ0I',
    roleStyle: { backgroundColor: '#f3f4f6', color: '#374151' }, // bg-gray-100 text-gray-800
    statusColor: '#f59e0b', // bg-yellow-500
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    role: 'Staff',
    lastActive: '1 week ago',
    status: 'Active',
    avatarSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCldqP81x-YhD2ehty2_1ZIx0j1wxu6UVVJXFPktu3Si-A_1j05MzWpVQ2dhN4de4gO9XAqX8Latd5kDD93axYyxz41Odzdi3IkOqFATgUPMN7AMdJj-yqH3MxbJTo-5aQylOPRwSHWFT6IfG5yFZelZgVTaXTRPddtfvDzWa_5rl-9TkR1tO-DLYKjkAVn3Q0InCvhsLAh4F7UbJG773KmuSZ1uVTcWFj7HX67j5xBVBCC93jf63dx686bDe8_rM06MvDqiJ86T1I',
    roleStyle: { backgroundColor: '#f3f4f6', color: '#374151' },
    statusColor: '#10b981',
  },
];

// --- Helper Components ---

const TableRow = ({ member }) => {
  return (
    <tr
      style={{
        borderBottom: '1px solid #e5e7eb', // border-b dark:border-gray-800
        transition: styles.transition,
        // In a real app, you'd handle hover with state or a CSS-in-JS library, 
        // but for inline-only, we stick to non-interactive styles:
        // ':hover': { backgroundColor: '#f9fafb' }, // hover:bg-gray-50
      }}
    >
      <td style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            style={{ height: '40px', width: '40px', borderRadius: styles.borderRadius.full, objectFit: 'cover' }}
            alt={`Avatar of ${member.name}`}
            src={member.avatarSrc}
          />
          <div>
            <div style={{ fontWeight: 500, color: '#1f2937' }}>{member.name}</div>
            <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{member.email}</div>
          </div>
        </div>
      </td>
      <td style={{ padding: '1rem 1.5rem' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.125rem 0.625rem', // px-2.5 py-0.5
            borderRadius: styles.borderRadius.full,
            fontSize: '0.75rem',
            fontWeight: 500,
            ...member.roleStyle,
          }}
        >
          {member.role}
        </span>
      </td>
      <td style={{ padding: '1rem 1.5rem', color: '#6b7280' }}>{member.lastActive}</td>
      <td style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              height: '8px',
              width: '8px',
              borderRadius: styles.borderRadius.full,
              backgroundColor: member.statusColor,
            }}
          ></span>
          <span style={{ color: '#4b5563' }}>{member.status}</span>
        </div>
      </td>
      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
        <button
          style={{
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: styles.transition,
            // ':hover': { color: '#374151' }, // hover:text-gray-700
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px', verticalAlign: 'middle' }}>more_vert</span>
        </button>
      </td>
    </tr>
  );
};

// --- Main Component ---
const TeamsPageInline = () => {
  const primaryButtonBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: styles.borderRadius.DEFAULT,
    height: '40px', // h-10
    padding: '0 1rem', // px-4
    backgroundColor: styles.primary,
    color: styles.white,
    fontSize: '0.875rem',
    fontWeight: 700, // font-bold
    boxShadow: styles.shadowSm.boxShadow,
    cursor: 'pointer',
    border: 'none',
    transition: styles.transition,
    // ':hover': { backgroundColor: `${styles.primary}E6` }, // hover:bg-primary/90
  };

  const secondaryButtonBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: styles.borderRadius.DEFAULT,
    height: '40px', // h-10
    padding: '0 1rem', // px-4
    backgroundColor: `${styles.primary}1A`, // bg-primary/10
    color: styles.primary,
    fontSize: '0.875rem',
    fontWeight: 700, // font-bold
    cursor: 'pointer',
    border: 'none',
    transition: styles.transition,
    // ':hover': { backgroundColor: `${styles.primary}33` }, // hover:bg-primary/20
  };
  
  const inputBase = {
    padding: '0.5rem 0.75rem',
    borderRadius: styles.borderRadius.DEFAULT,
    border: '1px solid #e5e7eb', // border-gray-200
    backgroundColor: styles.white,
    color: '#1f2937',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    // Focus styles need JavaScript or a CSS-in-JS library to emulate properly inline, so we use simple border color here
    // ':focus': { borderColor: styles.primary, outline: 'none', boxShadow: `0 0 0 3px ${styles.primary}80` }, 
  };
  
  const inputWithIcon = {
      ...inputBase,
      paddingLeft: '2.5rem', // pl-10
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        backgroundColor: styles.backgroundLight,
        fontFamily: styles.fontDisplay,
        color: '#374151', // text-gray-800
      }}
    >
      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Page title and description (moved out of header for consistency) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              <PageTitle>Teams</PageTitle>
              <Paragraph>Manage users, their roles, access, and permissions.</Paragraph>
          </div>

          {/* Header and Actions */}
          <header
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* left side intentionally left minimal so title sits above */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Search Input */}
              <div style={{ position: 'relative', width: '288px' }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    fontSize: '24px',
                  }}
                >
                  search
                </span>
                <input
                  style={{ ...inputWithIcon, width: '100%', height: '40px' }}
                  placeholder="Search by name or email"
                  type="text"
                />
              </div>
              {/* Invite Member Button */}
              <button style={primaryButtonBase}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: `'FILL' 1` }}>
                  mail
                </span>
                <span>Invite Member</span>
              </button>
            </div>
          </header>

          {/* Teams Table Card */}
          <div
            style={{
              backgroundColor: styles.white,
              borderRadius: styles.borderRadius.xl, // rounded-xl
              boxShadow: styles.shadowSm.boxShadow,
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ minWidth: '100%', fontSize: '0.875rem', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', backgroundColor: '#f9fafb' }}>
                  <tr>
                    <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>User</th>
                    <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Role</th>
                    <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Last active</th>
                    <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '0.75rem 1.5rem', fontWeight: 500 }}>
                      <span style={{ clip: 'rect(0 0 0 0)', border: 0, height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', width: '1px' }}>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <TableRow key={index} member={member} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer/Pagination and Roles Button */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <span>Rows per page:</span>
                <select
                  style={{
                    ...inputBase,
                    padding: '0.25rem 2rem 0.25rem 0.5rem', // p-1 pr-8
                    fontSize: '0.875rem',
                    borderRadius: styles.borderRadius.DEFAULT,
                    height: 'auto',
                    width: 'auto',
                  }}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              {/* Manage Roles Button */}
              <button style={secondaryButtonBase}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>settings</span>
                <span>Manage Roles & Permissions</span>
              </button>
            </div>
          </div>

          {/* Invite New Member Section Card */}
          <div
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: styles.white,
              borderRadius: styles.borderRadius.xl,
              boxShadow: styles.shadowSm.boxShadow,
              border: '1px solid #e5e7eb', // border-gray-200
            }}
          >
            <SectionTitle>Invite New Member</SectionTitle>
            <Paragraph>Enter an email and select a role to send an invitation.</Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input
                style={{ ...inputBase, flexGrow: 1, height: '40px' }}
                placeholder="name@company.com"
                type="email"
              />
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select
                  style={{
                    ...inputBase,
                    height: '40px',
                    width: '100%',
                    minWidth: '150px',
                    marginRight: '1rem', // Added some spacing when it wraps
                  }}
                >
                  <option>Select a role</option>
                  <option>Admin</option>
                  <option>Staff</option>
                </select>
                {/* Send Invite Button */}
                <button style={{...primaryButtonBase, width: '100%', minWidth: '150px'}}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>send</span>
                  <span>Send Invite</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamsPageInline;