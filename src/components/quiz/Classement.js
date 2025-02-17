import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig'; // Import de la config Firebase
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import goldMedal from '../../assets/medals/or.png';
import silverMedal from '../../assets/medals/argent.png';
import bronzeMedal from '../../assets/medals/bronze.png';

function Classement() {
    const [scores, setScores] = useState([]); // État pour stocker les scores
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const usersRef = collection(db, "users"); // Référence à la collection "users"
                const usersSnapshot = await getDocs(usersRef); // Récupère tous les documents de "users"

                const fetchedScores = [];

                // Parcours des utilisateurs pour accéder à leurs sous-collections "score"
                for (const userDoc of usersSnapshot.docs) {
                    const userId = userDoc.id; // ID de l'utilisateur
                    const userData = userDoc.data(); // Données de l'utilisateur (firstName, lastNAme, etc.)

                    const scoresRef = collection(db, "users", userId, "score"); // Référence à la sous-collection "score"
                    const scoresQuery = query(scoresRef, orderBy('score', 'desc')); // Trier par score décroissant
                    const scoresSnapshot = await getDocs(scoresQuery);
                    
                    // Ajouter les scores à la liste avec les détails de l'utilisateur
                    scoresSnapshot.forEach((scoreDoc) => {
                        fetchedScores.push({
                            id: scoreDoc.id,
                            userId: userId,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            ...scoreDoc.data(),
                        });
                    });
                }

                // Trier tous les scores globalement par ordre décroissant
                fetchedScores.sort((a, b) => b.score - a.score);
                setScores(fetchedScores);
            } catch (error) {
                console.error("Erreur lors de la récupération des scores :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (scores.length === 0) {
        return;
    }

    // Définir les styles améliorés ici
    const styles = {
        classementContainer: {
            position: "absolute",
            textAlign: "center",
            margin: "20vh 0 10vh 0",
            fontSize: "12px",
            maxWidth: "400px",
            backgroundColor: "#ffffffdd", // Couleur de fond légèrement opaque
            borderRadius: "12px", // Coins plus arrondis pour un style moderne
            padding: "20px", // Plus d'espace intérieur
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Ombrage plus marqué
            backdropFilter: "blur(10px)", // Effet de flou pour un look "frosted glass"
        },
        heading: {
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#222",
            textTransform: "uppercase", // Texte en majuscule pour plus d'impact
            letterSpacing: "1.2px", // Espacement des lettres
        },
        list: {
            listStyle: "none",
            padding: 0,
            margin: 0,
        },
        listItem: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #ddd",
            transition: "background-color 0.3s ease", // Transition douce pour l'effet de survol
            borderRadius: "8px", // Coins arrondis pour chaque élément
        },
        listItemHover: {
            backgroundColor: "#f0f8ff", // Couleur de survol
        },
        medalImage: {
            width: "32px", // Médaille légèrement plus grande
            height: "32px",
            marginRight: "12px",
        },
        user: {
            fontSize: "16px",
            fontWeight: "500",
            color: "#444",
            flex: "1", // Permet à l'utilisateur de prendre l'espace disponible
        },
        score: {
            fontWeight: "bold",
            color: "#666",
            fontSize: "16px",
        },
    };


    return (
        <div style={styles.classementContainer}>
            <h2 style={styles.heading}>Classement</h2>
            <ul style={styles.list}>
                {scores.map((user, index) => (
                    <li
                        key={user.id}
                        style={styles.listItem}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor)
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                        {/* Afficher la médaille si le score est dans les 3 premiers */}
                        {index === 0 && <img src={goldMedal} alt="Médaille d'or" style={styles.medalImage} />}
                        {index === 1 && <img src={silverMedal} alt="Médaille d'argent" style={styles.medalImage} />}
                        {index === 2 && <img src={bronzeMedal} alt="Médaille de bronze" style={styles.medalImage} />}
                        
                        <span style={styles.user}>
                            {user.firstName} {user.lastName}
                        </span>
                        <span style={styles.score}>
                            {user.score} {user.score > 1 ? "pts" : "pt"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );    
}

export default Classement;
