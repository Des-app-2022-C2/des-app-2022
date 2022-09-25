import React from 'react';
import teal from '@mui/material/colors/teal'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme=createTheme({
    palette:{
        primary:{
            main:teal[700]
        },
        secondary:{
            main:teal[500]
        }
    }
})
 
export default theme;