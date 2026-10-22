import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";


const AppHeader = () => {
  const { user, handleLogout } = useAuth();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  
  useEffect(() => {
    if (!menuOpen) return;
    const onMouseDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const onLogout = async () => {
    setMenuOpen(false);
    
    const ok = await handleLogout();
    if (!ok) alert("Could not log out. Please try again.");
  };

  const initial = user?.username?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="hdr">
      <div className="hdr-inner">
        <Link to="/" className="hdr-brand">Resume Analyzer</Link>

        <nav className="hdr-nav">
          <Link to="/" className={`hdr-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
          <Link
            to="/interviews"
            className={`hdr-link ${pathname.startsWith("/interview") ? "active" : ""}`}
          >
            Interview Results
          </Link>
        </nav>

        <div className="hdr-profile" ref={menuRef}>
          <button
            type="button"
            className="hdr-trigger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="hdr-avatar">{initial}</span>
            Profile
          </button>

          {menuOpen && (
            <div className="hdr-menu" role="menu">
              <div className="hdr-info">
                <span className="hdr-avatar lg">{initial}</span>
                <div className="hdr-text">
                  <span className="hdr-username" title={user?.username}>{user?.username}</span>
                  <span className="hdr-email" title={user?.email}>{user?.email}</span>
                </div>
              </div>
              <button type="button" className="hdr-logout" role="menuitem" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;