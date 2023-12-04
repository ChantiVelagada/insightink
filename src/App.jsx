import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import { useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))

  return (
    <SkeletonTheme baseColor="lightgray" highlightColor="gray">
      <BrowserRouter >
        <nav className='navbar'>
          <div className="logo">InsightInk</div>
          <ul className="nav-list">
              <li><Link to='/'>Home</Link></li>
              {isLoggedIn ? 
              (<li><Link to='/newpost'>Post</Link></li>) : null}
              <li><Link to='/login'>{isLoggedIn ? "Profile" : "Login"}</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}/>
          <Route path="/newpost" element={<NewPost isLoggedIn={isLoggedIn} />}/>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>}/>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  )
}

export default App
