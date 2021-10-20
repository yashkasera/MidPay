/**
 * @author yashkasera
 * Created 17/10/21 at 11:47 PM
 */
import React from 'react';
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import {Stack, Typography} from "@mui/material";

const ChatMessage = styled('div')({
    height: '100%',
    padding: '16px 8px 16px 8px',
    overflowY: 'scroll',
})

const CustomerMessage = styled(Typography)({
    // border: `1px solid ${theme.palette.secondary.main}`,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    padding: theme.spacing(1),
    maxWidth: '70%',
    width: 'fit-content',
    borderRadius: 5,
    textAlign: 'start',
    overflowX: 'wrap',
    overflowWrap: 'break-word',
})

const SellerMessage = styled(Typography)({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    maxWidth: '70%',
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
                sx={{width: '100%', textAlign: 'end'}}>
                {formatTime(new Date())}</Typography>
        </CustomerMessage>
    );
}

const ChatMessages = (props) => {
    const messageEndRef = React.createRef();
    const [messages, setMessages] = React.useState();

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    React.useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <ChatMessage>
            <Stack spacing={1}>
                {renderDateHeader()}
                {renderCustomerMessage(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc justo dolor,
                        luctus sit
                        amet semper sit amet, laoreet sed massa. Donec sit amet vestibulum orci, at
                        dictum  `)}
                {renderCustomerMessage(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc justo dolor,
                        luctus sit
                        amet semper sit amet, laoreet sed massa. Donec sit amet vestibulum orci, at
                      dictum`)}
                {renderSellerMessage(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc justo dolor,
                            luctus sit
                            amet semper sit amet, laoreet sed massa. Donec sit amet vestibulum orci, at
                            dictum
                            massa. Cras varius lacinia dolor ac euismod. Vestibulum tristique sapien
                            posuere
                            ex
                            tempus vulputate. Donec sollicitudin, libero eget vehicula egestas, est arcu
                            blandit
                            est, et efficitur ex velit sit amet neque. Maecenas vitae augue accumsan,
                            vestibulum`)}

                <div ref={messageEndRef}/>
            </Stack>
        </ChatMessage>
    );
}

export default ChatMessages;