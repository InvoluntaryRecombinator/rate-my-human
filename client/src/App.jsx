import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DirectoryPage from './pages/DirectoryPage';
import CreateHumanPage from './pages/CreateHumanPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/human/new" element={<CreateHumanPage />} />
          <Route path="/human/:id" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
