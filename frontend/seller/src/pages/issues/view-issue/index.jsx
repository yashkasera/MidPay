/**
 * @author yashkasera
 * Created 17/10/21 at 8:40 PM
 */
import React from 'react';
import {useParams} from "react-router-dom";
import {Button, ButtonGroup, Grid, ImageList, Paper, Stack, TextField} from "@mui/material";

const ViewIssue = () => {
    const {id} = useParams()
    // const {response, error, loading} = useAxios({
    //     url: '/seller/issue/' + id,
    //     method: 'GET'
    // });
    // console.log(response);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} order={{xs: 1, md: 2}}>
                    <Paper sx={{p: 2}}>
                        <Stack direction='column' spacing={2}>
                            <Stack sx={{width: '100%'}} spacing={2} direction={{xs: 'column', md: 'row'}}>
                                <TextField
                                    disabled
                                    variant={'outlined'}
                                    label={'Issue Id'}
                                    InputProps={{
                                        shrink: true
                                    }}
                                    fullWidth
                                    value={id}/>
                                <TextField
                                    disabled
                                    variant={'outlined'}
                                    label={'Order Id'}
                                    fullWidth
                                    InputProps={{
                                        shrink: true
                                    }}
                                    value={id}/>
                            </Stack>
                            <TextField
                                disabled
                                variant={'outlined'}
                                label={'Issue'}
                                fullWidth
                                InputProps={{
                                    shrink: true
                                }}
                                value={id}/>
                            <TextField
                                disabled
                                variant={'outlined'}
                                rows={3}
                                multiline
                                label={'Description'}
                                fullWidth
                                InputProps={{
                                    shrink: true
                                }}
                                value={id}/>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'} spacing={2} sx={{mt: 2}}>
                            <Button
                                variant={'contained'}
                                color={'warning'}
                            >
                                Refund
                            </Button>
                            <ButtonGroup variant={'contained'}>
                                <Button>Request Return</Button>
                                <Button color={'success'}>Chat with Customer</Button>
                            </ButtonGroup>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} order={{xs: 1, md: 2}}>
                    <ImageList
                        variant="quilted"
                        cols={4}
                        rowHeight={128}>

                    </ImageList>
                </Grid>
            </Grid>
        </>
    );
}

export default ViewIssue;