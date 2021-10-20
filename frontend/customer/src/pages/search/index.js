/**
 * @author yashkasera
 * Created 16/10/21 at 10:37 PM
 */

import React from 'react';
import Dialog from '@mui/material/Dialog';
import {
    Box,
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputAdornment,
    InputBase,
    Stack,
    Typography
} from "@mui/material";
import {MoreVertRounded, Search} from "@mui/icons-material";
import {styled} from "@mui/styles";
import theme from "../../theme";
import Rating from "@mui/material/Rating";
import API from '../../util/api'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: theme.palette.tertiary.main
    },
});

const SearchComponent = ({openSearch, setOpenSearch}) => {
    const handleClose = () => {
        setOpenSearch(false)
    }
    const [search, setSearch] = React.useState('');
    const [fetching, setFetching] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const fetchSellers = async () => {
        if (search.length > 0) {
            setFetching(true);
            const res = await API.get('search?s=' + search);
            setFetching(false);
            if (res.status === 200) {
                setRows(res.data);
            }
        }
    }

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(search)
            fetchSellers();
            // Send Axios request here
        }, 3000)
        return () => clearTimeout(delayDebounceFn)
    }, [search])

    const ReviewItem = ({store}) => {
        return (
            <>
                <Stack direction="row" alignItems="center" columnGap={2} justifyContent={'space-between'} sx={{px: 2}}>
                    <Box sx={{minWidth: 200}}>
                        <Typography variant="subtitle2" noWrap>
                            {store.storeName}
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
                            {store.storeDescription}
                        </Typography>
                    </Box>
                    <Box>
                        <StyledRating value={store.storeRating} size='small' precision={1} readOnly/>
                    </Box>
                    <IconButton onClick={handleClose}>
                        <MoreVertRounded/>
                    </IconButton>
                </Stack>
            </>
        );
    }
    return (
        <>
            <Dialog
                open={openSearch}
                onClose={handleClose}
                fullWidth
                scroll={'paper'}
                sx={{'& .MuiDialog-paper': {minHeight: '70%'}}}
                maxWidth={"sm"}>
                <DialogTitle sx={{p: 0}}>
                    <InputBase
                        autoFocus
                        placeholder="Search"
                        value={search}
                        sx={{padding: 2}}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.keyCode === 13)
                                fetchSellers()
                        }}
                        fullWidth
                        variant="standard"
                        startAdornment={
                            <InputAdornment sx={{mr: 1}}>
                                <Search/>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position={'end'}>
                                {fetching && <CircularProgress/>}
                            </InputAdornment>
                        }
                    />
                    <Divider/>
                </DialogTitle>
                <DialogContent sx={{px: 0}}>
                    <Stack
                        sx={{height: '100%'}}
                        direction={'column'}
                        spacing={1}
                        divider={<Divider/>}
                        justifyContent={'space-between'}>
                        {rows.map((store) => <ReviewItem store={store}/>)}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Dismiss</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SearchComponent;