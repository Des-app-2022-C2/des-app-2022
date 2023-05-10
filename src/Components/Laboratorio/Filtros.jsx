
import * as React from 'react';


import {Typography,Grid} from '@mui/material';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { axiosGetPedido } from '../../Services/getPedidosService';

export default function Filtros(setListaPedidos) {
    const [tipo_pedido,  setTipoPedido] = React.useState(" ");
    const [fecha_utilizacion, set_fecha_utilizacion] = React.useState("");
    const [fecha_inicio, set_fecha_inicio] = React.useState("");
    const [fecha_fin, set_fecha_fin] = React.useState("");
    const [edificio, set_edificio] = React.useState(" ");
    
   
      
      const cargarEstado = (event) => {
        // const dato=event.target.value
        event.preventDefault();
        console.log(event.target.value)
        guardarEstadoPedido(event.target.value)
        
       
       
        

    }
const guardarEstadoPedido=(event)=>{setTipoPedido(event)}


  function cargarNuevosPedidos() {
    console.log("se guarda algo en el estado",tipo_pedido);
        axiosGetPedido(fecha_utilizacion, tipo_pedido, fecha_inicio, fecha_fin, edificio).then((item) => {setListaPedidos(item)}
        
       
       );
      
  };
    React.useEffect(() => {
      
            cargarNuevosPedidos()
    
      return () => {
      
      }
    }, [tipo_pedido])
    
     
    
   
    return (
        <Grid container direction="row"
        justifyContent="center"
       
        alignItems="center" mb={2} >
        <Grid item xs={3} container justifyContent="center"  >
            <FormControl fullWidth>
            <InputLabel id="estado" >Filtrar por estado</InputLabel>
            <Select
            InputLabelProps={{
                shrink: true,
            }}
            labelId="estado"
            id="estado"
            value={tipo_pedido}
            label="estado"
            onChange={cargarEstado}
            
            size={1}

            >
           
            <MenuItem sx={{ fontSize: 14 }} value={" "}> </MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value={"ACEPTADO"}>ACEPTADO</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value={"PENDIENTE"}>PENDIENTE</MenuItem>
            <MenuItem sx={{ fontSize: 14 }} value={"RECHAZADO"}>RECHAZADO</MenuItem>

            </Select>
        </FormControl>
        </Grid>
        <FormControl component="fieldset" sx={{ marginLeft: 10 }}>
              <Typography sx={{ fontSize: 30 }} aria-label="simple table"  >
            {/* <FormLabel component="legend">Filtro tarjetas</FormLabel> */}
            <FormGroup aria-label="position" row>
            

               
                <FormControlLabel
                    value="pendiente"
                    control={<Switch color="warning" />}
                    label="Pendiente"
                    labelPlacement="start"

                    style={{ color: "#14C38E", marginRight: "10px" }}//color="warning"
                />
                <FormControlLabel
                    value="fecha_hoy"
                    control={<Switch color="warning" />}
                    label="Fecha_hoy"
                    labelPlacement="start"

                    style={{ color: "#43a047" }}
                />

            </FormGroup>
            </Typography>
        </FormControl>
        </Grid>
    );
}