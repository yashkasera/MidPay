import React from 'react'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import {makeStyles, useTheme} from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import MailIcon from '@material-ui/icons/Mail';
import {useLocation, useHistory} from 'react-router-dom';
import Paths from '../../util/paths'
import Typography from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {getAuth} from "firebase/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));
export default function NavigationDrawer(props) {
    const classes = useStyles();
    const {pathname} = useLocation();
    let history = useHistory();
    const routes1 = {
        Dashboard: Paths.dashboard,
        Payments: Paths.payments,
        Reviews: Paths.reviews,
        Issues: Paths.issues,
        Logs: Paths.logs,
    };
    const routes2 = {
        Profile: Paths.profile,
        Account: Paths.account,
        Settings: Paths.settings,
    };

    const handleLogout = () => {
        getAuth().signOut()
    }

    const drawer = (
        <>
            <Grid
                className={classes.header}
                container
                direction='column'
                justifyContent="center"
                alignItems="center">
                <Avatar className={classes.avatar} alt="yash"
                        src="https://firebasestorage.googleapis.com/v0/b/thrift-it-6292f.appspot.com/o/about%2FYash.jpeg?alt=media&token=51fd577a-e239-43d7-81dd-38709228ef5d"/>
                <Typography variant="h6">User Name</Typography>
            </Grid>
            <Divider/>
            <List>
                {/* {['Dashboard', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))} */}
                {Object.keys(routes1).map((routeName, index) => {
                    const route = routes1[routeName];
                    return (
                        <ListItem
                            selected={route === pathname}
                            button
                            key={route}
                            onClick={() => history.push(route)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={routeName}/>
                        </ListItem>
                    );
                })}
            </List>
            <Divider/>
            <List>
                {Object.keys(routes2).map((routeName, index) => {
                    const route = routes2[routeName];
                    return (
                        <ListItem
                            selected={route === pathname}
                            button
                            key={route}
                            onClick={() => history.push(route)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={routeName}/>
                        </ListItem>
                    );
                })}
            </List>
            <Divider/>
            <ListItem
                flex='end'
                button
                key={"logout"}
                onClick={() => handleLogout()}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={'Logout'}/>
            </ListItem>
        </>
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
            <Hidden xsDown implementation="css">
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
        </nav>)
}