/**
 * @author yashkasera
 * Created 10/10/21 at 12:52 AM
 */
import React from 'react';
import {Chip, Container, Paper, Typography} from "@mui/material";
import useAxios from "../../hooks/useAxios";
import { GridActionsCellItem} from "@mui/x-data-grid";
import {
    BugReportRounded, CancelOutlined,
    CheckCircleOutlined,
    DeleteRounded,
    DeliveryDining,
    DoneAll,
    EditRounded, ErrorOutlined, MonetizationOnOutlined
} from "@mui/icons-material";
import StyledDataGrid from "../../components/datagrid";

const Order = () => {
    const {response, error, loading} = useAxios({
        url: '/customer/order',
        method: 'GET',
    });
    response && console.log(response);
    return (
        <>
            <Typography variant={'h5'} marginBottom={2} >My Orders</Typography>
            {response &&
            <StyledDataGrid
                columns={columns}
                loading={loading}
                rows={response.map((order) => {
                    return {
                        ...order,
                        status: order.status,
                        id: order._id
                    }
                })}
            />}
        </>
    );
}

const columns = [
    {
        field: 'orderId',
        headerName: 'Order Id',
    },
    {
        field: 'createdAt',
        headerName: 'Date',
        type: 'date',
        valueFormatter: ({value}) => (new Date(value)).toLocaleDateString(),
    },
    {
        field: 'seller',
        headerName: 'Store Name',
        valueFormatter: ({value}) => value.storeName
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        valueFormatter: ({value}) => currencyFormatter.format(Number(value)),
    },
    {
        field: 'status',
        headerName: 'Order Status',
        minWidth: 150,
        renderCell: (params) =>
            <Chip
                label={params.value}
                variant={'outlined'}
                color={
                    params.value === 'CREATED' ? 'primary' :
                        params.value === 'PAID' ? 'info' :
                            params.value === 'DELIVERED' ? 'warning' :
                                params.value === 'COMPLETED' ? 'success' :
                                    params.value === 'REFUNDED' ? 'default' :
                                        params.value === 'CANCELLED' ? 'error' :
                                            'error'
                }
                icon={
                    params.value === 'CREATED' ? <EditRounded/> :
                        params.value === 'PAID' ? <CheckCircleOutlined/> :
                            params.value === 'DELIVERED' ? <DeliveryDining/> :
                                params.value === 'COMPLETED' ? <DoneAll/> :
                                    params.value === 'REFUNDED' ? <MonetizationOnOutlined/> :
                                        params.value === 'CANCELED' ? <CancelOutlined/> :
                                            <ErrorOutlined/>
                }
            />
    },
    {
        field: 'actions',
        type: 'actions',
        getActions: (params) => [
            <GridActionsCellItem
                icon={<BugReportRounded/>}
                label="Issue"
                // onClick={deleteUser(params.id)}
            />,
        ],
    }
]

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});

export default Order