import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useApp } from './AppContext';
import { isUnlocked } from './data/settings';
import { SideNav } from './components/layout/SideNav';
import { LockScreen } from './pages/LockScreen';
import { MapPage } from './pages/MapPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { SavedPlacesPage } from './pages/SavedPlacesPage';
import { AnniversaryPage } from './pages/AnniversaryPage';
import { TimeCapsulePage } from './pages/TimeCapsulePage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const { settingsLoading } = useApp();
  const [unlocked, setUnlocked] = useState(isUnlocked());

  if (settingsLoading) {
    return <div className="boot">載入緊…</div>;
  }

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="app-shell">
      <SideNav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/saved" element={<SavedPlacesPage />} />
          <Route path="/anniversary" element={<AnniversaryPage />} />
          <Route path="/capsule" element={<TimeCapsulePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/map" replace />} />
        </Routes>
      </main>
    </div>
  );
}
