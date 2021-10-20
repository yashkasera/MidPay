import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider'



const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    pending: {
        backgroundColor: "#E53935",
        color: "#FFFFFF",
        padding: theme.spacing(1),
        borderRadius: "5px",

    },
    in_process: {
        backgroundColor: "#FFBA4C",
        color: "#FFFFFF",
    },
    resolved: {
        backgroundColor: "#34D178",
        color: "#FFFFFF",
    },
}));

export default function IssueCard(props) {
    const classes = useStyles()
    return (
        // <>
        //     <Grid
        //         className={classes.root}
        //         container
        //         justifyContent="space-between"
        //         direction='row'
        //         spacing={1}>
        //         <Grid item xs>
        //             <Typography variant="body2" color="initial">yash.kasera</Typography>
        //             <Typography variant="subtitle2" color="textSecondary">a1b2c3d4</Typography>
        //         </Grid>
        //         <Grid item xs>
        //             <Typography variant="body2" color="initial">Rs. 1509.99</Typography>
        //             <Typography variant="subtitle2" color="textSecondary">31/08/2021</Typography>
        //         </Grid>
        //         <Grid item xs >
        //             <Typography variant="button" className={classes.pending}>PENDING</Typography>
        //         </Grid>
        //         <Grid container xs justifyContent="flex-end" >
        //             <IconButton aria-label="options" onClick={() => console.log('clicked')}>
        //                 <MoreVertIcon />
        //             </IconButton>
        //         </Grid>
        //     </Grid>
        // </>
        <Box width="100%" display="flex" p={1} alignItems="center" >
            <Box p={1} flexGrow={1}>
                <Typography variant="body2" color="initial">yash.kasera</Typography>
                <Typography variant="subtitle2" color="textSecondary">a1b2c3d4 a1b2c3d4 a1b2c3d4 a1b2c3d4 a1b2c3d4 a1b2c3d4 </Typography>
            </Box>
            <Box p={1}>
                <Typography variant="body2" color="initial">1,509.99</Typography>
                <Typography variant="subtitle2" color="textSecondary">31/08/2021</Typography>
            </Box>
            <Box p={1} alignItems="center">
                <Typography variant="button" className={classes.pending}>PENDING</Typography>
            </Box>
            <Box p={1}>
                <IconButton aria-label="options" onClick={() => console.log('clicked')} size="large">
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
}