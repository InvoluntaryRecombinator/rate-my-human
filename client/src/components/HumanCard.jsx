import { Link } from 'react-router-dom';
import '../styles/HumanCard.css';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="human-rating">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function HumanCard({ id, name, bio, knownFor, averageRating, reviewCount, to }) {
  const profilePath = to || `/human/${id}`;

  return (
    <div className="human-card">
      <div className="human-avatar">{name?.[0]}</div>
      <h2 className="human-name">{name}</h2>
      <p className="human-bio">{bio}</p>
      <p className="human-known-for">{knownFor}</p>
      <Stars rating={averageRating} />
      <p className="human-review-count">
        {reviewCount} complaint{reviewCount !== 1 ? 's' : ''} on file
      </p>
      <Link className="human-card-btn" to={profilePath}>View Case</Link>
    </div>
  );
}
