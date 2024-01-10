// Requerimientos
// 1) Acer una app web que contemple la creacion de items To Do ------
// 2) Pantalla principal con lista de items pre-cargada (aca va a haber un .json con algunos datos)
// 3) Los datos del objeto ITEM -> id, texto, fechaCreacion, fechaCompletado
// 4) Tambien va a haber un input de tipo texto, seguido de un boton para el agregado del item To Do y su aceptacion (item cuando se agrega tiene que estar sin checkear FALSE)
// 5) Cada item tendrá un checkbox a su lado, para indicar si fue completado o no

import "./App.css";

import datosEnJson from "./datos.json";
import { useState } from "react";

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
    let auxTemp = datos.filter((i) => i.id !== item.id);
    setDatos(auxTemp);
  }
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Nuevo To Do"
        value={textoNuevoItem}
        onChange={(val) => handlerTextoNuevoItem(val)}
      />
      <button onClick={() => agregarItem()}>Agregar</button>
      <hr></hr>
      <table
        style={{ border: 2, borderStyle: "solid", borderCollapse: "collapse" }}
      >
        <tr>
          <td style={{ border: "1px solid black" }}>
            <span>Estado</span>
          </td>
          <td style={{ border: "1px solid black" }}>
            <span>Texto</span>
          </td>
          <td style={{ border: "1px solid black" }}>
            <span>F. Creacion</span>
          </td>
          <td style={{ border: "1px solid black" }}>
            <span>F. Completado</span>
          </td>
          <td style={{ border: "1px solid black" }}>
            <span>Acciones</span>
          </td>
        </tr>

        {datos &&
          datos
            .sort((a, b) => a.id - b.id)
            .map((item) => {
              return (
                <tr>
                  <td style={{ border: "1px solid black" }}>
                    <input
                      type="checkbox"
                      onClick={() => cambiarEstadoItem(item)}
                      checked={item.completado}
                    />
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span>{item.texto}</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span>{item.fechaCreacion}</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span>{item.fechaCompletado}</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <button onClick={() => handlerBorrarItem(item)}>
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
        {datos.length === 0 && (
          <tr>
            <td colSpan="5">No hay datos</td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default App;
