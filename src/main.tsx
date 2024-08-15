import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { doNetwork } from './hooks/doNetwork';
import FooterComponents from './components/FooterComponents';
import MainPage from './page/MainPage';
import LoginPage from './page/account/LoginPage';
import RegisterPage from './page/account/RegisterPage';
import ErrorPage from './page/ErrorPage';
import { Alert, Slide } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PageRouter/>
  </React.StrictMode>,
);

function PageRouter() {
  const [isAlert, setAlert] = useState(false);
  const isOnline = doNetwork();

  useEffect(() => {
    setAlert(isOnline ? true : false);
  }, [isOnline]);

  function Waring() {
    return (
      <Slide in={isAlert} direction='left'>
        <Alert color='error' sx={{ position: 'absolute', top: 20, right: '20px' }}>ネットワークが悪いです</Alert>
      </Slide>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/*' element={<ErrorPage/>} />
      </Routes>
      <FooterComponents/>
      <Waring/>
    </BrowserRouter>
  );
}
