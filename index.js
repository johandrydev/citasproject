import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Form from "./components/Formulario.js";
import Grid from "@material-ui/core/Grid";
import Cita from "./components/Cita.js"
import "./style.css";


const App = () => {
  const initialStateCitas = (localStorage.getItem('citas')) ? JSON.parse(localStorage.getItem('citas')) : []
  const initialStateTitle = 'Administra tus citas'
  // Arreglo de citas
  const [citas, guardarCitas] = useState(initialStateCitas);
  // Title of second section
  const [title, changeTitle] = useState(initialStateTitle);

  useEffect(() => {
    changeTitle((citas.length === 0) ? 'No hay citas' : initialStateTitle)

    localStorage.setItem('citas', JSON.stringify(citas))
  }, [citas])

  /**
   * Funcion que tome las citas actuales y agregue una nueva
   * @param cita nueva
   */
  const crearCita = (cita) => {
    console.log(cita)
    guardarCitas([
      ...citas,
      cita
    ])
  }

  /**
   * Permite eliminar una cita existente
   * @param id representa el identificador de la cita
   */
  const eliminarCita = id => {
    const filterCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(filterCitas)
  }

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Form crearCita={crearCita}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <h2>{title}</h2>
          </div>
          {citas.map(cita => (
            <Cita key={cita.id} item={cita} eliminarCita={eliminarCita}/>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

render(<App />, document.getElementById("root"));
