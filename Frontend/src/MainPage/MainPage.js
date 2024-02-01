import React from 'react';
import MainPageNavbar from '../Navbar/MainPageNavbar';
import mainPageImage from '../assets/imgs/MainPage.jpg';
import './MainPage.css';

const MainPage = () => {
  return (

      <div>
        <MainPageNavbar />
        <div className="main-page">
          <div className="main-content">
            <div className="text-content">
              <h1>Welcome to the BOIKHATA</h1>
              <p>
                Explore and discover the world of books. Read, review, and share your thoughts with the community.
              </p>
            </div>
            <div className="image-content">
              <img src={mainPageImage} alt="Main Page" className="main-page-image" />
            </div>
          </div>
        </div>
        
      </div>
  
  );
};

export default MainPage;
