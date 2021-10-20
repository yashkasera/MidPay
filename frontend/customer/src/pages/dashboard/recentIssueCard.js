/**
 * @author yashkasera
 * Created 15/10/21 at 07:25 PM
 */

import React from 'react'
import {Button, Chip, Divider, Paper, Stack, Typography} from "@mui/material";
import {OpenInNew, PendingActionsRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import errorImg from '../../assets/images/error_img.png';

const StyledButton = styled(Button)({
    color: theme.palette.primary,
    backgroundColor: theme.palette.secondary.main,
    padding: '8px',
    '&:hover': {
        backgroundColor: theme.palette.highlightColor,
        boxShadow: '0px 1px 1px rgba(255, 255, 255, 0.1)'
    }
});

const StyledImage = styled('img')({
    width: '100%',
    aspectRatio: 1,
    objectFit: 'cover',
})

const RecentIssueCard = ({issue}) => {
    // const [image, setImage] = React.useState(issue.image[0]);
    const [image, setImage] = React.useState(errorImg);
    return (
        <Paper elevation={5}>
            <Stack direction={'column'} spacing={0.5}>
                <StyledImage
                    src={image}
                    onError={() => setImage('https://firebasestorage.googleapis.com/v0/b/thrift-it-6292f.appspot.com/o/about%2FYash.jpeg?alt=media&token=51fd577a-e239-43d7-81dd-38709228ef5d')}
                    alt='Cannot load image'
                    loading='lazy'/>
                <Stack sx={{p: 2, height: '100%'}} spacing={0.5}>
                    <div>
                        <Stack direction={'row'} justifyContent={'space-between'} spacing={1} alignItems={'center'}>
                            <Typography variant='body1' noWrap>
                                Received Broken Pot Received Broken Pot
                            </Typography>
                            <Chip
                                label={'Pending'}
                                variant={'outlined'}
                                color={'error'}
                                icon={<PendingActionsRounded/>}/>
                        </Stack>
                        <Typography variant='body2' color={'text.secondary'}>
                            Lorem Ipsum dolor sit
                            Lorem Ipsum dolor sit
                            Lorem Ipsum dolor sit
                            Lorem Ipsum dolor sit
                            amet</Typography>
                    </div>
                    {/*<Typography variant='h6' noWrap>{issue.title}</Typography>*/}
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'baseline'}>
                        <Typography color={'warning.main'} size="small" variant={'body2'}>Issue
                            {/*#{issue.issueId}</Typography>*/}
                            #ytu3128</Typography>
                        <StyledButton size={'small'} startIcon={<OpenInNew/>}>View</StyledButton>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default RecentIssueCard;