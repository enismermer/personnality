import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig"; // Assurez-vous que firebaseConfig est correctement configuré
import { useNavigate } from "react-router-dom";

function Profil () {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // Stocke les données utilisateur
  const [loading, setLoading] = useState(true); // Gère l'état de chargement
    
  useEffect(() => {
    const auth = getAuth();

    // Pour garantir qu'on obtient toujours l'utilisateur connecté,
    // on doit surveiller les changements d'état d'authentification en utilisant onAuthStateChanged
    // onAuthStateChanged permet de détecter les changements d'état de l'utilisateur connecté
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Utilisez l'UID de l'utilisateur
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Stocke les données utilisateur
          } else {
            console.error("Aucun document trouvé pour cet utilisateur.");
            setUserData(null);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
      } else {
        console.log("Aucun utilisateur connecté.");
        setUserData(null);
      }
      setLoading(false);
    });

    // Nettoyer l'écouteur lorsque le composant est démonté 
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Chargement...</p>; // Affichage en cours de chargement
  }

  if (!userData) {
    return <p>Aucune donnée utilisateur trouvée.</p>; // Gère le cas où les données utilisateur sont absentes
  }


  const toUpdateOrDelete = () => {
    navigate('/user-management');
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Profil</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <p>
          <strong>Prénom :</strong> {userData.firstName}
        </p>
        <p>
          <strong>Nom de famille :</strong> {userData.lastName}
        </p>
        <p>
          <strong>Email :</strong> {userData.email}
        </p>
        <p>
          <strong>Score :</strong> {userData.score || "Non disponible"} {/* Affiche "Non disponible" si le score est absent */}
        </p>
      </div>

      <button 
            style={{
                    textAlign: "center", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    padding: 10, 
                    border: "none", 
                    borderRadius: 10,
                    cursor: "pointer"
            }}
            onClick={toUpdateOrDelete}
      ><span style={{color: "orange", fontWeight: "bold"}}>Modifier</span> ou <span style={{color: "red", fontWeight: "bold"}}>Supprimer</span></button>
    </div>
  );
};

export default Profil;
