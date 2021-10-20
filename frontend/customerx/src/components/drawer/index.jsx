import React from 'react'
import Drawer from '@mui/material/Drawer';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Hidden from '@mui/material/Hidden';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, Grid, Stack} from '@mui/material';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerContent: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: '100%',
    },
    drawerHeader: {
        marginTop: theme.spacing(8),
    },
    counts: {
        marginTop: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        margin: theme.spacing(2),
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        height: '95%',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    divider: {
        width: '80%',
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(0.5),
    },
    issueCount: {
        color: theme.palette.tertiary.main,
    }
}));

const Button1 = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        padding: theme.spacing(1),
    },
}))(Button);

const Button2 = withStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        textTransform: 'none',
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}))(Button);

const Button3 = withStyles((theme) => ({
    root: {
        color: "#191919",
        backgroundColor: theme.palette.background.paper,
        textTransform: 'none',
        padding: theme.spacing(1),
    },
}))(Button);

export default function NavigationDrawer(props) {
    const classes = useStyles();
    const {pathname} = useLocation();
    let history = useHistory();
    const drawer = (

        <Grid
            justifyContent="space-between"
            alignItems="stretch"
            container
            direction="column"
            className={classes.drawerContent}
        >
            <Grid item>
                <Stack
                    direction="column"
                    spacing={3}>
                    <Stack
                        item
                        direction="column">
                        <Typography variant="h6">Yash Kasera</Typography>
                        <Typography variant="body2">yashkasera@icloud.com</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                        textAlign="center"
                        divider={<Divider orientation="vertical" flexItem/>}>
                        <Stack direction="column">
                            <Typography variant="subtitle1">Orders</Typography>
                            <Typography variant="h6" color="primary">16</Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography variant="subtitle1">Issues</Typography>
                            <Typography variant="h6" className={classes.issueCount}>2</Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="column"
                        spacing={1.5}>
                        <Divider orientation="horizontal" flexItem/>
                        <Button1 variant="contained" color="primary" fullWidth>
                            New Payment
                        </Button1>
                        <Button2 variant="contained" fullWidth>
                            Raise an issue
                        </Button2>
                        <Divider orientation="horizontal" flexItem/>
                    </Stack>
                </Stack>
            </Grid>
            <Grid
                item
                alignItems={"stretch"}
                justifyContent={"flex-end"}>
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={1.5}>
                    <Button3 variant="outlined" color="secondary" fullWidth>
                        Chat
                    </Button3>
                    <Button3 variant="outlined" color="secondary" fullWidth>
                        Help
                    </Button3>
                    <Button3 variant="outlined" color="secondary" fullWidth>
                        Settings
                    </Button3>
                    <Button1 color="primary" fullWidth>
                        Logout
                    </Button1>
                </Stack>
            </Grid>
        </Grid>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={props.container}
                    variant="temporary"
                    anchor='left'
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}