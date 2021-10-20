import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import {Stack, Typography} from "@mui/material";

const ProgressBar = (props) => {
    return (
        <Stack direction={'row'} sx={{width: '100%'}} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="subtitle2" color="initial">{props.label}</Typography>
            <LinearProgress variant="determinate" value={props.value} sx={{width: '80%', borderRadius: 5}}/>
            <Typography variant="subtitle2" color="initial">{props.number}</Typography>
        </Stack>
    )
}

export default ProgressBar