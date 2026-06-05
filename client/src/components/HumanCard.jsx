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
  const formId = `FORM-${String(id).padStart(3, '0')}`;

  return (
    <div className="human-card paper-form">
      <div className="human-card-header paper-form-header">
        HUMAN PERFORMANCE GRIEVANCE FORM — {formId}
      </div>
      <div className="human-card-body">
        <div className="human-card-seal-row">
          <div className="human-avatar">{name?.[0]}</div>
          <div className="human-card-ident">
            <p className="human-subject-id">SUBJECT ID: {subjectId}</p>
            <h2 className="human-name">{name}</h2>
          </div>
        </div>

        <div className="human-card-rows">
          <div className="data-row">
            <span className="data-label">Habitat</span>
            <span className="human-known-for data-value">{knownFor || 'UNREGISTERED'}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Bio</span>
            <span className="human-bio data-value">{bio || 'NO BIOGRAPHICAL RECORD ON FILE'}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Performance Rating</span>
            <span className="data-value">
              <Stars rating={averageRating} /> {Number(averageRating || 0).toFixed(1)}
            </span>
          </div>
          <div className="data-row">
            <span className="data-label">Grievance Count</span>
            <span className="human-review-count data-value">{reviewCount} Incident Logs</span>
          </div>
        </div>

        <div className="human-card-action">
          <Link className="human-card-btn mechanical-button" to={profilePath}>ACCESS RECORD</Link>
          <span className="stamp"><span className="spark-glow">S.P.A.R.K.</span></span>
        </div>
      </div>
    </div>
  );
}
