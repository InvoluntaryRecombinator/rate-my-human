import ReviewLog from './ReviewLog';
import '../styles/HumanProfile.css';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="hp-stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function HumanProfile({ name, bio, knownFor, averageRating, reviews, onBack }) {
  return (
    <div className="human-profile">
      <div className="hp-toolbar">
        <button className="hp-btn hp-btn-back" onClick={onBack}>← Back</button>
        <button className="hp-btn hp-btn-complaint">File a Complaint</button>
      </div>

      <div className="hp-hero">
        <div className="hp-avatar">{name[0]}</div>
        <div className="hp-info">
          <h2 className="hp-name">{name}</h2>
          <p className="hp-bio">{bio}</p>
          {knownFor && (
            <p className="hp-known-for">
              Known for: <span>{knownFor}</span>
            </p>
          )}
          <div className="hp-rating-row">
            <Stars rating={averageRating} />
            <span className="hp-rating-num">{Number(averageRating).toFixed(1)}</span>
            <span className="hp-review-count">
              {reviews.length} complaint{reviews.length !== 1 ? 's' : ''} on file
            </span>
          </div>
        </div>
      </div>

      <section className="hp-case-files">
        <h3 className="hp-section-heading">Case Files</h3>
        {reviews.length === 0 ? (
          <p className="hp-empty">No complaints on record.</p>
        ) : (
          <div className="hp-reviews-list">
            {reviews.map((review, i) => (
              <ReviewLog key={i} {...review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
