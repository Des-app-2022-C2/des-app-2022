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
import {getListaEquiposFiltrada } from "../../Services/getService";
import laboratorio from '../Image/biologia.png';
import Buscador from './Buscador';

import Button from '@mui/material/Button';
import { IndeterminateCheckBox } from '@material-ui/icons';


export default function Equipos() {
  //const [texto, setEncabezado] = useState("Laboratorio");
  const [listaEquipos, setListaEquipos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    getListaEquiposFiltrada(busqueda)
      .then((equipos) => setListaEquipos(equipos))
      .catch((error) => console.error(error));
  }, [busqueda]);

  const handleBuscar = (term) => {
    setBusqueda(term);
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
                  <img width={30} alt="" heigth={30} src={laboratorio} />
                </Grid>
                <Grid item xs={3} container justifyContent="start">
                    <Typography sx={{ fontSize: 30 }} color="text.secondary">
                      Equipos
                    </Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="center">
                  <Buscador onBuscar={handleBuscar}></Buscador>
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                  <NuevoEquipo ></NuevoEquipo>
                </Grid>
            </Grid>
          <Lista listaEquipos={listaEquipos}></Lista>
      </Grid>
      </Container>
    </ThemeProvider>
  )
}

const NuevoEquipo = () => {
  const handleNuevoEquipo = (event) => {
    console.log("Nuevo Equipo"); // quitar
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
        fullWidth
        style={{ borderRadius: 8 }}
        margin="normal"
        variant="contained"
        color="primary"
				size="large"
        onClick={handleNuevoEquipo}
      >
        NUEVO EQUIPO
      </Button>
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
    console.log(event); // quitar
  }
  return (
    <Container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Descripcion</TableCell>
              <TableCell align="center">Clase</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedEquipos.map((row,index) => (
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
