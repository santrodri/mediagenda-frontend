'use client'
import {useEffect, useState} from "react";
import { debounce } from '@mui/material/utils'

import {
    Button,
    Container,
    Divider,
    Grid2 as Grid, IconButton, InputAdornment,
    LinearProgress,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'

import {useForm} from "react-hook-form";


import FormResInterface from "@/app/(no_auth)/registro/formResInterface";



export default function Register(){
    const { register, handleSubmit, formState:{errors}, watch} = useForm<FormResInterface>();

    const passwordData = watch('password')
    const [passwordForce, setPasswordForce] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const passwordDict:{[key:number]: {color: string, label: string, percent: number}} = {
        1: {color: 'error', label: 'Senha fraca', percent: 33},
        2: {color: 'warning', label: 'Senha mediana', percent: 45},
        3: {color: 'warning', label: 'Senha mediana', percent: 66},
        4: {color: 'success', label: 'Senha forte', percent: 100},
    }

    function onSubmit(data:object){console.log(data)}

    const handleEffectDebounced = debounce(() => {
        let score: number = 0

        if (/[A-Z]/.test(passwordData)) score += 1
        if (/[0-9]/.test(passwordData)) score += 1
        if (/[^A-Za-z0-9]/.test(passwordData)) score += 1
        try {
            if (passwordData.length >= 8) score += 1;
            // para casos onde a primeiro caracter digitado seja uma letra a barra já começa a contar
            else if (passwordData.length > 0 && score == 0) score += 1
        } catch (error) {
            if (!(error instanceof TypeError)){
                console.log((error as Error).message)
            }
        }

        setPasswordForce(score)
    },1000)

    useEffect(()=>{
        handleEffectDebounced()
    }, [passwordData])

    return(
        <Container maxWidth={"sm"} component={'main'} sx={{py:8}}>
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
                                {...register('username',{
                                    required:{value:true, message: 'O campo é nescessario'}
                                })}
                                error={!!errors.username}
                                //@ts-ignore
                                helperText={errors.username?.message}
                            />
                        </Grid>

                        <Grid size={{xs:12}}>
                            <TextField
                                label="email"
                                fullWidth
                                required
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

                        <Grid size={{xs:12}}>
                            <TextField
                                label="confirmar email"
                                fullWidth
                                required
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

                        <Grid size={{xs:12}}>
                            <TextField
                                fullWidth
                                required
                                label={'senha'}
                                type={showPassword ? 'text' : 'password'}
                                {...register('password',{
                                    required:{value:true, message: 'O campo é nescessario'},
                                    minLength:{value:8, message:'Defina uma senha com no mínimo 8 digitos'}
                                })}
                                error={!!errors.password}
                                //@ts-ignore
                                helperText={errors.password?.message}
                                sx={{pb:1}}
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position={'end'}>
                                            <IconButton onClick={() => {setShowPassword(!showPassword)}}>
                                                {showPassword? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                }}
                            />
                            <Stack direction={'row'} alignItems={'center'}>
                                { passwordForce > 0 &&
                                    <>
                                        <LinearProgress
                                            variant={"determinate"}
                                            value={passwordDict[passwordForce].percent}
                                            sx={{ flexGrow: 1, mr: 1 }}
                                            //@ts-ignore
                                            color={passwordDict[passwordForce].color}
                                        />
                                        <Typography variant={'subtitle2'} color={passwordDict[passwordForce].color}>
                                            {passwordDict[passwordForce].label}
                                        </Typography>
                                    </>
                                }
                            </Stack>
                        </Grid>

                        <Grid size={{xs:12}}>
                            <TextField
                                fullWidth
                                required
                                label={'confirmar senha'}
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword',{
                                    required:{value:true, message: 'O campo é nescessario'},
                                    validate:(value, formValues) => value === formValues.password || 'As senhas não conincidem'
                                })}
                                error={!!errors.confirmPassword}
                                //@ts-ignore
                                helperText={errors.confirmPassword?.message}

                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position={'end'}>
                                            <IconButton onClick={() => {setShowConfirmPassword(!showConfirmPassword)}}>
                                                {showConfirmPassword? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                }}
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