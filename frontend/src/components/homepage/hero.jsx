import React from "react";
import "./Hero.css";
import burger from '../../multimedia/generales/burger-landing.png';
import servilleta from '../../multimedia/generales/servilleta-landing.png';
import grande from '../../multimedia/generales/platogrande-landing.png';
import chico from '../../multimedia/generales/platochico-landing.png';
import cebollin from '../../multimedia/generales/cebollin-landing.png';
import izquierda from '../../multimedia/generales/hizquierda-landing.png';
import derecha from '../../multimedia/generales/hderecha-landing.png';

export default function Hero() {
  return (
    <div className="container-hero">
      <form>
        <h1>¿Cuál es tu comida favorita?</h1>
          <input type="search" placeholder="Buscar..." aria-label="Buscar"/>
          <button type="submit">Buscar</button>
      </form>
      <img className="pngs-landing burger" src={burger} alt="" />
      <img className="pngs-landing plato-grande" src={grande} alt="" />
      <img className="pngs-landing servilleta" src={servilleta} alt="" />
      <img className="pngs-landing plato-chico" src={chico} alt="" />
      <img className="pngs-landing cebollin" src={cebollin} alt="" />
      <img className="pngs-landing hoja-izquierda" src={izquierda} alt="" />
      <img className="pngs-landing hoja-derecha" src={derecha} alt="" />
    </div>
  );
}
