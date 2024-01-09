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
