import React from "react";
import { Icon, makeStyles } from "@material-ui/core";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';
import '../Theme/Estilos.css'

import moment from 'moment';
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
import { borderLeftColor } from "@mui/system";
import { BorderColor } from "@material-ui/icons";

//const borderRadius = 15;
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin:"8px",
    height:"240px"
    
  
  },

  card: {
    // borderImageSource: "linear-gradient(to left,#009688, #1de9b6)",
    border: "2px solid",
    borderImageSlice: 1,
    borderColor:"#0097A2",
   // borderLeftColor:" #1de9b6",
   // borderRightColor:"#1de9b6",
    // backgroundColor: "#b4e0bc",
    // backgroundColor: "linear-gradient(to left,#009688, #1de9b6)",
    //backgroundImage:"linear-gradient(to right,#A6D1B0, #DFF7F9)",toam uno
    backgroundImage:"linear-gradient(to bottom right,#A6D1B0, #E8F4EB)",
    // backgroundImage:"linear-gradient(#A6D1B0, #26a69a,#A6D1B0)",
   // backgroundImage:"linear-gradient(#A6D1B0 ,#26a69a ,#A6D1B0 )",

   
   
   borderRadius:15,
   // borderRadius,
    

}
}));



function PedidoV1({ pedido }) {
  const { root,card } = useStyles();


  const {
    descripcion,
    numero_tp,
    fecha_utilizacion,
    fecha_solicitud,
    numero_laboratorio,
    docente,
    cantidad_grupos,
    lista_equipos
  } = pedido;
 const fechaActual=(moment(fecha_utilizacion).format('DD/MM/YYYY'));
 
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={Theme1}>
      <Box sx={{m:10}} styles={{display: "flex",
    margin:"8px",
    height:"240px" }} padding="2px">
        {/* <Card > */}
        <Card  className={card} >  
          <CardActionArea  onClick={handleClickOpen('body')} >
            <CardHeader
              style={{ textAlign: "left" }}
              avatar={
                <Avatar style={{color:"#26a69a"}}>
                  <AssignmentIcon   />
                </Avatar>
              }
              title={`Pedido número ${descripcion}`}
           // subheader={`Fecha : ${fecha_solicitud}`}
          subheader={`Fecha de Utilización : ${fechaActual}`}
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
                <strong>Laboratorio: </strong> {numero_laboratorio}
              </p>
              <p>
                <strong>Edificio: </strong> Malvinas
              </p>
              <p>
                <strong>Docente : </strong> {`${docente.nombre} ${docente.apellido}`}
              </p>
              <p>
                <strong>Estado: </strong>Aceptado
              </p>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      <PedidoDetalle open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        pedido={pedido}
      ></PedidoDetalle>
    </ThemeProvider>
  );

}

export default PedidoV1;