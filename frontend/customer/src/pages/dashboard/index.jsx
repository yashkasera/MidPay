import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography'
import OrderCard from './orderCard'
import IssueCard from './issueCard'
import InstagramCard from './instagramCard'
import RatingCard from './ratingCard'
import Button from '@mui/material/Button'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2)
    },
}));

export default function Dashboard() {
    const classes = useStyles()
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <Paper className={classes.paper}>
                        <Typography variant="h6" color="initial">YOUR ORDERS</Typography>
                        <OrderCard />
                        <OrderCard />
                        <OrderCard />
                        <OrderCard />
                        <OrderCard />
                        <Button variant="contained" color="primary">
                            View All Orders
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" color="initial">YOUR ISSUES</Typography>
                        <IssueCard />
                        <IssueCard />
                        <IssueCard />
                        <IssueCard />
                        <IssueCard />
                        <Button variant="contained" color="primary">
                            View All Issues
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" color="initial">TRENDING ON INSTAGRAM</Typography>
                        <InstagramCard />
                        <InstagramCard />
                        <InstagramCard />
                        <InstagramCard />
                        <Button variant="contained" color="primary">
                            View All Stores
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" color="initial">REVIEWS BY YOU</Typography>
                        <RatingCard />
                        <RatingCard />
                        <RatingCard />
                        <RatingCard />
                        <Button variant="contained" color="primary">
                            View All Reviews
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}