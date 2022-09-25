import React,{useEffect,useState} from 'react';

import './App.css';
import Cards from './componentes/Cards';
import Login from './componentes/Login';
import Datos from './componentes/Datos';
import Iconos from './componentes/Iconos';
import Barra from './componentes/Barra';
import theme from './componentes/theme';

import { createTheme, ThemeProvider } from '@mui/material/styles';



  
function App() {
  
  const [pantalla,setpantalla]=useState("login");

  // useEffect(() =>{
  //   setpantalla("login");
    
   
  // },[]);
    
  return (
    <ThemeProvider theme={theme}>
    
    {/* // <div className="fondo"> */}
      {/* <Cards></Cards> */}
      { pantalla === "login" ? (
        
        <Login></Login>
      ) :(
        <Datos></Datos>
      )}
      
      {/* <Datos></Datos> */}
      {/* <Iconos></Iconos>
      <Barra></Barra> */}
     {/* </div> */}
   </ThemeProvider>
  

  );
}

export default App;
