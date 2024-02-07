import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import Home from './pages/Home';
import Login from './pages/Login';
import NewPost from './pages/NewPost';
import Post from './pages/Post';

import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))

  const queryClient = new QueryClient()

  return (
    <SkeletonTheme baseColor="lightgray" highlightColor="#dce0de">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter > 
          <Navbar isLoggedIn={isLoggedIn} />

          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
            <Route path='yourposts'/>
            <Route path="/newpost" element={<NewPost isLoggedIn={isLoggedIn} />}/>
            <Route path="/posts/:article" element={<Post isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SkeletonTheme>
  )
}

export default App
