import React from 'react'
import Drawer from '@mui/material/Drawer';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Hidden from '@mui/material/Hidden';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, Stack} from '@mui/material';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paths from "../../util/paths";
import {getAuth} from "firebase/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
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
    options: {
        cursor: 'pointer',
        width: '100%',
        '&:hover': {
            // boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
            backgroundColor: theme.palette.highlightColor
        },
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
    const logoutHandler = () => {
        console.log('logging out')
        getAuth().signOut()
    };
    const drawer = (
        <Stack
            direction={'column'}
            justifyContent={'space-between'}
            sx={{height: '100%', paddingTop: 2, paddingBottom: 2}}>
            <Stack
                direction="column"
                spacing={3}>
                <Stack
                    direction="column">
                    <Typography variant="h6" noWrap
                                sx={{width: '100%'}}>
                        {props.response && props.response.name}</Typography>
                    <Typography variant="body2" noWrap>
                        {props.response && props.response.email}</Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    textAlign="center"
                    divider={<Divider orientation="vertical" flexItem/>}>
                    <Stack direction="column" className={classes.options} onClick={() => history.push(Paths.orders)}>
                        <Typography variant="subtitle1">Orders</Typography>
                        <Typography variant="h6"
                                    color="primary">{props.response && props.response.orderCount}</Typography>
                    </Stack>
                    <Stack direction="column" className={classes.options} onClick={() => history.push(Paths.issues)}>
                        <Typography variant="subtitle1">Issues</Typography>
                        <Typography variant="h6"
                                    className={classes.issueCount}>{props.response && props.response.issueCount}</Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction="column"
                    spacing={1.5}>
                    <Divider orientation="horizontal" flexItem/>
                    <Button1 variant="contained" color="primary" fullWidth
                             onClick={() => history.push(Paths.newPayment)}>
                        New Payment
                    </Button1>
                    <Button2 variant="contained" fullWidth onClick={() => history.push(Paths.newIssue)}>
                        Raise an issue
                    </Button2>
                    <Divider orientation="horizontal" flexItem/>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1.5}>
                <Button3 variant="outlined" color="secondary" fullWidth onClick={() => history.push(Paths.chat)}>
                    Chat
                </Button3>
                <Button3 variant="outlined" color="secondary" fullWidth>
                    Help
                </Button3>
                <Button3 variant="outlined" color="secondary" fullWidth onClick={() => history.push(Paths.settings)}>
                    Settings
                </Button3>
                <Button1 color="primary" fullWidth onClick={logoutHandler}>
                    Logout
                </Button1>
            </Stack>
        </Stack>
    );

    return (
        <nav className={classes.drawer} >
            <Hidden mdUp implementation="css">
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
            <Hidden mdDown implementation="css">
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