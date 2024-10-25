import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-modal"; // Importa React Modal
import "./FormularioPerfil.css";
import papelera from "../../../multimedia/SVGs/TRASH.svg";
import fondo_modal from "../../../multimedia/comidas/food_emoji.jpg";

// Estilos del modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "auto",
    maxHeight: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  overlay: {
    // backgroundImage: `url(${fondo_modal})`, // Usa backgroundImage para aplicar la imagen
    // backgroundSize: "cover", // Para que la imagen cubra todo el fondo
    // backgroundPosition: "center", // Centrar la imagen
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const FormularioPerfil = () => {
  const [emojiState, setEmojisState] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para manejar el modal

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .email("Debe ser un correo electrónico válido"),
  });

  // Función para manejar el archivo seleccionado
  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Previsualización de la imagen
    setFieldValue("profileImage", file); // Almacenar el archivo en el estado de Formik
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (values) => {
    console.log("Formulario enviado:", values);
    console.log("Archivo de imagen:", values.profileImage);
  };

  // Funciones para abrir/cerrar el modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const Emojis = [
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🫛",
    "🌽",
    "🌶",
    "🫑",
    "🥒",
    "🥬",
    "🥦",
    "🧄",
    "🧅",
    "🍄",
    "🥔",
    "🥕",
    "🌰",
    "🫘",
    "🍞",
    "🫓",
    "🥨",
    "🥯",
    "🥞",
    "🧇",
    "🧀",
    "🍖",
    "🍗",
    "🥩",
    "🥓",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🫔",
    "🥙",
    "🧆",
    "🍲",
    "🍜",
    "🦪",
    "🍣",
    "🍱",
    "🍛",
    "🍚",
    "🍙",
    "🍘",
    "🍥",
    "🥠",
    "🍢",
    "🍡",
    "🍧",
    "🍨",
    "🍦",
    "🥧",
    "🧁",
    "🍰",
    "🎂",
    "🍮",
    "🍭",
    "🍬",
    "🍫",
    "🍿",
    "🧃",
    "🧉",
    "🧊",
    "🍩",
  ];
  function guardarEmojis(indice) {
    Emojis.forEach((emoji, index) => {
      if (indice === index) {
        // Solo agregar si hay menos de 3 emojis seleccionados
        if (emojiState.length < 3) {
          setEmojisState([...emojiState, emoji]); // Crea una nueva copia con el nuevo emoji
        }
      }
    });
  }

  function limpiarEmojis() {
    setEmojisState([]);
  }
  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", profileImage: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form id="formulario-editar-perfil">
            {/* Campo para cargar la imagen */}
            <div className="container-form-foto">
              <label htmlFor="profileImage">Cambiar Foto</label>
              <input
                id="profileImage"
                name="profileImage"
                type="file"
                onChange={(event) => handleFileChange(event, setFieldValue)}
                accept="image/*"
              />
              {selectedImage && (
                <div className="container-foto-editar">
                  <img
                    src={selectedImage}
                    alt="Previsualización de la imagen"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="container-dato">
              <label htmlFor="name">Nombre</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="input-editar-perfil"
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="container-dato">
              <label htmlFor="description">Descripción</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="input-editar-perfil"
              />
              <ErrorMessage
                name="description"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <div className="container-editor-emojis">
              <button
                type="button"
                onClick={openModal}
                className="cambiar-emojis-btn"
              >
                Cambiar Emojis
              </button>
              <div>
                {emojiState[0]}&nbsp;{emojiState[1]}&nbsp;{emojiState[2]}
              </div>
            </div>

            <button type="submit" className="guardar-cambios-btn">
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Cambiar Emojis"
      >
        <h3 className="titulo-emojis">Selecciona 3 emojis</h3>
        <section className="emojis-table">
          {Emojis.map((emoji, index) => (
            <div
              key={index}
              className="emoji"
              onClick={() => guardarEmojis(index)}
            >
              {emoji}
            </div>
          ))}
        </section>
        <div className="container-emojis-seleccionados">
          <div className="emojis-seleccionados">
            {emojiState[0]}&nbsp;{emojiState[1]}&nbsp;{emojiState[2]}
          </div>
          <button onClick={() => limpiarEmojis()}>
            Limpiar
            <img src={papelera} />{" "}
          </button>
        </div>
        <div className="container-btns-emojis">
          <button onClick={closeModal}>Guardar</button>
        </div>
      </Modal>
    </>
  );
};

export default FormularioPerfil;
