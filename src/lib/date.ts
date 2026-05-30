const DAY = 24 * 60 * 60 * 1000;

export function daysTogether(anniversaryIso: string): number {
  const start = new Date(anniversaryIso + 'T00:00:00');
  if (isNaN(start.getTime())) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - start.getTime()) / DAY) + 1;
}

// 紀念日 -> 預設 4 位解鎖碼 (MMDD)
export function codeFromAnniversary(anniversaryIso: string): string {
  const d = new Date(anniversaryIso + 'T00:00:00');
  if (isNaN(d.getTime())) return '0000';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return mm + dd;
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export function yearMonthLabel(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return '未知日期';
  return `${d.getFullYear()}年 ${d.getMonth() + 1}月`;
}

// 將項目按「年月」分組,並由新到舊排序
export function groupByMonth<T>(
  items: T[],
  getIso: (item: T) => string,
): { label: string; items: T[] }[] {
  const sorted = [...items].sort(
    (a, b) => getIso(b).localeCompare(getIso(a)),
  );
  const groups: { label: string; items: T[] }[] = [];
  for (const item of sorted) {
    const label = yearMonthLabel(getIso(item));
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(item);
    else groups.push({ label, items: [item] });
  }
  return groups;
}

// 里程碑 (在一起日數)
export const MILESTONES = [100, 200, 300, 365, 520, 730, 1000, 1314];

export function nextMilestone(days: number): number | null {
  return MILESTONES.find((m) => m > days) ?? null;
}
