
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
// import { useContext, useState } from 'react';
// import { AuthContext } from './context/AuthContext';
// import Home from './pages/Home';
// import AnimeDetails from './pages/AnimeDetails';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminDashboard from './pages/AdminDashboard';
// import Favorites from './pages/Favorites';
// import Profile from './pages/Profile';
// import ProtectedRoute from './components/ProtectedRoute';

// // We create a sub-component to access useLocation since it must be inside <Router>
// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const isAdmin = user?.role === 'admin';
//   const location = useLocation();

//   const [isLogoutHovered, setIsLogoutHovered] = useState(false);
//   const [isExploreHovered, setIsExploreHovered] = useState(false);
//   const [isFavoritesHovered, setIsFavoritesHovered] = useState(false);
//   const [isUserHovered, setIsUserHovered] = useState(false);

//   // Check if we are on login or register pages
//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

//   const transitionStyle = { transition: 'all 0.3s ease-in-out' };

//   const logoutBtnStyle = {
//     background: 'transparent',
//     border: '1px solid #ef4444',
//     color: '#ef4444',
//     padding: '6px 16px',
//     borderRadius: '5px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     ...transitionStyle,
//     boxShadow: isLogoutHovered 
//       ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' 
//       : 'none',
//     backgroundColor: isLogoutHovered ? '#ef4444' : 'transparent',
//     color: isLogoutHovered ? '#fff' : '#ef4444',
//     transform: isLogoutHovered ? 'translateY(-3px)' : 'translateY(0)'
//   };

//   return (
//     <nav style={{ 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       padding: '1.2rem 2.5rem', 
//       alignItems: 'center', 
//       background: 'transparent', 
//       border: 'none',
//       boxShadow: 'none',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
//         <Link to="/" style={{ fontSize: '1.6rem', fontWeight: '900', color: '#38bdf8', textDecoration: 'none', letterSpacing: '1px' }}>ANIME_HUB</Link>
        
//         {/* Only show Explore if NOT on Login/Register page */}
//         {!isAuthPage && (
//           <Link 
//             to="/" 
//             onMouseEnter={() => setIsExploreHovered(true)}
//             onMouseLeave={() => setIsExploreHovered(false)}
//             style={{ 
//               color: '#38bdf8', 
//               textDecoration: 'none', 
//               fontWeight: '600',
//               ...transitionStyle,
//               textShadow: isExploreHovered ? '0 0 8px #38bdf8, 0 0 15px #38bdf8' : 'none',
//               transform: isExploreHovered ? 'scale(1.05)' : 'scale(1)',
//               display: 'inline-block'
//             }}
//           >
//             Explore
//           </Link>
//         )}
        
//         {user && !isAuthPage && (
//           <Link 
//             to="/favorites" 
//             onMouseEnter={() => setIsFavoritesHovered(true)}
//             onMouseLeave={() => setIsFavoritesHovered(false)}
//             style={{ 
//               color: '#facc15', 
//               textDecoration: 'none', 
//               fontWeight: '600',
//               ...transitionStyle,
//               textShadow: isFavoritesHovered ? '0 0 8px #facc15, 0 0 15px #facc15' : 'none',
//               transform: isFavoritesHovered ? 'scale(1.05)' : 'scale(1)',
//               display: 'inline-block'
//             }}
//           >
//             Favorites
//           </Link>
//         )}
//       </div>

//       <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
//         {user ? (
//           <>
//             {isAdmin && <Link to="/admin" style={{ color: '#facc15', textDecoration: 'none' }}>Admin</Link>}
            
//             <Link 
//               to="/profile" 
//               onMouseEnter={() => setIsUserHovered(true)}
//               onMouseLeave={() => setIsUserHovered(false)}
//               style={{ 
//                 fontWeight: '700', 
//                 color: '#38bdf8', 
//                 textDecoration: 'none',
//                 ...transitionStyle,
//                 textShadow: isUserHovered ? '0 0 8px #38bdf8, 0 0 15px #38bdf8' : 'none',
//                 transform: isUserHovered ? 'scale(1.05)' : 'scale(1)',
//                 display: 'inline-block'
//               }}
//             >
//               Hi, {user.username}
//             </Link>

