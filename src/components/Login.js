import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondConnexion from '../assets/backgrounds/fond-connexion.png';
import { auth } from "./firebase/firebaseConfig";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loadingLogin, setLoadingLogin] = useState(false);
  const navigate = useNavigate();

  // const handleChangeLogin = (e) => {
  //   setFormDataLogin({
  //     ...formDataLogin,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log(userCredential)
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user))

      alert("Connexion réussie !");
      setEmail("");
      setPassword(""); // Réinitialise les champs du formulaire
      console.log("Utilisateur connecté :", userCredential);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      alert(`Erreur lors de la connexion : ${error.message}`);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleReset = async (e) => {
    navigate('/reset')
  };
  

  // Styles externalisés pour plus de clarté
  const containerStyle = {
    textAlign: "center",
    background: `url(${fondConnexion}) no-repeat center center`,
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const formStyle = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffffa1",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: loadingLogin ? "#ccc" : "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: loadingLogin ? "not-allowed" : "pointer",
    width: "100%",
  };

  const resetLinkStyle = {
    display: "block",
    marginTop: "10px",
    color: "#007BFF",
    textDecoration: "underline",
    cursor: "pointer",
  };
  

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmitLogin} style={formStyle}>
        <h1>Formulaire de connexion</h1>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" disabled={loadingLogin} style={buttonStyle}>
          {loadingLogin ? "Connexion..." : "Se connecter"}
        </button>
        <a href="javascript:void(0);" id="reset" onClick={handleReset} style={resetLinkStyle}>
            Mot de passe oublié ?
        </a>

      </form>
    </div>
  );
}

export default Login;
