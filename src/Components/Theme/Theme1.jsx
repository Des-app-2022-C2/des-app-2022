import React from 'react';
import teal from '@mui/material/colors/teal'
import green from '@mui/material/colors/green'


import { createTheme} from '@mui/material/styles';

const Theme1=createTheme({
    palette:{
        primary:{
           // main:"#b4e0bc"
           main:teal[400]
          // main:"#1de9b6"
        },
        secondary:{
         //  main:teal[400]
            // main:"#43a047"
            // main:green[400]
            main:"#b4e0bc"
        },
        verdeC:{
            main:"#b4e0bc"

        },
        blanco:{
            main:teal[50]
        },
        rojo:{
            main:"#ba000d"
        },
        colorinche:{
            main:"linear-gradient(to left,#009688, #1de9b6)"
        }
       
    }
})
 
export default Theme1;