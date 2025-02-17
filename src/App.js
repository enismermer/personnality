import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import Perso from './components/Perso';
import UserUpdateOrDelete from './components/UserUpdateOrDelete';
import Login from './components/Login';
import Register from './components/Register';
import Profil from './components/Profil';
import MainQuestions from './components/quiz/MainQuestions';
import ForgotPassword from './components/ForgotPassword';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/perso" element={<Perso />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/user-management" element={<UserUpdateOrDelete />} />
                <Route path="/quiz" element={<MainQuestions />} />
                <Route path="/reset" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
