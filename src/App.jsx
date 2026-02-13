import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import ComingSoon from './components/ComingSoon';
import Watch from './pages/Watch';
import { nowPlaying, comingSoon } from './data/movies';
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