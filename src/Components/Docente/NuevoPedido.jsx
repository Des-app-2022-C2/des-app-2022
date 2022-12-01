
import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';




import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import Header from '../Header/Header'

import Theme1 from '../Theme/Theme1';

import laboratorio from '../Image/biologia.png'
import pipeta from '../Image/pipeta.png'
import quimica from '../Image/quimica.png'
import Autocomplete from '@mui/material/Autocomplete';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAsyncValue, useNavigate } from 'react-router-dom';
import {postPedido} from  '../../Services/postPedidoService'
import{getListaMateriales,getListaEquipos,getListaReactivos} from '../../Services/getService';




//const theme = createTheme();



export default function NuevoPedido({setNuevoPedido}) {
//PRUEBA CODIGO
  const[pedidoEquipos,setPedidoEquipos]=useState([]);
  const[listaEquipos,setListaEquipos]=useState([]);
 


  const[pedidoMateriales,setPedidoMateriales]=useState([]);
  const[listaMateriales,setListaMateriales]=useState([]);

  const[pedidoReactivos,setPedidoReactivos]=useState([]);
  const[listaReactivos,setListaReactivos]=useState([]);

  const[encabezado,setEncabezadoPedido]=useState([]);

  
  const navigate=useNavigate();

   //PRUEBA CODIGO
 const [texto,setEncabezado]=useState("CARGA DE PEDIDO");
  

 const numeros=[{label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"},{label:"6"},{label:"7"},{label:"8"},{label:"9"},{label:"10"},{label:"11"},{label:"12"},{label:"13"}
 ]
 const reactivos=[{label:"Alcohol etílico (96° uso medicinal)" ,cas:""},{label:"Acido cítrico anhidro p.a." ,cas:"77-92-9"},{label:"Ácido Fluorhídrico 40% p.a." ,cas:"7664-39-3"},{label:"Acido nítrico 70% p.a." ,cas:"7697-37-2"},{label:"Ácido Oxálico p.a." ,cas:"6153-56-6"},{label:"Almidón soluble" ,cas:"9005-84-9"},{label:"Azul de metileno p.a." ,cas:"122965-43-9"},{label:"Buffer pH 4,01" ,cas:"s/n"},{label:"Buffer pH 7,00" ,cas:"s/n"},{label:"Buffer pH 10,01" ,cas:"s/n"},{label:"Buffer pH 10,00" ,cas:"s/n"},{label:"Calcio carbonato p.a" ,cas:"471-34-1"},{label:"Clorato de potasio" ,cas:"3811-04-09"},
 ]
  
//CARGA DATOS A PEDIDO
const cargaEncabezado = async(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget); 
  console.log(data.get('fecha_solicitud'))

   setEncabezadoPedido  (  {"docente": {
        "nombre": "Romina",
        "apellido": "Vera",
        "dni": "7897",
        "matricula": "1233457"
      },   "descripcion": "Pedido 2",
      "fecha_solicitud":data.get('fecha_solicitud'),
      "fecha_utilizacion":"2022/11/10",
      "numero_laboratorio": "2",
      "tipo_pedido": "algo",
      "cantidad_grupos": "2",
      "observaciones": "algo mas",
      "materia": "materia",
      "numero_tp": "2"
      

      }  );
}




 //CARGA EQUIPO A LA LISTA
  const cargaEquipo = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
      
   listaEquipos.map((item,key)=> (
       (item.descripcion === data.get('descripcion_equipo'))?(
        
        setPedidoEquipos({       
          "cantidad": parseInt(data.get('cant_equipo'),10),
          "equipo": item._id
      })  ):(<div></div>))  );
    
  
     
  };

  // CARGA MATERIAL A LA LISTA
  const cargaMaterial = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      
    listaMateriales.map((item,key)=> (
      (item.descripcion === data.get('descripcion_material'))?(
      
       setPedidoMateriales({       
          "cantidad": parseInt(data.get('cant_material'),10),
          "material": item._id
      })):(console.log(item.descripcion)) ) );
   
  
  console.log({elPedidoREcienteMaterial:pedidoMateriales});
   
      
  };
