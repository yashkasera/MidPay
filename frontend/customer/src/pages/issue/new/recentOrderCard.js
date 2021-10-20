/**
 * @author yashkasera
 * Created 16/10/21 at 4:48 AM
 */

import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    paymentCard: {
        width: '100%',
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
        height: '5%',
        minHeight: '5px',
    },
}));

const RecentOrderCard = (props) => {
    const {order} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paymentCard} elevation={5}>
            <Stack
                direction={'column'}
                justifyContent={'space-between'}>
                <div className={classes.cardHeader}>
                    <div
                        className={order.status === 'PAID' ? classes.statusPaid :
                            classes.statusCompleted}>
                        {order.status}</div>
                </div>
                <Stack
                    direction={'column'}
                    spacing={2}
                    marginTop={1}
                    marginBottom={1}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{padding: 2}}>
                    <Typography variant={'body1'} color={'primary'} textAlign={'start'}>
                        Order Id : {order.orderId}
                    </Typography>
                    <Typography variant={'h6'}>
                        Rs. {order.amount}
                    </Typography>
                    <Typography variant={'body1'} color={'textSecondary'}>
                        {order.description}
                    </Typography>
                    <Button
                        variant={"contained"}
                        color={'primary'}
                        fullWidth
                        onClick={() => {
                            props.setOrderId(order.orderId)
                            props.setValues({
                                ...props.values,
                                orderId: order.orderId,
                                sellerId: order.seller._id,
                                sellerName: `${order.seller.name} (@${order.seller.username})`,
                                createdAt: order.createdAt,
                            })
                        }}>
                        Choose
                    </Button>
                </Stack>
                <div className={classes.cardFooter}/>
            </Stack>
        </Paper>
    );
};

export default RecentOrderCard;