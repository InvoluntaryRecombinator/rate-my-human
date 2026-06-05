import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav" aria-label="Primary navigation">
        <Link className="header-brand" to="/">RATE MY HUMAN</Link>
        <div className="header-links">
          <NavLink to="/directory">directory</NavLink>
          <NavLink to="/human/new">+ add human</NavLink>
        </div>
        <div className="header-aside">
          <span className="header-sub">Powered by <span className="spark-glow">S.P.A.R.K.</span></span>
          <img src="/spark-man.png" alt="SPARK Representative" className="header-seal" />
        </div>
      </nav>
    </header>
  );
}
