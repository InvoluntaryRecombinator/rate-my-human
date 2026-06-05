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
      <h1>{query ? `SEARCH INDEX: ${query.toUpperCase()}` : 'REGISTERED SUBJECT DIRECTORY'}</h1>

      {loading ? (
        <p className="system-message">[ MAINFRAME QUERY IN PROGRESS ]</p>
      ) : filteredHumans.length === 0 ? (
        <p className="system-message">[ ERROR: NO RECORDS FOUND IN MAINFRAME ]</p>
      ) : (
        <div className="directory-results">
          {filteredHumans.map((human, index) => (
            <article className="directory-result terminal-panel" key={human.id}>
              <Link className="directory-avatar" to={`/human/${human.id}`}>
                {human.name?.[0]}
              </Link>
              <div className="directory-result-body">
                <h2>
                  <Link to={`/human/${human.id}`}>{index + 1}. SUBJECT ID: S-00{human.id}</Link>
                </h2>
                <p>ALIAS: {human.name}</p>
                <p>
                  <Stars rating={human.averageRating} /> {Number(human.averageRating || 0).toFixed(1)} ({human.reviewCount} Incident Logs)
                </p>
                <p>HABITAT: {human.knownFor || 'UNREGISTERED'}</p>
                <p>BIO: {human.bio || 'NO BIOGRAPHICAL RECORD ON FILE'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
