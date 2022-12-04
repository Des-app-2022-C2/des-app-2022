
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
import { getListaPedidos } from '../../Services/getPedidosService';
import { getCantidadPedidos } from '../../Services/getPedidosService';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';



//const theme = createTheme();



export default function NuevoPedido({setNuevoPedido}) {
//PRUEBA CODIGO

  const userActual = JSON.parse(localStorage.getItem('usuario'));
  const[pedidoEquipos,setPedidoEquipos]=useState([]);
  const[listaEquipos,setListaEquipos]=useState([]);
  const[equipoElegido,setEquipoElegido]=useState("");
 const [cantidadPedidos,setCantPedido] = useState([]);

  const[pedidoMateriales,setPedidoMateriales]=useState([]);
  const[materialElegido,setMatElegido]=useState("");
  const[listaMateriales,setListaMateriales]=useState([]);

  const[pedidoReactivos,setPedidoReactivos]=useState([]);
  const[listaReactivos,setListaReactivos]=useState([]);
  const[_med_reactivo,setUn_med_reactivo]=useState("");
  const[_cas,setCas]=useState("1-A365");
  const[cal_reactivo,setCalReactivo]=useState("");
  const[_tip_reactivo,setTipReactivo]=useState("");
  const[_disol_reactivo,setDisolReactivo]=useState("");

  
  const disolReactivo= (event) => { setDisolReactivo(event.target.value);  };

  const tipReactivo = (event) => { setTipReactivo(event.target.value);  };

  
  const calReactivo = (event) => {setCalReactivo(event.target.value); };

  const casElegido = (event) => {   setCas("1-A365");  };
  const med_reactivo = (event) => {  setUn_med_reactivo(event.target.value);  };
  
  const navigate=useNavigate();
  

 
 const [texto,setEncabezado]=useState("CARGA DE PEDIDO");
  

 
 
  

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
    setPedidoMateriales({       
      "cantidad": parseInt(data.get('cant_material'),10),
      "material": materialElegido._id
    });};
    const  setIdElegido = async(event,value) => {
      event.preventDefault(); 
      setMatElegido(value._id)
    
  
  
   
      
  };
// CARGA REACTIVOS A LA LISTA
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
      "nombre": userActual.nombre,
      "apellido": userActual.apellido,
      "dni": userActual.dni,
      "matricula": userActual.matricula
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

    
     

   

  };
  useEffect(() => {
    let mounted = true;
    getListaEquipos().then(items => { if (mounted) {setListaEquipos(items) } });
    getListaMateriales().then(items => { if (mounted) {setListaMateriales(items) } });
    getListaReactivos().then(items => { if (mounted) {setListaReactivos(items) } });
    getCantidadPedidos().then(items => { if (mounted) {setCantPedido(items) } });

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
             <Grid item xs={1}>
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
                                    onChange={(event, value) => setIdElegido(event,value)}
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
            {/* COMIENZA EL FORMULARIO REACTIVOS */}
             <Grid container direction="row"
            justifyContent="start"
            alignItems="center"  spacing={{ xs: 1, md: 1 }} columns={{ xs: 12  }} > 
            <Grid  item xs={2} container justifyContent="start" >
            <Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="combo-box-demo"
                                    options={listaReactivos}
                                    getOptionLabel={(option)=>option.descripcion}
                                    renderInput={(params) =>{
                                      return(
                                       <TextField {...params} 
                                       margin="normal"
                                       value={params.InputProps}
       
                                       onChange={casElegido}
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
                   // required
                    fullWidth
                    //value={_cas}
                    id="cas"
                    label="cas"
                    name="cas"
                    //autoComplete="cas"
                   // autoFocus
                    value={_cas}
                    
                  //  variant="filled"
                  />
            </Grid>
            <Grid  item xs={1} container justifyContent="center">
            <FormControl fullWidth>
                <InputLabel id="calidad_reactivo">calidad_reactivo</InputLabel>
                <Select
                  
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
            <FormControl fullWidth>
                <InputLabel id="tipo_reactivo">calidad_reactivo</InputLabel>
                <Select
                  
                  labelId="tipo_reactivo"
                  id="tipo_reactivo"
                  value={_tip_reactivo}
                  label="tipo_reactivo"
                  onChange={tipReactivo}
                >
                  
                  <MenuItem sx={{ fontSize: 10 }}value={"puro"}>PURO</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"molaridad"}>MOLARIDAD</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"normalidad"}>NORMALIDAD</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"mas/vol"}>%MASA/MASA</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"mas/vol"}>%MASA/VOLUMEN</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"vol/vol"}>%VOLUMEN/VOLUMEN</MenuItem>
                  </Select>
              </FormControl>      
              
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
            <FormControl fullWidth>
                <InputLabel id="disolvente_reactivo">calidad_reactivo</InputLabel>
                <Select
                  
                  labelId="disolvente_reactivo"
                  id="disolvente_reactivo"
                  value={_disol_reactivo}
                  label="disolvente_reactivo"
                  onChange={disolReactivo}
                >
               
                  <MenuItem sx={{ fontSize: 10 }}value={"agua"}>AGUA</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"alcohol"}>ALCOHOL</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"otros"}>OTROS</MenuItem>
                  
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
            <Grid  item xs={1} container justifyContent="center">
            <FormControl fullWidth>
                <InputLabel id="un_med_reactivo">un_med_reactivo</InputLabel>
                <Select
                  
                  labelId="un_med_reactivo"
                  id="un_med_reactivo"
                  value={_med_reactivo}
                  label="un_med_reactivo"
                  onChange={med_reactivo}
                >
                  <MenuItem sx={{ fontSize: 10 }}value={"grs"}>GRAMOS</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"kg"}>KILO</MenuItem>
                  <MenuItem sx={{ fontSize: 10 }}value={"unidad"}>UNIDAD</MenuItem>
                 
                  
               
                 
                 
                </Select>
              </FormControl>
 
              
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