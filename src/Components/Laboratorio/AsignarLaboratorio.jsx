import React, { useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogContentText from '@mui/material/DialogContentText';
import updatePedido from '../../Services/updatePedido';




function AsignarLaboratorio(pedido,
  _id,
  numero_tp,
  fecha_solicitud,
  fecha_utilizacion,
  numero_laboratorio,
  docente,
  observaciones,
  cantidad_grupos,
  lista_equipos,
  lista_materiales,
  lista_reactivos,
  descripcion,
  tipo_pedido,
  materia,

) {



  const navigate=useNavigate();
  const [edificioElegido, setEdificioElegido] = useState('')
  const [laboAsignado, setLaboAsignado] = useState('')
  const [estado_ped,setEstadoPed]=useState('')  
  const edificio_elegido = (event) => {
   if(event.target.value===null){
    setEdificioElegido(observaciones);
   }
   else{
    setEdificioElegido(event.target.value);
   }
  };
  const estado_pedido = (event) => {
    if(event.target.value===null){
      setEstadoPed(tipo_pedido);
    }
    else{
      setEstadoPed(event.target.value);
    }
   };

  const laboEleg = (event) => {
    if(event.target.value===null){
      setLaboAsignado(numero_laboratorio)
    }
    else{
    
    setLaboAsignado(event.target.value)
  }
}



  // const descriptionElementRef = React.useRef(null);




  const modificarEncabezado = () => {

   

    const pedidoModificado = {
      "docente": docente,
      "descripcion": descripcion,
      "fecha_solicitud": fecha_solicitud,
      "fecha_utilizacion": fecha_utilizacion,
      "numero_laboratorio": parseInt(laboAsignado, 10),
      "tipo_pedido": "ACEPTADO",
      "cantidad_grupos": cantidad_grupos,
      "observaciones": edificioElegido,
      "materia": materia,
      "numero_tp": numero_tp,
      "lista_equipos": lista_equipos,
      "lista_reactivos": lista_reactivos,
      "lista_materiales": lista_materiales

    };
   
    updatePedido(pedido.pedido._id, pedidoModificado)
   

    
   
    

   
  }

  return (
    <Grid container direction='row'
      sx={{ marginTop: 4 }}>

      <Grid container component="form" noValidate direction="row"
        justifyContent="space-around"
        alignItems="center"

        sx={{
          '--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderRight: 'var(--Grid-borderWidth) solid',
          borderBottom: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider', paddingX: 2, borderRadius: 4, paddingY: 1, marginBottom: 3
        }}
        spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

        <Grid item xs={12} container justifyContent="start" >


          <Grid item xs={2} container justifyContent="start" >

            <TextField
              sx={{ marginTop: 1 }}
              onChange={laboEleg}
              id="laboratorio"
              variant="outlined"
              name="laboratorio"
              label="laboratorio"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  max: 100, min: 0
                }
              }}

            />
          </Grid>
          <Grid item xs={5} container justifyContent="center" marginTop={2} spacing={{ xs: 2, md: 2 }} marginBottom={2}>
            <FormControl fullWidth>
              <InputLabel id="edificio">edificio</InputLabel>
              <Select
                InputLabelProps={{
                  shrink: true,
                }}
                labelId="edificio"
                id="edificio"
                value={edificioElegido}
                label="edificio"
                onChange={edificio_elegido}
                name='edificio'
              >

                <MenuItem sx={{ fontSize: 10 }} value={"Malvinas"}>MALVINAS</MenuItem>
                <MenuItem sx={{ fontSize: 10 }} value={"Origone-A"}>ORIGONE - A</MenuItem>
                <MenuItem sx={{ fontSize: 10 }} value={"Origone-B"}>ORIGONE - B</MenuItem>

              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} container justifyContent="center" marginTop={2} spacing={{ xs: 2, md: 2 }} marginBottom={2}>
            <FormControl fullWidth>
              <InputLabel id="tipo_pedido">estado_pedido</InputLabel>
              <Select
                InputLabelProps={{
                  shrink: true,
                }}
                labelId="tipo_pedido"
                id="tipo_pedido"
                value={tipo_pedido}
                label="tipo_pedido"
                onChange={estado_pedido}
                name='tipo_pedido'
              >

                <MenuItem sx={{ fontSize: 10 }} value={"PENDIENTE"}>PENDIENTE</MenuItem>
                <MenuItem sx={{ fontSize: 10 }} value={"ACEPTADO"}>ACEPTADO</MenuItem>
                <MenuItem sx={{ fontSize: 10 }} value={"RECHAZADO"}>RECHAZADO</MenuItem>

              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end" >

        <Grid item xs={3} container justifyContent="center" marginLeft={1}>
          <Button

            fullWidth
            margin="normal"
            variant="contained"
            bgcolor={"secondary"} color={"primary"}

            onClick={modificarEncabezado}
            type="button"
          >
            Modificar Laboratorio-Edificio-Estado

          </Button>

        </Grid>

      </Grid>







    </Grid>
  )
}

export default AsignarLaboratorio

