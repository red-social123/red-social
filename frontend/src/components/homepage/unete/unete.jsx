import React from "react";
import "./Unete.css";
import Tarjeta from "../tarjetas/tarjeta";
import socialfood from '../../../multimedia/comidas/social-food.jpg'

export const Unete = () => {
const datos={
    titulo: "Unete a la red social de comida",
    fondo: "#ffffff",
    boton: "Registrarse",
    display:"none",
    colorTexto:"black"
  }
  return (
    <section className="container-unete">
      <article>
        <Tarjeta datos={datos}/>
        <img src={socialfood} alt="" />
      </article>
    </section>
  );
};
