import { NavLink } from 'react-router-dom';
import {
  MessageCircle,
  LayoutDashboard,
  User,
  Shield,
  Sparkles,
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
          <Shield size={24} />
          <Sparkles size={12} className="sidebar-logo-sparkle" />
        </div>
        <div className="sidebar-logo-text">
          <span className="gradient-text" style={{ fontWeight: 800, fontSize: '1.1rem' }}>
            InnerProof
          </span>
          <span className="text-small" style={{ fontSize: '0.7rem', display: 'block', marginTop: '-2px' }}>
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
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-badge">
          <Shield size={14} />
          <span>Privacy First</span>
        </div>
        <p className="text-small" style={{ fontSize: '0.7rem', textAlign: 'center' }}>
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
          padding: 24px 16px;
          background: rgba(15, 14, 23, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--surface-border);
          z-index: 50;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px 24px;
          border-bottom: 1px solid var(--surface-border);
          margin-bottom: 24px;
        }

        .sidebar-logo-icon {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
          border-radius: var(--radius-md);
          color: white;
        }

        .sidebar-logo-sparkle {
          position: absolute;
          top: -4px;
          right: -4px;
          color: var(--warning);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all var(--transition-fast);
        }

        .sidebar-link:hover {
          background: var(--surface-glass-hover);
          color: var(--text-primary);
        }

        .sidebar-link-active {
          background: linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(56, 178, 172, 0.08));
          color: var(--text-primary);
          border: 1px solid rgba(108, 99, 255, 0.2);
        }

        .sidebar-footer {
          padding-top: 16px;
          border-top: 1px solid var(--surface-border);
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
          background: rgba(74, 222, 128, 0.1);
          border: 1px solid rgba(74, 222, 128, 0.2);
          border-radius: var(--radius-full);
          color: var(--success);
          font-size: 0.75rem;
          font-weight: 600;
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
            border-top: 1px solid var(--surface-border);
          }

          .sidebar-logo,
          .sidebar-footer {
            display: none;
          }

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
