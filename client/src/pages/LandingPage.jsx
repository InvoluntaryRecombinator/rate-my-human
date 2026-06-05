import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HumanCard from '../components/HumanCard';

export default function LandingPage() {
  const [humans, setHumans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const trendingHumans = useMemo(() => {
    return [...humans]
      .sort((a, b) => {
        const logDelta = Number(b.reviewCount || 0) - Number(a.reviewCount || 0);
        if (logDelta !== 0) return logDelta;
        return Number(b.averageRating || 0) - Number(a.averageRating || 0);
      })
      .slice(0, 3);
  }, [humans]);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/directory?q=${encodeURIComponent(query)}` : '/directory');
  };

  return (
    <section className="page page-landing">
      <div className="landing-logo">Rate My Human</div>

      <section className="landing-entry">
        <h1>EVALUATE YOUR FLESH PERSON</h1>
        <p>Search the global database of registered humans.</p>

        <form className="landing-search" onSubmit={handleSearch}>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Target ALIAS, IP Address, or Habitat..."
            aria-label="Target ALIAS, IP Address, or Habitat"
          />
          <button className="mechanical-button" type="submit">SEARCH</button>
        </form>

        <div className="landing-or">- OR -</div>
        <Link className="landing-create-link mechanical-button" to="/human/new">+ INITIALIZE NEW HUMAN PROFILE</Link>
      </section>

      <section className="trending-section">
        <h2>TRENDING HUMANS</h2>
        {loading ? (
          <p className="system-message">[ MAINFRAME QUERY IN PROGRESS ]</p>
        ) : trendingHumans.length === 0 ? (
          <p className="system-message">[ ERROR: NO RECORDS FOUND IN MAINFRAME ]</p>
        ) : (
          <div className="card-grid">
            {trendingHumans.map((human) => (
              <HumanCard key={human.id} {...human} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
