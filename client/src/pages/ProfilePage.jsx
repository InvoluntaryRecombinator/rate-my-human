import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import HumanProfile from '../components/HumanProfile';
import ReviewForm from '../components/ReviewForm';
import ReviewLog from '../components/ReviewLog';

export default function ProfilePage() {
  const { id } = useParams();
  const [human, setHuman] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/humans/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Human not found');
        }
        return res.json();
      })
      .then((data) => {
        setHuman(data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching deep human profile:', err);
        setError({
          id,
          message: '[ ERROR: NO RECORDS FOUND IN MAINFRAME ]',
        });
      });
  }, [id]);

  const reviews = useMemo(() => human?.reviews || [], [human]);
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
    return total / reviews.length;
  }, [reviews]);
  const isCurrentHumanLoaded = String(human?.id) === String(id);
  const currentError = error?.id === id ? error.message : '';
  const loading = !isCurrentHumanLoaded && !currentError;

  const handleReviewCreated = (newReview) => {
    setHuman((currentHuman) => {
      if (!currentHuman) return currentHuman;

      return {
        ...currentHuman,
        reviews: [newReview, ...(currentHuman.reviews || [])],
      };
    });
  };

  return (
    <section className="page page-profile">
      {loading ? (
        <p className="system-message">[ MAINFRAME QUERY IN PROGRESS ]</p>
      ) : currentError ? (
        <p className="system-message">{currentError}</p>
      ) : (
        <div className="profile-grid">
          <div className="profile-col-file">
            <div className="profile-layout">
              <HumanProfile
                id={human.id}
                name={human.name}
                bio={human.bio || 'NO BIOGRAPHICAL RECORD ON FILE'}
                knownFor={human.knownFor || 'UNREGISTERED'}
                averageRating={averageRating}
                reviewCount={reviews.length}
              />
            </div>

            <section className="historical-logs">
              <h2>HISTORICAL LOGS</h2>
              {reviews.length === 0 ? (
                <p className="system-message">[ ERROR: NO RECORDS FOUND IN MAINFRAME ]</p>
              ) : (
                <div className="review-log-feed">
                  {reviews.map((review) => (
                    <ReviewLog key={review.id} {...review} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="profile-col-terminal">
            <ReviewForm humanId={id} onReviewCreated={handleReviewCreated} />
          </aside>
        </div>
      )}
    </section>
  );
}
