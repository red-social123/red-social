import React from "react";
import "./Tarjetas.css";
import Tarjeta from "./tarjeta";
import comida from "../../../multimedia/comidas/plato-tarjeta.jpg";
import personas from "../../../multimedia/generales/personas-tarjeta.jpg";
import social from "../../../multimedia/generales/publicaciones-tarjeta.jpg";

export const Tarjetas = () => {
  const datosTarjetas = [
    {
      img: comida,
      titulo: "Encuentra tus gustos",
      fondo: "#FF7A45",
      boton: "Ver comidas",
    },
    {
      img: personas,
      titulo: "Conoce personas",
      fondo: "#31B77E",
      boton: "Ver personas",
    },
    {
      img: social,
      titulo: "Comparte tus gustos",
      fondo: "rgb(58, 12, 59)",
      boton: "Ver publicaciones",
    },
  ];
  return (
    <div className="container-tarjetas">
      {datosTarjetas.map((objeto,index) => (
        <Tarjeta datos={objeto} key={index}/>
      ))}
    </div>
  );
};
