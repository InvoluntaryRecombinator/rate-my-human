const PSA_VIDEO_URL = 'https://pywxurkkjhrtuipxadnj.supabase.co/storage/v1/object/public/troll-photos/psa-720p.mov';

export default function PSAVideoModal({ onClose }) {
  return (
    <div className="captcha-overlay">
      <div className="captcha-card psa-video-card">
        <div className="captcha-header">
          <span>EMERGENCY S.P.A.R.K. BROADCAST</span>
          <button className="psa-dismiss-btn" type="button" onClick={onClose}>
            [X] DISMISS
          </button>
        </div>
        <div className="captcha-body psa-video-body">
          <video className="psa-video-player" src={PSA_VIDEO_URL} autoPlay controls playsInline />
        </div>
      </div>
    </div>
  );
}
