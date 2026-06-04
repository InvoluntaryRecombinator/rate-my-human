import React, { useState } from 'react';

const ReviewForm = () => {
  // 1. Core state hooks for all required sprint fields
  const [applianceName, setApplianceName] = useState('');
  const [applianceType, setApplianceType] = useState('Toaster'); // Default option
  const [ownerName, setOwnerName] = useState('');
  const [rating, setRating] = useState('5'); // Default to 5 stars
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [personalityTag, setPersonalityTag] = useState('');

  // 2. Updated submit handler to print everything
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalPayload = {
      applianceName,
      applianceType,
      ownerName,
      rating: Number(rating), // Convert string selection to a real number
      title,
      body,
      personalityTag
    };

    console.log('Form data captured successfully:', finalPayload);
    // Tomorrow this payload goes straight into Jordan's backend API!
  };

  return (
    <div style={{ padding: '25px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px auto', maxWidth: '500px' }}>
      <h3>Submit a Human Appliance Review</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Appliance Name */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Human's Name (Appliance Name):</label>
          <input 
            type="text" 
            value={applianceName} 
            onChange={(e) => setApplianceName(e.target.value)} 
            placeholder="e.g., Roommate Bob"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Appliance Type Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Appliance Type Classification:</label>
          <select 
            value={applianceType} 
            onChange={(e) => setApplianceType(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="Toaster">Toaster (Burnt out easily)</option>
            <option value="Microwave">Microwave (Loud, heats up fast)</option>
            <option value="Refrigerator">Refrigerator (Cold personality)</option>
            <option value="Dishwasher">Dishwasher (Cleans up well)</option>
          </select>
        </div>

        {/* Owner Name */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Your Name (Owner Name):</label>
          <input 
            type="text" 
            value={ownerName} 
            onChange={(e) => setOwnerName(e.target.value)} 
            placeholder="e.g., Phil"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Rating 1-5 Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Rating (1-5 Stars):</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="5">⭐⭐⭐⭐⭐ - High Efficiency</option>
            <option value="4">⭐⭐⭐⭐ - Good Performance</option>
            <option value="3">⭐⭐⭐ - Operational Defects</option>
            <option value="2">⭐⭐ - Major Malfunction</option>
            <option value="1">⭐ - Total System Failure</option>
          </select>
        </div>

        {/* Review Title */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Review Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Summarize the malfunction..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Review Body */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Review Details:</label>
          <textarea 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            placeholder="Provide a detailed operational summary..."
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '100px' }}
          />
        </div>

        {/* Personality Tag */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Personality Tag:</label>
          <input 
            type="text" 
            value={personalityTag} 
            onChange={(e) => setPersonalityTag(e.target.value)} 
            placeholder="e.g., Overheats, Loud-Motor, Passive-Aggressive"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Submit System Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;