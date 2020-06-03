import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

// mensajes para validar formulario
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

// initialState para el componente
const initialState = {
  mascota: "",
  propietario: "",
  fecha: "",
  hora: "",
  sintomas: "",
  errors: {}
}

/**
 * Form Component
 * @property crearCita funcion para crear cita
 */
const Form = ({crearCita}) => {
  // Manejo de MaterialUI
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const useStyles = makeStyles(theme => ({
    root: {
      margin: (matches) ? "2rem" : 0,
      padding: (matches) ? "2rem" : "1rem",
      background: "rgba(254, 255, 254)",
      borderRadius: ".2rem",
      "& .MuiTextField-root": {
        margin: '.5rem 0'
      }
    }
  }));
  const classes = useStyles();

  // estado de Cita
  const [cita, changeCita] = useState(initialState);

  /**
   * Funcion que permite validar el formulario completo
   */
  const handleChange = e => {
    // Busca si encuentra validaciones para el campo editado
    const validations = (validationForm[e.target.name]) ? validationForm[e.target.name] : null
    let error = cita.errors
    if (validations) { // Si consigue validaciones agrega o quita el error
      for(const val of validations) {
        if (val.required && e.target.value === '') {
          error[e.target.name] = val.required
        } else if(val.required) {
          delete error[e.target.name]
        }
      }
    }
    // Actualiza el estado
    changeCita({
      ...cita,
      [e.target.name]: e.target.value,
      errors: {
        ...error
      }
    });
  };

  /**
   * Permite validar el formulario antes de ser enviado
   */
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
    if (Object.keys(error).length > 0) {
      changeCita({
        ...cita,
        errors: {
          ...error
        }
      });
      return
    }
    cita.id = uuid()
    crearCita(cita)
    changeCita(initialState)
  }
  const { mascota, propietario, fecha, hora, sintomas, errors } = cita;

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
            label="fecha de la cita"
            InputLabelProps={{
              shrink: true,
            }}
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
            label="Hora de la cita"
            InputLabelProps={{
              shrink: true,
            }}
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

Form.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Form;
