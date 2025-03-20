'use client'

import {Button, Container, Divider, Grid2 as Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import FormResInterface from "@/app/(no_auth)/registro/formResInterface";
import {PatternFormat} from "react-number-format";


export default function Register(){
    const { register, control, handleSubmit, formState:{errors}} = useForm<FormResInterface>();
    function onSubmit(data:object){console.log(data)}


    return(
        <Container maxWidth={"md"} component={'main'} sx={{py:8}}>
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Paper elevation={3} sx={{width: "100%", p: 4}}>
                    <Typography variant="h4" component="h1" sx={{mb: 1, fontWeight: "bold"}}>
                        Criar conta
                    </Typography>

                    <Typography variant="subtitle1" sx={{mb: 2}}>
                        Preencha os dados abaixo para se registrar
                    </Typography>

                    <Grid container spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid size={{md: 12, xs: 12}}>
                            <TextField
                                fullWidth
                                label={'Nome de usuario'}
                                required
                                {...register('username')}
                            />
                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <TextField
                                label="email"
                                fullWidth
                                type={'email'}
                                variant="outlined"
                                placeholder="seu@email.com"
                                {...register('email',{
                                    pattern:{value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'O email não condiz com o padrão'},
                                    required:{value: true, message:'O campo email é nescessário'}
                                })}
                                error={!!errors.email}
                                //@ts-ignore
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <TextField
                                label="confirmar email"
                                fullWidth
                                type={'email'}
                                variant="outlined"
                                placeholder="seu@email.com"
                                {...register('email_cofirm',{
                                    pattern:{value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'O email não condiz com o padrão'},
                                    required:{value: true, message:'O campo email é nescessário'},
                                    validate: (value, formValues) => value === formValues.email || 'Os email nâo coincidem'

                                })}
                                error={!!errors.email}
                                //@ts-ignore
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        {/*<Grid size={{xs:12, md: 6}}>*/}
                        {/*    <Controller*/}
                        {/*        name={'phone_number'}*/}
                        {/*        control={control}*/}
                        {/*        rules={{*/}
                        {/*            required: {value: true, message: 'O numero de telefone é um campo obrigatório'},*/}
                        {/*            pattern:{value:/^\(\d{2}\)\s\d{4,5}-\d{4}$/, message: 'O numero de celular não é válido'}*/}
                        {/*        }}*/}
                        {/*        render={({field}) => (*/}
                        {/*            <PatternFormat*/}
                        {/*                format={'(##) #####-####'}*/}
                        {/*                customInput={TextField}*/}
                        {/*                label="Telefone"*/}
                        {/*                variant="outlined"*/}
                        {/*                fullWidth*/}
                        {/*                placeholder="Com DDD e somente numeros"*/}
                        {/*                value={field.value || ''}*/}
                        {/*                onValueChange={(values) => {*/}
                        {/*                    const { formattedValue } = values;*/}
                        {/*                    field.onChange(formattedValue);*/}
                        {/*                }}*/}
                        {/*                error={!!errors.phone_number}*/}
                        {/*                //@ts-ignore*/}
                        {/*                helperText={errors.phone_number?.message}*/}
                        {/*            />*/}
                        {/*        )}*/}
                        {/*    />*/}
                        {/*</Grid>*/}

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                fullWidth
                                label={'senha'}
                                type={'password'}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                fullWidth
                                label={'confirmar senha'}
                                type={'password'}
                            />
                        </Grid>

                        <Grid size={{xs:12}}>
                            <Button
                                variant={'contained'}
                                size="large"
                                fullWidth
                                sx={{ py: 1.5 }}
                                type={'submit'}
                                children={'Concluir cadastro'}
                            />
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