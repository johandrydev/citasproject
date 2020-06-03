import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "2rem",
    padding: "2rem",
    background: "rgba(254, 255, 254, 0.8)",
    borderRadius: "1rem",
    "& .MuiTextField-root": {
      margin: '.5rem 0'
    }
  }
}));

const validationForm = {
  mascota:[
    {
      required: 'Mascota es requerida',
    }
  ],
  propietario: [
    {
      required: 'Propietario es requerido',
    }
  ],
  fecha: [
    {
      required: 'Fecha es requerida',
    }
  ],
  hora: [
    {
      required: 'Hora es requerida',
    }
  ],
  sintomas: [
    {
      required: 'Sintoma es requerido',
    }
  ]
}
const Form = () => {
  // state Form
  const [cita, changeCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
    errors: {}
  });
  const classes = useStyles();

  const handleChange = e => {
    const validations = (validationForm[e.target.name]) ? validationForm[e.target.name] : null
    let error = cita.errors
    if (validations) {
      for(const val of validations) {
        if (val.required && e.target.value === '') {
          error[e.target.name] = val.required
        } else if(val.required) {
          delete error[e.target.name]
        }
      }
    }
    changeCita({
      ...cita,
      [e.target.name]: e.target.value,
      errors: {
        ...error
      }
    });
  };

  const { mascota, propietario, fecha, hora, sintomas, errors } = cita;
  const submitCita = e => {
    e.preventDefault()
    let error = cita.errors
    for (const key in validationForm) {
      for(const val of validationForm[key]) {
        if (val.required && cita[key] === '') {
          error[key] = val.required
        } else if(val.required) {
          delete error[key]
        }
      }
    }
    console.log(error)
    if (Object.keys(error).length > 0) {
      changeCita({
        ...cita,
        errors: {
          ...error
        }
      });
    }

    console.log(cita)
  }

  return (
    <div>
      <h2>Crear Cita</h2>

      <form className={classes.root} noValidate autoComplete="off" onSubmit={submitCita}>
        <div>
          <TextField
            fullWidth
            label="Nombre de Mascota"
            variant="outlined"
            name="mascota"
            value={mascota}
            onChange={handleChange}
            error={(errors.mascota) ? true : false}
            helperText={errors.mascota}
          />

          <TextField
            fullWidth
            label="Nombre Dueño"
            variant="outlined"
            name="propietario"
            value={propietario}
            onChange={handleChange}
            error={(errors.propietario) ? true : false}
            helperText={errors.propietario}
          />

          <TextField
            fullWidth
            type="date"
            variant="outlined"
            name="fecha"
            value={fecha}
            onChange={handleChange}
            error={(errors.fecha) ? true : false}
            helperText={errors.fecha}
          />

          <TextField
            fullWidth
            type="time"
            variant="outlined"
            name="hora"
            value={hora}
            onChange={handleChange}
            error={(errors.hora) ? true : false}
            helperText={errors.hora}
          />

          <TextField
            fullWidth
            label="Sistomas"
            variant="outlined"
            name="sintomas"
            value={sintomas}
            multiline
            rows={4}
            onChange={handleChange}
            error={(errors.sintomas) ? true : false}
            helperText={errors.sintomas}
          />

          <Button type="submit" styles="margin: .5rem 0" variant="contained" color="primary" fullWidth>
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
