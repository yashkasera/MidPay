/**
 * @author yashkasera
 * Created 08/10/21 at 8:47 PM
 */
import React from 'react';
import {
    Avatar,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Rating,
    Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {CopyAllRounded, Verified} from "@mui/icons-material";
import API from '../../../util/api';
import Divider from "@mui/material/Divider";
import {deepOrange} from "@mui/material/colors";
import ProgressBar from "../../../components/progress-bar";
import {useHistory, useParams} from "react-router-dom";
import {getAuth} from "firebase/auth";
import Paths from '../../../util/paths';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%',
    },
    paymentCard: {
        width: '100%',
    },
    cardHeader: {
        backgroundImage: 'linear-gradient(135deg, #17EAD9, #6078ea)',
        borderRadius: '5px 5px 0 0',
        height: '50%',
        minHeight: '100px',
        width: '100%',
        textAlign: 'center',
    },
    cardFooter: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0 0 5px 5px',
        height: '5%',
        minHeight: '10px',
    },
}));

const NewIssue = () => {
    const classes = useStyles();
    const [orderId, setOrderId] = React.useState("");
    const [fetching, setFetching] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState(null);
    const history = useHistory();
    const handleCopyLink = async () => {
        await navigator.clipboard.readText().then(text =>
            setOrderId(text)
        )
    }
    const {id} = useParams()
    React.useEffect(() => {
        if (id) {
            console.log(id)
            setOrderId(id.toString())
            fetchDetails()
        }
    }, [id])
    const handleOrderIdChange = (event) => {
        setOrderId(event.target.value)
    }
    const [values, setValues] = React.useState({
        storeName: null,
        storeDescription: '',
        storeRating: 0,
        username: '',
        r5: 0,
        r4: 0,
        r3: 0,
        r2: 0,
        r1: 0,
        views: 0,
        createdAt: '',
        amount: 0.0,
        description: '',
        reviewCount: 0,
        image: null,
        orderId: null,
        razorpay_order_id: null,
    });

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const displayRazorpay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            setSnackbarMessage("Cannot connect to the internet!")
        }

        const options = {
            key: "rzp_test_Q829V4AkB1LaT1",
            amount: values.amount * 100,
            currency: "INR",
            name: "MidPay - Modern Solution to Fair Trade",
            description: "Test Transaction",
            order_id: values.razorpay_order_id,
            handler: async function (response) {
                const data = {
                    order_creation_id: values.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };
                const result = await API.post("/payment/" + orderId, data);
                if (result.status === 201) {
                    setSnackbarMessage("Payment Successful. Redirecting you to main screen...")
                    setTimeout(function () {
                        history.push(Paths.dashboard)
                    }, 5000)
                }
            },
            prefill: {
                name: getAuth().currentUser.displayName,
                email: getAuth().currentUser.email,
                contact: getAuth().currentUser.phoneNumber,
            },
            theme: {
                color: "#0084FF",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    const fetchDetails = async () => {
        console.log('fetching')
        setFetching(true)
        try {
            console.log(orderId)
            const res = await API.get('/payment/try/' + orderId);
            const order = res.data
            const review = await API.get('/seller/' + order.seller._id + '/reviews');
            setValues({
                ...values,
                orderId: order.orderId,
                amount: order.amount,
                description: order.description,
                razorpay_order_id: order.razorpay_order_id,
                image: order.seller.image,
                storeName: order.seller.storeName,
                username: order.seller.instagramUsername?order.seller.instagramUsername:order.seller.username,
                views: order.seller.views,
                storeDescription: order.seller.storeDescription,
                createdAt: new Date(order.seller.createdAt).toLocaleDateString(),
                r1: review.data.store_ratings.r1,
                r2: review.data.store_ratings.r2,
                r3: review.data.store_ratings.r3,
                r4: review.data.store_ratings.r4,
                r5: review.data.store_ratings.r5,
                reviewCount: review.data.reviewCount,
                storeRating: review.data.overall_rating,
            })
        } catch (e) {
            if(e.response)
                setSnackbarMessage(e.response.data.message)
            else
                setSnackbarMessage(e.message)
        } finally {
            setFetching(false)
        }
    }
    const renderStat = (title, value, number) => {
        return (
            <ProgressBar value={value} label={title} number={number}/>
        );
    }
    return (
        <Container>
            <Typography variant={'h5'} marginBottom={2}>New Payment</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                autoFocus
                value={orderId}
                onChange={handleOrderIdChange}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Typography
                                variant={"primary"}>
                                Order Id :
                            </Typography>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant={'contained'}
                                sx={{padding: '0.5rem 1.5rem'}}
                                onClick={fetchDetails}
                                disabled={(orderId.length !== 10) || fetching}>
                                Proceed
                            </Button>
                        </InputAdornment>
                    )
                }}
            />
            {values.storeName && <Stack
                direction={{xs: 'column', md: 'row'}}
                style={{width: '100%', marginTop: '1rem'}}
                spacing={{xs: 2, md: 2}}
                justifyContent="space-evenly"
                alignItems="stretch">
                <Paper className={classes.paper} elevation={5}>
                    <Stack direction={'row'} spacing={2} marginTop={1} marginBottom={1} alignItems={'center'}>
                        <Avatar sx={{
                            bgcolor: deepOrange[500],
                            width: 72,
                            height: 72
                        }}>{values.image ? values.image : values.storeName.charAt(0).toUpperCase()}</Avatar>
                        <Stack direction={'column'}>
                            <Typography variant={"h4"} letterSpacing={2}>
                                {values.storeName}&nbsp;<Verified color={'primary'}/>
                            </Typography>
                            <Typography
                                variant={"subtitle1"}
                                color='textSecondary'>
                                @{values.username}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Typography
                        variant={"body1"}
                        color={'textSecondary'}
                        sx={{marginTop: 1, marginBottom: 1}}>
                        {values.storeDescription} </Typography>
                    <Divider flexItem sx={{marginTop: 1, marginBottom: 1}}/>
                    <Stack direction={'row'} spacing={2} sx={{marginTop: 1, marginBottom: 1}}>
                        <Typography>Store Rating :</Typography>
                        <Rating readOnly value={values.storeRating} precision={0.1}/>
                    </Stack>
                    <Stack direction={'column'} spacing={1}>
                        {renderStat('5 Star', (values.r5 / values.reviewCount) * 100, values.r5)}
                        {renderStat('4 Star', (values.r4 / values.reviewCount) * 100, values.r4)}
                        {renderStat('3 Star', (values.r3 / values.reviewCount) * 100, values.r3)}
                        {renderStat('2 Star', (values.r2 / values.reviewCount) * 100, values.r2)}
                        {renderStat('1 Star', (values.r1 / values.reviewCount) * 100, values.r1)}
                    </Stack>
                    <Divider flexItem sx={{marginTop: 1, marginBottom: 1}}/>
                    <Stack direction={'row'} spacing={2} sx={{marginTop: 1, marginBottom: 1}}>
                        <Typography>Views :</Typography>
                        <Typography color={'primary'}>{values.views}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} sx={{marginTop: 1, marginBottom: 1}}>
                        <Typography>Member Since :</Typography>
                        <Typography color={'primary'}>{values.createdAt}</Typography>
                    </Stack>
                    <Typography variant={'body1'} color={'primary'} textAlign={'end'}
                                sx={{width: '100%', cursor: 'pointer'}}>
                        Read Reviews...
                    </Typography>
                </Paper>
                <Paper className={classes.paymentCard} elevation={5}>
                    <Stack
                        direction={'column'}
                        sx={{height: '100%'}}
                        justifyContent={'space-between'}>
                        <div className={classes.cardHeader}/>
                        <Stack
                            direction={'column'}
                            spacing={2}
                            marginTop={1}
                            marginBottom={1}
                            alignItems={'center'}
                            justifyContent={'center'}
                            sx={{padding: 2}}>
                            <Typography variant={'h6'} color={'primary'} textAlign={'start'}>
                                Order Id : {orderId}
                            </Typography>
                            <Typography variant={'h3'}>
                                Rs. {values.amount}
                            </Typography>
                            <Typography variant={'body1'} color={'textSecondary'}>
                                {values.description}
                            </Typography>

                            <Stack direction={'row'} spacing={2} sx={{width: '100%'}}>
                                <Button variant={'outlined'} color={'error'} fullWidth>
                                    Cancel Order
                                </Button>
                                <Button variant={"contained"} color={'primary'} fullWidth
                                        onClick={displayRazorpay}>
                                    Pay Now
                                </Button>
                            </Stack>
                        </Stack>
                        <div className={classes.cardFooter}/>
                    </Stack>
                </Paper>
            </Stack>}
            <Snackbar
                open={snackbarMessage != null}
                onClose={() => setSnackbarMessage(null)}
                message={snackbarMessage}
                autoHideDuration={5000}/>
        </Container>
    )
}

export default NewIssue