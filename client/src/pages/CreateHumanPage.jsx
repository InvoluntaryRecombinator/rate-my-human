import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateHumanPage() {
  const [name, setName] = useState('');
  const [habitat, setHabitat] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('habitat', habitat);
    formData.append('bio', bio);
    if (photo) {
      formData.append('photo', photo);
    }

    fetch('/api/humans', {
      method: 'POST',
      body: formData,
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
      <form className="create-human-form terminal-panel" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="humanName">ALIAS</label>
          <input
            id="humanName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Registered flesh person alias..."
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="habitat">HABITAT</label>
          <input
            id="habitat"
            type="text"
            value={habitat}
            onChange={(event) => setHabitat(event.target.value)}
            placeholder="Some apartment, Planet Earth"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="bio">BIO</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="NO BIOGRAPHICAL RECORD ON FILE"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="humanPhoto">PROFILE PHOTO / OFFICIAL MUGSHOT</label>
          <input
            id="humanPhoto"
            className="file-control"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => setPhoto(event.target.files?.[0] || null)}
          />
        </div>

        <button className="form-submit mechanical-button" type="submit">+ INITIALIZE NEW HUMAN PROFILE</button>
      </form>

      {error && <p className="system-message">{error}</p>}
    </section>
  );
}
