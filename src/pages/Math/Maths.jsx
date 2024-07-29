import React, { useEffect, useState } from 'react';
import s from './Maths.module.scss';
import { Link } from 'react-router-dom';
import store from '../../Images/store.png'
import pets from '../../Images/pets.png'
import money from '../../Images/money.png'
import useSound from 'use-sound';
import win from '../../Sound/zvuk-pravilnogo-otveta-5fsd5 (mp3cut.net) (1).mp3';
import lose from '../../Sound/__themusicalnomad__negative-beeps.mp3';
import quest from '../../Images/quest.png'

const Maths = () => {
    const [active, setActive] = useState(false);
    const [final, setFinal] = useState('');
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [result, setResult] = useState('');
    const [moneys, setMoney] = useState(localStorage.getItem('money') ? parseFloat(localStorage.getItem('money')) : 0);
    const [error, setError] = useState(localStorage.getItem('errors') ? parseFloat(localStorage.getItem('errors')) : 0)
    const [trues, setTrues] = useState(localStorage.getItem('trues') ? parseFloat(localStorage.getItem('trues')) : 0)
    
    useEffect(() => {
      localStorage.setItem('errors', error)
    }, [error])
    useEffect(() => {
      localStorage.setItem('trues', trues)
    }, [trues])
    
    
    const [giveMoney, setGiveMoney] = useState(1);
    const storagePets = localStorage.getItem('pets');
    const parsedPets = JSON.parse(storagePets);
    const boostFromPets = parsedPets ? parsedPets.reduce((totalBoost, pet) => totalBoost + pet.boost, 0) : 0;
    
    const storageBack = localStorage.getItem('back');
    const parsedBack = JSON.parse(storageBack);
    const boostFromBack = parsedBack ? parsedBack.reduce((totalBoost, back) => totalBoost + back.boost, 0) : 0;
    
    const totalBoost = boostFromPets + boostFromBack;

    useEffect(() => {
        if (totalBoost === 0) {
            setGiveMoney(1);
        } else {
            setGiveMoney(totalBoost);
        }
    }, [totalBoost]);

    useEffect(() => {
        const storedMoney = localStorage.getItem('money');
        if (storedMoney) {
            setMoney(parseFloat(storedMoney));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('money', moneys.toString());
    }, [moneys]);

    function generate() {
        setActive(true);
        setResult('');
        let first, second, sign, correctAnswer;
        do {
            first = Math.floor(Math.random() * 10);
            second = Math.floor(Math.random() * 10);
            sign = Math.random() < 0.5 ? '+' : '-';
            correctAnswer = sign === '+' ? first + second : first - second;
        } while (sign === '-' && correctAnswer < 0);
        setCorrectAnswer(correctAnswer);
    
        const incorrectAnswers = [];
        const usedAnswers = [correctAnswer];
        let s = 0
        for (let i = 0; i < 3; i++) {
            s++ 
            console.log(s);
            const answer = generateIncorrectAnswer(s, first, second, sign, usedAnswers, correctAnswer);
            incorrectAnswers.push(answer);
            usedAnswers.push(answer);
        }
        
        const allAnswers = shuffleArray([...incorrectAnswers, correctAnswer]);
        setAnswers(allAnswers);
        
        setFinal(`${first} ${sign} ${second}`);
    }
    
    function generateIncorrectAnswer(s, first, second, sign, usedAnswers, correctAnswer) {
        let modifier;
        let random = Math.floor(Math.random() * 10);
        console.log(random);
        do {
            modifier = random < 5 ? correctAnswer + s : correctAnswer - s;
            console.log(random < 5 ? '+' : '-');
        } while (usedAnswers.includes(modifier));
        return sign === '+' ? modifier : modifier;
    }   

    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    const [play] = useSound(win);
    const [loseplay] = useSound(lose);
    
    function checkAnswer(answer) {
        if (answer === correctAnswer) {
            setMoney(prevMoney => prevMoney + giveMoney);
            setResult('Правильно');
            play();
            setTrues(prevTrue => prevTrue + 1)
            if (error == 10) {
                setMoney(prevMoney => prevMoney + giveMoney)
                setTrues(0)
            }
        } else {
            setError(prevError => prevError + 1)
            setResult('Неправильно');
            setTrues(0)
            if (error > 9) {
                setMoney(prevMoney => prevMoney - giveMoney + 10)
                setError(0)
            }
            loseplay()
        }
        setTimeout(() => {
            setActive(false)
        }, 1000)
    }

    return (
        <>
        <div className={s.prim}>
            {parsedBack?.map((item,i) => (
                <img className={s.prim_back} key={i} src={item.img} alt="" />
            ))}
            <h1 className={s.prim_errors}>Ошибок: {error}</h1>
            <h1 className={s.prim_trues}>Подряд правильно: {trues}</h1>
            <div className={s.prim_store}>
                <h3 className={s.prim_store_money}>{moneys} <img className={s.prim_store_money_img} src={money} alt="" /></h3>
                <div className={s.prim_store_box}>
                <Link className={s.prim_store_box_link} to={'/store'}><img className={s.prim_store_box_link_img} src={store} alt="Store"/></Link>
                <Link className={s.prim_store_box_link} to={'/pets'}><img className={s.prim_store_box_link_img} src={pets} alt="Store"/></Link>
                <Link className={s.prim_store_box_link} to={'/quest'}><img className={s.prim_store_box_link_img} src={quest} alt="Store"/></Link>
                </div>
            </div>
            <h1 className={s.prim_question}>{final}</h1>
            <div className={s.prim_otvet}>
                {result ? (
                    <h1 className={result === 'Правильно' ? s.prim_otvet_true : s.prim_otvet_false}>{result}</h1>
                    ) : (
                    answers.map((item, i) => (
                        <button
                            key={i}
                            className={s.prim_otvet_answerButton}
                            onClick={() => checkAnswer(item)}
                            disabled={!active}
                            >
                            {item}
                        </button>
                    ))
                    )}
            </div>
            <button
                className={active ? s.prim_button_active : s.prim_button}
                onClick={generate}
                disabled={active}
                >
                Start
            </button>
        </div>
        </>
    );
};

export default Maths;