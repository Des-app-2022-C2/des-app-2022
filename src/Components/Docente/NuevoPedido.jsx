
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

import { useNavigate } from 'react-router-dom';
import {postPedido} from  '../../Services/postPedidoService'
import{getListaMateriales,getListaEquipos,getListaReactivos} from '../../Services/getService';
//import { getListaPedidos } from '../../Services/getPedidosService';
import { getCantidadPedidos } from '../../Services/getPedidosService';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
//import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import SendIcon from '@mui/icons-material/Send';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import IconButton from '@mui/material/IconButton'




//const theme = createTheme();



export default function NuevoPedido({setNuevoPedido}) {
//PRUEBA CODIGO

  const userActual = JSON.parse(localStorage.getItem('usuario'));
  const[pedidoEquipos,setPedidoEquipos]=useState([]);
  const[listaEquipos,setListaEquipos]=useState([]);
  const[equipoElegido,setEquipoElegido]=useState({});
 
  const [cantidadPedidos,setCantPedido] = useState([]);
  const [pedidoEncabezado,setEncabezadoPedido]= useState({});
  //const [fechaActual,setFechaActual]=useState(new Date());

  const[pedidoMateriales,setPedidoMateriales]=useState([]);
  const[listaMateriales,setListaMateriales]=useState([]);
  const[materialElegido,setMatElegido]=useState({});

  const[pedidoReactivos,setPedidoReactivos]=useState([]);
  const[listaReactivos,setListaReactivos]=useState([]);
  const[reactivoElegido,setReacElegido]=useState({});

  const[_med_reactivo,setUn_med_reactivo]=useState("");
 
  const[cal_reactivo,setCalReactivo]=useState("");
  const[_tip_reactivo,setTipReactivo]=useState("");
  const[_disol_reactivo,setDisolReactivo]=useState("");

  
  const disolReactivo= (event) => { setDisolReactivo(event.target.value);  };

  const tipReactivo = (event) => { setTipReactivo(event.target.value);  };

  
  const calReactivo = (event) => {setCalReactivo(event.target.value); };

 
  const med_reactivo = (event) => {  setUn_med_reactivo(event.target.value);  };
  
  const navigate=useNavigate();
  

 
 const [texto,setEncabezado]=useState("CARGA DE PEDIDO");
  

 //CARGA ENCABEZADO AL PEDIDO
 const cargaEncabezado =  async(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const nro_pedido = cantidadPedidos+1;

  setEncabezadoPedido({
   
    "descripcion": (nro_pedido).toString(),
    "fecha_solicitud":data.get('fecha_solicitud'),
    "fecha_utilizacion":data.get('fecha_utilizacion'),
    "numero_laboratorio": parseInt(10,10),
    "tipo_pedido": "algo",
    "cantidad_alumnos":data.get('cantidad_alumnos'),
    "cantidad_grupos": data.get('cantidad_grupos'),
    "observaciones": "string",
    "materia": "string",
    "numero_tp": "2"
    
  });

   
    console.log(pedidoEncabezado);
};
  
 
  

 //CARGA EQUIPO A LA LISTA
  const cargaEquipo = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
        setPedidoEquipos({       
          "cantidad": parseInt(data.get('cant_equipo'),10),
          "equipo": equipoElegido._id
      })  ;  
  };
  const  set_IdEquip=(event,value) => {  setEquipoElegido(value);  };

  // CARGA MATERIAL A LA LISTA
  const cargaMaterial = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
      setPedidoMateriales({       
        "cantidad": parseInt(data.get('cant_material'),10),
        "material": materialElegido._id
      });
    
   };

      const  set_IdMat=(event,value) => {    setMatElegido(value);  };


