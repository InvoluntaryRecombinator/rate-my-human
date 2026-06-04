import Header from './components/Header';
import HumanCard from './components/HumanCard';
import ReviewForm from './components/ReviewForm';
import './App.css';

const HUMANS = [
  { name: 'Michael', role: 'Frontend', rating: 4 },
  { name: 'Jordan',  role: 'Backend',  rating: 5 },
  { name: 'Phil',    role: 'Wiring',   rating: 3 },
];

export default function App() {
  return (
    <>
      <Header />
      <ReviewForm />
      <main className="card-grid">
        {HUMANS.map((h) => (
          <HumanCard key={h.name} {...h} />
        ))}
      </main>
    </>
  );
}
