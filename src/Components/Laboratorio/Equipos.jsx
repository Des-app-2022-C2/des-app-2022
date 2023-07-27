import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination'
import { ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';
import { getListaEquiposFiltrada } from "../../Services/getService";
import laboratorio from '../Image/biologia.png';
import Buscador from './Buscador';
import {

  Card,
  CardContent,
  Avatar,
  CardHeader,

  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import AltaEquipo from '../ABM/AltaEquipo';
import Button from '@mui/material/Button';
import ModEquipo from '../ABM/ModEquipo';


export default function Equipos() {
  //const [texto, setEncabezado] = useState("Laboratorio");
  const [listaEquipos, setListaEquipos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resetPage, setResetPage] = useState(false);
  
  const [verEdicion,setVerEdicion]=useState("none")
  const [open, setOpen] = React.useState("");
  
  const [scroll, setScroll] = React.useState('paper');
  const [elegido,setElegido]=useState({});
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);

  };

  const handleClose = () => {
    setOpen(false);

  };

  useEffect(() => {
    getListaEquiposFiltrada(busqueda)
      .then((equipos) => setListaEquipos(equipos))
      .catch((error) => console.error(error));
  }, [busqueda, open,verEdicion]);

  const handleBuscar = (term) => {
    setBusqueda(term);
    setResetPage(true);
  };

  return (
    <ThemeProvider theme={Theme1}>

      <Box sx={{ flexGrow: 1, m: 2 }}>

        <Header texto={'Laboratorio'} isUserAdmin={true}>
        </Header>

      </Box>
      <Container component="main" color="primary" sx={{ marginTop: 5 }}>
        <Grid container
          sx={{
            '--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
            borderLeft: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider', paddingX: 2, borderRadius: 4, paddingY: 1, marginBottom: 4, marginX: 10,
          }}
          spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }}>
          <Grid container direction="row"
            justifyContent="start"
            alignItems="center">
            <Grid item xs={1} container justifyContent="center"  >
              <img width={30} alt="" heigth={30} src={laboratorio} />
            </Grid>
            <Grid item xs={3} container justifyContent="start">
              <Typography sx={{ fontSize: 30 }} color="text.secondary">
                Equipos
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="center">
              <Buscador onBuscar={handleBuscar} placeholder={"Buscar por descripción"}></Buscador>
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end">
              <NuevoEquipo
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                scroll={scroll}
                handleClickOpen={handleClickOpen}
              />
            </Grid>
          </Grid>
          <Grid container direction="row"
            justifyContent="start"
            alignItems="center"
            display={verEdicion}>
              <ModEquipo
              setVerEdicion={setVerEdicion}
              elegido={elegido}
              setElegido={setElegido}

              />
            </Grid>
          <Lista listaEquipos={listaEquipos}
           elegido={elegido}
           setElegido={setElegido}
           setVerEdicion={setVerEdicion} 
           setResetPage={setResetPage} resetPage={resetPage}

           
          ></Lista>


        </Grid>
      </Container>
    </ThemeProvider>
  )
}

const NuevoEquipo = (
  { open = { open },
    setOpen = { setOpen },
    scroll = { scroll },
    handleClose = { handleClose },
    handleClickOpen = { handleClickOpen }
  }
) => {





  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

      <Button
        fullWidth
        style={{ borderRadius: 8 }}
        margin="normal"
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen('body')}
      >
        NUEVO EQUIPO
      </Button>


      <AltaEquipo

        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        handleClickOpen={handleClickOpen}

      />
    </div>
  )
}
const Lista = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedEquipos = props.listaEquipos.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditar = (event) => {
    props.setElegido(event)
    console.log(props.elegido)
    
    props.setVerEdicion("block")
    
  }
  React.useEffect(() => {
    if (props.listaEquipos.length > 0 && props.resetPage) {
      setPage(0);
      props.setResetPage(false);
    }
  }, [props.listaEquipos, props.resetPage]);
  return (
    <Container>
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="center">Clase</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedEquipos.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.descripcion} </TableCell>
                <TableCell align="center">{row.clase}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="editar" onClick={() => handleEditar(row)}>
                    <EditIcon />
                  </IconButton>

                 

                </TableCell>
              </TableRow>
           
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.listaEquipos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Elementos por página"}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </Container>
  )
}

