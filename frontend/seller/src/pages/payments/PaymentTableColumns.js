/**
 * @author yashkasera
 * Created 11/10/21 at 10:36 PM
 */
import {Chip} from "@mui/material";
import {
    CheckCircleOutlined,
    DoneAll,
    ErrorOutlined,
    PendingActionsOutlined,
    PendingOutlined
} from "@mui/icons-material";
import React from "react";

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});

const Columns = [
    {
        field: 'orderId',
        headerName: 'Order Id',
    }, {
        field: 'updatedAt',
        headerName: 'Date',
        valueFormatter: ({value}) => new Date(value).toLocaleDateString()
    },
    {
        field: 'customer',
        headerName: 'Customer Name',
        description: 'Customer Name',
        valueFormatter: ({value}) => value.name,
        minWidth: 200,
    }, {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'status',
        headerName: 'Status',
        minWidth: 150,
        renderCell: ({value}) =>
            <Chip
                label={value === 'PAID' ? 'PENDING' : 'RECEIVED'}
                variant={'outlined'}
                color={
                    value === 'PAID' ? 'info' :
                        value === 'COMPLETED' ? 'success' :
                            'error'
                }
                icon={
                    value === 'COMPLETED' ? <CheckCircleOutlined/> :
                        value === 'PAID' ? <PendingActionsOutlined/> :
                            <ErrorOutlined/>
                }
            />
    },
    {
        field: 'amount',
        headerName: 'Amount',
        minWidth: 150,
        valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
    },
];

export default Columns