//             <button 
//               onClick={logout} 
//               style={logoutBtnStyle}
//               onMouseEnter={() => setIsLogoutHovered(true)}
//               onMouseLeave={() => setIsLogoutHovered(false)}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             {/* UPDATED LOGIC: Only show Login/Join if NOT on Login/Register page */}
//             {!isAuthPage && (
//               <>
//                 <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>Login</Link>
//                 <Link to="/register" style={{ padding: '8px 20px', borderRadius: '5px', color: '#000', textDecoration: 'none', backgroundColor: '#38bdf8', fontWeight: 'bold' }}>Join</Link>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Router>
//       <Navbar />
//       <div style={{ paddingTop: '0' }}> 
//         <Routes>
//           <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
//           <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
//           <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//           <Route path="/anime/:id" element={<ProtectedRoute><AnimeDetails /></ProtectedRoute>} />
//           <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
//           <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//           <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import AnimeDetails from './pages/AnimeDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

// We create a sub-component to access useLocation since it must be inside <Router>
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';
  const location = useLocation();

  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isExploreHovered, setIsExploreHovered] = useState(false);
  const [isFavoritesHovered, setIsFavoritesHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);

  // Check if we are on login or register pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const transitionStyle = { transition: 'all 0.3s ease-in-out' };

  const logoutBtnStyle = {
    background: 'transparent',
    border: '1px solid #ef4444',
    padding: '6px 16px',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    ...transitionStyle,
    boxShadow: isLogoutHovered 
      ? '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' 
      : 'none',
    backgroundColor: isLogoutHovered ? '#ef4444' : 'transparent',
    // FIXED: Duplicate key 'color' removed. Only one dynamic entry remains.
    color: isLogoutHovered ? '#fff' : '#ef4444', 
    transform: isLogoutHovered ? 'translateY(-3px)' : 'translateY(0)'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1.2rem 2.5rem', 
      alignItems: 'center', 
      background: 'transparent', 
      border: 'none',
      boxShadow: 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={{ fontSize: '1.6rem', fontWeight: '900', color: '#38bdf8', textDecoration: 'none', letterSpacing: '1px' }}>ANIME_HUB</Link>
        
        {/* Only show Explore if NOT on Login/Register page */}
        {!isAuthPage && (
          <Link 
            to="/" 
            onMouseEnter={() => setIsExploreHovered(true)}
            onMouseLeave={() => setIsExploreHovered(false)}
            style={{ 
              color: '#38bdf8', 
              textDecoration: 'none', 
              fontWeight: '600',
              ...transitionStyle,
              textShadow: isExploreHovered ? '0 0 8px #38bdf8, 0 0 15px #38bdf8' : 'none',
              transform: isExploreHovered ? 'scale(1.05)' : 'scale(1)',
              display: 'inline-block'
            }}
          >
            Explore
          </Link>
        )}
        
        {user && !isAuthPage && (
          <Link 
            to="/favorites" 
            onMouseEnter={() => setIsFavoritesHovered(true)}
            onMouseLeave={() => setIsFavoritesHovered(false)}
            style={{ 
              color: '#facc15', 
              textDecoration: 'none', 
              fontWeight: '600',
              ...transitionStyle,
              textShadow: isFavoritesHovered ? '0 0 8px #facc15, 0 0 15px #facc15' : 'none',
              transform: isFavoritesHovered ? 'scale(1.05)' : 'scale(1)',
              display: 'inline-block'
            }}
          >
            Favorites
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user ? (
          <>
            {isAdmin && <Link to="/admin" style={{ color: '#facc15', textDecoration: 'none' }}>Admin</Link>}
            
            <Link 
              to="/profile" 
              onMouseEnter={() => setIsUserHovered(true)}
              onMouseLeave={() => setIsUserHovered(false)}
              style={{ 
                fontWeight: '700', 
                color: '#38bdf8', 
                textDecoration: 'none',
                ...transitionStyle,
                textShadow: isUserHovered ? '0 0 8px #38bdf8, 0 0 15px #38bdf8' : 'none',
                transform: isUserHovered ? 'scale(1.05)' : 'scale(1)',
                display: 'inline-block'
              }}
            >
              Hi, {user.username}
            </Link>

            <button 
              onClick={logout} 
              style={logoutBtnStyle}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Logic fixed to hide buttons specifically on Auth pages */}
            {!isAuthPage && (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>Login</Link>
                <Link to="/register" style={{ padding: '8px 20px', borderRadius: '5px', color: '#000', textDecoration: 'none', backgroundColor: '#38bdf8', fontWeight: 'bold' }}>Join</Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '0' }}> 
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/anime/:id" element={<ProtectedRoute><AnimeDetails /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;