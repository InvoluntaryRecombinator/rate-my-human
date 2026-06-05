import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();

  return (
    <section className="page page-profile">
      <h1>HUMAN PROFILE</h1>
      <p>Profile page architecture placeholder for human #{id}.</p>
    </section>
  );
}
