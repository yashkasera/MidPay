/**
 * @author yashkasera
 * Created 04/10/21 at 5:59 PM
 */
import React from 'react'
import Button from '@mui/material/Button'
import NewOrder from './newOrder';
import useAxios from "../../hooks/useAxios";
import {GridActionsCellItem} from "@mui/x-data-grid";
import {
    CancelOutlined,
    CheckCircleOutlined,
    DeleteRounded,
    DeliveryDining,
    DoneAll,
    EditRounded,
    ErrorOutlined,
    MonetizationOnOutlined
} from "@mui/icons-material";
import StyledDataGrid from "../../components/datagrid";
import {Chip} from "@mui/material";

export default function Orders() {
    const [open, setOpen] = React.useState(false);
    const handleNewOrder = () => {
        setOpen(true)
    }
    const {response, error, loading} = useAxios({
        url: 'seller/order',
        method: 'GET'
    });
    return (
        <>
            {/*<ButtonGroup variant="contained" color="primary" aria-label="">*/}
            <Button onClick={handleNewOrder} variant={'contained'} sx={{marginBottom: 2}}>New Order</Button>
            {/*<Button>*/}
            {/*</Button>*/}
            {/*</ButtonGroup>*/}
            <NewOrder open={open} setOpen={setOpen}/>
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
        valueGetter: (params) => (params.row.status === 'CREATED' && new Date(params.row.expiresAt) < new Date()) ? 'EXPIRED' : params.row.status,
        renderCell: (params) =>
            <Chip
                label={params.value}
                variant={'outlined'}
                color={
                    params.value === 'CREATED' ? 'primary' :
                        params.value === 'PAID' ? 'info' :
                            params.value === 'DELIVERED' ? 'secondary' :
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
        field: 'expiresAt',
        headerName: 'Expires At',
        type: 'date',
        valueFormatter: ({value}) => (new Date(value)).toLocaleDateString(),
    },
    {
        field: 'actions',
        type: 'actions',
        getActions: (params) => [
            <GridActionsCellItem
                icon={<EditRounded/>}
                label="Edit"
                onClick={() => console.log(params.id)}
            />,
            <GridActionsCellItem
                icon={<DeleteRounded/>}
                label="Delete"
                disabled={params.row.status !== 'CREATED'}
                onClick={() => console.log(params.id, params.row.status)}
            />
        ],
    }
]
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});
