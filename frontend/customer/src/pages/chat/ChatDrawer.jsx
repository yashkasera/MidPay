/**
 * @author yashkasera
 * Created 17/10/21 at 9:52 PM
 */
import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import {Divider, IconButton, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {ChevronLeftRounded, ChevronRightRounded, InboxRounded, MailRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import theme from "../../theme";

const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const ChatDrawer = (props) => {
    return (
        <>
            <Drawer
                variant="permanent"
                open={props.open}
                PaperProps={{
                    style: {
                        position: 'absolute',
                        height: '80vh',
                        borderRadius: '5px 0 0 5px',
                        borderWidth: 0,
                        boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
                    },
                    // elevation: 5
                }}
                ModalProps={{
                    container: document.getElementById('drawer-container'),
                    style: {position: 'absolute'}
                }}>
                <DrawerHeader>
                    {props.open && <IconButton onClick={props.handleDrawerClose}>
                        <ChevronLeftRounded/>
                    </IconButton>}
                    {!props.open && <IconButton onClick={props.handleDrawerOpen}>
                        <ChevronRightRounded/>
                    </IconButton>}
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Inbox', 'Starred', 'Send email', 'Inbox', 'Starred', 'Send email', 'Drafts', 'Send email', 'Drafts', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={index} onClick={() => props.setChatId(index)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxRounded/> : <MailRounded/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxRounded/> : <MailRounded/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default ChatDrawer;