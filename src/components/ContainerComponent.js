function ContainerComponent({ children }) {
  return (
    <>
      <h1>Bienvenidos</h1>
      <div style={{ backgroundColor: "red" }}>{children}</div>
    </>
  );
}

export default ContainerComponent;
