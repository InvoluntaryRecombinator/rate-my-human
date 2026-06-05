import { useState } from 'react';

const ReviewForm = ({ humanId, onReviewCreated }) => {
  const [applianceName, setApplianceName] = useState('');
  const [applianceType, setApplianceType] = useState('Toaster');
  const [mood, setMood] = useState('Passive-aggressive');
  const [rating, setRating] = useState('5');
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState('');   
  const [photo, setPhoto] = useState(null);
  const [photoInputKey, setPhotoInputKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('applianceName', applianceName);
    formData.append('applianceType', applianceType);
    formData.append('mood', mood);
    formData.append('rating', rating);
    formData.append('title', title);
    formData.append('body', body);
    if (photo) {
      formData.append('photo', photo);
    }

    fetch(`/api/humans/${humanId}/reviews`, {
      method: 'POST',
      body: formData,
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
        setPhoto(null);
        setPhotoInputKey((currentKey) => currentKey + 1);
        
        alert('🚨 Incident report filed successfully! The grid has been notified.');
      })
      .catch((err) => {
        console.error('Error submitting testimony:', err);
        alert('⚠️ System failure: Could not transmit incident report.');
      });
  };

  return (
    <div className="review-form-panel terminal-panel">
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
            <option value="5">5 - Flawless Operation</option>
            <option value="4">4 - Acceptable Operation</option>
            <option value="3">3 - Maintenance Concern</option>
            <option value="2">2 - Hazardous Behavior</option>
            <option value="1">1 - Critical Threat to Hardware</option>
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

        <div className="form-field">
          <label htmlFor="reviewPhoto">UPLOAD IMAGE / INCIDENT PHOTO / APPLIANCE SELFIE</label>
          <input
            key={photoInputKey}
            id="reviewPhoto"
            className="file-control"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </div>

        <button className="form-submit mechanical-button" type="submit">
          TRANSMIT LOG
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
