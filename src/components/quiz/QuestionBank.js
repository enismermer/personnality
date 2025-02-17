

// Je définis les questions
// pour pouvoir poser à l'utilisateur lors du quiz

const qBank = [
    {
        id: 1,
        question: "Quel âge ai-je ?",
        options: ["21", "22", "23", "24"],
        answer: "24",
    },
    {
        id: 2,
        question: "Quand ai-je commencé ma reconversion professionnelle ?",
        options: ["2019", "2020", "2021", "2022"],
        answer: "2021",
    },
    {
        id: 3,
        question: "Dans quel domaine d'activité suis-je converti ?",
        options: ["Marketing digital", "Développement web", "Webdesign", "Cybersécurité"],
        answer: "Développement web"
    },
    {
        id: 4,
        question: "Quel est mon premier film préféré ?",
        options: ["Cars", "L'Âge de glace", "Pirates des Caraibes", "Retour vers le futur"],
        answer: "Retour vers le futur"
    },
    {
        id: 5,
        question: "Quelle était ma plus grande passion",
        options: ["Ecouter la musique", "Faire des dessins", "Faire du sport", "Jouer aux jeux vidéo"],
        answer: "Jouer aux jeux vidéo"
    },
]

export default qBank;