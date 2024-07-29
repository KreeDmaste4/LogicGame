import React, { useEffect, useState } from 'react';
import money from '../../Images/money.png';
import s from './Store.module.scss';
import { Link } from 'react-router-dom';
import chup from '../../Images/Pets/chup.png'
import cocaloca from '../../Images/Pets/coca-loca.png'
import icedrako from '../../Images/Pets/drako.png'
import faerdrako from '../../Images/Pets/fair-darko.png'
import img1 from '../../Images/Back/img1.jpg'
import img2 from '../../Images/Back/img2.jpg'
import img3 from '../../Images/Back/img3.jpg'

const Store = () => {
  
  const [pets, setPets] = useState([
    {name: 'Chup-Chup', boost: 1.5, price: 20, img: chup},
    {name: 'Coca-Loca', boost: 3, price: 100, img: cocaloca},
    {name: 'Ice-Drakon', boost: 5, price: 500, img: icedrako},
    {name: 'Fire-Drakon', boost: 10, price: 1500, img: faerdrako},
  ])
  const [img, setImg] = useState([
    {name: 'blossoms', boost: 2, price: 50, img: img1},
    {name: 'Ice leakage', boost: 5, price: 500, img: img2},
    {name: 'Passing the fire', boost: 7, price: 1000, img: img3},
  ])
  
  let storagepet = localStorage.getItem('pets')
  const [buyedPets, setBuyedPets] = useState(storagepet ? JSON.parse(storagepet) : []);
  let storageback = localStorage.getItem('back')
  const [buyedback, setBuyedBack] = useState(storageback ? JSON.parse(storageback) : []);
  const [infobuy, setInfoBuy] = useState('');
  let moneys = localStorage.getItem('money');
  const link = localStorage.getItem('link');
  
  useEffect(() => {
    if (buyedPets.length > 20 || buyedback.length > 30) {
      console.log('error');
    }else{
      localStorage.setItem('pets', JSON.stringify(buyedPets));
      localStorage.setItem('back', JSON.stringify(buyedback));
    }
  }, [buyedPets], [buyedback]);

  function buyPet(item) {
    if (moneys >= item.price && buyedPets.length < 20) {
      moneys -= item.price
      localStorage.setItem('money', moneys)
      setBuyedPets(prevPets => [...prevPets, item]);
      setInfoBuy('Success');
      setTimeout(() => {
        setInfoBuy('');
      }, 3000);
    } else {
      setInfoBuy('Failed');
      setTimeout(() => {
        setInfoBuy('');
      }, 3000);
    }
  }
  function buyBack(item) {
    if (moneys >= item.price && buyedback.length < 1) {
      const newMoney = moneys - item.price;
      localStorage.setItem('money', newMoney); // Обновляем значение в локальном хранилище
      setBuyedBack(prevback => [...prevback, item]);
      localStorage.setItem('back', JSON.stringify([...buyedback, item])); // Обновляем список купленных back в локальном хранилище
      setInfoBuy('Success');
      setTimeout(() => {
        setInfoBuy('');
      }, 3000);
    } else {
      setInfoBuy('Failed');
      setTimeout(() => {
        setInfoBuy('');
      }, 3000);
    }
  }  
  
  return (
    <>
      <div className={s.box}>
        <div className={s.box_navbar}>
        <Link to={link} className={s.box_navbar_back}>Back</Link>
        <div className={s.box_navbar_store}>
          <h3 className={s.box_navbar_store_money}>{moneys}</h3>
          <img className={s.box_navbar_store_money_img} src={money} alt="" />
        </div>
        </div>
        <h1 className={infobuy === 'Success' ? s.box_success : s.box_failed}>{infobuy}</h1>
        <h1 className={s.box_pets_title}>Pets</h1>
        <div className={s.box_pets}>
          {pets.map((item, index) => (
            <div className={s.box_pets_item} key={index}>
              <img src={item.img} alt="" className={s.box_pets_item_img} />
              <div className={s.box_pets_item_info}>
                <h3 className={s.box_pets_item_info_text}>Name: <span className={s.box_pets_item_info_span}>{item.name}</span></h3>
                <h3 className={s.box_pets_item_info_text}>Boost: <span className={s.box_pets_item_info_span}>{item.boost}</span></h3>
                <h3 className={s.box_pets_item_info_text}>Price: <span className={s.box_pets_item_info_span}>{item.price}</span><img className={s.box_pets_item_money} src={money} alt="" /></h3>
              </div>
              <button onClick={() => buyPet(item)} className={s.box_pets_item_buy}>Buy</button>
            </div>
          ))}
        </div>
        <h1 className={s.box_pets_title}>Background</h1>
        <div className={s.box_pets}>
          {img.map((item, index) => (
            <div className={s.box_pets_item} key={index}>
              <img src={item.img} alt="" className={s.box_back_item_img} />
              <div className={s.box_pets_item_info}>
                <h3 className={s.box_pets_item_info_text}>Name: <span className={s.box_pets_item_info_span}>{item.name}</span></h3>
                <h3 className={s.box_pets_item_info_text}>Boost: <span className={s.box_pets_item_info_span}>{item.boost}</span></h3>
                <h3 className={s.box_pets_item_info_text}>Price: <span className={s.box_pets_item_info_span}>{item.price}</span><img className={s.box_pets_item_money} src={money} alt="" /></h3>
              </div>
              <button onClick={() => buyBack(item)} className={s.box_pets_item_buy}>Buy</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Store;