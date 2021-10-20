import React from 'react'
import {
    Box,
    Button, ButtonGroup,
    Card,
    CardHeader,
    Chip,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack
} from "@mui/material";
import img from '../../assets/images/error_img.png'
import Typography from "@mui/material/Typography";
import {
    BugReportRounded,
    ChatBubbleOutlineRounded,
    DoneAllRounded,
    ErrorOutlined,
    Forward,
    MoreVertRounded,
    OpenInNewRounded
} from "@mui/icons-material";

const Issue = () => {
    return {
        title: 'Yash Kasera',
        description: 'Lorem Ipsum dolor Sit Amet',
        image: img,
        postedAt: new Date().toDateString()
    };
}


export default function IssueCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function IssueItem({issue}) {
        return (
            <>
                <Stack direction="row" alignItems="center" justifyContent={'space-between'} spacing={2} width={'100%'}>
                    <Box
                        component="img"
                        alt={'title'}
                        src={img}
                        sx={{width: 48, height: 48, borderRadius: 1.5}}
                    />
                    <Box sx={{minWidth: 240,width:'100%'}}>
                        <Typography variant="subtitle2" noWrap>
                            Yash Kasera
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                            Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet
                        </Typography>
                    </Box>
                    <Box>
                        <Chip
                            label={'Pending'}
                            variant={'outlined'}
                            color={'error'
                                // params.value === 'CREATED' ? 'primary' :
                                //     params.value === 'PAID' ? 'info' :
                                //         params.value === 'DELIVERED' ? 'secondary' :
                                //             params.value === 'COMPLETED' ? 'success' :
                                //                 params.value === 'REFUNDED' ? 'default' :
                                //                     params.value === 'CANCELLED' ? 'error' :
                                //                         'error'
                            }
                            icon={
                                // params.value === 'CREATED' ? <EditRounded/> :
                                //     params.value === 'PAID' ? <CheckCircleOutlined/> :
                                //         params.value === 'DELIVERED' ? <DeliveryDining/> :
                                //             params.value === 'COMPLETED' ? <DoneAll/> :
                                //                 params.value === 'REFUNDED' ? <MonetizationOnOutlined/> :
                                //                     params.value === 'CANCELED' ? <CancelOutlined/> :
                                <ErrorOutlined/>
                            }
                        />
                    </Box>
                    <ButtonGroup variant={'contained'}>
                        <IconButton>
                            <OpenInNewRounded color={'warning'}/>
                        </IconButton>
                        <IconButton>
                            <ChatBubbleOutlineRounded color={'info'}/>
                        </IconButton>
                        <IconButton>
                            <DoneAllRounded color={'success'}/>
                        </IconButton>
                    </ButtonGroup>
                </Stack>
            </>
        );
    }
    return (
        <>
            <Card sx={{height: '100%', p: 0}} elevation={5}>
                <Stack justifyContent={'space-between'} height={'100%'}>
                    <Stack>
                        <CardHeader title="Issues Raised"/>
                        <div style={{overflow: 'scroll'}}>
                            <Stack spacing={2} sx={{px: 2}}>
                                {[1, 2, 3, 4].map((issue) => (
                                    <IssueItem key={issue}/>
                                ))}
                            </Stack>
                        </div>
                    </Stack>
                    <Stack
                        spacing={2}
                        justifyContent={'space-evenly'}
                        alignItems={'flex-end'}
                        sx={{p: 2}}>
                        <Divider sx={{width: '100%'}}/>
                        <Button
                            to="#"
                            size="small"
                            variant={'contained'}
                            endIcon={<Forward/>}>
                            View all
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </>
    );
}