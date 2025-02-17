import React, { useState, useEffect } from 'react';
import './Accueil.css';

import blocQuestion from '../assets/bloc-question.png';
import marioSaut from '../assets/mario-saut.png';
import marioDrapeau from '../assets/mario-drapeau.png';
import fondAccueil from '../assets/backgrounds/fond-accueil.png';
import niveauTermine from '../assets/audio/niveau-termine-audio.mp3';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import logoUser from '../assets/utilisateur.png';

import { useNavigate } from 'react-router-dom';

import { auth, db } from './firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Classement from './quiz/Classement';
// import zIndex from '@mui/material/styles/zIndex';

function Accueil() {
    const navigate = useNavigate();
    const [hasPlayed, setHasPlayed] = useState(false);

    // Vérifie si l'utilisateur revient sur la page "Accueil"
    useEffect(() => {
        const hasCompleted = sessionStorage.getItem('hasCompletedLevel');
        setHasPlayed(hasCompleted === 'true');
    }, []);

    // Fonction pour naviguer vers la page Perso et marquer le niveau comme joué
    const handleStart = () => {
        sessionStorage.setItem('hasCompletedLevel', 'true');
        navigate('/perso');
    };

    const soundNiveauTermine = new Audio(niveauTermine);

    const handleVictory = () => {
        soundNiveauTermine.play();
    }

    const toFormRegister = () => {
        navigate('/register');
    }
    const toFormLogin = () => {
        navigate('/login');
    }

    const [user, setUser] = useState(null); // État pour stocker l'utilisateur connecté
    const [userData, setUserData] = useState(null); // État pour les données utilisateur Firestore

    // Affichage de l'utilisateur connecté
    useEffect(() => {
        const auth = getAuth();
        // Vérifier si un utilisateur est connecté
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Met à jour l'utilisateur connecté

                // Récupérer les données Firestore pour cet utilisateur
                const userDocRef = doc(db, "users", currentUser.uid); // L'UID est utilisé comme ID du document
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data()); // Met à jour les données utilisateur
                } else {
                    console.error("Document utilisateur introuvable !");
                }
            } else {
                setUser(null);
                setUserData(null);
            }
        });

        // Nettoyage
        return () => unsubscribe();
    }, []);


    // Déconnecter l'utilisateur
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          // Suppression des données locales
          localStorage.removeItem('token');
          localStorage.removeItem('user');
      
          alert("Déconnexion réussie");
          console.log("Utilisateur déconnecté");
        } catch (error) {
          // Gestion des erreurs
          console.error("Erreur lors de la déconnexion :", error.message);
          alert(`Erreur lors de la déconnexion : ${error.message}`);
        }
      };
      

    const toProfil = () => {
        navigate('/profil');
    }

    const toQuiz = () => {
        navigate('/quiz');
    }

    return (
        <div className="accueil" style={{ backgroundImage: `url(${fondAccueil})` }}>
            <>
            {user && userData ? (
            <div style={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "flex-start" }}>
              <img
                src={logoUser}
                alt="User Icon"
                style={{ borderRadius: "50%", width: 30, border: "2px solid black", cursor: "pointer" }}
                onClick={toProfil}
              />
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {userData.firstName} {userData.lastName}
                  {/* <br />
                  <span style={{ fontSize: "14px" }}>
                  {new Date(user.metadata.lastSignInTime).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    })}
                    </span> */}
                </p>
                <button onClick={handleSignOut}>Déconnexion</button>
                {/* <button onClick={() => navigate("/user-management")}>Gérer les utilisateurs</button> */}
                <button style={{margin: 10}} onClick={toQuiz}>Jouer au quiz</button>
              </div>
                    <Classement />
            </div>
            ) : (
                <div className='button-form'>
                        <button onClick={toFormRegister}>Inscription</button>
                        <button onClick={toFormLogin}>Connexion</button>
                </div>
            )}
                    
            </>
            {hasPlayed ? (
                <>
                    <div className="message">
                        <h2>COURSE CLEAR</h2>
                        <p>Vous êtes désormais libre de rejouer le niveau.</p>
                    </div>
                    <div className="blocks">
                        <img src={blocQuestion} alt="Bloc question" className="block" onClick={handleStart}/>
                    </div>
                    <div className="mario-flag">
                        <img src={marioDrapeau} alt="Mario collé au drapeau" onClick={handleVictory}/>
                    </div>
                </>
            ) : (
                <>
                    <div className="message">
                        <h2>Bonjour, venez parcourir ma vie tout au long de ce niveau.</h2>
                        <p>Je vous laisse cliquer sur le bloc pour commencer le niveau :</p>
                    </div>
                    <div className="blocks">
                        <img src={blocQuestion} alt="Bloc question" className="block" onClick={handleStart}/>
                    </div>
                    <div className="mario">
                        <img src={marioSaut} alt="Mario" />
                    </div>
                </>
            )}
        </div>
    );
}

export default Accueil;
