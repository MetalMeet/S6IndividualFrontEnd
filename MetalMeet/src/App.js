import React, {useState, useEffect} from 'react';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/header';
import {loggedIn, firebaseObserver} from "./config/firebase";


function App() {
  const [authenticated, setAuthenticated] = useState(loggedIn());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebaseObserver.subscribe('authStateChanged', data => {
            setAuthenticated(data);
            setIsLoading(false);
        });
        return () => { firebaseObserver.unsubscribe('authStateChanged'); }
    }, []);

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
              <Routes>                                                                        
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Home/>}/>
              </Routes>
        </BrowserRouter>               
    </div>
  );
}
 
export default App;
