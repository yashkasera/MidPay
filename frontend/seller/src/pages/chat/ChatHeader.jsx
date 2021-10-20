/**
 * @author yashkasera
 * Created 18/10/21 at 1:49 PM
 */
import React from 'react';
import {Button, ButtonGroup, IconButton, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {AssignmentRounded, BugReportRounded, CallRounded, MoreVertRounded} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import theme from "../../theme";

const Root = styled('div')({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    width: '100%',
    color: 'floralwhite',
    boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
})

const ChatHeader = ({values}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userMenuOpen = Boolean(anchorEl);
    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCallUser = () => {

    }

    return (
        <Root>
            <Stack direction={'row'} alignItems={'center'} spacing={2}
                   justifyContent={'space-between'}>
                <Typography variant={'h6'} noWrap>{values.customerName}</Typography>
                <ButtonGroup sx={{display: {xs: 'none', md: 'block'}}}>////
                    <Button color={'inherit'} startIcon={<AssignmentRounded/>}>
                        Orders
                    </Button>
                    <Button color={'inherit'} startIcon={<BugReportRounded/>}>
                        Issues
                    </Button>
                    <Button color={'inherit'} startIcon={<CallRounded/>}>
                        Call
                    </Button>
                </ButtonGroup>
                <IconButton
                    id={'user-actions'}
                    sx={{display: {xs: 'block', md: 'none'}}}
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen ? 'true' : undefined}
                    onClick={handleUserMenuClick}>
                    <MoreVertRounded/>
                </IconButton>
            </Stack>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'user-actions',
                }}
            >
                <MenuItem onClick={handleUserMenuClose}>
                    <AssignmentRounded/>&nbsp;Orders
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                    <BugReportRounded/>&nbsp;Issues
                </MenuItem>
                <MenuItem onClick={handleCallUser}>
                    <CallRounded/>&nbsp;Call
                </MenuItem>
            </Menu>
        </Root>
    )
}

export default ChatHeader;