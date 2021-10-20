import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        borderImage: 'linear-gradient(45deg, #6B18F2, #DF1AFF, #60E7FA )',
        borderWidth: '1px',
        borderImageSlice: '1',
        backgroundColor: theme.palette.background.default
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const { pathname } = useLocation();
    const routes = {
        Dashboard: "/",
        Payments: "/about",
        Orders: "/users",
        Disputes: "/disputes"
    };
    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs>
                    <Card className={classes.card} variant="outlined">
                        <CardContent >
                            <Typography variant="h5" component="p">
                                Rs. 50000
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="p">
                                Rs. 50000
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="p">
                                Rs. 50000
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.card} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="p">
                                Rs. 50000
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}