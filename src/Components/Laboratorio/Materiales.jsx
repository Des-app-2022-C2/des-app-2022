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
import {getListaMaterialesFiltrada } from "../../Services/getService";
import pipeta from '../Image/pipeta.png';
import Buscador from './Buscador';
import AltaMaterial from '../ABM/AltaMaterial';
import Button from '@mui/material/Button';
import ModMaterial from '../ABM/ModMaterial';

export default function Materiales() {
  //const [texto, setEncabezado] = useState("Laboratorio");
  const [listaMateriales, setListaMateriales] = useState([]);
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
    getListaMaterialesFiltrada(busqueda)
      .then((materiales) => setListaMateriales(materiales))
      .catch((error) => console.error(error));
  }, [busqueda,open,verEdicion]);

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
      <Container component="main" color="primary" sx = {{marginTop: 5}}>
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
                  <img width={30} alt="" heigth={30} src={pipeta} />
                </Grid>
                <Grid item xs={3} container justifyContent="start">
                    <Typography sx={{ fontSize: 30 }} color="text.secondary">
                      Materiales
                    </Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="center">
                  <Buscador onBuscar={handleBuscar} placeholder={"Buscar por descripción"}></Buscador>
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                  <NuevoMaterial 
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    scroll={scroll}
                    handleClickOpen={handleClickOpen}
                  
                  ></NuevoMaterial>
                </Grid>
            </Grid>
            <Grid container direction="row"
            justifyContent="start"
            alignItems="center"
            display={verEdicion}>
              <ModMaterial
              setVerEdicion={setVerEdicion}
              elegido={elegido}
              setElegido={setElegido}

              />
            </Grid>






          <Lista listaMateriales={listaMateriales} 
          setResetPage={setResetPage} resetPage={resetPage}
           elegido={elegido}
           setElegido={setElegido}
           setVerEdicion={setVerEdicion}   >
          </Lista>
      </Grid>
      </Container>
    </ThemeProvider>
  )
}

const NuevoMaterial = (
  { open = { open },
  setOpen = { setOpen },
  scroll = { scroll },
  handleClose = { handleClose },
  handleClickOpen = { handleClickOpen }
}
) => {
  // const handleNuevoMaterial = (event) => {
  //   console.log("Nuevo Material"); // quitar
  // };
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
        NUEVO MATERIAL
      </Button>
      <AltaMaterial

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
  const displayedMateriales = props.listaMateriales.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleEditar = (event) => {
    console.log(event);
    props.setElegido(event)
    console.log(props.elegido)
    console.log(event); 
    props.setVerEdicion("block")
     // quitar
  }
  React.useEffect(() => {
    if (props.listaMateriales.length > 0 && props.resetPage) {
      setPage(0);
      props.setResetPage(false);
    }
  }, [props.listaMateriales, props.resetPage]);
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
            {displayedMateriales.map((row,index) => (
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
          count={props.listaMateriales.length}
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

