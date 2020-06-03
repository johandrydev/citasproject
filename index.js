import React from "react";
import { render } from "react-dom";
import Form from "./components/Formulario.js";
import Grid from "@material-ui/core/Grid";
import "./style.css";

const App = () => {
  return (
    <>
      <h1>Administrador de pacientes</h1>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Form />
        </Grid>
        <Grid item xs={12} md={6}/>
      </Grid>
    </>
  );
};

render(<App />, document.getElementById("root"));
