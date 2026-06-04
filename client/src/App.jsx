import { useState, useEffect } from 'react';
import Header from './components/Header';
import HumanCard from './components/HumanCard';
import HumanProfile from './components/HumanProfile';
import ReviewForm from './components/ReviewForm';
import './App.css';

export default function App() {
  // 1. Homepage States
  const [humans, setHumans] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Profile Detail States (✨ NEW)
  const [selectedHumanId, setSelectedHumanId] = useState(null); // Tracks the ID of clicked human
  const [selectedHumanDetails, setSelectedHumanDetails] = useState(null); // Stores deep database profile
  const [profileLoading, setProfileLoading] = useState(false); // Tracks the profile fetch status

  // Fetch all humans for the homepage grid
  useEffect(() => {
    fetch('/api/humans')
      .then((res) => res.json())
      .then((data) => {
        setHumans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching humans:', err);
        setLoading(false);
      });
  }, []);

  // ✨ NEW: Fetch specific human details whenever a user clicks "View Case"
  useEffect(() => {
    // If no human ID is selected, clear out the details and stop
    if (!selectedHumanId) {
      setSelectedHumanDetails(null);
      return;
    }

    setProfileLoading(true);

    // Hit Jordan's specific human endpoint (e.g., /api/humans/3)
    fetch(`/api/humans/${selectedHumanId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedHumanDetails(data);
        setProfileLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching deep human profile:', err);
        setProfileLoading(false);
      });
  }, [selectedHumanId]); // This block fires automatically whenever selectedHumanId changes

  return (
    <>
      <Header />
      <ReviewForm />
      
      {/* Homepage Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', margin: '40px', fontSize: '18px', color: '#ec4899' }}>
          🔄 Locating misbehaving humans in the database...
        </div>
      ) : selectedHumanId ? (
        /* If a human ID is selected, handle the profile view */
        profileLoading ? (
          <div style={{ textAlign: 'center', margin: '40px', fontSize: '18px', color: '#ec4899' }}>
            📂 Pulling incident reports and appliance testimonies...
          </div>
        ) : selectedHumanDetails ? (
          <HumanProfile
            {...selectedHumanDetails}
            onBack={() => setSelectedHumanId(null)} // Resetting ID takes us back to grid
          />
        ) : (
          <div style={{ textAlign: 'center', margin: '40px', color: 'red' }}>
            ⚠️ Failed to load profile data.
            <button onClick={() => setSelectedHumanId(null)}>Go Back</button>
          </div>
        )
      ) : (
        /* Homepage Grid View */
        <main className="card-grid">
          {humans.map((h) => (
            <HumanCard
              key={h.id || h.name}
              {...h}
              // ✨ Updated: Click passes the unique database ID instead of the whole object
              onView={() => setSelectedHumanId(h.id)} 
            />
          ))}
        </main>
      )}
    </>
  );
}