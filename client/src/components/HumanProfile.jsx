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
    <div className="human-profile paper-form">
      <div className="hp-form-header paper-form-header">
        SUBJECT DOSSIER — FILE {subjectId}
      </div>
      <div className="hp-hero">
        <div className="hp-avatar">{name?.[0]}</div>
        <div className="hp-info">
          <p className="hp-subject-id">SUBJECT ID: {subjectId}</p>
          <h2 className="hp-name">{name}</h2>

          <div className="data-row">
            <span className="data-label">Habitat</span>
            <span className="hp-known-for data-value">{knownFor || 'UNREGISTERED'}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Bio</span>
            <span className="hp-bio data-value">{bio || 'NO BIOGRAPHICAL RECORD ON FILE'}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Performance Rating</span>
            <span className="data-value">
              <span className="hp-rating-row">
                <Stars rating={averageRating} />
                <span className="hp-rating-num">{Number(averageRating).toFixed(1)}</span>
                <span className="hp-review-count">({reviewCount} Incident Logs)</span>
              </span>
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Status</span>
            <span className="hp-status data-value">VERIFIED FLESH PERSON</span>
          </div>
        </div>
      </div>
    </div>
  );
}
