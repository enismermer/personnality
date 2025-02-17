// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, getFirestore, setDoc, addDoc, collection, query, where } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBADsj63vGMFOCeOxEGPSM7MDXDwzofbA",
  authDomain: "personnality-bdd.firebaseapp.com",
  projectId: "personnality-bdd",
  storageBucket: "personnality-bdd.firebasestorage.app",
  messagingSenderId: "108246233238",
  appId: "1:108246233238:web:0455846d45f62b7de712b7",
  measurementId: "G-H6PPR8ZWFB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (optional, if needed)
// const analytics = getAnalytics(app);

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().email}`);
});


/****************************
    Ajouter un utilisateur
****************************/      
// async function addUser(id, nom) {
//   await setDoc(doc(db, "utilisateurs", id), { nom });
// }

/******************************
     Ajouter un groupe
******************************/ 
// async function addGroup(id, nom) {
//   await setDoc(doc(db, "groupes", id), { nom });
// }

/*****************************************************************
  Ajouter une relation utilisateur ↔ groupe (table de jointure)    
*****************************************************************/
// async function addMember(userId, groupId) {
//   await addDoc(collection(db, "membres"), { userId, groupId });
// }



/*******************************************************************
          Récupérer tous les groupes d’un utilisateur
*******************************************************************/ 
async function getGroupesByUser(userId) {
  const membresRef = collection(db, "membres");
  const q = query(membresRef, where("userId", "==", userId));
  const membresSnap = await getDocs(q);

  const userRef = doc(db, "utilisateurs", userId); // Référence du document
  const userSnap = await getDoc(userRef); // Récupérer le document

  if (membresSnap.empty) {
    console.log(`Aucun groupe trouvé pour l'utilisateur ${userId}`);
    return;
  }

  const groupesIds = membresSnap.docs.map(doc => doc.data().groupId);

  // Récupérer les groupes associés
  const groupes = await Promise.all(
    groupesIds.map(async (id) => {
      const groupSnap = await getDoc(doc(db, "groupes", id));
      return groupSnap.exists() ? { id, ...groupSnap.data() } : null;
    })
  );

  console.log(`Groupes de l'utilisateur ${userId} (${userSnap.data().nom}) :`, groupes.filter(g => g));
}

// Exécuter l'ajout des données et tester
async function init() {
  // Ajout des utilisateurs et groupes
  // await addUtilisateur("user_123", "Enis");
  // await addUtilisateur("user_456", "Alice");
  // await addGroupe("group_abc", "Développeurs");
  // await addGroupe("group_xyz", "Designers");

  // Ajout des relations dans "membres"
  // await addMembre("user_123", "group_abc"); // Enis → Développeurs
  // await addMembre("user_123", "group_xyz"); // Enis → Designers
  // await addMembre("user_456", "group_abc"); // Alice → Développeurs

  // Tester la récupération des groupes pour Enis
  await getGroupesByUser("user_123");
}

// Lancer l'initialisation
init();


// Authentification Firebase
export const auth = getAuth();

export { db, querySnapshot };
