import {Rating} from "@mui/material";
import { styled } from '@mui/material/styles';
import theme from "../../theme";
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: theme.palette.secondary.main,
    },
});
const Columns = [
    {
        field: 'id',
        headerName: 'ID',
        hide: true
    }, {
        field: 'updatedAt',
        headerName: 'Date',
        width: 200,
        valueFormatter: ({value}) => new Date(value).toLocaleDateString()
    },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 200,
        description: 'Customer Name'
    },
    {
        field: 'rating',
        headerName: 'Rating',
        width: 200,
        renderCell: (params) => (
            <StyledRating value={params.value} readOnly/>
        )
    },
    {
        field: 'review',
        headerName: 'Review',
        width: 400,
        description: 'Review'
    },
];

export default Columns