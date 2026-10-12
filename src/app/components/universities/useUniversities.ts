import { useEffect, useState } from 'react';
import { fetchUniversities, type PublicUniversity } from '../../lib/universities';

export function useUniversities() {
  const [items, setItems] = useState<PublicUniversity[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let live = true;
    fetchUniversities()
      .then((d) => live && setItems(d))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, []);

  return { items, error, loading: items === null && !error };
}
