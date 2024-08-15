import { Alert, Box, Button, Container, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useError } from "../../hooks/useError";
import { doTitle } from "../../hooks/doTitle";

const LoginPage = () => {

    doTitle("ログインページ");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAlert, setAlert] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { handleError, format } = useError();

    useEffect(() => {
        const check = setTimeout(() => {
            if(isAlert === true) {
                setAlert(false);
            }
        }, 3000);
        return () => clearTimeout(check);
    });

    const handle = async () => {

        if(email.length === 0 || password.length === 0) {
            setError('確認してください');
            setAlert(true);
            return;
        }

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password);
            const user = credential.user;

            if (user.emailVerified) {
                navigate("/");
            } else {
                setError('メール登録が必要です');
            }
        } catch(error) {
            if (error instanceof FirebaseError) {
                setAlert(true);
                handleError(error);
            } 
        }
    }


    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1.5 }}>
                <TextField type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <TextField type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                <Button onClick={handle} fullWidth>ログイン</Button>

                <Slide direction="left" in={isAlert}>
                    <Alert color="error" sx={{ position: "absolute", top: 20, right: '20px' }}>
                        {error ?? format}
                    </Alert>
                </Slide>
            </Box>
        </Container>
    );
};

export default LoginPage;