// CARGA MATERIAL A LA LISTA
const cargaReactivos = async(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
    
  listaMateriales.map((item,key)=> (
    (item.descripcion === data.get('descripcion_material'))?(
    
     setPedidoReactivos({       
        "cantidad": parseInt(data.get('cant_material'),10),
        "material": item._id
    })):(console.log(item.descripcion)) ) );
 

console.log({elPedidoREcienteMaterial:pedidoMateriales});
 
    
};


  



  const handleSubmit = () => {
    
    const pedido ={"docente": {
      "nombre": "Romina",
      "apellido": "Vera",
      "dni": "7897",
      "matricula": "1233457"
  }, 
        "descripcion": "Pedido 2",
        "fecha_solicitud":"2022/11/10",
        "fecha_utilizacion":"2022/11/10",
        "numero_laboratorio": "2",
        "tipo_pedido": "algo",
        "cantidad_grupos": "2",
        "observaciones": "algo mas",
        "materia": "materia",
        "numero_tp": "2",
        "lista_equipos": pedidoEquipos,
        //"lista_reactivos":[],
        "lista_materiales":pedidoMateriales
           
  };
    
  postPedido(pedido) ; 

    
     

    // setPantalla(data.get('user').toLowerCase());

  };
  useEffect(() => {
    let mounted = true;
    getListaEquipos().then(items => { if (mounted) {setListaEquipos(items) } });
    getListaMateriales().then(items => { if (mounted) {setListaMateriales(items) } });
    getListaReactivos().then(items => { if (mounted) {setListaReactivos(items) } })

   
   

    return () => mounted = false;
  }, [])

  return (
    <ThemeProvider theme={Theme1}>
       <Box sx={{ flexGrow: 1 ,m:2}}>
          
          <Header texto={texto} ></Header>

       </Box>
    {/* COMIENZA EL CONTENEDOR DE LA PAGINA    */}
      <Container component="main"  color="primary">
        
     {/* COMIENZA EL CONTENEDOR DEL BLOQUE SUPERIOR    */}    
     {/* <Box component="form" onSubmit={handleSubmit} noValidate>      */}
     <Box>
          <Box sx={{ flexGrow: 1 ,md:2 }}>    
           
     



          <Grid component="form" onSubmit={cargaEncabezado} noValidate  container direction="row"
            justifyContent="space-around"
            alignItems="center"   
          
            
          
            sx={{'--Grid-borderWidth': '1px',borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',paddingX:2,borderRadius:4,paddingY:1,marginBottom:3
            }}
            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }}> 
             <Grid item xs={1}>
                <TextField
                    margin="normal"
                    // required
                    fullWidth
                    id="n_pedido"
                    label="n_pedido"
                    name="n_pedido"
                   
                    autoComplete="n_pedido"
                    autoFocus
                  />
                 
              </Grid> 
              <Grid item xs={2}>
                <TextField
                     id="fecha_solicitud"
                     label="fecha_solicitud"
                     type="date"
                     defaultValue="2022-11-01"
                     sx={{ width: 180 }}
                     InputLabelProps={{
                       shrink: true,
                     }}
                     margin="normal"
                     required
                     fullWidth
                    autoFocus
                  />
              </Grid>
              <Grid item xs={2}>


            <TextField
              id="fecha_utilizacion"
              label="fecha_utilizacion"
              type="date"
              defaultValue="2022-11-01"
              sx={{ width: 180 }}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            </Grid>
          
            <Grid item xs={3}>
              <TextField
                  id="time"
                  label="Hora"
                  type="time"
                  defaultValue="08:00"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  sx={{ width: 150 }}
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
            </Grid>
            <Grid item xs={2}>
           
                <Button fullWidth
                margin="normal"
              variant="contained"
              onClick={() => {
          navigate('/Docente/Pedidos')
          setNuevoPedido(false);
          
        }}
              
              
              sx={{ mt: 3, mb: 2 ,height:50}}>VOLVER</Button>
              
            </Grid>
            
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={5} container justifyContent="center">
            <Typography sx={{fontSize: 14 }}  color="text.secondary">
            Descripcion
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center"/>
            <Grid  item xs={2} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Cantidad
            </Typography>
            </Grid>
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}} aria-label="simple table"  color="text.secondary">
            Confirmar
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Desechar
            </Typography>
            </Grid>
            </Grid>


            <Grid item xs={4}>


              <TextField
                margin="normal"
                required
                fullWidth
                id="cantidad_alumnos"
                label="cantidad_alumnos"
                name="cantidad_alumnos"
                autoComplete="cantidad_alumnos"
                autoFocus
              />
              </Grid>
              <Grid item xs={4}>


              <TextField
                margin="normal"
                required
                fullWidth
                id="cantidad_grupos"
                label="cantidad_grupos"
                name="cantidad_grupos"
                autoComplete="cantidad_grupos"
                autoFocus
              />
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Button fullWidth
                margin="normal"
              variant="text"
              type="submit"
              >
            <Avatar> 
                      <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
            </Avatar>
          </Button>                          
            </Grid>
                                    
            </Grid>

