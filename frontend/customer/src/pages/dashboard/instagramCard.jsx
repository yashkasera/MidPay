import React from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';

import Box from '@mui/material/Box';

export default function InstagramCard(props) {
    return (
        <Box width="100%" display="flex" p={1} alignItems="center" >
            <Box p={1} flexGrow={1}>
                <Typography variant="body2" color="initial">yash.kasera</Typography>
                <Typography variant="subtitle2" color="textSecondary">a1b2c3d4 a1b2c3d4 a1b2c3d4 a1b2c3d4 a1b2c3d4 a1b2c3d4 </Typography>
            </Box>
            <Box p={1}>
                <Rating name="size-small" defaultValue={2.3} precision={0.1} size="small" readOnly />
                <Typography variant="subtitle2" color="textSecondary">31/08/2021</Typography>
            </Box>
            <Box p={1}>
                <IconButton aria-label="options" onClick={() => console.log('clicked')} size="large">
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
}