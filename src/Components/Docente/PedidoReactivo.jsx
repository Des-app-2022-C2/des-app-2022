import React, {useState} from 'react'
import { Button, Autocomplete, TextField, Grid, Typography, ThemeProvider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import quimica from '../Image/quimica.png'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const PedidoReactivo = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
  };

    return (
        <Grid container component="form" onSubmit={props.cargaReactivos} noValidate direction="row"
              justifyContent="space-around"
              alignItems="center"
              sx={{
                '--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
                borderLeft: 'var(--Grid-borderWidth) solid',
                borderRight: 'var(--Grid-borderWidth) solid',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: 'divider', paddingX: 2, borderRadius: 4, paddingY: 1, marginBottom: 3
              }}
              
              spacing={{ xs: 1, md: 1 }}
               columns={{ xs: 12 }}
              >
            {/* TITULO */}
            <Grid container direction="row"
                justifyContent="start"
                alignItems="center" mb={2} >
                <Grid item xs={1} container justifyContent="center"  >
                  <img width={30} alt="" heigth={30} src={quimica} />
                </Grid>
                <Grid item xs={3} container justifyContent="start">
                  <Typography sx={{ fontSize: 30 }} color="text.secondary">
                    Reactivos
                  </Typography>
                </Grid>
            </Grid>
            {/* COMIENZA EL FORMULARIO REACTIVOS */}
            <Grid container direction="row"
                justifyContent="start"
                alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
                <Grid item xs={5} container justifyContent="start" >
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={props.listaReactivos}
                    getOptionLabel={(option) => option.descripcion}
                    onChange={(event, value) => props.set_IdReactivo(event, value)}
                    //value={reactivoElegido}
                    renderInput={(params) => {
                      return (
                        <TextField {...params}
                          margin="normal"

                          name="descripcion_reactivo"
                          label={"descripcion_reactivo "}

                          InputLabelProps={{ className: "autocompleteLabel", shrink: true }}
                          InputProps={{
                            ...params.InputProps,
                          }}
                        />
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={2} container justifyContent="center">
                  <TextField
                    margin="normal"

                    fullWidth
                    value={props.reactivoElegido.cas}
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
                <Grid item xs={2} container justifyContent="center" marginTop={1}>
                  <FormControl fullWidth>
                    <InputLabel id="calidad_reactivo">calidad_reactivo</InputLabel>
                    <Select
                      InputLabelProps={{
                        shrink: true,
                      }}
                      labelId="calidad_reactivo"
                      id="calidad_reactivo"
                      value={props.cal_reactivo}
                      label="calidad_reactivo"
                      onChange={props.calReactivo}
                    >

                      <MenuItem sx={{ fontSize: 10 }} value={"p/analisis"}>P/ANALISIS</MenuItem>
                      <MenuItem sx={{ fontSize: 10 }} value={"molecular"}>CALIDAD MOLECULAR</MenuItem>
                      <MenuItem sx={{ fontSize: 10 }} value={"grado_tecnico"}>°TECNICO</MenuItem>

                    </Select>
                  </FormControl>


                </Grid>
                <Grid item xs={1} container justifyContent="center">
                  <TextField
                    sx={{ marginTop: 1 }}

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

              {/* ROMINA AGREGADO DE UNIDAD DE MEDIDA REACTIVO */}
              <Grid item xs={2} container justifyContent="center" marginTop={0}>
                  <TextField
                      margin="normal"
                    
                      fullWidth
                      id="un_med_reactivo"
                      label="un_med_reactivo"
                      name="un_med_reactivo"
                      InputLabelProps={{ shrink: true }}
                      autoComplete="un_med_reactivo"
                      autoFocus
                  />

                </Grid>


              </Grid>
              <Grid container direction="row"
                justifyContent="start"
                alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                <Grid item xs={5} container justifyContent="center">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Concentración
                  </Typography>
                </Grid>
                <Grid item xs={5} container justifyContent="center"></Grid>
                <Grid item xs={1} container justifyContent="end">
                  <Typography sx={{ fontSize: 14 }} aria-label="simple table" color="text.secondary">
                    Confirmar
                  </Typography>
                </Grid> {/*
                <Grid item xs={1} container justifyContent="end">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Desechar
                  </Typography>
                </Grid>
                  */}

              </Grid>
              <Grid container direction="row"
                justifyContent="start"
                alignItems="center"
                spacing={3}
                //  spacing={{ xs: 2, md: 1 }} 
                columns={{ xs: 12 }} >

                <Grid item xs={3} container justifyContent="center" marginTop={1}>
                  <FormControl fullWidth>
                    <InputLabel id="tipo_reactivo">tipo_reactivo</InputLabel>
                    <Select

                      labelId="tipo_reactivo"
                      id="tipo_reactivo"
                      value={props._tip_reactivo}
                      label="tipo_reactivo"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.tipReactivo}
                      defaultValue={""}
                    >

                      <MenuItem sx={{ fontSize: 14 }} value={"puro"}>PURO</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"molaridad"}>MOLARIDAD</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"normalidad"}>NORMALIDAD</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"mas/masa"}>%MASA/MASA</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"mas/vol"}>%MASA/VOLUMEN</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"vol/vol"}>%VOLUMEN/VOLUMEN</MenuItem>
                    </Select>
                  </FormControl>

                </Grid>
                <Grid item xs={2} container justifyContent="center">
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
                <Grid item xs={2} container justifyContent="center" marginTop={1}>
                  <FormControl fullWidth>
                    <InputLabel id="disolvente_reactivo"

                    >disolvente</InputLabel>
                    <Select

                      labelId="disolvente_reactivo"
                      id="disolvente_reactivo"
                      value={props._disol_reactivo}
                      label="disolvente_reactivo"
                      onChange={props.disolReactivo}
                    >

                      <MenuItem sx={{ fontSize: 14 }} value={"agua"}>AGUA</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"alcohol"}>ALCOHOL</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"otros"}>OTROS</MenuItem>

                    </Select>
                  </FormControl>


                </Grid>


                <Grid item xs={2} container justifyContent="center" marginTop={1}>
                  <FormControl fullWidth>
                    <InputLabel id="un_med_reactivo2">un_med_reactivo</InputLabel>
                    <Select

                      labelId="un_med_reactivo2"
                      id="un_med_reactivo2"
                      value={props._med_reactivo}
                      label="un_med_reactivo2"
                      onChange={props.med_reactivo}
                    >
                      <MenuItem sx={{ fontSize: 14 }} value={"grs"}>GRAMOS</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"kg"}>KILO</MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value={"unidad"}>UNIDAD</MenuItem>





                    </Select>
                  </FormControl>

                </Grid>
                <Grid  item xs={1} container justifyContent="center" marginLeft={11}>
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
            {/*<Grid  item xs={1} container justifyContent="center">
              <Avatar> 
                <DeleteForeverIcon color={"rojo"} />
              </Avatar> 
            </Grid>*/}
            
        </Grid>
        {(props.verMasReactivos.length > 0) ? (
          <Grid container  alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
            <Grid item xs={12}>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            MÁS REACTIVOS SOLICITADOS
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            presione la flecha hacia abajo para ver
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography >
                        <Grid container direction="row"
                                    alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >

                                    <Grid item xs={2} container justifyContent="start" >
                                       Descripcion
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
                                        CAS
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >

                                        Calidad
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                       Cantidad
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                       Tipo de Conc.
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                       Medida de Conc.
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                       Disolvente
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="end">
                                       Ud. de Medida
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                       
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        Desechar
                                    </Grid>
                                </Grid>



                            {props.verMasReactivos.map((row, index) => (



                                <Grid container key = {index} direction="row"
                                    alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >

                                    <Grid item xs={2} container justifyContent="start">


                                        {row.reactivo.descripcion}
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        {row.reactivo.cas}

                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        {row.reactivo.calidad}

                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        {row.cantidad}
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        {row.reactivo.concentracion_tipo}

                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        {row.reactivo.concentracion_medida}

                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        {row.reactivo.disolvente}

                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        

                                    </Grid>
                                    
                                    <Grid item xs={1} container justifyContent="center">
                                       
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center">
                                        <Button fullWidth
                                                margin="normal"
                                                variant="text"
                                                 
                                                onClick = {() => {
                                                  props.eliminarReactivo(row.reactivo)
                                                }}>
                                        <Avatar>
                                            <DeleteForeverIcon color={"rojo"} />
                                        </Avatar>
                                        </Button>
                                    </Grid> 
                                </Grid>

                            ))}
                        </Typography>
                    </AccordionDetails>
                </Accordion> 
                </Grid>
          </Grid>
        ): null }
      </Grid>
        
    )
}

export default PedidoReactivo