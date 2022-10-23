import React from 'react';
import teal from '@mui/material/colors/teal'
import green from '@mui/material/colors/teal'

import grey from '@mui/material/colors/grey'

import { createTheme} from '@mui/material/styles';

const Theme1=createTheme({
    palette:{
        primary:{
            //CLARITO
            main:"#b4e0bc"
           // main:green[400]

        },
        secondary:{
            // main:teal[400]
//PASTO
             main:"#43a047"
            // main:green[400]
           // main:"#b4e0bc"
        },
        verdeC:{
            main:"#b4e0bc"

        },
        grisclaro:{
            main:grey[400]
           // main:"#685e5e"

        }
    }
})
 
export default Theme1;