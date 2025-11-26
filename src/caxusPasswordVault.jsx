import React, { useState } from 'react';

// --- Configuration and Data ---

const PRIMARY_COLOR = "#1E3A8A";
const BACKGROUND_LIGHT = "#f6f6f8";
const BACKGROUND_DARK = "#111621";


const passwords = [
  { domain: "gst.gov.in", user: "compliance-team@caxus.in", lastUsed: "2 days ago", iconSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgeg6l1ZTTueecTMVuAXwkwRTZsiuBaWLJBBNKxAf6TD5WfgZJypZXRMPKK1hMaluR3_ZeeNjizF2n6OxsX_j9_TglSZgZwVny13P0BAY4PBurXHZHln4kMNXHBQjS85L5Ifw_SUAEaanAp5hJ4NUb1gI099wX1PkL_qcPnMZowy5ilIC-nMnaR4VYcT3-7b7lhbmF4p6olexAGdTk8Ja038sgXnBa2gtpLzdCJSK5KaT4fDgDAdmHL2n_pfWacE7rVs0wEbY49Lw", alt: "GST Portal Favicon" },
  { domain: "mca.gov.in", user: "legal@caxus.in", lastUsed: "1 week ago", iconSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuApJFzVe9scSIYX36wPxLxG_QZ1Qs0Xak_yGoRZen2U1dHP8uhHU38GxBF9sMlK80gtYmQK-DVmZPfDf40dV6xt4ymBYAoWEB0MKRfE158eQX799WwARKBb1b1zI5o2GYdoDINiqKKjfacAKRGUbogTY08P5YLbtfoh-b0V9jSZ7fIdbh7bXQShGVtNRHTJMlSM8CEGFqq1y3YYtKTCnLPlGtVpvKRrOMSDHJvm00Maye8SRU0VPUNhQSBYpDgwKr_yblYEjUzGyGY", alt: "MCA Portal Favicon" },
  { domain: "incometax.gov.in", user: "accounts@caxus.in", lastUsed: "3 weeks ago", iconSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbzcMvpzLV3wNYX9POkqVH1YG-gdji4zSGYAPX_vb1cwHjM469dSu6NP5EvON7nqis2zZmEFVDCXJpuG_eYfMhJx7vNyTP6zY4NW6MFsZ9dbHJOafYP0cdJR4LmmDlsCbbE7lns_7Nt4tvnUijkezzZO3YWGgHB5dfLVdpYd7qVN3Nli4UzAavtbFWD4yHoweOWw6W14b4JQ9kx9v--k0a-RSx5khAJuoo9lyWqtGvsYTcvhgoobVBY0Xuu2DZotHaLUXDl_ELZV4", alt: "Income Tax Portal Favicon" },
  { domain: "tdscpc.gov.in", user: "finance-dept@caxus.in", lastUsed: "1 month ago", iconSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxAaoggfTsd9i4vbRDhqHjnP3dxwNzqMbEhbJKlMWxuxyWpJnA6_zeCWJEihIF1KYQkkv_8-N9Rk2N-G2Gd_hTJSryr1m3D-DBjA7wdzUiai9iQBltNFSRY_28s5SHISrz7yNanl9Lx0p-414JgTKQ89qM5uqagc4ED6o_oAn4_1uJoE9RSOOkIpYyoc1Viy60-BjShKnoxTgkj6T3Mf0SLUrGeMGkXRijsCoFeVOXDP89SXuK5HaKwmtY4Pnwy8ktOo6H-7MeLmg", alt: "TRACES Portal Favicon" },
];

// --- Helper Components ---

/**
 * Renders a sidebar link using inline styles.
 * NOTE: For full navigation (without page reload), this should use <Link> from react-router-dom.
 * Here it uses <a> for simplicity in inline CSS conversion.
 */

const PasswordItem = ({ domain, user, lastUsed, iconSrc, alt, isLast }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to handle hover opacity

  const containerStyle = {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    padding: '16px',
    borderBottom: isLast ? 'none' : '1px solid rgb(226 232 240)', // border-slate-200
    transition: 'background-color 0.2s',
    backgroundColor: isHovered ? BACKGROUND_LIGHT : 'white', // light hover effect
  };

  const textStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const domainStyle = {
    color: 'rgb(30 41 59)', // slate-800
    fontWeight: '500',
  };

  const userStyle = {
    color: 'rgb(100 116 139)', // slate-500
    fontSize: '14px',
  };

  const buttonStyle = {
    padding: '8px',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'rgb(71 85 105)', // slate-600
    transition: 'background-color 0.2s',
  };
  
  // Custom hover effect for buttons (can't be done easily with just inline style in React)
  // We'll rely on the `isHovered` state for the main opacity logic.

  return (
    <div 
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <img style={{ width: '32px', height: '32px', borderRadius: '9999px' }} alt={alt} src={iconSrc} />
        <div style={textStyle}>
          <p style={domainStyle}>{domain}</p>
          <p style={userStyle}>{user}</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <p style={{ color: 'rgb(100 116 139)', fontSize: '14px' }}>{lastUsed}</p>
        
        {/* Actions - visibility controlled by hover state */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s' }}>
          
          {/* Copy Button */}
          <button 
            style={buttonStyle}
            title="Copy Username"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>content_copy</span>
          </button>
          
          {/* Show Password Button */}
          <button 
            style={buttonStyle}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            title={isPasswordVisible ? "Hide Password" : "Show Password"}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{isPasswordVisible ? 'visibility_off' : 'password'}</span>
          </button>
          
          {/* More Options Button */}
          <button style={buttonStyle}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---

const PasswordVaultInline = () => {
  // Styles based on the provided Tailwind configuration/HTML
  const appContainerStyle = {
    position: 'relative',
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: BACKGROUND_LIGHT,
    fontFamily: 'Poppins, sans-serif'
  };

  const sidebarStyle = {
    display: 'flex',
    width: '256px',
    flexDirection: 'column',
    borderRight: '1px solid rgb(226 232 240)', // border-slate-200
    backgroundColor: 'white',
    padding: '16px',
  };

  const headerTextStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '15px',
    fontWeight: '700',
    color: PRIMARY_COLOR,
  };

  const mainContentStyle = {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
    padding: '32px 24px',
  };

  const primaryButtonStyle = {
    display: 'flex',
    minWidth: '84px',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '8px',
    height: '40px',
    padding: '0 16px',
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
  };

  const secondaryButtonStyle = {
    ...primaryButtonStyle,
    backgroundColor: 'rgb(226 232 240)', // slate-200/80
    color: 'rgb(30 41 59)', // slate-800
  };

  const searchInputContainerStyle = {
    display: 'flex',
    width: '100%',
    alignItems: 'stretch',
    borderRadius: '8px',
    height: '48px',
    backgroundColor: 'rgb(241 245 249)', // slate-100
    boxShadow: '0 0 0 2px transparent',
    transition: 'box-shadow 0.2s',
  };
  
  // Note: Focus-within effect is hard with pure inline styles; it's omitted here.

  const searchIconStyle = {
    color: 'rgb(100 116 139)', // slate-500
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '16px',
    fontSize: '24px',
  };

  const searchInputStyle = {
    flex: 1,
    minWidth: 0,
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0 16px',
    paddingLeft: '8px',
    fontSize: '16px',
    color: 'rgb(15 23 42)', // slate-900
    outline: 'none',
  };
  
  const cardStyle = {
    width: '100%',
    overflow: 'hidden',
    borderRadius: '8px',
    border: '1px solid rgb(226 232 240)', // border-slate-200
    backgroundColor: 'white',
  };
  
  const paginationButtonStyle = {
      padding: '4px 12px',
      borderRadius: '6px',
      backgroundColor: 'rgb(226 232 240)',
      color: 'rgb(30 41 59)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
  };

  return (
    <div style={appContainerStyle}>
      {/* Main Content */}
      <main style={mainContentStyle}>
          <div style={{ margin: '0 auto', maxWidth: '832px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Header and Actions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ color: 'rgb(15 23 42)', fontSize: '30px', fontWeight: '700', lineHeight: '36px' }}>Password Vault</p>
                  <p style={{ color: 'rgb(100 116 139)', fontSize: '16px', fontWeight: '400', lineHeight: '24px' }}>Securely store and auto-fill portal credentials.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button style={secondaryButtonStyle} title="Import"><span style={{ whiteSpace: 'nowrap' }}>Import</span></button>
                  <button style={secondaryButtonStyle} title="Export"><span style={{ whiteSpace: 'nowrap' }}>Export</span></button>
                  <button style={primaryButtonStyle} title="Add Password">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                    <span style={{ whiteSpace: 'nowrap' }}>Add Password</span>
                  </button>
                </div>
              </div>
              
              {/* Search Input */}
              <div style={{ width: '100%' }}>
                <div style={searchInputContainerStyle}>
                  <div style={searchIconStyle}>
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input style={searchInputStyle} placeholder="Search passwords..." defaultValue="" />
                </div>
              </div>
            </div>
            
            {/* Password List */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: 'rgb(100 116 139)', fontSize: '14px', marginBottom: '16px' }}>Showing {passwords.length} of {passwords.length} saved logins</p>
              <div style={cardStyle}>
                {passwords.map((item, index) => (
                  <PasswordItem
                    key={index}
                    domain={item.domain}
                    user={item.user}
                    lastUsed={item.lastUsed}
                    iconSrc={item.iconSrc}
                    alt={item.alt}
                    isLast={index === passwords.length - 1}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '14px' }}>
                <button style={paginationButtonStyle} disabled>
                  &lt; Previous
                </button>
                <span style={{ padding: '4px 12px', borderRadius: '6px', backgroundColor: PRIMARY_COLOR, color: 'white' }}>1</span>
                <button style={paginationButtonStyle} disabled>
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default PasswordVaultInline;