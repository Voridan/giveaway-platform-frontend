import { Container, CssBaseline } from '@mui/material';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import AuthFooter from '../components/AuthFooter';

export default function AuthPage() {
  const [login, setLogin] = useState(true);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      {login ? <LoginForm /> : <SignupForm />}
      <AuthFooter login={login} setLogin={setLogin} />
    </Container>
  );
}
