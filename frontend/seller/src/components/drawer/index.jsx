import React from 'react'
import Drawer from '@mui/material/Drawer';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Hidden from '@mui/material/Hidden';
import {useHistory, useLocation} from 'react-router-dom';
import Paths from '../../util/paths'
import Typography from '@mui/material/Typography'
import {Stack} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {getAuth} from "firebase/auth";
import {
    AccountBoxRounded,
    AssignmentRounded,
    BugReportRounded,
    ChatBubbleRounded,
    DashboardRounded,
    DonutSmallRounded,
    LogoutRounded,
    PaymentsRounded,
    ReviewsRounded,
    SettingsRounded
} from "@mui/icons-material";

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
        // borderWidth: 0,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        borderWidth: 0,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
        borderWidth: '2px',
        borderColor: theme.palette.secondary.main,
        borderStyle: 'solid',
        color: 'floralwhite',
        fontSize: '2rem',
    },
    // listItem: {
    // [theme.breakpoints.up('sm')]: {
    //     "& .Mui-selected": {
    // backgroundColor: theme.palette.background.paper,
    // borderStyle: 'solid',
    // borderLeftWidth: '5px',
    // borderColor: theme.palette.secondary.main,
    // },
    // }
    // }
}));
export default function NavigationDrawer(props) {
    const classes = useStyles();
    const {pathname} = useLocation();
    let history = useHistory();
    const routes1 = {
        Dashboard: {
            route: Paths.dashboard,
            icon: <DashboardRounded/>
        },
        Orders: {
            route: Paths.orders,
            icon: <AssignmentRounded/>
        },
        Payments: {
            route: Paths.payments,
            icon: <PaymentsRounded/>
        },
        Chat: {
            route: Paths.chat,
            icon: <ChatBubbleRounded/>
        },
        Reviews: {
            route: Paths.reviews,
            icon: <ReviewsRounded/>
        },
        Issues: {
            route: Paths.issues,
            icon: <BugReportRounded/>
        },
        Logs: {
            route: Paths.logs,
            icon: <DonutSmallRounded/>
        },
    };
    const routes2 = {
        Profile: {
            route: Paths.profile,
            icon: <AccountBoxRounded/>
        },
        Settings: {
            route: Paths.settings,
            icon: <SettingsRounded/>
        },
    };

    const handleLogout = () => {
        getAuth().signOut()
        sessionStorage.clear()
    }

    const drawer = (
        <>
            <Stack
                className={classes.header}
                container
                direction='column'
                justifyContent="center"
                alignItems="center">
                <Avatar
                    className={classes.avatar}
                    src={props.image}
                >{props.name ? props.name.charAt(0).toUpperCase() : ''}</Avatar>
                <Typography variant="h6">{props.name ? props.name : ''}</Typography>
            </Stack>
            <Stack
                direction={'column'}
                justifyContent={'space-between'}
                spacing={2}
                sx={{height: '100%', marginBottom: 4}}>
                <List className={classes.listItem}>
                    {Object.keys(routes1).map((routeName, index) => {
                        const route = routes1[routeName].route;
                        return (
                            <ListItem
                                selected={pathname.indexOf(route) !== -1}
                                button
                                key={route}
                                onClick={() => history.push(route)}>
                                <ListItemIcon sx={{paddingLeft: 2, paddingRight: 2}}>
                                    {routes1[routeName].icon}
                                </ListItemIcon>
                                <ListItemText primary={routeName}/>
                            </ListItem>
                        );
                    })}
                </List>
                {/*<Divider/>*/}
                <List className={classes.listItem}>
                    {Object.keys(routes2).map((routeName, index) => {
                        const route = routes2[routeName].route;
                        return (
                            <ListItem
                                selected={pathname.indexOf(route) !== -1}
                                button
                                key={route}
                                onClick={() => history.push(route)}>
                                <ListItemIcon sx={{paddingLeft: 2, paddingRight: 2}}>
                                    {routes2[routeName].icon}
                                </ListItemIcon>
                                <ListItemText primary={routeName}/>
                            </ListItem>
                        );
                    })}
                    <ListItem className={classes.listItem}
                              flex='end'
                              button
                              key={"logout"}
                              onClick={handleLogout}>
                        <ListItemIcon sx={{paddingLeft: 2, paddingRight: 2}}>
                            <LogoutRounded/>
                        </ListItemIcon>
                        <ListItemText primary={'Logout'}/>
                    </ListItem>
                </List>
                {/*<Divider/>*/}
            </Stack>
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