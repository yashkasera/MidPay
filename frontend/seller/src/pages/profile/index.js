/**
 * @author yashkasera
 * Created 14/10/21 at 9:53 PM
 */
import React, {useEffect} from 'react';
import makeStyles from "@mui/styles/makeStyles";
import {Avatar, Button, Grid, Paper, Stack, TextField, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import theme from "../../theme";
import {Verified} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import RatingCard from "../reviews/RatingCard";
import API from '../../util/api'

const StyledPaper = styled(Paper)({
    padding: theme.spacing(2),
    elevation: 5,
    width: '100%',
    // backgroundColor: '#eee',
});

const useStyles = makeStyles((theme) => ({
    banner: {
        width: '100%',
        height: '360px',
        backgroundPosition: '0 50%',
        borderRadius: '5px 5px 0 0',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '200px',
        },
    },
    avatar: {
        width: '72px',
        height: '72px',
        color: '#eee',
        backgroundColor: 'rgba(255,255,255,0.25)',
        borderColor: 'rgba(255,255,255,0.60)',
        borderWidth: '2px',
        borderStyle: 'solid',
        fontSize: '1.75rem',
    },
}))


const Profile = () => {
    const classes = useStyles()
    const [values, setValues] = React.useState({
        name: '',
        storeName: '',
        storeDescription: '',
        instagramUsername: '',
        views: 0,
        createdAt: '',
        amount: 0.0,
        description: '',
        reviewCount: 0,
        image: null,
    });
    const fetchProfile = async () => {
        try {
            const res = await API.get('seller/profile')
            setValues({...res.data});
        } catch (e) {

        }
    }
    useEffect(() => {
        fetchProfile();
    }, [])
    return (
        <Grid container spacing={2} columns={{xs: 1, sm: 6, md: 14}}>
            <Grid item xs={1} sm={6} md={8}>
                <StyledPaper>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant={'h6'}>My Profile</Typography>
                        <TextField
                            label={'Name'}
                            fullWidth
                            value={values.name}/>
                        <TextField
                            label={'Instagram Username'}
                            fullWidth
                            value={values.instagramUsername}/>
                        <TextField
                            label={'Store Name'}
                            fullWidth
                            value={values.storeName}/>

                        <TextField
                            label={'Store Description'}
                            fullWidth
                            multiline
                            rows={3}
                            value={values.storeDescription}/>
                        <div style={{width: '100%'}}>
                            <Button variant={'outlined'} style={{width: 'calc(40% - 8px)',marginRight:'8px'}}>Cancel</Button>
                            <Button variant={'contained'} style={{width:'60%'}}>Save</Button>
                        </div>
                    </Stack>
                </StyledPaper>
            </Grid>
            <Grid item xs={1} sm={6} md={6}>
                <StyledPaper>
                    <Stack direction={'column'}>
                        <Stack direction={'row'} spacing={2} marginTop={1} marginBottom={1} alignItems={'center'}>
                            <Avatar
                                src={values.image}
                                className={classes.avatar}>
                                {/*// sx={{
                                //     bgcolor: "rgba(255,255,255,0.25)",
                                //     width: 72,
                                //     height: 72,
                                // }}>*/}
                                {values.storeName ? values.storeName.charAt(0).toUpperCase() : ''}</Avatar>
                            <Stack direction={'column'}>
                                <Typography variant={"h4"} letterSpacing={2}>
                                    {values.storeName}&nbsp;
                                    <Verified color={'primary'}/>
                                </Typography>
                                <Typography
                                    variant={"subtitle1"}
                                    color='textSecondary'>
                                    @{values.instagramUsername}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Typography
                            variant={"body1"}
                            color={'textSecondary'}
                            sx={{marginTop: 1, marginBottom: 1}}>
                            {values.storeDescription} </Typography>
                        <Divider flexItem sx={{marginTop: 1, marginBottom: 1}}/>
                        <RatingCard profile/>
                        <Divider flexItem sx={{marginTop: 1, marginBottom: 1}}/>
                        <Stack direction={'row'} spacing={2} sx={{marginTop: 1, marginBottom: 1}}>
                            <Typography>Views :</Typography>
                            <Typography color={'primary'}>{values.views}</Typography>
                        </Stack>
                        <Stack direction={'row'} spacing={2} sx={{marginTop: 1, marginBottom: 1}}>
                            <Typography>Member Since :</Typography>
                            <Typography color={'primary'}>{new Date(values.createdAt).toLocaleDateString()}</Typography>
                        </Stack>
                        <Typography variant={'body1'} color={'primary'} textAlign={'end'}
                                    sx={{width: '100%', cursor: 'pointer'}}>
                            Read Reviews...
                        </Typography>
                    </Stack>
                </StyledPaper>
            </Grid>
        </Grid>
    )
        ;
}

export default Profile;