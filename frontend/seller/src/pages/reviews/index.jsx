import React from 'react'
import columns from './ReviewTableColumns'
import useAxios from "../../hooks/useAxios";
import {Divider, Paper, Stack, Typography} from "@mui/material";
import RatingCard from './RatingCard';
import StyledDataGrid from "../../components/datagrid";

const Reviews = () => {
    const {response, error, loading} = useAxios({
            url: 'seller/reviews',
            method: 'GET',
        }
    )

    return (
        <>
            {response && <>
                <Stack direction={{xs: 'column', sm: 'row'}} sx={{marginBottom: 2}} justifyContent={'space-between'}
                       spacing={2}>
                    <Paper sx={{padding: 2, width: '100%'}} elevation={5}>
                        <Stack
                            justifyContent={'space-evenly'}
                            alignItems={'center'}
                            spacing={2}
                            height={'100%'}
                            direction={'row'}
                            divider={<Divider orientation={'vertical'}/>}
                            textAlign={'center'}>
                            <Stack direction={'column'}>
                                <Typography variant={'h3'} color={'secondary'}>238</Typography>
                                <Typography variant={'h6'}>Reviews</Typography>
                            </Stack>
                            <Stack direction={'column'}>
                                <Typography variant={'h3'} color={'secondary'}>4.3</Typography>
                                <Typography variant={'h6'}>Rating</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                    <Paper sx={{padding: 2, width: '100%'}} elevation={5}>
                        <RatingCard/>
                    </Paper>

                </Stack>
                <StyledDataGrid
                    rows={response.map((review) => {
                        return {
                            ...review,
                            id: review._id,
                            customerName: review.customer.name,
                        }
                    })}
                    columns={columns}
                    loading={loading}
                />
            </>}
        </>
    )
}

export default Reviews