{/* COMIENZA CONTENEDOR DE EQUIPOS */}
<Grid container direction="row"
            justifyContent="space-around"
            alignItems="center"  
            sx={{'--Grid-borderWidth': '1px',borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',paddingX:2,borderRadius:4,paddingY:1,marginBottom:3
            }}
            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }}> 

            {/* TITULO */}
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  >
            <Grid item xs={1} container justifyContent="center"  >
            <img width={40} alt="" heigth={40} src={laboratorio} />
            </Grid>
            <Grid  item xs={3} container justifyContent="start">
            <Typography sx={{fontSize: 40}}  color="text.secondary">
            Equipos
            </Typography>
            </Grid>
            </Grid>

            
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={5} container justifyContent="center">
            <Typography sx={{fontSize: 14 }}  color="text.secondary">
            Descripcion
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center"/>
            <Grid  item xs={2} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Cantidad
            </Typography>
            </Grid>
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}} aria-label="simple table"  color="text.secondary">
            Confirmar
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Desechar
            </Typography>
            </Grid>
            </Grid>
            {/* FORMULARIO PARA EQUIPOS */}
            <Grid container component="form" onSubmit={cargaEquipo} noValidate  direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={5} container justifyContent="start" >
            <Autocomplete 
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={listaEquipos}
                                    //groupBy={(option)=>option[0].toUpperCase()}
                                   
                                    getOptionLabel={(option)=>option.descripcion}
                                   
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                      // value={params._id}
                                       name="descripcion_equipo"
                                       label={"descripcion_equipo"}
                                       InputLabelProps={{className:"autocompleteLabel"}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
            </Grid>
            <Grid  item xs={1} container justifyContent="center"/>
          
            <Grid  item xs={2} container justifyContent="center" >
          
            <TextField 
             sx={{marginTop:1   }}
                    
                    id="cant_equipo"
                    variant="outlined"
                    name="cant_equipo"
                  label="cant_equipos"
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
            {/* <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="cant_equipos"
                                    options={numeros}
                                    
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                       name="cant_equipo"
                                     
                                       label={"cant_equipos"}
                                       InputLabelProps={{className:"autocompleteLabel"}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       /> */}
           
                                     
            </Grid>
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
            <Button fullWidth
                margin="normal"
              variant="text"
              type="submit"
              >
            <Avatar> 
                   <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
            </Avatar>
          </Button>                          
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Avatar> 
                                    <DeleteForeverIcon color={"rojo"} />
                                    </Avatar> 
            </Grid>
            </Grid>        
       <Grid></Grid>       
       </Grid>    
{/* COMIENZA CONTENEDOR DE MATERIALES */}

<Grid container direction="row"
            justifyContent="space-around"
            alignItems="center"  
            sx={{'--Grid-borderWidth': '1px',borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',paddingX:2,borderRadius:4,paddingY:1,marginBottom:3
            }}
            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }}> 

            {/* TITULO */}
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  >
            <Grid item xs={1} container justifyContent="center"  >
            <img width={40} alt="" heigth={40} src={pipeta} />
            </Grid>
            <Grid  item xs={3} container justifyContent="start">
            <Typography sx={{fontSize: 40}}  color="text.secondary">
            Materiales
            </Typography>
            </Grid>
            </Grid>

            {/* COMIENZA EL FORMULARIO DE MATERIALES */}

            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={5} container justifyContent="center">
            <Typography sx={{fontSize: 14 }}  color="text.secondary">
            Descripcion
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center"/>
            <Grid  item xs={2} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Cantidad
            </Typography>
            </Grid>
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}} aria-label="simple table"  color="text.secondary">
            Confirmar
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Desechar
            </Typography>
            </Grid>
            </Grid>
            
             <Grid container  component="form" onSubmit={cargaMaterial} noValidate direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={5} container justifyContent="start" >
            <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={listaMateriales}
                                    getOptionLabel={(option)=>option.descripcion}
                                    
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                       
                                       name="descripcion_material"
                                       label={"descripcion_material"}
                                       InputLabelProps={{className:"autocompleteLabel"}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
            </Grid>
            <Grid  item xs={1} container justifyContent="center"/>
            <Grid  item xs={2} container justifyContent="center">
            <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="cant_material"
                                    options={numeros}
                                    // sx={{ width: 300 }}
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                       name="cant_material"

                                       label={"cant_material"}
                                       InputLabelProps={{className:"autocompleteLabel"}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
              
                                     
            </Grid>
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
            <Button fullWidth
                margin="normal"
              variant="text"
              type="submit"
              >
            <Avatar> 
                                    <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
                                    </Avatar>
          </Button>  
           
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Avatar> 
                                    <DeleteForeverIcon color={"rojo"} />
                                    </Avatar> 
            </Grid>
            </Grid>        
       <Grid></Grid>       
       </Grid>   


{/* COMIENZA CONTENEDOR DE REACTIVOS */}

<Grid container direction="row"
            justifyContent="space-around"
            alignItems="center"  
            sx={{'--Grid-borderWidth': '1px',borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',paddingX:2,borderRadius:4,paddingY:1,marginBottom:3
            }}
            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }}> 

            {/* TITULO */}
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  >
            <Grid item xs={1} container justifyContent="center"  >
            <img width={40} alt="" heigth={40} src={quimica} />
            </Grid>
            <Grid  item xs={3} container justifyContent="start">
            <Typography sx={{fontSize: 40}}  color="text.secondary">
            Reactivos
            </Typography>
            </Grid>
            </Grid>

            
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={2} container justifyContent="center">
            <Typography sx={{fontSize: 14 }}  color="text.secondary">
            Descripcion
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            CAS
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Calidad
            </Typography>
            </Grid>
            <Grid  item xs={2} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Concentración
            </Typography>
            </Grid>
            <Grid  item xs={2} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Disolvente
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            cant_grupo
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Un_Med
            </Typography>
            </Grid>
            
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}} aria-label="simple table"  color="text.secondary">
            Confirmar
            </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Desechar
            </Typography>
            </Grid>
            </Grid>
            
             <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={2} container justifyContent="start" >
            <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={reactivos}
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                       
                                       name="descripcion_reactivo"
                                       label={"seleccione_reactivo "}
                                       InputLabelProps={{className:"autocompleteLabel"}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cas"
                    label="cas"
                    name="user"
                    autoComplete="user"
                    autoFocus
                  />
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="calidad_reactivo"
                    label="Calidad_reactivo"
                    name="calidad_reactivo"
                    autoComplete="calidad_reactivo"
                    autoFocus
                  />
              
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="tipo_reactivo"
                    label="tipo_reactivo"
                    name="tipo_reactivo"
                    autoComplete="tipo_reactivo"
                    autoFocus
                  />
              
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="medida_reactivo"
                    label="medida_reactivo"
                    name="medida_reactivo"
                    autoComplete="medida_reactivo"
                    autoFocus
                  />
              
            </Grid>
            <Grid  item xs={2} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="disolvente_reactivo"
                    label="disolvente_reactivo"
                    name="disolvente_reactivo"
                    autoComplete="disolvente_reactivo"
                    autoFocus
                  />
              
            </Grid>
          
            <Grid  item xs={1} container justifyContent="center">
            <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="cant_reactivo"
                                    options={numeros}
                                  
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                       name="cant_reactivo"

                                       label={"cant_reactivo"}
                                       InputLabelProps={{className:"autocompleteLabel"}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
           
                                     
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="un_med_reactivo"
                    label="un_med_reactivo"
                    name="un_med_reactivo"
                    autoComplete="un_med_reactivo"
                    autoFocus
                  />
              
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Avatar> 
                                    <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
                                    </Avatar>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <Avatar> 
                                    <DeleteForeverIcon color={"rojo"} />
                                    </Avatar> 
            </Grid>
            </Grid>        
       <Grid></Grid>       
       </Grid>  

         </Box>



           
            <Button
             // type="submit"
             onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ENVIAR PEDIDO
            </Button>
           
          </Box>
       
        
      </Container>
    </ThemeProvider>
  );
}