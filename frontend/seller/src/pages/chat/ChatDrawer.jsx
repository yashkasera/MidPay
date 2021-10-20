/**
 * @author yashkasera
 * Created 17/10/21 at 9:52 PM
 */
import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import {Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {ChevronLeftRounded, ChevronRightRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import useAxios from "../../hooks/useAxios";

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
    width: `calc(${theme.spacing(9)} + 1px)`,
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
const StyledAvatar = styled(Avatar)({
    width: '32px',
    height: '32px',
    backgroundColor: theme.palette.primary.main,
    border: '2px solid rgba(255, 255, 255, 0.5)',
    color: "#191919",
    fontSize: '14px',
});


const ChatDrawer = (props) => {
    const {response, error, loading} = useAxios({
        'url': 'seller/chats',
        method: 'GET'
    })
    const chatItem = (chat, {values, setValues}) => {
        return (
            <ListItem
                button
                key={chat._id}
                selected={chat._id === values.chatId}
                onClick={() => setValues({
                    chatId: chat._id,
                    customerName: chat.customer.name,
                    customerPhoneNumber: chat.customer.phoneNumber
                })}>
                <ListItemAvatar>
                    <StyledAvatar>
                        Y
                    </StyledAvatar>
                </ListItemAvatar>
                <ListItemText primary={chat.customer.name}/>
            </ListItem>
        );
    };
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
                    {response && response.map((chat) => (
                        chatItem(chat, props)
                    ))}
                </List>
            </Drawer>
        </>
    );
}

export default ChatDrawer;