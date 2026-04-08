import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface Props {
  isOpen: boolean;
}

const navItems = [
  {
    id: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="4" rx="1.5" />
        <rect x="14" y="10" width="7" height="11" rx="1.5" />
        <rect x="3" y="13" width="7" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'excel',
    path: '/excel',
    label: 'Excel Sheet',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
        <path d="M14 3v6h6" />
        <path d="M14 3l6 6v10a2 2 0 0 1-2 2h-4" />
        <path d="m8 11 4 6" />
        <path d="m12 11-4 6" />
      </svg>
    ),
  },
  {
    id: 'documents',
    path: '/documents',
    label: 'Documents',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </svg>
    ),
  },
  {
    id: 'file-manager',
    path: '/file-manager',
    label: 'File Manager',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.54V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.54-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.54V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.54 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.4.3.9.47 1.4.47H21a2 2 0 1 1 0 4h-.2c-.5 0-1 .17-1.4.53Z" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen }: Props) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.app.user);

  if (!isOpen) {
    return (
      <aside
        style={{
          width: 44,
          background: 'var(--bg)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 8,
          gap: 4,
          flexShrink: 0,
        }}
      >
        {navItems.map(item => (
          <NavLink key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <div
                data-tooltip={item.label}
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'all var(--tr)',
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {item.icon}
              </div>
            )}
          </NavLink>
        ))}
      </aside>
    );
  }

  return (
    <aside
      style={{
        width: 200,
        background: 'var(--bg)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {/* Workspace selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 8px',
            marginBottom: 12,
            border: '1px solid var(--border)',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all var(--tr)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.6rem',
              fontWeight: 800,
              borderRadius: 5,
              flexShrink: 0,
              color: 'var(--bg)',
            }}
          >
            {user?.name ? user.name[0].toUpperCase() : 'G'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'Workspace'}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{user?.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>⌄</span>
        </div>

        {/* Navigation */}
        <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 6px' }}>
          Navigation
        </div>
        {navItems.map(item => (
          <NavLink key={item.id} to={item.path} style={{ textDecoration: 'none', display: 'block' }}>
            {({ isActive }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '6px 8px',
                  borderRadius: 7,
                  cursor: 'pointer',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  transition: 'all 0.12s',
                  marginBottom: 2,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: 13, flexShrink: 0, width: 16, textAlign: 'center' }}>{item.icon}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
              </div>
            )}
          </NavLink>
        ))}

        {/* Recent files */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 8px 6px' }}>
            Recent
          </div>
          {[
            { name: 'Q4 Financial Model.xlsx', icon: '⊞' },
            { name: 'Sales Dashboard.xlsx', icon: '⊞' },
            { name: 'Project Proposal.docx', icon: '◱' },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 8px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background var(--tr)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dim)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => navigate('/excel')}
            >
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{f.icon}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {f.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: storage & upgrade */}
      <div style={{ padding: '10px', borderTop: '1px solid var(--border)' }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.7rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Storage</span>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>3.4 / 5 GB</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '68%' }} />
          </div>
        </div>
        <button className="btn btn-outline btn-sm w-full" style={{ fontSize: '0.72rem' }} onClick={() => navigate('/settings')}>
          ↑ Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}
