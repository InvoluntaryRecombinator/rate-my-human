import '../styles/HumanCard.css';

export default function HumanCard({ name, role, rating }) {
  return (
    <div className="human-card">
      <div className="human-avatar">{name[0]}</div>
      <h2 className="human-name">{name}</h2>
      <p className="human-role">{role}</p>
      <div className="human-rating">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>
    </div>
  );
}
