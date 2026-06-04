import React, { useState } from 'react';

const ReviewForm = () => {
  // Where your form state will live
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Handles what happens when someone clicks "Submit"
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { title, body });
    // Tomorrow, wire this up to Jordan backend API
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
      <h3>Submit a Testimony</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Review Title: </label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g., Completely dysfunctional human"
          />
        </div>
        <br />
        <div>
          <label>Details: </label>
          <textarea 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            placeholder="Describe your appliance's behavior..."
          />
        </div>
        <br />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;