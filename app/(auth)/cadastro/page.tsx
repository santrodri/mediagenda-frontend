'use client'

import {useRef, useState} from "react";
import {
    Stack,
    Container,
    Paper,
    Typography,
    Grid2 as Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Divider,
    FormHelperText,
} from "@mui/material";

import {DatePicker} from "@mui/x-date-pickers";
import {Controller, useForm} from "react-hook-form";
import { PatternFormat } from 'react-number-format';
import {FormCadInterface} from '@/app/(auth)/cadastro/formInterface'

export default function CadPage(){
    const { register, control, handleSubmit, formState:{errors}, watch} = useForm<FormCadInterface>({
        defaultValues:{
            person_status: ''
        }
    });
    const maxLength = 500
    const steps = ['Preencha seus dados pessoais', 'Cadastro do usuário']
    const numCaractersOfPersonStatus = watch('person_status')

    const [shrink, setShrink] = useState(false)
    const stateRef = useRef<HTMLInputElement>(null);
    const localeRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const streetRef = useRef<HTMLInputElement>(null);

    function getDataOfCep(cep: string){
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then(json => {
                setShrink(false)
                stateRef.current!.value = json.estado ? json.estado : null
                localeRef.current!.value = json.localidade ? json.localidade : null
                cityRef.current!.value = json.bairro ? json.bairro : null
                streetRef.current!.value = json.logradouro ? json.logradouro : null
                if(json.estado){setShrink(true)} // Se tivar um estado PROVAVELMENTE vai ter o resto
            })
    }

    function onSubmit(data:object){console.log(data)}

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
                            mb: 2,
                        }}
                    >
                        Preencha seus dados pessoais
                    </Typography>

                    <Grid container spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid size={{xs:12}}>
                            <TextField
                                label="Nome completo"
                                fullWidth
                                variant="outlined"
                                placeholder="Digite seu nome"
                                {...register('fullname',{
                                    required:{value:true, message:'Nome é um campo nescessario'}
                                })}
                                error={!!errors.fullname}
                                //@ts-ignore
                                helperText={errors.fullname?.message}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <Controller
                                name={'identify'}
                                control={control}
                                rules={{
                                    required:{value: true, message: 'Esse campo é nescessario'}
                                }}
                                render={({field, fieldState:{error}}) => (
                                    <PatternFormat
                                        {...field}
                                        format={'#######'}
                                        customInput={TextField}
                                        label={'identidade'}
                                        fullWidth
                                        error={!!error}
                                        //@ts-ignore
                                        helperText={error?.message}
                                    />
                                )}
                            />

                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <Controller
                                name="birthdate"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Data de nascimento é um campo nescessario'}
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker
                                        label="Data de nascimento"
                                        sx={{ width: '100%' }}
                                        {...field}
                                        slotProps={{ textField: { error: !!error, helperText: error?.message }}}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{xs:12, md: 6}}>
                            <FormControl fullWidth>
                                <InputLabel>Selecione seu gênero</InputLabel>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{
                                        validate: (value) =>
                                            value !== 'selecione seu genero' || 'Por favor, selecione um gênero válido',
                                    }}
                                    render={({ field, fieldState:{error} }) => (
                                        <>
                                            <Select
                                                label="Selecione seu gênero"
                                                {...field}
                                                error={!!error}
                                                value={field.value || 'selecione seu genero'}
                                            >
                                                <MenuItem value="selecione seu genero">Selecione seu gênero</MenuItem>
                                                <MenuItem value="masculino">Masculino</MenuItem>
                                                <MenuItem value="feminino">Feminino</MenuItem>
                                                <MenuItem value="prefiro-nao-dizer">Prefiro não dizer</MenuItem>
                                            </Select>
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid size={{xs:12}}><Divider/></Grid>

                        <Grid size={{xs:12, md:6}}>
                            <Controller
                                name="cep"
                                control={control}
                                rules={{
                                    required: { value: true, message: 'O CEP é um campo obrigatório' },
                                    pattern: {
                                        value: /^\d{5}-\d{3}$/,
                                        message: 'O CEP deve conter 8 dígitos no formato #####-###',
                                    },
                                }}
                                render={({ field }) => (
                                    <PatternFormat
                                        format="#####-###"
                                        customInput={TextField}
                                        label="CEP"
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Apenas dígitos"
                                        value={field.value || ''}
                                        onValueChange={(values) => {
                                            const { formattedValue, value } = values;
                                            field.onChange(formattedValue);
                                            if (/^\d{5}-\d{3}$/.test(formattedValue)) {
                                                getDataOfCep(formattedValue);
                                            }
                                        }}
                                        error={!!errors.cep}
                                        //@ts-ignore
                                        helperText={errors.cep?.message}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="Estado"
                                fullWidth
                                disabled
                                variant="outlined"
                                placeholder="Estado"
                                inputRef={stateRef}
                                slotProps={{ inputLabel: { shrink: shrink } }}
                                {...register('state')}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="localidade"
                                fullWidth
                                variant="outlined"
                                placeholder="Apenas digitos"
                                disabled
                                inputRef={localeRef}
                                slotProps={{ inputLabel: { shrink: shrink } }}
                                {...register('locale')}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:6}}>
                            <TextField
                                label="Bairro"
                                fullWidth
                                disabled
                                variant="outlined"
                                placeholder="Apenas digitos"
                                inputRef={cityRef}
                                slotProps={{ inputLabel: { shrink: shrink } }}
                                {...register('city')}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:8}}>
                            <TextField
                                label="Logradouro"
                                fullWidth
                                variant="outlined"
                                inputRef={streetRef}
                                slotProps={{ inputLabel: { shrink: shrink } }}
                                {...register('street',{
                                    required:{value: true, message:'Insira o nome da sua rua'}
                                })}
                            />
                        </Grid>

                        <Grid size={{xs:12, md:4}}>
                            <TextField
                                label="Numero"
                                fullWidth
                                variant="outlined"
                                {...register('number')}
                            />
                        </Grid>

                        <Grid size={{xs:12}}>
                            <TextField
                                label="complemento"
                                fullWidth
                                variant="outlined"
                                {...register('complement')}
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
                                {...register('person_status',{
                                    maxLength:{value: maxLength, message: `O maximo de caracteres é ${maxLength}`}
                                })}
                                error={!!errors.person_status}
                                //@ts-ignore
                                helperText={errors.person_status?.message}
                            />

                            <Typography
                                variant={"subtitle2"}
                                align={'right'}
                                color={numCaractersOfPersonStatus.length > maxLength ? 'error' : 'primary'}
                            >
                                {numCaractersOfPersonStatus.length}/{maxLength}
                            </Typography>
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