// CARGA REACTIVOS A LA LISTA
const cargaReactivos = async(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
   // console.log("reactivo",reactivoElegido._id);
  
    
   setPedidoReactivos({       
        "cantidad": parseInt(data.get('cant_reactivo'),10),
      "reactivo": reactivoElegido._id
    //   ejemplo para mas adelante
});
    
};
const  set_IdReactivo=(event,value) => {    setReacElegido(value); console.log("hand",reactivoElegido) };


  



  const handleSubmit = () => {
    
    const pedido ={"docente": {
      "nombre": userActual.nombre,
      "apellido": userActual.apellido,
      "dni": userActual.dni,
      "matricula": userActual.matricula
  }, 
        "descripcion": pedidoEncabezado.descripcion,
        "fecha_solicitud":pedidoEncabezado.fecha_solicitud,
        "fecha_utilizacion":pedidoEncabezado.fecha_utilizacion,
        "numero_laboratorio": pedidoEncabezado.numero_laboratorio,
        "tipo_pedido": pedidoEncabezado.tipo_pedido,
        "cantidad_grupos": pedidoEncabezado.cantidad_grupos,
        "observaciones": pedidoEncabezado.observaciones,
        "materia": pedidoEncabezado.materia,
        "numero_tp":pedidoEncabezado.numero_tp,
        "lista_equipos": pedidoEquipos,
        "lista_reactivos":pedidoReactivos,
        "lista_materiales":pedidoMateriales
           
  };
    
  postPedido(pedido) ; 
  navigate('/Docente/Pedidos');
  setNuevoPedido(false);
    
     

   

  };
  useEffect(() => {
    let mounted = true;
    getListaEquipos().then(items => { if (mounted) {setListaEquipos(items) } });
    getListaMateriales().then(items => { if (mounted) {setListaMateriales(items) } });
    getListaReactivos().then(items => { if (mounted) {setListaReactivos(items) } });
    getCantidadPedidos().then(items => { if (mounted) {setCantPedido(items) } });
   // setFechaActual(new Date()); 
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
           
     
          <Grid container component="form" onSubmit={cargaEncabezado} noValidate direction="row"
            justifyContent="space-around"
            alignItems="center"   
          
            sx={{'--Grid-borderWidth': '1px',borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',paddingX:2,borderRadius:4,paddingY:1,marginBottom:3
            }}
            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }}> 
            <Grid container direction="row"
                justifyContent="start"
                alignItems="center" 
                spacing={{ xs: 4, md: 2 }} 
                 columns={{ xs: 12  }} > 
           
           
             <Grid item xs={1} >
                <TextField
                    margin="normal"
                    // required
                    fullWidth
                    id="n_pedido"
                    label="n_pedido"
                    name="n_pedido"
                    variant="outlined"
                   value={cantidadPedidos + 1}
                   // autoComplete={cantPedidos}
                    autoFocus
                  />
                 
              </Grid> 
             
              <Grid item xs={2} >
                <TextField
                     id="fecha_solicitud"
                     label="fecha_solicitud"
                     name="fecha_solicitud"
                     type="date"
                   
                     //sx={{ width: 180 }}
                     InputLabelProps={{
                       shrink: true,
                     }}
                     InputProps={{
                       readOnly:false,
                     }

                     }
                     margin="normal"
                     required
                     fullWidth
                    autoFocus
                  />
              </Grid>
              <Grid item xs={2}  >


                  <TextField
                    id="fecha_utilizacion"
                    label="fecha_utilizacion"
                    name="fecha_utilizacion"
                    type="date"
                   // sx={{ width: 180 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                  />
            </Grid>
            <Grid item xs={2} >
              
                  <TextField
                      id="time"
                      label="hora"
                      name="hora"
                      type="time"
                      defaultValue="08:00"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      //sx={{ width: 150 }}
                      margin="normal"
                      required
                      fullWidth
                      autoFocus
                    />
                </Grid>
                <Grid item xs={2} >
                  <TextField
                      margin="normal"
                     // required
                      fullWidth
                      id="materia"
                      label="materia"
                      name="materia"
                      InputLabelProps={{ shrink: true}}
                      autoComplete="materia"
                      autoFocus
                    />
              
              </Grid>
              </Grid>
            <Grid container direction="row"
            justifyContent="flex-end"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
           
            <Grid  item xs={1} container justifyContent="center">
                <Typography sx={{fontSize: 14}} aria-label="simple table"  color="text.secondary">
                Confirmar
                </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
           
            </Grid>

           
            </Grid>
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center" 
            
            spacing={{ xs: 2, md: 1 }} 
             columns={{ xs: 12  }} > 
            
            
            <Grid item xs={4}  container justifyContent="start">
              


              <TextField
                margin="normal"
                required
                fullWidth
                id="cantidad_alumnos"
                label="cantidad_alumnos"
                name="cantidad_alumnos"
                autoComplete="cantidad_alumnos"
                InputLabelProps={{ shrink: true}}
                autoFocus
              />
              </Grid>
              <Grid  item xs={1}></Grid>

              
               

              
            <Grid  item xs={3} container justifyContent="start" >
          
                <TextField 
                sx={{marginTop:1   }}
                        
                        id="cantidad_grupos"
                        variant="outlined"
                        name="cantidad_grupos"
                      label="cant_grupos"
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
           <Grid  item xs={2}  justifyContent="flex-end"></Grid>

           <Grid  item xs={1}  justifyContent="flex-end">
           <IconButton aria-label="" 
              //  onClick={}
              >
                <AddCircleIcon   fontSize="large" bgcolor={"secondary"} color={"primary"} />
              </IconButton>
                {/* <Button fullWidth
                    margin="normal"
                  variant="text"
                  type="submit"
                  >
                <Avatar> 
                          <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
                </Avatar>
              </Button>                           */}
            </Grid>
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
            justifyContent="flex-end"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            
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
                                                                 
                                    getOptionLabel={(option)=>option.descripcion}
                                    onChange={(event, value) => set_IdEquip(event,value)}
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                      // value={params._id}
                                       name="descripcion_equipo"
                                       label={"descripcion_equipo"}
                                       
                                       InputLabelProps={{className:"autocompleteLabel", shrink: true}}
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
           
           
                                     
            </Grid>
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
              <IconButton aria-label="" 
              //  onClick={}
              >
                <AddCircleIcon  fontSize={'large'} bgcolor={"secondary"} color={"primary"} />
              </IconButton>
            
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
              <IconButton aria-label=""
              //  onClick={}
               >
                <DeleteForeverIcon color={"rojo"}   fontSize={'large'}  /> 
                
              </IconButton>
           
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

         

            <Grid container direction="row"
            justifyContent="flex-end"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
           
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
               {/* COMIENZA EL FORMULARIO DE MATERIALES */}
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
                                    onChange={(event, value) => set_IdMat(event,value)}
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                    
                                       name="descripcion_material"
                                       label={"descripcion_material"}
                                       InputLabelProps={{className:"autocompleteLabel", shrink: true,}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
            </Grid>
            <Grid  item xs={1} container justifyContent="center"/>
            <Grid  item xs={2} container justifyContent="center">
            <TextField 
             sx={{marginTop:1   }}
                    
                    id="cant_material"
                    variant="outlined"
                    name="cant_material"
                  label="cant_material"
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
            <Grid  item xs={2} container justifyContent="center"/>
            <Grid  item xs={1} container justifyContent="center">
            <IconButton aria-label="" 
              //  onClick={}
              >
                <AddCircleIcon  fontSize={'large'} bgcolor={"secondary"} color={"primary"} />
              </IconButton>
            {/* <Button fullWidth
                margin="normal"
              variant="text"
              type="submit"
              >
            <Avatar> 
                                    <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
                                    </Avatar>
          </Button>   */}
           
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <IconButton aria-label=""
              //  onClick={}
               >
                <DeleteForeverIcon color={"rojo"}   fontSize={'large'}  /> 
                
              </IconButton>
             
            {/* <Avatar> 
                                    <DeleteForeverIcon color={"rojo"} />
                                    </Avatar>  */}
            </Grid>
            </Grid>        
       <Grid></Grid>       
       </Grid>   


{/* COMIENZA CONTENEDOR DE REACTIVOS */}

<Grid container component="form" onSubmit={cargaReactivos} noValidate direction="row"
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

            
            
            {/* COMIENZA EL FORMULARIO REACTIVOS */}
             <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 2, md: 2 }} columns={{ xs: 12  }} > 
            <Grid  item xs={5} container justifyContent="start" >
            <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={listaReactivos}
                                    getOptionLabel={(option)=>option.descripcion}
                                    onChange={(event, value) => set_IdReactivo(event,value)}
                                    //value={reactivoElegido}
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                        
                                       name="descripcion_reactivo"
                                       label={"descripcion_reactivo "}
                                       
                                       InputLabelProps={{className:"autocompleteLabel",shrink:true}}
                                       InputProps={{
                                        ...params.InputProps,}}
                                        />
                                      );
                                       }}
                                       />
            </Grid>
            <Grid  item xs={2} container justifyContent="center">
                  <TextField
                    margin="normal"
                  
                    fullWidth
                    value={reactivoElegido.cas}
                    id="cas"
                    label="cas"
                    name="cas"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus
                    InputProps={{
                      readOnly: true,
                    }}
                   
                    variant="outlined"
                  />
            </Grid>
             <Grid  item xs={2}  container justifyContent="center" marginTop={1}>
            <FormControl fullWidth>
                <InputLabel id="calidad_reactivo">calidad_reactivo</InputLabel>
                <Select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  labelId="calidad_reactivo"
                  id="calidad_reactivo"
                  value={cal_reactivo}
                  label="calidad_reactivo"
                  onChange={calReactivo}
                >
               
                  <MenuItem sx={{ fontSize: 10 }}value={"p/analisis"}>P/ANALISIS</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"molecular"}>CALIDAD MOLECULAR</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"grado_tecnico"}>°TECNICO</MenuItem>
                  
               </Select>
              </FormControl>
      
              
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <TextField 
             sx={{marginTop:1   }}
                    
                    id="cant_reactivo"
                    variant="outlined"
                    name="cant_reactivo"
                  label="cant_reactivo"
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
           
           
            
            </Grid> 
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            
            <Grid  item xs={5} container justifyContent="center">
            <Typography sx={{fontSize: 14}}  color="text.secondary">
            Concentración
            </Typography>
            </Grid>
            <Grid  item xs={5} container justifyContent="center"></Grid>
            <Grid  item xs={1} container justifyContent="end">
                <Typography sx={{fontSize: 14}} aria-label="simple table"  color="text.secondary">
                Confirmar
                </Typography>
            </Grid>
            <Grid  item xs={1} container justifyContent="end">
                <Typography sx={{fontSize: 14}}  color="text.secondary">
                Desechar
                </Typography>
            </Grid>
            
            
            </Grid>
            {/* COMIENZA EL FORMULARIO REACTIVOS */}
             <Grid container direction="row"
            justifyContent="start"
            alignItems="center" 
            spacing={3}
            //  spacing={{ xs: 2, md: 1 }} 
             columns={{ xs: 12  }} > 
           
            <Grid  item xs={3} container justifyContent="center"  marginTop={1}>
            <FormControl fullWidth>
                <InputLabel id="tipo_reactivo">tipo_reactivo</InputLabel>
                <Select
                  
                  labelId="tipo_reactivo"
                  id="tipo_reactivo"
                  value={_tip_reactivo}
                  label="tipo_reactivo"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={tipReactivo}
                >
                  
                  <MenuItem sx={{ fontSize: 14 }}value={"puro"}>PURO</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"molaridad"}>MOLARIDAD</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"normalidad"}>NORMALIDAD</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"mas/vol"}>%MASA/MASA</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"mas/vol"}>%MASA/VOLUMEN</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"vol/vol"}>%VOLUMEN/VOLUMEN</MenuItem>
                  </Select>
              </FormControl>      
              
            </Grid>
            <Grid  item xs={2} container justifyContent="center">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="medida_reactivo"
                    label="med_reactivo"
                    name="medida_reactivo"
                    autoComplete="medida_reactivo"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus
                  />
              
            </Grid>
            <Grid  item xs={2} container justifyContent="center" marginTop={1}>
            <FormControl fullWidth>
                <InputLabel id="disolvente_reactivo"
               
                >disolvente</InputLabel>
                <Select
                  
                  labelId="disolvente_reactivo"
                  id="disolvente_reactivo"
                  value={_disol_reactivo}
                  label="disolvente_reactivo"
                  onChange={disolReactivo}
                >
               
                  <MenuItem sx={{ fontSize: 14 }}value={"agua"}>AGUA</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"alcohol"}>ALCOHOL</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"otros"}>OTROS</MenuItem>
                  
                </Select>
              </FormControl>
                  
              
            </Grid>
          
            
            <Grid  item xs={2} container justifyContent="center" marginTop={1}>
            <FormControl fullWidth>
                <InputLabel id="un_med_reactivo">un_med_reactivo</InputLabel>
                <Select
                  
                  labelId="un_med_reactivo"
                  id="un_med_reactivo"
                  value={_med_reactivo}
                  label="un_med_reactivo"
                  onChange={med_reactivo}
                >
                  <MenuItem sx={{ fontSize: 14 }}value={"grs"}>GRAMOS</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"kg"}>KILO</MenuItem>
                  <MenuItem sx={{ fontSize: 14 }}value={"unidad"}>UNIDAD</MenuItem>
                 
                  
               
                 
                 
                </Select>
              </FormControl>
 
            </Grid>  
            <Grid  item xs={1} container ></Grid>
            <Grid  item xs={1} container justifyContent="center" >
            <IconButton aria-label="" 
              //  onClick={}
              >
                <AddCircleIcon  fontSize={'large'} bgcolor={"secondary"} color={"primary"} />
              </IconButton>
            {/* <Button fullWidth
                margin="normal"
              variant="text"
              type="submit"
              >
            <Avatar> 
                                    <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
                                    </Avatar>
           </Button>     */}
            
            </Grid>
            <Grid  item xs={1} container >
            <IconButton aria-label=""
              //  onClick={}
               >
                <DeleteForeverIcon color={"rojo"}   fontSize={'large'}  /> 
                
              </IconButton>
           
            {/* <Avatar> 
                                    <DeleteForeverIcon color={"rojo"} />
                                    </Avatar>  */}
            </Grid>
            </Grid>       
       <Grid></Grid>       
       </Grid>  

         </Box>
{/* EMPIEZAN BOTONES */}
         <Grid container justifyContent="flex-end" spacing={2}
              >
       <Grid item xs={2} >
           
           <Button fullWidth
           color="error"
           style={{borderRadius:8}}
           margin="normal"
         variant="contained"
         startIcon={<ReplyAllIcon/>}
         onClick={() => {
          navigate('/Docente/Pedidos')
          setNuevoPedido(false);
          
        }}
        
         
         
         sx={{ mt: 3, mb: 2 ,height:50}}>  CANCELAR</Button>
         
       </Grid>          
      <Grid item xs={2} >
           
           <Button fullWidth
           style={{borderRadius:8}}
           margin="normal"
         variant="contained"
         endIcon={<SendIcon />}
        
         onClick={handleSubmit}
         
         
         sx={{ mt: 3, mb: 2 ,height:50}}> CONFIRMAR PEDIDO</Button>
         
       </Grid>
       </Grid>



           
          
          </Box>
       
         
      </Container>
      </ThemeProvider>  
  );
}