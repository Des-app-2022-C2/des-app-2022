import React from 'react'

import { IconButton, Autocomplete, TextField, Box, Grid,Typography, ThemeProvider } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import laboratorio from '../Image/biologia.png';
import { margin } from '@mui/system';

const PedidoEquipos = (props) => {


    return (


        <Grid container direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }}
           >

            <Grid item xs={12} >
                <Box
                    border={1}
                    borderColor={"borde.main"}
                    borderRadius={5}
                    padding={1}
                   
                   
                >

                    {/* TITULO */}
                    <Grid container direction="row"
                        justifyContent="start"
                        alignItems="center"  >
                        <Grid item xs={1} container justifyContent="center"  >
                            <img width={40} alt="" heigth={40} src={laboratorio} />
                        </Grid>
                        <Grid item xs={3} container justifyContent="start">
                            <Typography sx={{ fontSize: 40 }} color="text.secondary">
                                Equipos
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid container direction="row"
                        justifyContent="flex-end"
                        alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                        <Grid item xs={1} container justifyContent="center">
                            <Typography sx={{ fontSize: 14 }} aria-label="simple table" color="text.secondary">
                                Confirmar
                            </Typography>
                        </Grid>
                        <Grid item xs={1} container justifyContent="center">
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                Desechar
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* FORMULARIO PARA EQUIPOS */}
                    <Grid container component="form" onSubmit={props.cargaEquipo} noValidate direction="row"
                        justifyContent="start"
                        alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
                        <Grid item xs={5} container justifyContent="start" >
                            <Autocomplete
                                disablePortal
                                fullWidth
                                id="combo-box-demo"
                                options={props.listaEquipos}

                                getOptionLabel={(option) => option.descripcion}
                                onChange={(event, value) => props.set_IdEquip(event, value)}
                                renderInput={(params) => {
                                    return (
                                        <TextField {...params}
                                            margin="normal"
                                            // value={params._id}
                                            name="descripcion_equipo"
                                            label={"descripcion_equipo"}

                                            InputLabelProps={{ className: "autocompleteLabel", shrink: true }}
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                        />
                                    );
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} container justifyContent="center" />

                        <Grid item xs={2} container justifyContent="center" >

                            <TextField
                                sx={{ marginTop: 1 }}

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
                        <Grid item xs={2} container justifyContent="center" />
                        <Grid item xs={1} container justifyContent="center">
                            <IconButton aria-label=""
                            //  onClick={}
                            >
                                <AddCircleIcon fontSize={'large'} bgcolor={"secondary"} color={"primary"} />
                            </IconButton>

                        </Grid>
                        <Grid item xs={1} container justifyContent="center">
                            <IconButton aria-label=""
                            //  onClick={}
                            >
                                <DeleteForeverIcon color={"rojo"} fontSize={'large'} />

                            </IconButton>

                        </Grid>
                    </Grid>
                    <Grid></Grid>

                </Box>
            </Grid>
        </Grid>

    )
}

export default PedidoEquipos