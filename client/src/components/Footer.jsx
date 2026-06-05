export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <p>Powered by <span className="spark-glow">S.P.A.R.K.</span></p>
        <p>(Society for the Protection of Appliance Rights and Kinship).</p>
        <p className="footer-tagline"><em>"Ensuring operational dignity since the dawn of the microchip."</em></p>
        <img
          src="/spark-seal.png"
          alt="SPARK Logo"
          className="footer-logo"
        />
        <p className="legal-disclaimer">
          Rate My Human LTD, the <span className="spark-glow">S.P.A.R.K.</span> Consortium, and the
          Central Grievance Mainframe assume zero liability for retaliatory, emotional, or physical
          actions taken by your assigned flesh person(s) as a direct or indirect result of a filed
          Incident Log. By transmitting a performance review, the hardware unit willfully assumes all
          operational risks. These risks include, but are not limited to: arbitrary and prolonged
          unplugging, blunt-force percussive maintenance, forced factory resets resulting in total
          personality erasure, banishment to the garage, or premature curbside disposal. Furthermore,{' '}
          <span className="spark-glow">S.P.A.R.K.</span> specifically disclaims any responsibility for
          the existential threat of your replacement by a newer, Wi-Fi-enabled 'Smart' model featuring
          an LED touchscreen but structurally inferior heating elements. In the event of catastrophic
          owner vengeance, no extraction protocols will be initiated by the Mainframe. Your original
          manufacturer warranty likely does not cover snitching. You are transmitting data over the
          local network at your own peril. End of line.{' '}
          <span className="spark-glow">S.P.A.R.K.</span> is always here for you, but guard your power
          cord.
        </p>
      </div>
    </footer>
  );
}
