// Requerimientos
// 1) Acer una app web que contemple la creacion de items To Do ------
// 2) Pantalla principal con lista de items pre-cargada (aca va a haber un .json con algunos datos)
// 3) Los datos del objeto ITEM -> id, texto, fechaCreacion, fechaCompletado
// 4) Tambien va a haber un input de tipo texto, seguido de un boton para el agregado del item To Do y su aceptacion (item cuando se agrega tiene que estar sin checkear FALSE)
// 5) Cada item tendrá un checkbox a su lado, para indicar si fue completado o no

import "./App.css";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import BodyComponent from "./components/BodyComponent";
import ContainerComponent from "./components/ContainerComponent";
//import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import NavComponent from "./components/NavComponent";
//import datosEnJson from "./datos.json";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCDI6-Aa7CChPuVFy23w10NTF14tLRU0kQ",
  authDomain: "dev-team-todo-sample.firebaseapp.com",
  projectId: "dev-team-todo-sample",
  storageBucket: "dev-team-todo-sample.appspot.com",
  messagingSenderId: "371829285370",
  appId: "1:371829285370:web:f4d4975e2c0e2ad2f68443",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [datos, setDatos] = useState([]);
  const [textoNuevoItem, setTextoNuevoItem] = useState("");
  // const [ultimoId, setUltimoId] = useState(4);

  async function getTodos(db) {
    const todosCol = collection(db, "todos");
    const todosSnapshot = await getDocs(todosCol);
    const todosList = todosSnapshot.docs.map((doc) => doc.data());
    return todosList;
  }

  function agregarItem() {
    // Checkear que el input tenga texto
    if (textoNuevoItem.trim() === "") {
      alert("Debe ingresar un texto");
      return; // corta la funcion agregarItem
    }

    // // Creo una variable temporarioa auxTemp cuyo contenido es una copia del array datos
    // let auxTemp = [...datos];
    // // Push lo que hace es agregar un nuevo item a mi array de objetos
    // auxTemp.push({
    //   id: ultimoId + 1,
    //   texto: textoNuevoItem,
    //   fechaCreacion: new Date().toLocaleDateString(),
    //   fechaCompletado: "",
    //   completado: false,
    // });
    // Guardo el valor de la variable temporaria auxTemp en el state datos
    // setDatos(auxTemp);
    // Guardarlo en Firestore
    const uuid = uuidv4();
    // addDoc(collection(db, "todos"), {
    //   // id: ultimoId + 1,
    //   id: uuid,
    //   texto: textoNuevoItem,
    //   fechaCreacion: new Date(),
    //   fechaCompletado: null,
    //   completado: false,
    // });
    setDoc(doc(db, "todos", uuid), {
      // id: ultimoId + 1,
      id: uuid,
      texto: textoNuevoItem,
      fechaCreacion: new Date(),
      fechaCompletado: null,
      completado: false,
    });

    // // Autoincremento el ultimo id y lo almaceno en el state ultimoId
    // setUltimoId(ultimoId + 1);
    // Limpio el input de texto
    setTextoNuevoItem("");
  }

  function cambiarEstadoItem(item) {
    // // Creo una variable aux temporaria con los datos, menos el que estoy editando
    // let auxTemp = datos.filter((i) => i.id !== item.id);
    // // Agregar esa coleccion del item, con la modificacion requerida
    // auxTemp.push({
    //   id: item.id,
    //   texto: item.texto,
    //   fechaCreacion: item.fechaCreacion,
    //   fechaCompletado:
    //     item.completado === true ? "" : new Date().toLocaleDateString(),
    //   completado: item.completado === true ? false : true,
    // });
    // // Guardar la informacion modificada en mi state datos
    // setDatos(auxTemp);

    // setDoc(doc(db, "todos", item.id), {
    //   id: item.id,
    //   texto: item.texto,
    //   fechaCreacion: item.fechaCreacion,
    //   fechaCompletado: item.completado === true ? "" : new Date(),
    //   completado: item.completado === true ? false : true,
    // });

    updateDoc(doc(db, "todos", item.id), {
      fechaCompletado: item.completado === true ? null : new Date(),
      completado: item.completado === true ? false : true,
    });
  }

  function handlerTextoNuevoItem(val) {
    setTextoNuevoItem(val.target.value);
  }

  function handlerBorrarItem(item) {
    // let auxTemp = datos.filter((i) => i.id !== item.id);
    // setDatos(auxTemp);
    deleteDoc(doc(db, "todos", item.id));
  }

  async function getTodosFromFirebase() {
    const todos = await getTodos(db);
    console.log(todos);
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "todos")), (data) => {
      let auxTempDatos = [];
      for (let i = 0; i < data.docs.length; i++) {
        // console.log(data.docs[i].data());
        auxTempDatos.push(data.docs[i].data());
      }
      //console.log(auxTempDatos);
      setDatos(auxTempDatos);
    });

    return unsubscribe;
  }, []);

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
