import { useMemo } from 'react';
import { daysTogether, nextMilestone } from '../lib/date';

export function useAnniversary(anniversaryIso: string) {
  return useMemo(() => {
    const days = daysTogether(anniversaryIso);
    return { days, next: nextMilestone(days) };
  }, [anniversaryIso]);
}
