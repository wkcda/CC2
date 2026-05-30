import { useApp } from '../../AppContext';
import { useAnniversary } from '../../hooks/useAnniversary';
import { formatDate } from '../../lib/date';

export function AnniversaryWidget() {
  const { settings } = useApp();
  const { days } = useAnniversary(settings.anniversaryDate);

  return (
    <div className="widget">
      <div className="widget-head">
        <span>紀念日</span>
      </div>
      <div className="anniv-row">
        <div>
          <div className="anniv-label">我們在一起</div>
          <div className="muted small">
            從 {formatDate(settings.anniversaryDate)} 開始
          </div>
        </div>
        <div className="anniv-days">
          {days} <span>天</span>
        </div>
      </div>
    </div>
  );
}
