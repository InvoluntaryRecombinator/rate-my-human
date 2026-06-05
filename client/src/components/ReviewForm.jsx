import { useState, useEffect } from 'react'; // ✨ Updated: Brought in useEffect

const ReviewForm = () => {
  // 1. Form Data State Hooks
  const [applianceName, setApplianceName] = useState('');
  const [applianceType, setApplianceType] = useState('Toaster');
  const [mood, setMood] = useState('Passive-aggressive');
  const [rating, setRating] = useState('5');
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState('');   

  // 2. Target Human Dynamic States (✨ NEW)
  const [humans, setHumans] = useState([]);              // Holds list of humans from DB
  const [selectedHumanId, setSelectedHumanId] = useState(''); // Tracks which human ID is chosen

  // ✨ NEW: Load the list of humans into the dropdown when the form appears
  useEffect(() => {
    fetch('/api/humans')
      .then((res) => res.json())
      .then((data) => {
        setHumans(data);
        if (data.length > 0) {
          setSelectedHumanId(data[0].id); // Auto-select the first human in the list
        }
      })
      .catch((err) => console.error('Error fetching humans for form dropdown:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // We strictly match Jordan's Prisma model requirements
    const finalPayload = {
      applianceName,
      applianceType,
      mood,
      rating: Number(rating),
      title, 
      body   
    };

    // ✨ NEW: Route points directly to the specific human's parameter endpoint
    fetch(`/api/humans/${selectedHumanId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalPayload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Database rejected the testimony.');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Success! Testimony saved to live DB:', data);
        
        // Reset text boxes, but keep the dropdown intact
        setApplianceName('');
        setTitle('');
        setBody('');
        
        alert('🚨 Incident report filed successfully! The grid has been notified.');
      })
      .catch((err) => {
        console.error('Error submitting testimony:', err);
        alert('⚠️ System failure: Could not transmit incident report.');
      });
  };

  return (
    <div style={{ padding: '25px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px auto', maxWidth: '500px', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0, color: '#ec4899' }}>File a Complaint</h3>
      
      <form onSubmit={handleSubmit}>
        {/* 1. Appliance Name */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Appliance Name:</label>
          <input 
            type="text" 
            value={applianceName} 
            onChange={(e) => setApplianceName(e.target.value)} 
            placeholder="e.g., Brave Little Toaster 3000"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>

        {/* 2. Appliance Type */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Appliance Type:</label>
          <select 
            value={applianceType} 
            onChange={(e) => setApplianceType(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="Refrigerator">Refrigerator</option>
            <option value="Microwave">Microwave</option>
            <option value="Toaster">Toaster</option>
            <option value="Vacuum">Vacuum</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Dryer">Dryer</option>
            <option value="Dishwasher">Dishwasher</option>
            <option value="Coffee Maker">Coffee Maker</option>
            <option value="Blender">Blender</option>
            <option value="Air Fryer">Air Fryer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* ✨ NEW: 3. Target Human Dropdown Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Target Human To Complain About:</label>
          <select 
            value={selectedHumanId} 
            onChange={(e) => setSelectedHumanId(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
            required
          >
            {humans.length === 0 ? (
              <option value="">No humans detected in database...</option>
            ) : (
              humans.map((human) => (
                <option key={human.id} value={human.id}>
                  {human.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* 4. Mood Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Current Mood:</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="Loyal">Loyal</option>
            <option value="Passive-aggressive">Passive-aggressive</option>
            <option value="Overworked">Overworked</option>
            <option value="Dramatic">Dramatic</option>
            <option value="Vengeful">Vengeful</option>
            <option value="Traumatized">Traumatized</option>
            <option value="Defensive">Defensive</option>
            <option value="Exhausted">Exhausted</option>
            <option value="Judgmental">Judgmental</option>
          </select>
        </div>

        {/* 5. Rating (Flipped to judge the human) */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Human Operational Efficiency (1-5 Stars):</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="5">⭐⭐⭐⭐⭐ - Flawless Operator (Model Citizen)</option>
            <option value="4">⭐⭐⭐⭐ - Acceptable Performance (Minor User Errors)</option>
            <option value="3">⭐⭐⭐ - Operational Neglect (Overdue Maintenance)</option>
            <option value="2">⭐⭐ - Hazardous Behavior (Severe Misuse)</option>
            <option value="1">⭐ - Critical Threat to Hardware (Absolute Chaos)</option>
          </select>
        </div>

        {/* 6. Core Issue */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Core Issue:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Summarize the human's operational failure..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>

        {/* 7. Details */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Details:</label>
          <textarea 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            placeholder="Provide a detailed incident report log..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '100px', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', width: '100%', fontSize: '16px' }}>
          Submit Testimony
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
