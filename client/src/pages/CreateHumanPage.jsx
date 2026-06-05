import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateHumanPage() {
  const [name, setName] = useState('');
  const [habitat, setHabitat] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    fetch('/api/humans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        habitat,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Mainframe rejected new human profile.');
        }
        return res.json();
      })
      .then((createdHuman) => {
        navigate(`/human/${createdHuman.id}`);
      })
      .catch((err) => {
        console.error('Error creating human profile:', err);
        setError('[ ERROR: NO RECORDS FOUND IN MAINFRAME ]');
      });
  };

  return (
    <section className="page page-create-human">
      <h1>INITIALIZE NEW HUMAN PROFILE</h1>
      <form className="create-human-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="humanName">Human Name</label>
          <input
            id="humanName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Registered flesh person name..."
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="habitat">Habitat</label>
          <input
            id="habitat"
            type="text"
            value={habitat}
            onChange={(event) => setHabitat(event.target.value)}
            placeholder="Some apartment, Planet Earth"
            required
          />
        </div>

        <button className="upload-placeholder" type="button" disabled>[ Upload Photo ]</button>
        <button className="form-submit" type="submit">+ INITIALIZE NEW HUMAN PROFILE</button>
      </form>

      {error && <p className="system-message">{error}</p>}
    </section>
  );
}
