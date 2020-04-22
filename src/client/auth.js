import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import sha256 from 'js-sha256'

const useStyles = makeStyles(theme => ({
  blur: {
    'backdrop-filter': 'blur(5px)'
  }
}))

export default function ({ API, succeeded }) {
  const classes = useStyles()
  const [login, swap] = useState(true);

  return (
    <Dialog BackdropProps={{classes: {root: classes.blur}}} open={true} fullWidth maxWidth="sm" disableBackdropClick={true} disableEscapeKeyDown={true}>
      {login ? (
        <Login succeeded={succeeded} API={API} swapToRegistration={()=>swap(false)} />
      ) : (
        <Registration succeeded={succeeded} API={API} swapToLogin={()=>swap(true)} />
      )}
    </Dialog>
  );
}

function changed(setNewValue, setError, checker) {
  return (event) => {
    setNewValue(event.target.value);
    if (setError) {
      if (event.target.validationMessage)
        return setError(event.target.validationMessage)
      if (checker) {
        const error = checker(event.target.value)
        if (error)
          return setError(error)
      }
      return setError('')
    }
  }
}

function Login({ API, succeeded, swapToRegistration }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginRequest = async () => {
    const response = await API.request('/auth/login', {
      method: 'POST',
      body: new URLSearchParams({
        login: login,
        hs256: sha256.hmac(password, login),
      })
    });
    switch (response.status) {
      case 200:
        return succeeded();
      case 400:
        const reason = (await response.json()).reason
        switch (reason) {
          case 'USER_NOT_FOUND':
            return setLoginError('Пользователь с таким логином не найден');
          case 'WRONG_HS256':
            return setPasswordError('Неверный пароль');
          default:
            throw Error(`Unexpected fail reason '${reason}' on login request`);
        }
      default:
        throw Error(`Unexpected response status code '${response.status}' on login request`);
    }
  }

  return (
    <div>
      <DialogTitle>
        Вход
      </DialogTitle>
      <DialogContent>
        <Box pr={2}>
          <TextField
            margin="dense"
            label="Логин"
            required
            fullWidth
            onChange={changed(setLogin, setLoginError)}
            error={loginError.length > 0}
            helperText={loginError}
            autoFocus
          />
          <TextField
            margin="dense"
            label="Пароль"
            required
            fullWidth
            onChange={changed(setPassword, setPasswordError)}
            error={passwordError.length > 0}
            helperText={passwordError}
            type="password"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={swapToRegistration} color="primary">
          Зарегистрироваться
        </Button>
        <Button
          onClick={()=>{
            login || setLoginError('Заполните это поле')
            password || setPasswordError('Заполните это поле')
            if (!login || !password)
              return;
            loginRequest()
          }}
          color="primary"
          variant="contained"
        >
          Войти
        </Button>
      </DialogActions>
    </div>
  );
}

function Registration({ API, succeeded, swapToLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');
  const [emailError, setEmailError] = useState('');

  const registerRequest = async () => {
    const response = await API.request('/auth/register', {
      method: 'POST',
      body: new URLSearchParams({
        login: login,
        hs256: sha256.hmac(password, login),
        email: email,
      })
    });
    switch (response.status) {
      case 200:
        return succeeded();
      case 400:
        const reason = (await response.json()).reason
        switch (reason) {
          case 'LOGIN_ALREADY_USED':
            return setLoginError('Пользователь с таким логином уже зарегистрирован в системе');
          case 'EMAIL_ALREADY_USED':
            return setEmailError('Пользователь с таким E-mail уже зарегистрирован в системе');
          default:
            throw Error(`Unexpected fail reason '${reason}' on register request`);
        }
      default:
        throw Error(`Unexpected response status code '${response.status}' on register request`);
    }
  }

  return (
    <div>
      <DialogTitle>
        Регистрация
      </DialogTitle>
      <DialogContent>
        <Box pr={2}>
          <TextField
            margin="dense"
            label="Логин"
            required
            fullWidth
            onChange={changed(setLogin, setLoginError)}
            error={loginError.length > 0}
            helperText={loginError}
            autoFocus
          />
          <TextField
            margin="dense"
            label="Пароль"
            required
            fullWidth
            onChange={changed(setPassword, setPasswordError, (value) => {
              passwordConfirmation && value !== passwordConfirmation && setPasswordConfirmationError('Пароли не совпадают')
            })}
            error={passwordError.length > 0}
            helperText={passwordError}
            type="password"
          />
          <TextField
            margin="dense"
            label="Подтверждение пароля"
            required
            fullWidth
            onChange={changed(setPasswordConfirmation, setPasswordConfirmationError, (value) => password === value ? '' : 'Пароли не совпадают')}
            error={passwordConfirmationError.length > 0}
            helperText={passwordConfirmationError}
            type="password"
          />
          <TextField
            margin="dense"
            label="E-mail"
            required
            fullWidth
            onChange={changed(setEmail, setEmailError)}
            error={emailError.length > 0}
            helperText={emailError}
            type="email"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={swapToLogin} color="primary">
          Войти в существующую учётную запись
        </Button>
        <Button
          onClick={()=>{
            login || setLoginError('Заполните это поле')
            password || setPasswordError('Заполните это поле')
            passwordConfirmation || setPasswordConfirmationError('Заполните это поле')
            email || setEmailError('Заполните это поле')
            if (!login || !password || !passwordConfirmation || !email || loginError || passwordError || passwordConfirmationError || emailError)
              return;
            registerRequest()
          }}
          color="primary"
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </DialogActions>
    </div>
  );
}
