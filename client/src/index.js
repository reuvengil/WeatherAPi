import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css';
import App from './components/App';
import cookie from "react-cookies";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Login from './components/Login';
import Admin from './components/Admin';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <>
        <Router>
            <Routes>
                <Route path="/admin" element={cookie.load("token") ?<Admin/>:<Login/>}/>
                <Route path="/" element={<App/>}/>
            </Routes>
        </Router>
    </>,
    rootElement
);