import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';

/**
 * Cita Component
 * @property item es el objeto de la Cita
 * @property eliminarCita es la funcion que permite eliminar una cita
 */
const Cita = ({item, eliminarCita}) => {
  // Manejo de MaterialUI
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: (matches) ? "2rem" : 0,
    },
    contenDiv: {
        display: "flex",
        flexDirection:"column",
        "& .div-fecha": {
          display: 'flex',
          justifyContent: 'space-between'
        },
        "& .custom-content": {
          margin: ".3rem"
        },
        "& p": {
          margin: "1rem .3rem"
        }
    }
  });
  const classes = useStyles();
  
  return (
   <Card className={classes.root}>
      <CardContent className={classes.contenDiv}>
        <div className="div-fecha">
          <span className="custom-content"><strong>Fecha: </strong><span>{item.fecha}</span></span>
          <span className="custom-content"><strong>Hora: </strong><span>{item.hora}</span></span>
        </div>
        <span className="custom-content"><strong>Mascota: </strong><span>{item.mascota}</span></span>
        <span className="custom-content"><strong>Propietario: </strong><span>{item.propietario}</span></span>
        <p><strong>Sintomas: </strong><span>{item.sintomas}</span></p>
        <Button 
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => eliminarCita(item.id)}
        >Eliminar Cita</Button>
      </CardContent>
    </Card>
  )
}

Cita.propTypes = {
  item: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired
}
export default Cita