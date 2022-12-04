import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
const BotonNPedido = ({setNuevoPedido}) => {
  const navigate=useNavigate();
    return ( 
      <ThemeProvider theme={Theme1}>
        
      
      <Grid container justifyContent="flex-end" 
              >
      <Grid item xs={2} color="white"   bgcolor="primary.main"  style={{borderRadius:8}}>
           
           <Button fullWidth
           style={{borderRadius:8}}
           margin="normal"
         variant="contained"
         startIcon={<AddCircleIcon />}
        onClick={() => {
          navigate('/Docente/NuevoPedido')
          setNuevoPedido(true);
       
     
   }}
         
         
         sx={{ mt: 3, mb: 2 ,height:50}}> PEDIDO NUEVO</Button>
         
       </Grid>
       </Grid>
       
       
       
        {/* //</Typography> */}
    
        </ThemeProvider>
        
     );
}
 
export default BotonNPedido;