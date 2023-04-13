import './App.css';
import {Routes, Route} from "react-router-dom";
// 
import MainPage from './Pages/MainPage';
import SignPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import AlbumList from './Pages/AlbumsList';
import AlbumDetailsPage from './Pages/AlbumDetailsPage';
import UserPage from './Pages/UserProfile';
import UpdateAlbum from './Pages/UpdateAlbum';
// 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import AddAlbum from './components/AddAlbum';




function App() {
  return (
    <div className="App">
     <Navbar />
<Routes>
  <Route path="/" element={<MainPage/>}/>
  <Route path="/albums/:albumId" element={<AlbumDetailsPage/>}/>
  <Route path="/albums" element={<AlbumList/>}/>
  <Route path="/signup" element={<SignPage/>}/>
  <Route path="/login" element={<LoginPage/>}/> 
  <Route path="/user/:userId" element={<UserPage/>}/> 
  <Route path="/updatealbum/:albumId" element={<UpdateAlbum/>}/>

</Routes>
<Footer />

    </div>
  );
}

export default App;
