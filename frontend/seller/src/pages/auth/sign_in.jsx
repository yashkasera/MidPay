import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignInSide({ classes, setExistingHandler }) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const valueChangeHandler = (props) => (event) => {
        setValues({
            ...values,
            [props]: event.target.value
        })
    }
    const auth = getAuth();
    const signInHandler = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error)
            });
    }
    return (
        <div className={classes.paper}>
            <Typography variant="h3">
                MidPay
            </Typography>
            <Typography variant="h5" color="initial" style={{ marginTop: "2rem" }}>
                Seller Portal
            </Typography>
            <div className={classes.divider} />
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
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={signInHandler}
                >
                    Sign In
                </Button>
                <Grid container className={classes.extra}>
                    <Grid item xs>
                        <Link href="#" variant="body2" color="secondary">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link onClick={setExistingHandler} variant="body2" color="secondary">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}