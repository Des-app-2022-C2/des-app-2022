import React,{useEffect,useState} from 'react';

import './App.css';
import Cards from './componentes/Cards';
import Login from './componentes/Login';
import Datos from './componentes/Datos';
import Iconos from './componentes/Iconos';
import Barra from './componentes/Barra';



  
function App() {
  
  const [pantalla,setpantalla]=useState("login");

  // useEffect(() =>{
  //   setpantalla("login");
    
   
  // },[]);
    
  return (
    
    <div className="fondo">
      {/* <Cards></Cards> */}
      { pantalla === "login" ? (
        
        <Login></Login>
      ) :(
        <Datos></Datos>
      )}
      
      {/* <Datos></Datos> */}
      {/* <Iconos></Iconos>
      <Barra></Barra> */}
    </div>
  );
}

export default App;
