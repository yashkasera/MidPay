import React from 'react'
import {Box, Button, ButtonGroup, Card, CardHeader, Chip, Divider, IconButton, Stack, Typography} from "@mui/material";
import {BugReportRounded, DoneAllRounded, Forward} from "@mui/icons-material";
import Chart from 'react-apexcharts';

const OrderItem = ({order}) => {
    return (
        <Stack direction="row" alignItems="center" columnGap={2} justifyContent={'space-between'}>
            <Box sx={{minWidth: 200}}>
                <Typography variant="subtitle2" noWrap>
                    Yash Kasera
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                    Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet
                    Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet
                </Typography>
            </Box>
            <Box>
                <Typography variant="subtitle2" noWrap>
                    Rs. 12349.00
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                    {new Date().toLocaleDateString()}
                </Typography>
            </Box>
            {/*<CircularProgressWithLabel value={5} sx={{width: '100%'}}/>*/}
            <div>
                {/*<Chip label={'1 day left'} color={'error'}/>*/}
                <Chip label={'7 days left'} color={'primary'} variant={'outlined'}/>
            </div>
            <ButtonGroup>
                <IconButton>
                    <BugReportRounded color={'error'}/>
                </IconButton>
                <IconButton>
                    <DoneAllRounded color={'success'}/>
                </IconButton>
            </ButtonGroup>
        </Stack>
    )
}

export default function OrderCard(props) {
    return (
        <Card sx={{height: '100%', p: 0}} elevation={5}>
            <Stack justifyContent={'space-between'} height={'100%'}>
                <Stack>
                    <CardHeader title="My Orders"/>
                    <div style={{overflow: 'scroll'}}>
                        <Stack spacing={2} sx={{px: 2}}>
                            {[1, 2, 3, 4, 5, 6, 7].map((issue) => (
                                <OrderItem key={issue}/>
                            ))}
                        </Stack>
                    </div>
                </Stack>
                <Stack
                    spacing={2}
                    justifyContent={'space-evenly'}
                    alignItems={'flex-end'}
                    sx={{p: 2}}>
                    <Divider sx={{width: '100%'}}/>
                    <Button
                        to="#"
                        size="small"
                        variant={'contained'}
                        endIcon={<Forward/>}>
                        View all
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}