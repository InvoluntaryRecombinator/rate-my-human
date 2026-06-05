import '../styles/ReviewCard.css';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="rc-stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function ReviewLog({ applianceName, applianceType, rating, title, body, mood }) {
  return (
    <div className="review-card">
      <div className="rc-header">
        <div className="rc-meta">
          <span className="rc-appliance-name">{applianceName}</span>
          <span className="rc-appliance-type">{applianceType}</span>
        </div>
        <Stars rating={rating} />
      </div>
      <h3 className="rc-title">{title}</h3>
      <p className="rc-body">{body}</p>
      {mood && <span className="rc-mood">{mood}</span>}
    </div>
  );
}
