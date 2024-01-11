function NavComponent({ agregarItem, handlerTextoNuevoItem, textoNuevoItem }) {
  return (
    <>
      <input
        type="text"
        placeholder="Nuevo To Do"
        value={textoNuevoItem}
        onChange={(val) => handlerTextoNuevoItem(val)}
      />
      <button onClick={() => agregarItem()}>Agregar</button>
    </>
  );
}
export default NavComponent;
