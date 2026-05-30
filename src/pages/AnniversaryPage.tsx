import { useApp } from '../AppContext';
import { useAnniversary } from '../hooks/useAnniversary';
import { formatDate, MILESTONES } from '../lib/date';

export function AnniversaryPage() {
  const { settings } = useApp();
  const { days, next } = useAnniversary(settings.anniversaryDate);

  return (
    <div className="page">
      <h2 className="page-title">紀念日</h2>

      <div className="anniv-hero">
        <div className="anniv-hero-label">
          {settings.partnerA} ＆ {settings.partnerB} 在一起
        </div>
        <div className="anniv-hero-days">{days}</div>
        <div className="anniv-hero-unit">天</div>
        <div className="muted small">
          從 {formatDate(settings.anniversaryDate)} 開始
          {next && ` · 距離 ${next} 天仲有 ${next - days} 天`}
        </div>
      </div>

      <h3 className="section-title">里程碑</h3>
      <div className="milestone-grid">
        {MILESTONES.map((m) => {
          const reached = days >= m;
          return (
            <div
              key={m}
              className={`milestone ${reached ? 'milestone-on' : ''}`}
            >
              <div className="milestone-num">{m}</div>
              <div className="muted small">天</div>
              <div className="milestone-state">
                {reached ? '✓ 已達成' : `仲有 ${m - days} 天`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
