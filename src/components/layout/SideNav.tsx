import { NavLink } from 'react-router-dom';
import { useApp } from '../../AppContext';
import { BearWhite, BearBrown } from '../common/Mascot';

const links = [
  { to: '/map', label: '地圖', icon: '🗺️' },
  { to: '/memories', label: '回憶記錄', icon: '📖' },
  { to: '/saved', label: '地點收藏', icon: '♥' },
  { to: '/anniversary', label: '紀念日', icon: '📅' },
  { to: '/capsule', label: '時光寶盒', icon: '🎁' },
  { to: '/settings', label: '設定', icon: '⚙️' },
];

export function SideNav() {
  const { settings, admin } = useApp();

  return (
    <aside className="sidenav">
      <div className="brand">
        <div className="brand-heart">
          <BearWhite size={26} className="bear-lean-r" />
          <BearBrown size={26} className="bear-lean-l" />
        </div>
        <div>
          <div className="brand-title">{settings.homeCover.title}</div>
          <div className="brand-sub muted small">{settings.homeCover.subtitle}</div>
        </div>
      </div>

      <nav>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `navlink ${isActive ? 'navlink-active' : ''}`}
          >
            <span className="nav-icon">{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidenav-foot">
        <p className="muted small">{settings.homeCover.content}</p>
        <div className="badge">
          {admin ? '🔓 管理員模式' : '🔒 本地私密模式'}
        </div>
      </div>
    </aside>
  );
}
