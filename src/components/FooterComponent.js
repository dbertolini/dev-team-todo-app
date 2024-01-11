function FooterComponent({ children, propEjemplo }) {
  return (
    <>
      <h1>{propEjemplo}</h1>
      {children}
    </>
  );
}

export default FooterComponent;
