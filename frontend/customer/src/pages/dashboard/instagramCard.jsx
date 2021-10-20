import React from 'react'
import Rating from '@mui/material/Rating';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";
import {ChatBubbleOutlineRounded, EditRounded, Forward, MoreVertRounded} from "@mui/icons-material";
import theme from "../../theme";
import {styled} from "@mui/styles";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: theme.palette.tertiary.main
    },
});

export default function RatingCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ReviewItem = ({review}) => {
        return (
            <>
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
                        <StyledRating defaultValue={3} size='small' precision={1} readOnly/>
                    </Box>
                    <IconButton onClick={handleClick}>
                        <MoreVertRounded/>
                    </IconButton>
                </Stack>
            </>
        )
    }
    return (
        <>
            <Card sx={{height: '100%', p: 0}} elevation={5}>
                <Stack justifyContent={'space-between'} height={'100%'}>
                    <Stack>
                        <CardHeader title="Trending right now"/>
                        <div style={{overflow: 'scroll'}}>
                            <Stack spacing={3} sx={{px: 2}}>
                                {[1, 2, 3, 4, 5, 6, 7].map((issue) => (
                                    <ReviewItem key={issue}/>
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={5}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EditRounded fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Edit Review</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ChatBubbleOutlineRounded fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Chat with Seller</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}