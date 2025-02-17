import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserUpdateOrDelete = () => {
  const [user, setUser] = useState(null); // État pour l'utilisateur connecté
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }); // État pour les données du formulaire

  const [loadingUpdate, setLoadingUpdate] = useState(false); // Indicateur de chargement pour la mise à jour
  const [loadingDelete, setLoadingDelete] = useState(false); // Indicateur de chargement pour la suppression
  const navigate = useNavigate(); // Initialisation pour la navigation

  // Récupérer l'utilisateur connecté et ses données Firestore
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Stocker l'utilisateur connecté
        const docRef = doc(db, "users", currentUser.uid); // Référence du document Firestore
        const docSnap = await getDoc(docRef); // Récupérer les données
        if (docSnap.exists()) {
          setFormData(docSnap.data()); // Remplir le formulaire avec les données existantes
        }
      }
    });
  }, []);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour mettre à jour les données Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);

    try {
      const docRef = doc(db, "users", user.uid); // Référence du document
      await updateDoc(docRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      alert("Données mises à jour avec succès !");
      navigate("/form"); // Redirige vers la page Form
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  // Fonction pour supprimer les données Firestore
  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer vos données ?")) return;

    setLoadingDelete(true);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser; // Récupérer l'utilisateur connecté

      if (!currentUser) {
        throw new Error("Aucun utilisateur n'est actuellement connecté.")
      }

      // 1. Supprimer les données de Firestore  
      const docRef = doc(db, "users", currentUser.uid); // Référence du document
      await deleteDoc(docRef);

      // 2. Supprimer l'utilisateur de Firebase Authentification
      await currentUser.delete();  

      alert("Données supprimées avec succès !");
      setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Réinitialise les données locales
      navigate("/form"); // Redirige vers la page Form
    } catch (error) {
        if (error.code === "auth/requires-recent-login") {
            alert("Votre session a expiré, veuillez vous reconnecter pour supprimer votre compte.");
        } else {
            console.error("Erreur lors de la suppression :", error);
            alert("Une erreur est survenue : " + error.message);
        }
    } finally {
      setLoadingDelete(false);
    }
  };

  if (!user) return <p>Chargement...</p>; // Affiche un message pendant le chargement

  return (
    <div style={{ textAlign: "center"}}>
      <h2>Mettre à jour ou supprimer vos données</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Prénom : </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nom : </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mot de passe : </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button 
            type="submit" 
            disabled={loadingUpdate} 
            style={{  
                    borderRadius: "5px",
                    border: "none", 
                    margin: "10px 0", 
                    padding: "10px", 
                    backgroundColor: "orange", 
                    cursor: "pointer"
                  }}
        >
          {loadingUpdate ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
      <hr style={{margin: "0 20em"}}></hr> {/* Trait horizontal pour séparer les deux boutons */}
      <button 
          onClick={handleDelete} 
          disabled={loadingDelete} 
          style={{ 
                  borderRadius: "5px",
                  border: "none", 
                  marginTop: "10px", 
                  padding: "10px", 
                  backgroundColor: "red", 
                  color: "white", 
                  cursor: "pointer"
                }}
      >
        {loadingDelete ? "Suppression..." : "Supprimer"}
      </button>
    </div>
  );
};

export default UserUpdateOrDelete;
