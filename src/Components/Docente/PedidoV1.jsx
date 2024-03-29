import React from "react";
import { Icon, makeStyles } from "@material-ui/core";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';
// import { getUsuario } from '../../Services/getUsuarioService';
import moment from 'moment'
import {
  Box,
  Card,
  CardContent,
  Avatar,
  CardHeader,
  IconButton,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PedidoDetalle from "../Laboratorio/PedidoDetalle";
import PedidoDetalleLabo from "../Laboratorio/PedidoDetalleLabo";
import { Typography } from "@mui/material";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "8px",
    minHeight: "240px"


  },
}));


function PedidoV1({ pedido, esAdmin}) {
  // const { root } = useStyles();



  const {
    descripcion,
    tipo_pedido,
    numero_tp,
    fecha_utilizacion,
    fecha_solicitud,
    alumnos,
    edificio,
    numero_laboratorio,
    docente,
    cantidad_grupos,
    lista_equipos
  } = pedido;
  const fecha_utilizar = (moment(fecha_utilizacion).utc().format('DD/MM/YYYY HH:mm'));
 
  const [open, setOpen] = React.useState("");
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
/*  control de estado pendiente con fecha cercana de utilizacion */ 
  // const [estaPendiente,setEstaPendiente]=React.useState(false);
  var manana = new Date()
  manana = manana.setTime(manana.getTime() + (2 * 24 * 60 * 60 * 1000))
  
  
  const formatManiana = (moment(manana).format('YYYY-MM-DD')).toString();
  
  // if((fecha_utilizacion<=formatManiana)&& (tipo_pedido==="PENDIENTE")){
  //   setEstaPendiente('red')
  // };
  

  return (
    <ThemeProvider theme={Theme1}>
      <Box sx={{ m: 10}} 
       styles={{
        display: "flex",
        margin: "8px",
        height: "240px"
      }} padding="2px">
        <Card style={{ backgroundColor: "#b4e0bc", borderRadius: 15 }}>
          <CardActionArea onClick={handleClickOpen('body')}>
            <CardHeader
              style={{ textAlign: "left" }}
              avatar={
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              }
              title={`Pedido número ${descripcion}`}
              // subheader={`Fecha : ${fecha_solicitud}`}
              subheader={`Fecha de Práctica : ${fecha_utilizar}`}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardMedia
              style={{ paddingTop: "3%" }}
              image="./media/background.png"
              title="Background image"
            />
            <CardContent style={{ textAlign: "left" }}>
              <p>
                <strong>Laboratorio: </strong> {numero_laboratorio !== 0 ? numero_laboratorio : "Sin asignar" }
              </p>
              <p>
                <strong>Edificio: </strong> {edificio}
              </p>
              <p>
                <strong>Alumnos: </strong> {alumnos}
              </p>
              <p>
                <strong>Docente : </strong> {`${docente.nombre} ${docente.apellido}`}
              </p>
             {(( fecha_utilizacion<formatManiana)&& (tipo_pedido==="PENDIENTE"))?(
                <Typography sx={{color:'red'}}>
              <p>
                <strong>Estado: {tipo_pedido}</strong>
              </p></Typography>):(
               <Typography ><p>
                <strong>Estado: </strong>{tipo_pedido}
              </p></Typography>)}
              
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      {!(esAdmin)
        ? (<PedidoDetalle 
          key={pedido._id.toString()}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          scroll={scroll}
          pedido={pedido}
        ></PedidoDetalle>)
        : (
          <PedidoDetalleLabo 
          key={pedido._id.toString()}
          open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            scroll={scroll}
            pedido={pedido}
           
          ></PedidoDetalleLabo>)
      }

    </ThemeProvider>
  );

}

export default PedidoV1;