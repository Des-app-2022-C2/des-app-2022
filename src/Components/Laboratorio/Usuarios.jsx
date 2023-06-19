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
import {getListaUsuariosFiltrada} from "../../Services/getUsuarioService";
import laboratorio from '../Image/laboratorio_personal.jpeg';
import Buscador from './Buscador';

import Button from '@mui/material/Button';

export default function Usuarios() {
    //const [texto, setEncabezado] = useState("Laboratorio");
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [resetPage, setResetPage] = useState(false);

    useEffect(() => {
      getListaUsuariosFiltrada(busqueda)
        .then((usuarios) => setListaUsuarios(usuarios))
        .catch((error) => console.error(error));
    }, [busqueda]);
  
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
                    <img width={30} alt="" heigth={30} src={laboratorio} />
                  </Grid>
                  <Grid item xs={3} container justifyContent="start">
                      <Typography sx={{ fontSize: 30 }} color="text.secondary">
                        Usuarios
                      </Typography>
                  </Grid>
                  <Grid item xs={3} container justifyContent="center">
                    <Buscador onBuscar={handleBuscar}></Buscador>
                  </Grid>
                  <Grid item xs={4} container justifyContent="flex-end">
                    <NuevoUsuario ></NuevoUsuario>
                  </Grid>
              </Grid>
            <Lista listaUsuarios={listaUsuarios} setResetPage={setResetPage} resetPage={resetPage}></Lista>
        </Grid>
        </Container>
      </ThemeProvider>
    )
  }
  
  const NuevoUsuario = () => {
    const handleNuevoUsuario = (event) => {
      console.log("Nuevo Usuario"); // quitar
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
          onClick={handleNuevoUsuario}
        >
          NUEVO USUARIO
        </Button>
      </div>
    )
  }
  const Lista = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedUsuarios = props.listaUsuarios.slice(startIndex, endIndex);
  
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
    React.useEffect(() => {
      if (props.listaUsuarios.length > 0 && props.resetPage) {
        setPage(0);
        props.setResetPage(false);
      }
    }, [props.listaUsuarios, props.resetPage]);
    return (
      <Container>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">DNI</TableCell>
                <TableCell align="center">Es Admin</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsuarios.map((row,index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.usuario} </TableCell>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.apellido}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.dni}</TableCell>
                  <TableCell align="center">{String(row.admin)}</TableCell>
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
            count={props.listaUsuarios.length}
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