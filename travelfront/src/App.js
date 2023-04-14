import './App.css';
import {Routes, Route} from "react-router-dom";
// 
import MainPage from './Pages/MainPage';
import SignUpPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import AlbumList from './Pages/AlbumsList';
import AlbumDetailsPage from './Pages/AlbumDetailsPage';
import UserProfile from './Pages/UserProfile';
import UpdateAlbum from './Pages/UpdateAlbum';
// 
import Navbar from './components/Navbar';
import Footer from './components/Footer';





function App() {
  return (
    <div className="App">
     <Navbar />
<Routes>
  <Route path="/" element={<MainPage/>}/>
  <Route path="/albums/:albumId" element={<AlbumDetailsPage/>}/>
  <Route path="/albums" element={<AlbumList/>}/>
  <Route path="/signup" element={<SignUpPage/>}/>
  <Route path="/login" element={<LoginPage/>}/> 
  <Route path="/user/:userId" element={<UserProfile/>}/> 
  <Route path="/updatealbum/:albumId" element={<UpdateAlbum/>}/>


</Routes>
<Footer />

    </div>
  );
}

export default App;
