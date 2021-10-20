import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import SignIn from './sign_in'
import SignUp from './sign_up'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    box: {
        backgroundColor: theme.palette.backgroundSecondary,
    },
    paper: {
        height: '100vh',
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    divider: {
        width: '50%',
        height: '5px',
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },
    extra: {
        marginTop: theme.spacing(1.5)
    }
}));

export default function SignInSide() {
    const classes = useStyles()
    const [existing, setExisting] = useState(true)

    const setExistingHandler = () => {
        setExisting(!existing)
    }
    return (
        <Grid container className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={5} md={8}>
            </Grid>
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square className={classes.box}>
                {existing ? <SignIn classes={classes} setExistingHandler={setExistingHandler} /> : <SignUp classes={classes} setExistingHandler={setExistingHandler} />}
            </Grid>
        </Grid>
    );
}