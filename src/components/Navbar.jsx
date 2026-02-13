import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Thêm dòng này

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShow(true);
      else setShow(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${show ? 'nav__black' : ''}`}>
      {/* Bọc logo bằng Link để về trang chủ */}
      <Link to="/">
        <img className="nav__logo" src="/images/netflop-logo.png" alt="NETFLOP" />
      </Link>
      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User"
      />
    </nav>
  );
}

export default Navbar;