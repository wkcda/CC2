import { useApp } from '../../AppContext';

export function ProgressStats() {
  const { places, settings } = useApp();
  const litCountries = new Set(places.map((p) => p.country));
  const countryCount = litCountries.size;
  const target = settings.targetCountries;
  const pct = Math.min(100, Math.round((countryCount / target) * 100));

  return (
    <div className="widget">
      <div className="widget-head">
        <span>我們的進度</span>
        <span className="muted small">Map of Us</span>
      </div>

      <div className="progress-row">
        <span>已點亮國家 / 地區</span>
        <strong>
          {countryCount} / {target}
        </strong>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="progress-row" style={{ marginTop: 10 }}>
        <span>已記錄地點</span>
        <strong>{places.length}</strong>
      </div>
    </div>
  );
}
