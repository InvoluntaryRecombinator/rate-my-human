import '../styles/ReviewLog.css';

function Stars({ rating }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="rc-stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

function formatLogDate(createdAt) {
  if (!createdAt) return '';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(createdAt));
}

export default function ReviewLog({ applianceName, applianceType, rating, title, body, mood, createdAt }) {
  const logDate = formatLogDate(createdAt);

  return (
    <div className="review-card">
      <div className="rc-header">
        <div className="rc-avatar">{applianceName?.[0]}</div>
        <div className="rc-meta">
          <span className="rc-appliance-name">{applianceName} | Mood: {mood || 'Unspecified'}</span>
          <span className="rc-appliance-type">{applianceType}</span>
        </div>
      </div>
      <div className="rc-rating-row">
        <Stars rating={rating} />
        {logDate && <span className="rc-date">{logDate}</span>}
      </div>
      <h3 className="rc-title">{title}</h3>
      <p className="rc-body">"{body}"</p>
    </div>
  );
}
