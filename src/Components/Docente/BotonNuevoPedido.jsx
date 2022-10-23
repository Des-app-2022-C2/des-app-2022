import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';

const BotonNPedido = ({setNuevoPedido}) => {
    return ( 
      <ThemeProvider theme={Theme1}>
       
        <Typography  align='right'   >    
        <Button 
         variant="contained" 
         fullWidth
         color="primary"
         bgcolor="secondary"
        style={{ width:200,height:30 }}
        startIcon={<AddCircleIcon />}
        onClick={() => {
          setNuevoPedido(true);
          
        }}>
          
            PEDIDO NUEVO
          
        </Button>
        </Typography>
      </ThemeProvider>
      
        
     );
}
 
export default BotonNPedido;