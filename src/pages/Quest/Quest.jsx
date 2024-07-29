import React, { useState, useEffect } from 'react';
import money from '../../Images/money.png';
import s from './Quest.module.scss';
import { Link } from 'react-router-dom';

const Quest = () => {
    
    const [moneys, setMoney] = useState(localStorage.getItem('money') ? parseFloat(localStorage.getItem('money')) : 0);
    let trues = localStorage.getItem('trues') ? localStorage.getItem('trues') : 0;
    let link = localStorage.getItem('link');
    
    let quests = [
        {name: 'genius', text: 'Решить правльно 10 примеров', task: 10, money: 50, class: 'question'},
        {name: 'genius2', text: 'Решить правльно 50 примеров', task: 50, money: 5000, class: 'question'},
        {name: 'rich', text: 'Заработать 100 монет', task: 100, money: 500, class: 'moneys'},
        {name: 'rich2', text: 'Заработать 10000 монет', task: 10000, money: 5000, class: 'moneys'},
    ];
    
    const [todayquest, setTodayQuest] = useState(() => {
        const savedQuest = localStorage.getItem('quest');
        try {
            const parsedQuest = savedQuest ? JSON.parse(savedQuest) : [];
            const savedTime = localStorage.getItem('questTime');
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - savedTime;
            const timeDiffMinutes = timeDiff / (1000 * 60);
            
            console.log('Time difference in minutes:', timeDiffMinutes);
            
            if (timeDiffMinutes >= 5) {
                console.log('Generating new quests...');
                const randomQuests = getRandomQuests(quests, 3);
                localStorage.setItem('quest', JSON.stringify(randomQuests));
                localStorage.setItem('questTime', new Date().getTime());
                return randomQuests;
            } else {
                console.log('Using saved quests...');
                return parsedQuest;
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return [];
        }
    });
    const [result, setResult] = useState('');
    
    useEffect(() => {
        if (!localStorage.getItem('quest')) {
            console.log('No saved quests found, generating new quests...');
            const randomQuests = getRandomQuests(quests, 3);
            localStorage.setItem('quest', JSON.stringify(randomQuests));
            localStorage.setItem('questTime', new Date().getTime());
            setTodayQuest(randomQuests);
        }
    }, []);    
    
    useEffect(() => {
        localStorage.setItem('quest', JSON.stringify(todayquest));
    }, [todayquest]);
    
    useEffect(() => {
        localStorage.setItem('money', moneys.toString());
    }, [moneys]);
    
    function getRandomQuests(questsArray, count) {
        const shuffled = questsArray.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
        
    function chekQuest(item) {
        if (item.class === 'moneys') {
            if (moneys >= item.task) {
                const checkedQuest = todayquest.filter(quest => quest !== item);
                setTodayQuest(checkedQuest);
                setResult('Выполнено');
                setTimeout(() => {
                    setResult('')
                }, 3000);
                setMoney(prevMoney => prevMoney + item.money)
                console.log(moneys);
            } else {
                setResult('Не выполнено');
                setTimeout(() => {
                    setResult('')
                }, 3000);
            }
        } else {
            if (trues >= item.task) {
                const checkedQuest = todayquest.filter(quest => quest !== item);
                setTodayQuest(checkedQuest);
                setResult('Выполнено');
                setTimeout(() => {
                    setResult('')
                }, 3000);
                setMoney(prevMoney => prevMoney + item.money)
                console.log(moneys);
            } else {
                setResult('Не выполнено');
                setTimeout(() => {
                    setResult('')
                }, 3000);
            }
        }
    }
    
    return (
        <>
            <div className={s.box}>
                <Link className={s.box_back} to={link}>Back</Link>
                <h1 className={result == 'Выполнено' ? s.box_result_true : s.box_result_false}>{result}</h1>
                <div className={s.box_quest}>
                    {todayquest.map((quest, index) => (
                        <div key={index} className={s.box_quest_item}>
                            <p className={s.box_quest_item_text}>{quest.text}</p>
                            <p className={s.box_quest_item_text}>Награда: {quest.money} <img src={money} alt="" className={s.box_quest_item_text_img} /></p>
                            <button onClick={() => chekQuest(quest)} className={s.box_quest_item_btn}>Check</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Quest;