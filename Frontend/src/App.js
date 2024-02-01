import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage.js';
import BookList from './bookSetup/Booklist.js';
import SingleBook from './bookSetup/SingleBook';
import SearchBar from './Navbar/SearchBar';
import Login from './Login/Login.js';
import Logout from './Login/Logout.js';
import SignUp from './Signup/SignUp.js';


const App = () => {

  return (
    <Router>
     <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<BookList />} />
        <Route path="/books/:isbn" element={<SingleBook />} />
        <Route path="/search" element={<SearchBar />} />
      </Routes>
    </Router>
  );
};

export default App;
