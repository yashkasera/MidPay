/**
 * @author yashkasera
 * Created 15/10/21 at 07:25 PM
 */

import React from 'react'
import {Button, Paper, Stack, Typography} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";
import makeStyles from "@mui/styles/makeStyles";
import {styled} from "@mui/material/styles";
import theme from "../../theme";

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
        borderTopLeftRadius: '5px',
        float: 'left',
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: 50,
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    badgeResolved: {
        backgroundColor: theme.palette.primary.main,
        padding: '5px 10px 5px 10px',
        color: theme.palette.textColorInverse,
        borderBottomRightRadius: '5px',
    },
    badgeRefunded: {
        backgroundColor: theme.palette.tertiary.main,
        color: theme.palette.textColorInverse,
        padding: '5px 10px 5px 10px',
        borderBottomRightRadius: '5px',
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
    return (
        <>
            <Paper elevation={3}>
                <div className={classes.container}>
                    {(issue.status === 'RESOLVED' || issue.status === 'REFUNDED') &&
                    <div className={classes.newIssue}>
                        <div className={issue.status === 'RESOLVED' ? classes.badgeResolved : classes.badgeRefunded}>
                            {issue.status}
                        </div>
                    </div>}
                    <img
                        src={image}
                        onError={() => setImage('https://firebasestorage.googleapis.com/v0/b/thrift-it-6292f.appspot.com/o/about%2FYash.jpeg?alt=media&token=51fd577a-e239-43d7-81dd-38709228ef5d')}
                        className={classes.image}
                        alt='Cannot load image'
                        loading='lazy'/>
                </div>
                <Stack direction={'column'} spacing={0.5} sx={{padding: 2}}>
                    <Typography variant='h6' noWrap>{issue.title}</Typography>
                    <Typography variant='body2' color='textSecondary' noWrap>{issue.customer.name}</Typography>
                    <Typography variant='body2' color='textSecondary' gutterBottom
                                noWrap>{new Date(issue.updatedAt).toDateString()}</Typography>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography color={'warning.main'} size="small" variant={'body2'}>Issue
                            #{issue.issueId}</Typography>
                        <StyledButton size={'small'} startIcon={<OpenInNew/>}>View</StyledButton>
                    </Stack>
                </Stack>

            </Paper>
        </>
    );
}

export default IssueCard;