// Requerimientos
// 1) Acer una app web que contemple la creacion de items To Do ------
// 2) Pantalla principal con lista de items pre-cargada (aca va a haber un .json con algunos datos)
// 3) Los datos del objeto ITEM -> id, texto, fechaCreacion, fechaCompletado
// 4) Tambien va a haber un input de tipo texto, seguido de un boton para el agregado del item To Do y su aceptacion
// 5) Cada item tendrá un checkbox a su lado, para indicar si fue completado o no

import "./App.css";

import datosEnJson from "./datos.json";

function App() {
  function agregarItem() {
    console.log("Agregando item");
  }

  function cambiarEstadoItem(estado, id) {}

  return (
    <div className="App">
      <input type="text" placeholder="Nuevo To Do" />
      <button onClick={agregarItem}>Agregar</button>
      <hr></hr>

      {datosEnJson.map((item) => {
        return (
          <div>
            <br />
            <input
              type="checkbox"
              onClick={cambiarEstadoItem(item.completado, item.id)}
              checked={item.completado}
            />
            <span style={{ margin: 4 }}>{item.texto}</span>
            <span style={{ margin: 4 }}>{item.fechaCreacion}</span>
            <span style={{ margin: 4 }}>{item.fechaCompletado}o</span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
