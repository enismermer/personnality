import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; // Pour interagir avec Firestore
import { auth, db } from "./firebase/firebaseConfig.js"; // Assure-toi que le chemin est correct
import { createUserWithEmailAndPassword } from "firebase/auth";
import fondInscription from "../assets/backgrounds/fond-inscription.png";
import { useNavigate } from "react-router-dom";

function Register() {
  // État pour gérer les données du formulaire d'inscription
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loadingRegister, setLoadingRegister] = useState(false); // Pour gérer l'état de chargement d'inscription

  const navigate = useNavigate();

  // Fonction pour mettre à jour les données du formulaire d'inscription
  // const handleChangeRegister = (e) => {
  //   setFormDataRegister({
  //     ...formDataRegister,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // Fonction pour gérer la soumission du formulaire d'inscription
  const handleSubmitRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoadingRegister(true); // Indique que le traitement est en cours

    

    try {
      // Crée un utilisateur avec Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, firstName, lastName, email, password);
      // console.log(userCredential)
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user))

      // Enregistre les données utilisateur dans Firestore (sans le mot de passe)
      await setDoc(doc(db, "users", user.uid), {firstName, lastName, email});

      alert("Utilisateur inscrit et données enregistrées avec succès !");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword(""); // Réinitialise les champs du formulaire
      console.log("Utilisateur inscrit :", userCredential);
      navigate("/")
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      if (error.code === "auth/email-already-in-use") {
        alert("Cet email est déjà utilisé.");
      } else if (error.code === "auth/weak-password") {
        alert("Le mot de passe est trop faible.");
      } else {
        alert("Une erreur est survenue lors de l'enregistrement.");
      }
    }
     finally {
      setLoadingRegister(false); // Arrête l'indicateur de chargement
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        background: `url(${fondInscription}) no-repeat center center`,
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          backgroundColor: "#ffffffa1",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1>Inscription</h1>
        <form onSubmit={handleSubmitRegister}>
          <div style={{ marginBottom: "15px" }}>
            <label>Prénom : </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Nom : </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Email : </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Mot de passe : </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loadingRegister}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#46A6D1",
              color: "white",
              fontWeight: "bold",
              cursor: loadingRegister ? "not-allowed" : "pointer",
            }}
          >
            {loadingRegister ? "Enregistrement..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
