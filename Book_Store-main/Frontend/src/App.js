import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage/MainPage.jsx';
import AddBooks from './AddBooks/AddBooks.jsx'
import BookList from './bookSetup/Booklist.jsx';
import SingleBook from './SingleBook/SingleBook.jsx';
import SearchBar from './SearchBar/SearchBar.jsx';
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';
import LoginUser from './Login/LoginUser.jsx';
import LoginAuthor from './Login/LoginAuthor.jsx';
import SignupAuthor from './Signup/SignupAuthor.jsx';
import Logout from './Login/Logout.jsx';
import SignupUser from './Signup/SignupUser.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
c        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addbooks" element={<AddBooks />} />
        <Route path="/login/author" element={<LoginAuthor />} />
        <Route path="/signup/author" element={<SignupAuthor />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup/user" element={<SignupUser />} />
        <Route path="/home" element={<BookList />} />
        <Route path="/books/:isbn" element={<SingleBook />} />
        <Route path="/search" element={<SearchBar />} />
      </Routes>
    </Router>
  );
};

export default App;
