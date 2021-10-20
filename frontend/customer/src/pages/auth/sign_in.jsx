import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {IconButton, InputAdornment} from "@mui/material";

export default function SignInSide({classes, setExistingHandler}) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const valueChangeHandler = (props) => (event) => {
        setValues({
            ...values,
            [props]: event.target.value
        })
    }
    const [disableSignIn, setDisableSignIn] = useState(false)
    const auth = getAuth();
    const signInHandler = async (event) => {
        event.preventDefault()
        setDisableSignIn(true)
        try {
            const user = await signInWithEmailAndPassword(auth, values.email, values.password)
            console.log(user)
        } catch (e) {
            console.error(e)
        } finally {
            setDisableSignIn(false)
        }
    }
    return (
        <div className={classes.paper}>
            <Typography variant="h3">
                MidPay
            </Typography>
            <Typography variant="h5" color="initial" style={{marginTop: "2rem"}}>
                Customer Login
            </Typography>
            <div className={classes.divider}/>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    value={values.email}
                    onChange={valueChangeHandler('email')}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={values.password}
                    onChange={valueChangeHandler('password')}
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(event) => event.preventDefault()}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={signInHandler}
                    disabled={disableSignIn}
                >
                    Sign In
                </Button>
                <Grid container className={classes.extra}>
                    <Grid item xs>
                        <Link href="#" variant="body2" color="primary">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link onClick={setExistingHandler} variant="body2" color="primary">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}