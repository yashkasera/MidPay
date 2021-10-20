import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import {Stack, Typography} from "@mui/material";

const ProgressBar = (props) => {
    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
            <Typography variant="subtitle2" color="textPrimary">{props.label}</Typography>
            <LinearProgress variant="determinate" value={props.value} sx={{width: '80%', borderRadius: 5}} color={'secondary'}/>
            <Typography variant="subtitle2" color="textPrimary">{props.number}</Typography>
        </Stack>
    )
}

export default ProgressBar