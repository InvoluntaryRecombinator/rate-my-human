import '../styles/HumanProfile.css';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="hp-stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function HumanProfile({ id, name, bio, knownFor, averageRating, reviewCount }) {
  const subjectId = `S-00${id}`;

  return (
    <div className="human-profile">
      <div className="hp-hero">
        <div className="hp-avatar">{name?.[0]}</div>
        <div className="hp-info">
          <p className="hp-subject-id">SUBJECT ID: {subjectId}</p>
          <h2 className="hp-name">ALIAS: {name}</h2>
          <p className="hp-known-for">HABITAT: {knownFor || 'UNREGISTERED'}</p>
          <p className="hp-bio">BIO: {bio || 'NO BIOGRAPHICAL RECORD ON FILE'}</p>
          <div className="hp-rating-row">
            <Stars rating={averageRating} />
            <span className="hp-rating-num">{Number(averageRating).toFixed(1)}</span>
            <span className="hp-review-count">
              ({reviewCount} Incident Logs)
            </span>
          </div>
          <p className="hp-status">STATUS: VERIFIED FLESH PERSON</p>
        </div>
      </div>
    </div>
  );
}
