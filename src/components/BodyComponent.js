function BodyComponent({ datos, cambiarEstadoItem, handlerBorrarItem }) {
  return (
    <>
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
    </>
  );
}

export default BodyComponent;
