import React, {useEffect} from 'react'
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import theme from "../../theme";
import API from '../../util/api'
import columns from './PaymentTableColumns'
import StyledDataGrid from "../../components/datagrid";

const StyledPaper = styled(Paper)({
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '100%'
});

export default function Payments(config) {
    const today = new Date();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);

    const [date, setDate] = React.useState({
        startDate: `${today.getFullYear()}-${month}-01`,
        endDate: `${today.getFullYear()}-${month}-${today.getDate()}`,
        maxDate: `${today.getFullYear()}-${month}-${today.getDate()}`
    })

    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = React.useState({
        rows: [],
        paidTotal: 0,
        completedTotal: 0,
        grandTotal: 0,
    })

    function calculateMaxDate(date) {
        date.setDate(date.getDate() + 30)
        if (date > new Date())
            date = new Date();
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getDate()}`
    }

    const fetchPayments = async () => {
        setLoading(true)
        try {
            const res = await API.request({
                url: '/seller/payments',
                method: 'GET',
                params: {
                    startDate: date.startDate,
                    endDate: date.endDate
                }
            });
            setLoading(false)
            setValues({
                ...values,
                rows: res.data.payments,
                paidTotal: res.data.paidTotal,
                completedTotal: res.data.completedTotal,
                grandTotal: res.data.paidTotal + res.data.completedTotal,
            })
            console.log(res)
        } catch (e) {

        }
    }
    useEffect(() => {
        fetchPayments()
    }, [])

    return (
        <>
            <Stack component={'form'} noValidate direction={{xs: 'column', sm: 'row'}} spacing={2}
                   sx={{marginBottom: 2}}>
                <TextField
                    variant={'outlined'}
                    label={'From'}
                    type={'date'}
                    value={date.startDate}
                    onChange={(event) => setDate({
                        ...date,
                        startDate: event.target.value,
                        endDate: calculateMaxDate(new Date(event.target.value)),
                        maxDate: calculateMaxDate(new Date(event.target.value)),
                    })}
                    InputProps={{
                        inputProps: {
                            max: `${today.getFullYear()}-${month}-${today.getDate()}`
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                <TextField
                    variant={'outlined'}
                    label={'To'}
                    type={'date'}
                    value={date.endDate}
                    onChange={(event) => setDate({
                        ...date,
                        endDate: event.target.value
                    })}
                    InputProps={{
                        inputProps: {
                            min: date.startDate,
                            max: date.maxDate
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                <Button onClick={fetchPayments} variant={'contained'}>
                    Get Payments
                </Button>
            </Stack>
            <Stack
                direction={{xs: 'column', sm: 'row'}}
                justifyContent={'space-between'}
                alignItems={'stretch'}
                sx={{marginBottom: 2}}
                spacing={2}>
                <StyledPaper elevation={3}>
                    <Typography variant={'h4'}>{currencyFormatter.format(values.paidTotal)}</Typography>
                    <Typography variant={'h6'} color='textSecondary'>Pending</Typography>
                </StyledPaper>
                <StyledPaper elevation={3}>
                    <Typography variant={'h4'}>{currencyFormatter.format(values.completedTotal)}</Typography>
                    <Typography variant={'h6'} color='textSecondary'>Received</Typography>
                </StyledPaper>
                <StyledPaper elevation={3}>
                    <Typography variant={'h4'}>{currencyFormatter.format(values.grandTotal)}</Typography>
                    <Typography variant={'h6'} color='textSecondary'>Total</Typography>


                </StyledPaper>
            </Stack>
            <StyledDataGrid
                columns={columns}
                loading={loading}
                rows={values.rows.map((order) => {
                    return {
                        ...order,
                        status: order.status,
                        id: order._id
                    }
                })}/>
        </>
    );
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
});

