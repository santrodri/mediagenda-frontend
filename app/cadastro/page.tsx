'use client'

import {useEffect, useRef, useState} from "react";
import {Stack, Container, Paper, Typography, Grid2 as Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Divider} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";

export default function CadPage(){
    const [cepState, setCepState] = useState<null | string>(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: object) => console.log(data);

    return(
        <Container maxWidth={'md'} sx={{ py: 4 }}>
            <Stack justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
                <Paper elevation={3} sx={{width: "100%", p: 4}}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            mb: 1,
                            fontWeight: "bold",
                        }}
                    >
                        Cadastro de Paciente
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "text.secondary",
                            mb: 2,
                        }}
                    >
                        Preencha seus dados pessoais
                    </Typography>

                    <Grid container spacing={3} component="form">
                        <Grid size={{xs:12}}>
                            <TextField
                                label="Nome completo"
                                fullWidth
                                variant="outlined"
                                placeholder="Digite seu nome"
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="Identidade"
                                fullWidth
                                variant="outlined"
                                type={'number'}
                                placeholder="somente numeros"
                            />
                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <DatePicker label={'Data de nascimento'} sx={{width:'100%'}}/>
                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <FormControl fullWidth>
                                <InputLabel>Selecione seu gênero</InputLabel>
                                <Select label="gênero">
                                    <MenuItem>Selecione seu gênero</MenuItem>
                                    <MenuItem>Masculino</MenuItem>
                                    <MenuItem>Feminino</MenuItem>
                                    <MenuItem>Prefiro nâo dizer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{xs:12}}><Divider/></Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <TextField
                                required
                                label="email"
                                fullWidth
                                type={'email'}
                                variant="outlined"
                                placeholder="seu@email.com"
                            />
                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <TextField
                                label="Telefone"
                                type={'number'}
                                variant="outlined"
                                fullWidth
                                placeholder="Com DDD e somente numeros"
                            />
                        </Grid>

                        <Grid size={{xs:12}}><Divider/></Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="CEP"
                                fullWidth
                                variant="outlined"
                                placeholder="Apenas digitos"
                                onChange={(e) => {setCepState(e.target.value)}}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="Estado"
                                fullWidth
                                variant="outlined"
                                placeholder="Apenas digitos"
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="localidade"
                                fullWidth
                                variant="outlined"
                                placeholder="Apenas digitos"
                                disabled
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="Bairro"
                                fullWidth
                                variant="outlined"
                                placeholder="Apenas digitos"
                            />
                        </Grid>

                        <Grid size={{xs:12, md:8}}>
                            <TextField
                                label="Logradouro"
                                fullWidth
                                variant="outlined"
                                placeholder="Nome da rua mais numero"
                            />
                        </Grid>

                        <Grid size={{xs:12, md:4}}>
                            <TextField
                                label="Numero"
                                fullWidth
                                variant="outlined"
                                placeholder="Nome da rua mais numero"
                            />
                        </Grid>

                        <Grid size={{xs:12}}>
                            <TextField
                                label="complemento"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        <Grid size={{xs:12}}><Divider/></Grid>

                        <Grid size={{xs:12}}>
                            <TextField
                                label="Informações de Saúde (opcional)"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                placeholder="Alergias, condições médicas, medicamentos em uso..."
                            />
                        </Grid>

                        <Grid size={{xs:12}}>
                            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ py: 1.5 }}>
                                Continuar
                            </Button>
                        </Grid>

                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="caption" align="center" color="text.secondary" display="block">
                        Seus dados estão protegidos de acordo com a LGPD
                    </Typography>
                </Paper>
            </Stack>
        </Container>
    )
}