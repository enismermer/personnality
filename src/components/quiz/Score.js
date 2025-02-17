import React, { Component } from 'react';
import { db } from "../firebase/firebaseConfig"; // Assurez-vous de configurer Firebase
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './MainQuestions.css';
import { useNavigate } from 'react-router-dom';

// Composant fonctionnel pour intégrer le hook useNavigate
function NavigateButton() {

    const navigate = useNavigate();

    return (
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
    );
}

class Score extends Component {
    state = {
        message: "", // État pour afficher un message de confirmation ou d'erreur
    };

    // Méthode pour enregistrer le score dans Firebase
    saveScoreToDatabase = async () => {
        const auth = getAuth(); // Obtenez l'authentification Firebase
        const user = auth.currentUser; // Vérifiez si l'utilisateur est connecté

        if (!user) {
            this.setState({ message: "Vous devez être connecté pour enregistrer votre score." });
            return; // Si aucun utilisateur n'est connecté, arrêtez l'exécution
        }

        try {
            // Référence à la collection "score" dans Firestore
            const scoreCollectionRef = collection(db, "users", user.uid, "score");

            // Ajout d'un nouveau document avec le score
            await addDoc(scoreCollectionRef, {
                score: this.props.score, // Le score est passé comme prop
                created_at: serverTimestamp(), // Timestamp automatique
            });

            this.setState({ message: "Score enregistré avec succès !" });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du score :", error);
            this.setState({ message: "Une erreur est survenue lors de l'enregistrement du score." });
        }
    };

    render() {
        const { score } = this.props;
        const { message } = this.state;

        const getScore = (score) => {
            switch (score) {
                case 0:
                  return "Ne te décourage pas, chaque début est difficile !";
                case 1:
                  return "Bon début, persévère !";
                case 2:
                  return "Bien joué, tu progresses !";
                case 3:
                  return "Pas mal ! Tu es à mi-chemin.";
                case 4:
                  return "Super ! Tu es presque au sommet.";
                case 5:
                  return "Parfait ! C’est un sans-faute !";
                default:
                  return "Score invalide.";
              }
        }
        return (
            <div>
                <h2>Résultats</h2>
                <h4>Votre score : {score} {score > 1 ? "pts" : "pt"}</h4>
                <h6 style={{margin: 20}}>{getScore(score)}</h6>
                <button onClick={this.saveScoreToDatabase}>
                    Enregistrer le score
                </button>
                {message && <p>{message}</p>} {/* Affiche le message uniquement s'il existe */}
                <NavigateButton /> {/* Bouton pour retourner à l'accueil */}
            </div>
        );
    }
}

export default Score;
