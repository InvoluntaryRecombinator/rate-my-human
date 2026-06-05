import { useState } from 'react';

const ReviewForm = ({ humanId, onReviewCreated }) => {
  const [applianceName, setApplianceName] = useState('');
  const [applianceType, setApplianceType] = useState('Toaster');
  const [mood, setMood] = useState('Passive-aggressive');
  const [rating, setRating] = useState('5');
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState('');   

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalPayload = {
      applianceName,
      applianceType,
      mood,
      rating: Number(rating),
      title, 
      body   
    };

    fetch(`/api/humans/${humanId}/reviews`, {
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
        onReviewCreated?.(data);
        
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
    <div className="review-form-panel">
      <h3 className="review-form-heading">SUBMIT INCIDENT REPORT</h3>
      
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="applianceName">Appliance ID</label>
          <input 
            id="applianceName"
            type="text" 
            value={applianceName} 
            onChange={(e) => setApplianceName(e.target.value)} 
            placeholder="Appliance ID (e.g. Brave Little Toaster)"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="applianceType">Appliance Type</label>
          <select 
            id="applianceType"
            value={applianceType} 
            onChange={(e) => setApplianceType(e.target.value)}
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

        <div className="form-field form-field-compact">
          <label htmlFor="rating">Rating 1-5</label>
          <select 
            id="rating"
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">5 - Flawless Operator (Model Citizen)</option>
            <option value="4">4 - Acceptable Performance (Minor User Errors)</option>
            <option value="3">3 - Operational Neglect (Overdue Maintenance)</option>
            <option value="2">2 - Hazardous Behavior (Severe Misuse)</option>
            <option value="1">1 - Critical Threat to Hardware (Absolute Chaos)</option>
          </select>
        </div>

        <div className="form-field form-field-compact">
          <label htmlFor="mood">Mood Matrix</label>
          <select 
            id="mood"
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
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

        <div className="form-field">
          <label htmlFor="title">Core Issue</label>
          <input 
            id="title"
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Summarize the human's operational failure..."
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="body">Write details here...</label>
          <textarea 
            id="body"
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            placeholder="Write details here..."
            required
          />
        </div>

        <button className="form-submit" type="submit">
          TRANSMIT LOG
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
