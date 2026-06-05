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
  const subjectId = `S-00${id}`;

  return (
    <div className="human-card">
      <div className="human-avatar">{name?.[0]}</div>
      <p className="human-subject-id">SUBJECT ID: {subjectId}</p>
      <h2 className="human-name">ALIAS: {name}</h2>
      <p className="human-known-for">HABITAT: {knownFor || 'UNREGISTERED'}</p>
      <p className="human-bio">BIO: {bio || 'NO BIOGRAPHICAL RECORD ON FILE'}</p>
      <Stars rating={averageRating} />
      <p className="human-review-count">
        {reviewCount} Incident Logs
      </p>
      <Link className="human-card-btn" to={profilePath}>ACCESS RECORD</Link>
    </div>
  );
}
