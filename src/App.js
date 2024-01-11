// Requerimientos
// 1) Acer una app web que contemple la creacion de items To Do ------
// 2) Pantalla principal con lista de items pre-cargada (aca va a haber un .json con algunos datos)
// 3) Los datos del objeto ITEM -> id, texto, fechaCreacion, fechaCompletado
// 4) Tambien va a haber un input de tipo texto, seguido de un boton para el agregado del item To Do y su aceptacion (item cuando se agrega tiene que estar sin checkear FALSE)
// 5) Cada item tendrá un checkbox a su lado, para indicar si fue completado o no

import "./App.css";

import { useEffect, useState } from "react";

import BodyComponent from "./components/BodyComponent";
import ContainerComponent from "./components/ContainerComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import NavComponent from "./components/NavComponent";
import datosEnJson from "./datos.json";

function App() {
  const [datos, setDatos] = useState(datosEnJson);
  const [textoNuevoItem, setTextoNuevoItem] = useState("");
  const [ultimoId, setUltimoId] = useState(4);

  function agregarItem() {
    // Checkear que el input tenga texto
    if (textoNuevoItem.trim() === "") {
      alert("Debe ingresar un texto");
      return; // corta la funcion agregarItem
    }

    // Creo una variable temporarioa auxTemp cuyo contenido es una copia del array datos
    let auxTemp = [...datos];
    // Push lo que hace es agregar un nuevo item a mi array de objetos
    auxTemp.push({
      id: ultimoId + 1,
      texto: textoNuevoItem,
      fechaCreacion: new Date().toLocaleDateString(),
      fechaCompletado: "",
      completado: false,
    });
    // Guardo el valor de la variable temporaria auxTemp en el state datos
    setDatos(auxTemp);
    // Autoincremento el ultimo id y lo almaceno en el state ultimoId
    setUltimoId(ultimoId + 1);
    // Limpio el input de texto
    setTextoNuevoItem("");
  }

  function cambiarEstadoItem(item) {
    // Creo una variable aux temporaria con los datos, menos el que estoy editando
    let auxTemp = datos.filter((i) => i.id !== item.id);
    // Agregar esa coleccion del item, con la modificacion requerida
    auxTemp.push({
      id: item.id,
      texto: item.texto,
      fechaCreacion: item.fechaCreacion,
      fechaCompletado:
        item.completado === true ? "" : new Date().toLocaleDateString(),
      completado: item.completado === true ? false : true,
    });
    // Guardar la informacion modificada en mi state datos
    setDatos(auxTemp);
  }

  function handlerTextoNuevoItem(val) {
    setTextoNuevoItem(val.target.value);
  }

  function handlerBorrarItem(item) {
    console.log("Llamandose desde el método");
    let auxTemp = datos.filter((i) => i.id !== item.id);
    setDatos(auxTemp);
  }

  useEffect(() => {
    // Generalmente se utiliza para popular datos desde un BE
    console.log("Llamandose desde el useEffect");
  }, [datos]);

  return (
    <ContainerComponent>
      <NavComponent
        agregarItem={agregarItem}
        handlerTextoNuevoItem={handlerTextoNuevoItem}
        textoNuevoItem={textoNuevoItem}
      />
      <hr></hr>
      <table
        style={{ border: 2, borderStyle: "solid", borderCollapse: "collapse" }}
      >
        <HeaderComponent />
        <BodyComponent
          datos={datos}
          cambiarEstadoItem={cambiarEstadoItem}
          handlerBorrarItem={handlerBorrarItem}
        />
      </table>
      {/* <FooterComponent propEjemplo={"Hola mundo"}>
        <span>Copyrights (DevTeam)</span>
        <span>-</span>
        <span>2024</span>
        <span>-</span>
        <a
          href="https://github.com/dbertolini/dev-team-todo-app"
          target="_blank"
        >
          Github Repository
        </a>
      </FooterComponent> */}
    </ContainerComponent>
  );
}

export default App;
