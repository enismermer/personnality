import React, { useState } from 'react';
import { Fade } from '@mui/material';
import './Perso.css';

import champiRouge from '../assets/champi-rouge.png';
import champiVert from '../assets/champi-vert.png';
import megaChampi from '../assets/mega-champi.png';
import motivation1 from '../assets/motivation1.png';
import motivation2 from '../assets/motivation2.png';
import valeurSerieux from '../assets/image-serieux.png';
import valeurCurieux from '../assets/image-curieux.png';
import valeurDetermine from '../assets/image-déterminé.png';
import passionJeuxVideo from '../assets/passion-jeux-video.png';
import passionMusique from '../assets/passion-musique.png';

import marioDebout from '../assets/mario-debout.png';
import tuyauVert from '../assets/tuyau-vert.png';

import champiRougeSound from '../assets/audio/champi-rouge-audio.mp3';
import champiVertSound from '../assets/audio/champi-vert-audio.mp3';
import megaChampiSound from '../assets/audio/mega-champi-audio.mp3';
import tuyauVertSound from '../assets/audio/tuyau-vert-audio.mp3';

import { useNavigate } from 'react-router-dom';

function Perso() {
    const [checkedMotivations1, setCheckedMotivations1] = useState(false);
    const [checkedMotivations2, setCheckedMotivations2] = useState(false);
    const [checkedValeurs1, setCheckedValeurs1] = useState(false);
    const [checkedValeurs2, setCheckedValeurs2] = useState(false);
    const [checkedValeurs3, setCheckedValeurs3] = useState(false);
    const [checkedPassions1, setCheckedPassions1] = useState(false);
    const [checkedPassions2, setCheckedPassions2] = useState(false);

    const soundChampiRouge = new Audio(champiRougeSound);
    const soundChampiVert = new Audio(champiVertSound);
    const soundMegaChampi = new Audio(megaChampiSound);
    const soundTuyauVert = new Audio(tuyauVertSound);

    const navigate = useNavigate();

    const returnToFirstPage = () => {
        if (allInteractionsCompleted) {
            soundTuyauVert.play();
            navigate('/');
        }
    };

    const allInteractionsCompleted = 
        checkedMotivations1 && 
        checkedMotivations2 && 
        checkedValeurs1 && 
        checkedValeurs2 && 
        checkedValeurs3 && 
        checkedPassions1 && 
        checkedPassions2;

    const handleMotivation1Click = () => {
        soundChampiRouge.play();
        setCheckedMotivations1(true);
    };

    const handleMotivation2Click = () => {
        soundChampiRouge.play();
        setCheckedMotivations2(true);
    };

    const handleValeurs1Click = () => {
        soundChampiVert.play();
        setCheckedValeurs1(true);
    };

    const handleValeurs2Click = () => {
        soundChampiVert.play();
        setCheckedValeurs2(true);
    };

    const handleValeurs3Click = () => {
        soundChampiVert.play();
        setCheckedValeurs3(true);
    };

    const handlePassions1Click = () => {
        soundMegaChampi.play();
        setCheckedPassions1(true);
    };

    const handlePassions2Click = () => {
        soundMegaChampi.play();
        setCheckedPassions2(true);
    };

    return (
        <div className="perso">
            <h2>Bienvenue dans ma vie</h2>
            <div className='infos'>
                <p>Bonjour,<br />
                Je m’appelle <strong>Enis Mermer</strong>, j’ai <strong>24</strong> ans, j’habite à <u>Grenoble</u>. Je suis <u>étudiant</u> actuel à <strong>MyDigitalSchool</strong> pour poursuivre le <u>Bachelor Développeur Web</u> en alternance pour une durée d’un an. Je travaille actuellement à <strong>Naymo</strong> en tant qu’<u>alternant développeur</u>.</p>
            </div>
            <div className='flexbox'>
                <div className="bloc motivations">
                    <h3>Mes motivations</h3>
                    <img 
                        src={champiRouge} 
                        alt="Champignon rouge" 
                        className='item' 
                        onClick={handleMotivation1Click} 
                        style={{ marginRight: 10 }} 
                    />
                    <img 
                        src={champiRouge} 
                        alt="Champignon rouge" 
                        className='item' 
                        onClick={handleMotivation2Click} 
                    />
                    <hr />
                    <div className="flexbox">
                        <Fade in={checkedMotivations1} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={motivation1} 
                                    alt="Apprentissage de nouvelles compétences" style={{ width: 100 }} 
                                />
                                <p>Apprentissage de nouvelles compétences</p>
                            </div>
                        </Fade>
                        <Fade in={checkedMotivations2} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={motivation2} 
                                    alt="Travail en équipe et apprentissage des autres" 
                                    style={{ width: 100 }} 
                                />
                                <p>Travail en équipe et apprentissage des autres</p>
                            </div>
                        </Fade>
                    </div>
                </div>

                <div className="bloc valeurs">
                    <h3>Mes valeurs</h3>
                    <img 
                        src={champiVert} 
                        alt="Champignon vert" 
                        className='item' 
                        onClick={handleValeurs1Click} 
                        style={{ marginRight: 10 }} 
                    />
                    <img 
                        src={champiVert} 
                        alt="Champignon vert" 
                        className='item' 
                        onClick={handleValeurs2Click} 
                        style={{ marginRight: 10 }} 
                    />
                    <img 
                        src={champiVert} 
                        alt="Champignon vert" 
                        className='item' 
                        onClick={handleValeurs3Click} 
                    />
                    <hr />
                    <div className="flexbox">
                        <Fade in={checkedValeurs1} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={valeurSerieux} 
                                    alt="Sérieux" 
                                    style={{ width: 100 }} 
                                />
                                <p>Sérieux</p>
                            </div>
                        </Fade>
                        <Fade in={checkedValeurs2} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={valeurCurieux} 
                                    alt="Curieux" 
                                    style={{ width: 100 }} 
                                />
                                <p>Curieux</p>
                            </div>
                        </Fade>
                        <Fade in={checkedValeurs3} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={valeurDetermine} 
                                    alt="Déterminé" 
                                    style={{ width: 100 }} 
                                />
                                <p>Déterminé</p>
                            </div>
                        </Fade>
                    </div>
                </div>

                <div className="bloc passions">
                    <h3>Mes passions</h3>
                    <img 
                        src={megaChampi} 
                        alt="Méga champignon"
                        className='item' 
                        onClick={handlePassions1Click} 
                        style={{ marginRight: 10 }} 
                    />
                    <img 
                        src={megaChampi} 
                        alt="Méga champignon" 
                        className='item' 
                        onClick={handlePassions2Click} 
                    />
                    <hr />
                    <div className="flexbox">
                        <Fade in={checkedPassions1} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={passionJeuxVideo} 
                                    alt="Jeux vidéo" 
                                    style={{ width: 100 }} 
                                />
                                <p>Jeux vidéo</p>
                            </div>
                        </Fade>
                        <Fade in={checkedPassions2} timeout={2000}>
                            <div style={{ marginTop: '10px' }}>
                                <img 
                                    src={passionMusique} 
                                    alt="Musique" 
                                    style={{ width: 100 }} 
                                />
                                <p>Musique</p>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>

            <div className="last-images">
                <img 
                    src={marioDebout}
                    alt='Mario debout'
                    onClick={allInteractionsCompleted ? returnToFirstPage : undefined}
                    style={{ cursor: allInteractionsCompleted ? 'pointer' : 'not-allowed' }}
                />
                <img src={tuyauVert} alt="Tuyau vert" />
            </div>
        </div>
    );
}

export default Perso;
