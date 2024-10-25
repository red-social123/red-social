import React from "react";
import "./Perfil.css";
import Modal from "react-modal";
import { useState } from "react";
import plato from "../../multimedia/generales/platogrande-landing.png";
import FormularioPerfil from "./components/FormularioPerfil";
Modal.setAppElement("#root");

export const Perfil = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="container-perfil">
      <section className="box-usuario">
        <article className=" card-usuario">
          <div className="container-img-perfil">
            <div id="perfil-img"></div>
          </div>
          <strong id="perfil-usuario">@user</strong>
          <h2 id="perfil-nombre">Benja Moreno</h2>
          <div className="perfil-emojis">🍇🍇🍇</div>
          <button className="editar-perfil" onClick={openModal}>
            editar perfil
          </button>
          <p id="perfil-descripcion">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eos
            sint porro vel ab quisquam maxime culpa voluptatum, placeat dolor.
          </p>
        </article>
        <article className="item-perfil tus-gustos">
          <h5 className="container-titulo">Tus gustos</h5>
          <div className="info-articulos">
          </div>
        </article>
        <article className="item-perfil tus-amigos">
          <h5 className="container-titulo">Tus amigos</h5>
          <div className="info-articulos info-amigos">
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
            <div className="item-amigo"></div>
          </div>
        </article>
        <article className="item-perfil actividad">
          <h5 className="container-titulo">Actividad</h5>
          <div className="info-articulos"></div>
        </article>
      </section>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Ejemplo de Modal"
        style={{
          overlay: {
            backgroundColor:"#c0c0c08a"
          },
          content: {
            border: "solid gray 1px",
            width: "70%",
            margin: "auto",
            padding:'0',
            display:'flex'
          },
        }}
      >
        <div className="img-modal-perfil">
          <h2>Editar perfil</h2>
          <img src={plato} alt="" />
        </div>
        <FormularioPerfil/>
        <button onClick={closeModal} className="cerrar-modal-perfil">
          Cerrar edición
        </button>
      </Modal>
    </div>
  );
};
