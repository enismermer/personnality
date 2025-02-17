import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import backgroundImage from "../assets/backgrounds/fond-reset.png";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false); // État pour masquer le champ et afficher le lien

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlertMessage("Veuillez entrer une adresse email pour réinitialiser votre mot de passe.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setAlertMessage("Un email de réinitialisation a été envoyé.");
      setEmailSent(true); // Masquer le champ et afficher le lien de connexion
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email de réinitialisation :", error.message);
      setAlertMessage(`Erreur lors de l'envoi de l'email : ${error.message}`);
    }
  };

  // Styles en ligne
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`, // Applique l'image comme fond
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Légère transparence pour lisibilité
    padding: "20px",
    marginBottom: "10vh",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const alertStyle = {
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#d4edda",
    color: "#155724",
    borderRadius: "5px",
    textAlign: "center",
  };

  const linkStyle = {
    marginTop: "15px",
    display: "block",
    textDecoration: "none",
    color: "#007BFF",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1>Mot de passe oublié</h1>
        {alertMessage && <div style={alertStyle}>{alertMessage}</div>}
        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Réinitialisation
            </button>
          </form>
        ) : (
          <a href="/login" style={linkStyle}>Retour à la connexion</a>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
