/**
 * @author yashkasera
 * Created 11/10/21 at 11:09 PM
 */

import React from 'react'
import {Button, Paper, Stack, Typography} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import {useHistory} from "react-router-dom";

const StyledButton = styled(Button)({
    color: theme.palette.text.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0px 1px 1px rgba(255, 255, 255, 0.1)'
    }
});

const useStyles = makeStyles((theme) => ({
    container: {
        borderRadius: '5px 5px 0 0',
        position: 'relative',
        aspectRatio: 1,
        backgroundColor: theme.palette.highlightColor,
    },
    image: {
        width: '100%',
        borderRadius: '5px 5px 0 0',
        aspectRatio: 1,
        objectFit: 'cover',
    },
    newIssue: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.textColorInverse,
        padding: '5px 10px 5px 10px',
        borderTopLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        float: 'left',
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: 50,
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    cardFooter: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0 0 5px 5px',
        height: '5%',
        minHeight: '10px',
    },
}));

const IssueCard = ({issue}) => {
    const classes = useStyles();
    const [image, setImage] = React.useState(issue.image[0]);
    const history = useHistory();
    return (
        <>
            <Paper elevation={3}>
                <div className={classes.container}>
                    {issue.status === 'RAISED' && <div className={classes.newIssue}>New</div>}
                    <img
                        src={image}
                        onError={() => setImage('https://firebasestorage.googleapis.com/v0/b/thrift-it-6292f.appspot.com/o/about%2FYash.jpeg?alt=media&token=51fd577a-e239-43d7-81dd-38709228ef5d')}
                        className={classes.image}
                        alt='Cannot load image'
                        loading='lazy'/>
                </div>
                <Stack direction={'column'} spacing={0.5} sx={{padding: 2}}>
                    <Typography variant='h6' noWrap>{issue.title}</Typography>
                    <Typography variant='body2' color='text.secondary' noWrap>{issue.customer.name}</Typography>
                    <Typography variant='body2' color='text.disabled' gutterBottom
                                noWrap>{new Date(issue.updatedAt).toDateString()}</Typography>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography color={'secondary'} size="small" variant={'body2'}>Issue
                            #{issue.issueId}</Typography>
                        <StyledButton
                            size={'small'}
                            onClick={() => history.push('/issues/' + issue.issueId)}
                            startIcon={<OpenInNew/>}>View</StyledButton>
                    </Stack>
                </Stack>

            </Paper>
        </>
    );
}

export default IssueCard;