import {CircularProgress, Container, Stack, Typography} from "@mui/material";

export default function LoadingPage(){
    return(
        <Container maxWidth={"md"}>
            <Stack justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
                <CircularProgress/>
                <Typography variant={'subtitle1'} align={'center'}>
                    Estamos trabalhando nisso...
                </Typography>
            </Stack>
        </Container>
    )
}