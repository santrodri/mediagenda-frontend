'use client'

import {Container, Paper, Grid2 as Grid, Stack, Typography, TextField, Button} from "@mui/material";
import {useForm} from "react-hook-form";
import {ArrowBack as ArrowBackIcon} from "@mui/icons-material";
import Link from "next/link";
import {useState} from "react";

export default function RemeberPasswordPage(){
    const { register, handleSubmit, formState:{errors}} = useForm<{email:string}>()
    const [sendedEmail, setSendedEmail] = useState(false)

    function onSubmit(data:object){
        setSendedEmail(true)
        console.log(data)
    }

    return(
        <Container maxWidth={'md'}>
            <Stack justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
                <Paper elevation={3} sx={{width:'100%', p: 4}}>
                    <Typography variant="h6" component="h1" align={'center'}>
                        Relembrar senha
                    </Typography>

                    <Typography variant="subtitle2" sx={{mb: 2}} align={'center'}>
                        Vamos enviar seu link de redefinição da senha para seu e-mail
                    </Typography>
                    <Grid container component={'form'} noValidate onSubmit={handleSubmit(onSubmit)} spacing={1}>
                        <Grid size={{xs:12}} >
                            <TextField
                                required
                                fullWidth
                                label="Seu e-mail"
                                {...register('email',{
                                    required:{value: true, message:"Seu email é nescessario"},
                                    pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'O email não condiz com o padrão'}
                                })}
                                error={!!errors.email}
                                //@ts-ignore
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        {sendedEmail && (
                            <Grid>
                                <Typography variant={"body2"} align={'center'} color={'success'}>
                                    Seu email foi enviado com sucesso
                                </Typography>
                            </Grid>
                        )}

                        <Grid size={{xs:12}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={sendedEmail}
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                Enviar instruções
                            </Button>
                        </Grid>

                        <Grid size={{xs:12}}>
                            <Button
                               component={Link}
                               href="/login"
                               fullWidth
                               startIcon={<ArrowBackIcon/>}
                               sx={{ textTransform: "none" }}
                            >
                                Voltar para o login
                            </Button>
                        </Grid>

                    </Grid>
                </Paper>
            </Stack>
        </Container>
    )
}