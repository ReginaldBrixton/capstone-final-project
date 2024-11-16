import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';

export function useFirestoreQuery(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        try {
          const data = snapshot.docs
            ? snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }))
            : snapshot.data();
          
          setData(data);
          setLoading(false);
          setError(null);
        } catch (err) {
          console.error('Error processing Firestore data:', err);
          setError(err);
          setLoading(false);
        }
      },
      (err) => {
        console.error('Firestore subscription error:', err);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
} 