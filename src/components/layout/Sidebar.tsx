import { NavLink } from 'react-router-dom';
import {
  MessageCircle,
  LayoutDashboard,
  User,
  Shield,
} from 'lucide-react';

const navItems = [
  { label: 'Chat', path: '/chat', icon: MessageCircle },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/profile', icon: User },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Shield size={18} strokeWidth={1.5} />
        </div>
        <div className="sidebar-logo-text">
          <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
            InnerProof
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.6rem', display: 'block', marginTop: '-1px', color: 'var(--platinum)' }}>
            Your Mind, Your Proof
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <Icon size={18} strokeWidth={1.5} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-badge">
          <Shield size={10} strokeWidth={1.5} />
          <span>Privacy First</span>
        </div>
        <p style={{ fontSize: '0.6rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Zero PII collected.<br />Your data stays yours.
        </p>
      </div>

      <style>{`
        .sidebar {
          width: 240px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 28px 16px;
          background: rgba(8, 8, 8, 0.85);
          backdrop-filter: blur(24px) saturate(1.1);
          -webkit-backdrop-filter: blur(24px) saturate(1.1);
          border-right: 1px solid var(--glass-border);
          z-index: 50;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px 28px;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 28px;
        }

        .sidebar-logo-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--platinum);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all var(--transition-base);
          border: 1px solid transparent;
        }

        .sidebar-link:hover {
          background: var(--glass-bg-hover);
          color: var(--text-primary);
          border-color: var(--glass-border);
        }

        .sidebar-link-active {
          background: var(--glass-bg-hover);
          color: var(--text-primary);
          border-color: var(--glass-border-hover);
          box-shadow: var(--glow-white);
        }

        .sidebar-footer {
          padding-top: 20px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .sidebar-footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          color: var(--text-muted);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: fixed;
            bottom: 0;
            top: auto;
            flex-direction: row;
            padding: 8px 16px;
            border-right: none;
            border-top: 1px solid var(--glass-border);
          }
          .sidebar-logo, .sidebar-footer { display: none; }
          .sidebar-nav {
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }
          .sidebar-link {
            flex-direction: column;
            gap: 4px;
            padding: 8px 16px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </aside>
  );
}
