import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'; // Carlos, this isn't needed at this time.

// components
import Header from './components/headerComponents/header';
import Footer from './components/footerComponents/footer';
import Homepage from './components/pages/homePage';

//includes
import './App.css'; // Carlos, make sure you are matching the case of the file.

class App extends Component
{
    render()
    {
        return (
            <div className="App">
                <Header />
                <Homepage />
                <Footer />
            </div>
        );
    }
}

export default App;