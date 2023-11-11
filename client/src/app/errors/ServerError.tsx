import { Container, Divider, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom";

const ServerError = () => {
    const { state } = useLocation();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                    <Typography variant='h3' color='secondary' gutterBottom>{state.error.title}</Typography>
                    <Divider />
                    <Typography variant='body1'>{state.error.detail || 'Internal Server Error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>Server Error</Typography>
            )}
        </Container>
    )
}

export default ServerError