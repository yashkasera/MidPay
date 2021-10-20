import React from 'react'
import {useHistory, useLocation} from 'react-router-dom';
import {Grid, Paper, Stack, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import theme from "../../theme";
import {AddBoxOutlined} from "@mui/icons-material";
import RatingCard from "../reviews/RatingCard";
import Button from "@mui/material/Button";
import MonthlySales from './monthlySales';
import Payments from "./payments";
import NewIssues from "./newIssues";
import Paths from '../../util/paths';
import useAxios from "../../hooks/useAxios";
import NewOrder from "../orders/newOrder";

const StyledPaper = styled(Paper)({
    padding: theme.spacing(2),
    elevation: 5,
    width: '100%',
});
const ClickablePaper = styled(Paper)({
    padding: theme.spacing(2),
    elevation: 5,
    cursor: 'pointer',
    width: '100%',
    '&:hover': {
        backgroundColor: theme.palette.highlightColor,
    }
});

export default function Dashboard() {
    const {pathname} = useLocation();
    const history = useHistory();
    const [issueCount, setIssueCount] = React.useState(0);
    const [orderCount, setOrderCount] = React.useState(0);
    const {response, error, loading} = useAxios({
        url: 'seller/dashboard',
        method: 'GET'
    })
    const [openNewOrderDialog, setOpenNewOrderDialog] = React.useState(false);
    return (
        <>
            <Grid container spacing={2} columns={{xs: 1, sm: 6, md: 12}}>
                <Grid item xs={1} sm={6} md={8}>
                    <Stack
                        direction={'column'}
                        spacing={2}
                        alignItems={'stretch'}>
                        <StyledPaper>
                            <Typography variant={'h4'}>Welcome
                                Back{response && response.name && `, ${response.name.split(" ")[0]}`}!</Typography>
                            <Typography variant={'subtitle1'} color={'textSecondary'}>It's good to see you
                                again.</Typography>
                        </StyledPaper>
                        <Stack spacing={2} direction={'row'} justifyContent={'space-between'}
                               sx={{height: '100%', width: '100%'}}>
                            <StyledPaper>
                                <Typography variant={'h4'}>{orderCount}</Typography>
                                <Typography variant={'h6'} color={'textSecondary'}>Orders</Typography>
                            </StyledPaper>
                            <StyledPaper>
                                <Typography variant={'h4'}>{issueCount}</Typography>
                                <Typography variant={'h6'} color={'textSecondary'}>Issues</Typography>
                            </StyledPaper>
                            <StyledPaper>
                                <Typography
                                    variant={'h4'}>
                                    {(response && response.views) ? response.views : 0}
                                </Typography>
                                <Typography variant={'h6'} color={'textSecondary'}>Acquisition</Typography>
                            </StyledPaper>
                        </Stack>
                        <StyledPaper>
                            <Stack justifyContent={'space-between'} direction={'row'}>
                                <Typography variant={'h6'} noWrap>Monthly Sales</Typography>
                                <Button
                                    variant={'outlined'}
                                    onClick={() => history.push(Paths.orders)}>
                                    View All
                                </Button>
                            </Stack>
                            <MonthlySales
                                setOrderCount={setOrderCount}
                                setIssueCount={setIssueCount}
                            />
                        </StyledPaper>
                    </Stack>
                </Grid>
                <Grid item xs={1} sm={6} md={4}>
                    <Stack direction={'column'} spacing={2}>
                        <ClickablePaper onClick={() => setOpenNewOrderDialog(true)}>
                            <Stack justifyContent={'space-between'} spacing={2} direction={'row'} alignItems={'center'}>
                                <Stack>
                                    <Typography variant={'h6'}>Create Order</Typography>
                                    <Typography variant={'body2'} color={'textSecondary'}>
                                        Create a new order
                                    </Typography>
                                </Stack>
                                <AddBoxOutlined fontSize={'large'}/>
                            </Stack>
                        </ClickablePaper>
                        <StyledPaper>
                            <Stack justifyContent={'space-between'} direction={'row'} alignItems={'flex-start'}>
                                <Stack direction={'column'}>
                                    <Typography variant={'h6'} noWrap>Payments</Typography>
                                    <Typography
                                        variant={'body2'}
                                        color={'textSecondary'}
                                        noWrap>
                                        This month's payments
                                    </Typography>
                                </Stack>
                                <Button
                                    variant={'outlined'}
                                    onClick={() => history.push(Paths.payments)}>
                                    View All
                                </Button>
                            </Stack>
                            <Payments/>
                        </StyledPaper>
                        <StyledPaper>
                            <Stack justifyContent={'space-between'} direction={'row'}>
                                <Typography variant={'h6'} noWrap>Store Ratings</Typography>
                                <Button
                                    variant={'outlined'}
                                    onClick={() => history.push(Paths.reviews)}>
                                    View All
                                </Button>
                            </Stack>
                            <RatingCard dashboard/>
                        </StyledPaper>
                        <StyledPaper>
                            <Stack justifyContent={'space-between'} direction={'row'}>
                                <Typography variant={'h6'} noWrap>New Issues</Typography>
                                <Button
                                    variant={'outlined'}
                                    onClick={() => history.push(Paths.issues)}>
                                    View All</Button>
                            </Stack>
                            <NewIssues/>
                        </StyledPaper>
                    </Stack>
                </Grid>
            </Grid>
            <NewOrder open={openNewOrderDialog} setOpen={setOpenNewOrderDialog}/>
        </>
    );
}