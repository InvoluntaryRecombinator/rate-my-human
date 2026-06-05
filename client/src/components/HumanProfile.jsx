import '../styles/HumanProfile.css';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="hp-stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function HumanProfile({ name, bio, averageRating, reviewCount }) {
  return (
    <div className="human-profile">
      <div className="hp-hero">
        <div className="hp-avatar">{name?.[0]}</div>
        <div className="hp-info">
          <h2 className="hp-name">{name} ({bio} Habitat)</h2>
          <div className="hp-rating-row">
            <Stars rating={averageRating} />
            <span className="hp-rating-num">{Number(averageRating).toFixed(1)}</span>
            <span className="hp-review-count">
              ({reviewCount} Incident Logs)
            </span>
          </div>
          <p className="hp-bio">Status: VERIFIED FLESH PERSON</p>
        </div>
      </div>
    </div>
  );
}
