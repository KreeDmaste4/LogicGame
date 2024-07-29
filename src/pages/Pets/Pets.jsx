import React, { useEffect, useState } from 'react';
import s from './Pets.module.scss';
import { Link } from 'react-router-dom';

const Pets = () => {

  const [mypets, setMypets] = useState([]);
  const link = localStorage.getItem('link');
  const storagepets = localStorage.getItem('pets');
  const parsedPets = JSON.parse(storagepets);
  const [myback, setMyback] = useState([]);
  const storageback = localStorage.getItem('back');
  const parsedback = JSON.parse(storageback);

  useEffect(() => {
    if (parsedPets) {
      setMypets(parsedPets);
    }
  }, []);

  function deletePet(item) {
    const updatedPets = mypets.filter(pet => pet !== item);
    setMypets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  }
  useEffect(() => {
    if (parsedback) {
      setMyback(parsedback);
    }
  }, []);

  function deleteback(item) {
    const updatedback = myback.filter(back => back !== item);
    setMyback(updatedback);
    localStorage.setItem('back', JSON.stringify(updatedback));
  }
  
  const [clas, setClas] = useState('disable')
  const visible = () => {clas == 'active' ? setClas('disable') : setClas('active')}
  function sortPets(form) {
    setClas('disable')
    if (form == 'up') {
      const sortedPets = [...mypets].sort((a, b) => b.boost - a.boost);
      setMypets(sortedPets);
    }else{
      const sortedPets = [...mypets].sort((a, b) => a.boost - b.boost);
    setMypets(sortedPets);
    }
  }
  
  return (
    <>
    <div className={s.box}>
      <h1 className={s.box_title}>My pets</h1>
      <Link to={link} className={s.box_back}>Back</Link>
      <h3 className={s.box_buyedpets_sum}>{parsedPets.length}/20</h3>
      <button onClick={() => visible()} className={s.box_sort}>Sort</button>
      <div className={clas == 'active' ? s.box_select_active : s.box_select_disable}>
        <ul className={s.box_select_active_ul}>
          <li onClick={() => sortPets('up')} className={s.box_select_active_ul_li}>/\Boost</li>
          <li onClick={() => sortPets('down')} className={s.box_select_active_ul_li}>\/Boost</li>
        </ul>
      </div>
      <div className={s.box_buyedpets}>
        {mypets.length > 0 ?
        mypets && mypets.length > 0 && mypets.map((item, index) => (
          <div className={s.box_buyedpets_item} key={index}>
            <img className={s.box_buyedpets_item_img} src={item.img} alt=""/>
            <div className={s.box_buyedpets_item_info}>
              <h3 className={s.box_buyedpets_item_info_text}>Name: <span className={s.box_pets_item_info_span}>{item.name}</span></h3>
              <h3 className={s.box_buyedpets_item_info_text}>Boost: <span className={s.box_pets_item_info_span}>{item.boost}</span></h3>
            </div>
            <button onClick={() => deletePet(item)} className={s.box_buyedpets_item_equip}>Delete</button>
          </div>
        ))
        :
        <h1 className={s.box_buyedpets_noitem}>No background image</h1>
        }
      </div>
      <h3 className={s.box_buyedpets_sum}>{parsedback.length}/1</h3>
      <div className={s.box_buyedpets}>
        {myback.length > 0 ? 
        myback.map((item, index) => (
          <div className={s.box_buyedpets_item} key={index}>
            <img className={s.box_buyedpets_item_img} src={item.img} alt=""/>
            <div className={s.box_buyedpets_item_info}>
              <h3 className={s.box_buyedpets_item_info_text}>Name: <span className={s.box_pets_item_info_span}>{item.name}</span></h3>
              <h3 className={s.box_buyedpets_item_info_text}>Boost: <span className={s.box_pets_item_info_span}>{item.boost}</span></h3>
            </div>
            <button onClick={() => deleteback(item)} className={s.box_buyedpets_item_equip}>Delete</button>
          </div>
        ))
        :
        <h1 className={s.box_buyedpets_noitem}>No background image</h1>
        }
      </div>
    </div>
    </>
  );
};

export default Pets;