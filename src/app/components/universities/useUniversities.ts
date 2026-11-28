import { useCallback, useEffect, useState } from 'react';
import { fetchUniversities, type PublicUniversity } from '../../lib/universities';

export function useUniversities() {
  const [items, setItems] = useState<PublicUniversity[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    fetchUniversities()
      .then((d) => live && setItems(d))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setError(false);
    setItems(null);
    setAttempt((n) => n + 1);
  }, []);

  return { items, error, loading: items === null && !error, retry };
}
