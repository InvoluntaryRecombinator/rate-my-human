import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
  return (
    <span className="directory-stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function DirectoryPage() {
  const [humans, setHumans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    fetch('/api/humans')
      .then((res) => res.json())
      .then((data) => {
        setHumans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching humans:', err);
        setLoading(false);
      });
  }, []);

  const filteredHumans = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const sortedHumans = [...humans].sort(
      (a, b) => Number(b.reviewCount || 0) - Number(a.reviewCount || 0),
    );

    if (!normalizedQuery) return sortedHumans;

    return sortedHumans.filter((human) => {
      const searchable = [
        human.name,
        human.bio,
        human.knownFor,
      ].join(' ').toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [humans, query]);

  return (
    <section className="page page-directory">
      <h1>
        RESULTS FOR: {query ? query.toUpperCase() : 'ALL REGISTERED HUMANS'} (Sorted by: Most Active Logs)
      </h1>

      {loading ? (
        <p className="system-message">[ MAINFRAME QUERY IN PROGRESS ]</p>
      ) : filteredHumans.length === 0 ? (
        <p className="system-message">[ ERROR: NO RECORDS FOUND IN MAINFRAME ]</p>
      ) : (
        <div className="directory-results">
          {filteredHumans.map((human, index) => (
            <article className="directory-result" key={human.id}>
              <Link className="directory-avatar" to={`/human/${human.id}`}>
                {human.name?.[0]}
              </Link>
              <div className="directory-result-body">
                <h2>
                  <Link to={`/human/${human.id}`}>{index + 1}. {human.name}</Link>
                </h2>
                <p>
                  <Stars rating={human.averageRating} /> {Number(human.averageRating || 0).toFixed(1)} ({human.reviewCount} Incident Logs)
                </p>
                <p>Habitat: {human.bio || 'UNREGISTERED'}</p>
                <p>💬 Toaster_04: "Promptly removes toast. Minimal crumb..."</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
