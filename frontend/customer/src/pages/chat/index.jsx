/**
 * @author yashkasera
 * Created 17/10/21 at 9:43 PM
 */
import React from 'react';
import ChatDrawer from "./ChatDrawer";
import {
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import {
    AccountBoxRounded,
    AssignmentRounded,
    AttachFileRounded,
    BugReportRounded,
    CallRounded,
    MoreVertRounded, ReviewsRounded,
    SendRounded, VerifiedRounded
} from "@mui/icons-material";
import ChatMessages from "./ChatMessages";
import {useParams} from "react-router-dom";

const ChatHeader = styled('div')({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    width: '100%',
    boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
})

const StyledAvatar = styled(Avatar)({
    backgroundColor: 'rgba(255,255,255,0.25)',
    border: '2px solid rgba(0,0,0,1)',
})

const Chat = () => {
    const {id} = useParams();
    const [chatId, setChatId] = React.useState(id);
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const sendMessageHandler = (event) => {
        event.preventDefault();
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userMenuOpen = Boolean(anchorEl);
    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <div id="drawer-container" style={{position: 'relative', height: '100%', display: 'flex'}}>
                <Paper sx={{width: '100%', height: '80vh'}}>
                    <Stack direction={'row'} justifyContent={'space-between'} height={'100%'}>
                        <ChatDrawer
                            open={open}
                            setOpen={setOpen}
                            chatId={chatId}
                            setChatId={setChatId}
                            handleDrawerClose={handleDrawerClose}
                            handleDrawerOpen={handleDrawerOpen}/>
                        <Stack
                            direction={'column'}
                            sx={{width: '100%'}}
                            justifyContent={'space-between'}>
                            <ChatHeader>
                                <Stack direction={'row'} alignItems={'center'} spacing={2}
                                       justifyContent={'space-between'}>
                                    <div>
                                        <Typography variant={'h6'} noWrap>
                                            Yash Kasera <VerifiedRounded fontSize={'small'} color={'primary'}/>
                                        </Typography>
                                        <Typography
                                            variant={'subtitle2'}
                                            color={'text.secondary'} noWrap>
                                            @yash.kasera
                                        </Typography>
                                    </div>

                                    <ButtonGroup sx={{display: {xs: 'none', md: 'block'}}}>
                                        <Button color={'inherit'} startIcon={<AssignmentRounded/>}>
                                            Orders
                                        </Button>
                                        <Button color={'inherit'} startIcon={<ReviewsRounded/>}>
                                            Review
                                        </Button>
                                        <Button color={'inherit'} startIcon={<AccountBoxRounded/>}>
                                            Profile
                                        </Button>
                                    </ButtonGroup>
                                    <IconButton
                                        id={'user-actions'}
                                        sx={{display: {xs: 'block', md: 'none'}}}
                                        aria-controls="user-menu"
                                        aria-haspopup="true"
                                        aria-expanded={userMenuOpen ? 'true' : undefined}
                                        onClick={handleUserMenuClick}>
                                        <MoreVertRounded/>
                                    </IconButton>
                                </Stack>
                            </ChatHeader>
                            <ChatMessages/>
                            {<Stack
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                spacing={{xs: 0.25, md: 0.5}}
                                sx={{p: 1}}
                                component={'form'}>
                                <TextField
                                    fullWidth
                                    placeholder={'Type a message'}
                                    multiline
                                    maxRows={4}
                                    size={'small'}
                                    // InputProps={{
                                    //     endAdornment: (
                                    //         <InputAdornment position={'end'}>
                                    //         </InputAdornment>
                                    //     )
                                    // }}
                                />
                                <IconButton>
                                    <AttachFileRounded/>
                                </IconButton>
                                <Fab
                                    color={'primary'}
                                    size={'small'}
                                    variant={'circular'}
                                    onCLick={sendMessageHandler}
                                    type={'submit'}>
                                    <SendRounded sx={{pl: 0.5}}/>
                                </Fab>
                            </Stack>}
                        </Stack>
                    </Stack>
                </Paper>
            </div>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'user-actions',
                }}
            >
                <MenuItem onClick={handleUserMenuClose}>
                    <AssignmentRounded/>&nbsp;Orders
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                    <BugReportRounded/>&nbsp;Issues
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                    <CallRounded/>&nbsp;Call
                </MenuItem>
            </Menu>
        </>
    )
        ;
}

export default Chat;