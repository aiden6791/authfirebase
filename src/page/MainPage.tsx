import { Box } from "@mui/material";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doTitle } from "../hooks/doTitle";

const MainPage = () => {

    const user = auth.currentUser;
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    doTitle(user?.displayName + "様のページ");

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            const data = JSON.stringify({ uid: user?.uid, displayName: user?.displayName, email: user?.email, photoURL: user?.photoURL, });
            setCurrentUser(user);
            localStorage.setItem('user', data);
        });
        return () => unsubcribe();
    });

    return (
        <Box>
            {user ? (
                <Box sx={{ marginTop: 10, display: 'flex', alignItems: 'center', flexDirection: 'center' }}>
                    <p>NAME : {currentUser?.displayName}</p><br/>
                    <p>UID : {currentUser?.uid}</p><br/>
                    <p>EMAIL : {currentUser?.emailVerified}</p><br/>
                </Box>
            ) : (
                <Navigate to={"/login"} />
            )}
        </Box>
    );
};

export default MainPage;