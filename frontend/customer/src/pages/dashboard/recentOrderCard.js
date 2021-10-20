/**
 * @author yashkasera
 * Created 16/10/21 at 2:29 PM
 */

import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    paymentCard: {
        width: '100%',
        height: '100%',
    },
    cardHeader: {
        backgroundImage: 'linear-gradient(135deg, #17EAD9, #6078ea)',
        borderRadius: '5px 5px 0 0',
        height: '50%',
        minHeight: '100px',
        width: '100%',
    },
    statusCompleted: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.textColorInverse,
        padding: '5px 10px 5px 10px',
        borderTopLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    statusPaid: {
        backgroundColor: theme.palette.tertiary.main,
        color: theme.palette.textColorInverse,
        padding: '5px 10px 5px 10px',
        borderTopLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    cardFooter: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '0 0 5px 5px',
        height: '10px',
    },
}));

const RecentOrderCard = (props) => {
    // const {order} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paymentCard} elevation={5}>
            <Stack
                direction={'column'}
                justifyContent={'space-between'}
                sx={{height: '100%'}}>
                <div className={classes.cardHeader}>
                    {/*<div*/}
                    {/*    className={order.status === 'PAID' ? classes.statusPaid :*/}
                    {/*        classes.statusCompleted}>*/}
                    {/*    {order.status}</div>*/}
                    <div
                        className={classes.statusCompleted}>
                        COMPLETED
                    </div>
                </div>
                <Stack
                    direction={'column'}
                    justifyContent={'space-around'}
                    spacing={0.5}
                    sx={{p: 2, height: 'inherit'}}>
                    <div>
                        <Typography variant={'h6'} color={'primary'} textAlign={'start'}>
                            {/*Order Id : {order.orderId}*/}
                            Order Id : uiy18379
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.disabled'}>
                            {/*Rs. {order.amount}*/}
                            {new Date().toLocaleString()}
                        </Typography>
                    </div>
                    <Typography variant={'h6'}>
                        {/*Rs. {order.amount}*/}
                        Rs. 13432
                    </Typography>
                    <Typography variant={'body1'} color={'textSecondary'}>
                        {/*{order.description}*/}
                        Lorem ipsum dolor sit amet
                        Lorem ipsum dolor sit amet
                    </Typography>
                    <div>
                        <Typography variant={'body1'} color={'text.primary'} textAlign={'start'}>
                            {/*Order Id : {order.orderId}*/}
                            Sold By :
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.secondary'}>
                            Yash Kasera
                        </Typography>
                        <Typography variant={'subtitle2'} color={'text.disabled'}>
                            @yash.kasera
                        </Typography>
                    </div>
                    <div style={{width: '100%'}}>
                        <Button
                            variant={"contained"}
                            color={'error'}
                            size={'small'}
                            sx={{width: 'calc(40% - 8px)', mr: '8px'}}
                            // onClick={() => {
                            //     props.setOrderId(order.orderId)
                            //     props.setValues({
                            //         ...props.values,
                            //         orderId: order.orderId,
                            //         sellerId: order.seller._id,
                            //         sellerName: `${order.seller.name} (@${order.seller.username})`,
                            //         createdAt: order.createdAt,
                            //     })
                            // }}
                        >
                            Raise an Issue
                        </Button>
                        <Button
                            variant={"contained"}
                            color={'success'}
                            sx={{width: '60%'}}
                            size={'small'}
                            // onClick={() => {
                            //     props.setOrderId(order.orderId)
                            //     props.setValues({
                            //         ...props.values,
                            //         orderId: order.orderId,
                            //         sellerId: order.seller._id,
                            //         sellerName: `${order.seller.name} (@${order.seller.username})`,
                            //         createdAt: order.createdAt,
                            //     })
                            // }}
                        >
                            Mark as complete
                        </Button>
                    </div>
                </Stack>
                <div className={classes.cardFooter}/>
            </Stack>
        </Paper>
    );
};

export default RecentOrderCard;