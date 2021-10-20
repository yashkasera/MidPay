/**
 * @author yashkasera
 * Created 17/10/21 at 9:43 PM
 */
import React from 'react';
import ChatDrawer from "./ChatDrawer";
import {Avatar, Fab, IconButton, Paper, Stack, TextField} from "@mui/material";
import {styled} from "@mui/material/styles";
import {AttachFileRounded, SendRounded} from "@mui/icons-material";
import ChatMessages from "./ChatMessages";
import {useParams} from "react-router-dom";
import ChatHeader from "./ChatHeader";


const StyledAvatar = styled(Avatar)({
    backgroundColor: 'rgba(255,255,255,0.25)',
    border: '2px solid rgba(0,0,0,1)',
})

const Chat = () => {
    const [open, setOpen] = React.useState(false);
    const {id} = useParams();
    const [values, setValues] = React.useState({
        chatId: id,
        customerName: '',
        customerPhoneNumber: ''
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const sendMessageHandler = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <div id="drawer-container" style={{position: 'relative', height: '100%', display: 'flex'}}>
                <Paper sx={{width: '100%', height: '80vh'}}>
                    <Stack direction={'row'} justifyContent={'space-between'} height={'100%'}>
                        {<ChatDrawer
                            open={open}
                            setOpen={setOpen}
                            values={values}
                            setValues={setValues}
                            handleDrawerClose={handleDrawerClose}
                            handleDrawerOpen={handleDrawerOpen}/>}
                        <Stack
                            direction={'column'}
                            sx={{width: '100%'}}
                            justifyContent={'space-between'}>
                            <ChatHeader values={values}/>
                            <ChatMessages chatId={values.chatId}/>
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
        </>
    )
        ;
}

export default Chat;