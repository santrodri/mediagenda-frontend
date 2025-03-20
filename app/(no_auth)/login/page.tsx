'use client'
import {useState} from "react";
import {Box, Container, Paper, Stack, Typography, TextField, InputAdornment, IconButton, Link, Button} from "@mui/material";
import {Visibility, VisibilityOff} from  '@mui/icons-material'

export default function Home() {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <Stack justifyContent={"center"} alignItems={'center'} minHeight={"100vh"}>
            <Container maxWidth={'sm'}>
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                    }}
                >
                    <Stack spacing={3} sx={{p:4}}>
                        <Box textAlign={'center'}>
                            <Typography variant="h4" component="h1" fontWeight={700} color="primary" gutterBottom>
                                Bem-vindo
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Entre com suas credenciais para acessar sua conta
                            </Typography>
                        </Box>
                        <Box component="form" noValidate sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Nome de usuário"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                <Link href="#" style={{ textDecoration: "none" }}>
                                    <Typography variant="body2" color="primary">
                                        Esqueceu a senha?
                                    </Typography>
                                </Link>
                            </Box>

                            <Button type="submit" fullWidth variant="contained" color="primary" size="large" sx={{ mt: 3, mb: 2 }}>
                                Entrar
                            </Button>

                            <Box sx={{ textAlign: "center", mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Não tem uma conta?{" "}
                                    <Link href="#" style={{ textDecoration: "none" }}>
                                        <Typography component="span" variant="body2" color="primary" fontWeight={600}>
                                            Cadastre-se agora
                                        </Typography>
                                    </Link>
                                </Typography>
                            </Box>

                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Stack>
    );
}
