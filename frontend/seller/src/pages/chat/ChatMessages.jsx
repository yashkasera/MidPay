/**
 * @author yashkasera
 * Created 17/10/21 at 11:47 PM
 */
import React from 'react';
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import {Stack, Typography} from "@mui/material";
import API from '../../util/api';

const ChatMessage = styled('div')({
    height: '100%',
    padding: '16px 8px 16px 8px',
    overflowY: 'scroll',
})

const CustomerMessage = styled(Typography)({
    // border: `1px solid ${theme.palette.secondary.main}`,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    maxWidth: '70%',
    minWidth:'20%',
    width: 'fit-content',
    borderRadius: 5,
    textAlign: 'start',
    overflowX: 'wrap',
    overflowWrap: 'break-word',
})

const SellerMessage = styled(Typography)({
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.25),
    paddingBottom: theme.spacing(0.25),
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    maxWidth: '70%',
    minWidth:'20%',
    width: 'fit-content',
    borderRadius: 5,
    overflowX: 'wrap',
    overflowWrap: 'break-word',
});

const DayHeader = styled(Typography)({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    width: 'fit-content',
    borderRadius: 5,
})

const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

const renderSellerMessage = (message) => {
    return (
        <SellerMessage alignSelf={'flex-end'}>
            {message}
            <Typography variant={'subtitle2'}
                        sx={{width: '100%', textAlign: 'end'}}
                        color={'text.secondary'}>{formatTime(new Date())}</Typography>
        </SellerMessage>
    );
}

const renderDateHeader = (date) => {
    return (
        <DayHeader alignSelf={'center'}>{new Date().toDateString()}</DayHeader>
    );
};


const renderCustomerMessage = (message) => {
    return (
        <CustomerMessage>{message}
            <Typography
                variant={'subtitle2'}
                color={'text.secondary'}
                sx={{width: '100%', textAlign: 'end', fontSize: '0.65rem'}}>
                {formatTime(new Date())}</Typography>
        </CustomerMessage>
    );
}

const ChatMessages = ({chatId}) => {
    const messageEndRef = React.createRef();
    const [messages, setMessages] = React.useState([]);

    const fetchMessages = async () => {
        console.log('fetching')
        const res = await API.get('seller/chats/' + chatId);
        if (res.status === 200) {
            setMessages(res.data);
        }
        console.log(res)
    }

    React.useEffect(() => {
        console.log(chatId, 'changed');
        fetchMessages()
    }, [chatId]);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    React.useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <ChatMessage>
            <Stack spacing={1}>
                {messages.map((message) =>
                    renderCustomerMessage(message.message)
                )}
                <div ref={messageEndRef}/>
            </Stack>
        </ChatMessage>
    );
}

export default ChatMessages;