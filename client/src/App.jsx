import { useState } from 'react';
import Header from './components/Header';
import HumanCard from './components/HumanCard';
import HumanProfile from './components/HumanProfile';
import ReviewForm from './components/ReviewForm';
import './App.css';

const HUMANS = [
  {
    name: 'Michael',
    bio: 'Frontend engineer with a passion for pixel-perfect UIs and blaming CSS.',
    knownFor: 'Aggressive use of flexbox',
    averageRating: 4,
    reviewCount: 2,
    reviews: [
      {
        applianceName: 'Michael',
        applianceType: 'Toaster',
        rating: 4,
        title: 'Gets the job done, eventually',
        body: 'Runs hot on deadlines but produces acceptable output. Prone to overheating when CSS is involved.',
        mood: 'Overheats',
      },
      {
        applianceName: 'Michael',
        applianceType: 'Microwave',
        rating: 4,
        title: 'Loud but effective',
        body: 'Makes a lot of noise about responsive design but ultimately delivers a warm result.',
        mood: 'Loud-Motor',
      },
    ],
  },
  {
    name: 'Jordan',
    bio: 'Backend architect and database whisperer. Speaks fluent SQL and sarcasm.',
    knownFor: 'Writing migrations that actually work',
    averageRating: 5,
    reviewCount: 2,
    reviews: [
      {
        applianceName: 'Jordan',
        applianceType: 'Refrigerator',
        rating: 5,
        title: 'Cold, efficient, reliable',
        body: 'Keeps everything running smoothly at all times. Never loses data, rarely loses composure.',
        mood: 'Cold-Personality',
      },
      {
        applianceName: 'Jordan',
        applianceType: 'Dishwasher',
        rating: 5,
        title: "Cleans up everyone's messes",
        body: 'Silently fixes bugs introduced by teammates and asks for nothing in return.',
        mood: 'Passive-Aggressive',
      },
    ],
  },
  {
    name: 'Phil',
    bio: 'Full-stack connector. Wires the frontend to the backend and prays nothing breaks.',
    knownFor: 'Making fetch() happen',
    averageRating: 3,
    reviewCount: 2,
    reviews: [
      {
        applianceName: 'Phil',
        applianceType: 'Microwave',
        rating: 3,
        title: 'Intermittent connectivity issues',
        body: 'Sometimes the API calls go through. Sometimes they do not. Phil is investigating.',
        mood: 'Flickering',
      },
      {
        applianceName: 'Phil',
        applianceType: 'Toaster',
        rating: 3,
        title: 'Mostly operational',
        body: 'Handles the wiring competently but occasionally toasts the wrong endpoint.',
        mood: 'Crossed-Wires',
      },
    ],
  },
];

export default function App() {
  const [selectedHuman, setSelectedHuman] = useState(null);

  return (
    <>
      <Header />
      <ReviewForm />
      {selectedHuman ? (
        <HumanProfile
          {...selectedHuman}
          onBack={() => setSelectedHuman(null)}
        />
      ) : (
        <main className="card-grid">
          {HUMANS.map((h) => (
            <HumanCard
              key={h.name}
              {...h}
              onView={() => setSelectedHuman(h)}
            />
          ))}
        </main>
      )}
    </>
  );
}
