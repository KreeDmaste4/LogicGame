import React, { useEffect, useState } from 'react'
import s from './Home.module.scss'
import { Link, Route } from 'react-router-dom'
import math from '../../Images/math.png'
import tg from '../../Images/contacts/tg.png'
import git from '../../Images/contacts/github.png'
import yt from '../../Images/contacts/ютуб.png'
import gm from '../../Images/contacts/gmail.png'

const Home = () => {
  
  const select = [
    { link: '/math', img: math},
  ]
  
  function savePath(link) {
    localStorage.setItem('link', link)
  }
  
  return (
    <>
      <div className={s.box}>
        <h1 className={s.box_title}>
          <span className={s.box_title_f}>Logic</span>
          <span className={s.box_title_s}>Games</span>
        </h1>
        <h2 className={s.box_text}>This is a virtual space created for fans of intellectual challenges and puzzles. It offers a fun and varied immersion into a world of mental challenges and logical riddles. Puzzle lovers can enjoy a wide range of content on this site</h2>
        <ul className={s.box_ul}>
        {select?.map((item, i) => (
          <button
          className={s.box_ul_btn}
          onClick={() => savePath(item.link)}
          key={i}
          >
            <Link
              key={i}
              className={s.box_ul_btn_link}
              to={item.link}
              >
              <img className={s.box_ul_btn_link_img} src={item.img} alt={item.name} />
            </Link>
          </button>
        ))}
        </ul>
        <div className={s.box_contacts}>
          <a href="https://t.me/Shomirkwq" className={s.box_contacts_link}>
            <img className={s.box_contacts_link_img} src={tg} alt="" />
          </a>
          <a href="https://www.youtube.com/channel/UCCl7UZvNveqfTz6ygmoTyjQ" className={s.box_contacts_link}>
            <img className={s.box_contacts_link_img} src={yt} alt="" />
          </a>
          <a href="https://github.com/KreeDmaste4" className={s.box_contacts_link}>
            <img className={s.box_contacts_link_img} src={git} alt="" />
          </a>
          <a href="mailto:somirhon@gmail.com" className={s.box_contacts_link}>
            <img className={s.box_contacts_link_img} src={gm} alt="" />
          </a>
        </div>
        <div className={s.box_info}>
          <h3 className={s.box_info_dev}>Made by <span className={s.box_info_dev_name}>Шомирхон</span></h3>
          <h3 className={s.box_info_more}>
            <span className={s.box_info_more_geo}>made in: Uzbekistan</span>
            <span className={s.box_info_more_time}>time: 14:00, day: 09.05.2024</span>
          </h3>
        </div>
      </div>
    </>
  )
}

export default Home