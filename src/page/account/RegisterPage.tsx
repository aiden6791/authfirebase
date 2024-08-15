import { Alert, Box, Button, Container, Slide, TextField } from "@mui/material";
import AlertComponents from "../../components/AlertComponents"
import { doTitle } from "../../hooks/doTitle";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useError } from "../../hooks/useError";
import { FirebaseError } from "firebase/app";

const RegisterPage = () => {

    doTitle("登録ページ");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickName] = useState('');
    const [isAlert, setAlert] = useState(false);

    const { handleError, format } = useError();


    useEffect(() => {
        const check = setTimeout(() => {
            if(isAlert === true) {
                setAlert(false);
            }
        }, 3000);
        return () => clearTimeout(check);
    }, []);

    const handle = async () => {
        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            const user = credential.user;

            if (user) {
                await sendEmailVerification(user);
                await updateProfile(user, { displayName: nickname });
                new AlertComponents("success", isAlert, "登録メールを送りました", "");
            }
        } catch(error) {
            if (error instanceof FirebaseError) {
                handleError(error);
                setAlert(true);
            }
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 8, flexDirection: 'column', alignItems: 'center', display: 'flex', mt: 1.5 }}>
                <TextField type="email" placeholder="メール" value={email} onChange={e => setEmail(e.target.value)} fullWidth  />
                <TextField type="password" placeholder="パスワード" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
                <TextField value={nickname} placeholder="ニックネーム" onChange={e => setNickName(e.target.value)} fullWidth />
                <Button onClick={handle} fullWidth>登録</Button>

                <Slide direction="left" in={isAlert}>
                    <Alert color="error" sx={{ position: "absolute", top: 20, right: '20px' }} >
                        {format}
                    </Alert>
                </Slide>
            </Box>
        </Container>
    );
};

export default RegisterPage;