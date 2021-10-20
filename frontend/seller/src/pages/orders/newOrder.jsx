import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {InputAdornment, Snackbar, TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {CopyAllRounded} from "@mui/icons-material";
import API from "../../util/api";

export default function NewOrder(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [values, setValues] = useState({
        amount: undefined,
        description: ""
    })
    const [url, setUrl] = useState(null)
    const valueChangeHandler = (props) => (event) => {
        setValues({
            ...values,
            [props]: event.target.value
        })
    }
    const handleClose = () => {
        setValues({amount: undefined, description: ''})
        setUrl(null);
        props.setOpen(false);
    };
    const handleCreateLink = async () => {
        console.log(API, API.defaults)
        const res = await API.post("seller/order", values)
        await setUrl(res.data.body["orderId"]);
        url && await handleCopyLink()
    }
    // const {response, loading, error} = useAxios({
    //     method: 'GET',
    //     url: '/seller/order',
    //     body: values,
    // });
    // console.log(loading)
    // console.log(response)
    // console.log(error)


    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(url.toString())
        setUrlCopied(true)
    }

    const [urlCopied, setUrlCopied] = useState(false);
    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="new-order-link">
            <DialogTitle id="create-order">{"New Payment Link"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    autoFocus
                    label="Amount"
                    inputMode="decimal"
                    type="number"
                    step="0.01"
                    value={values.amount}
                    margin="normal"
                    onChange={valueChangeHandler('amount')}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                Rs.
                            </InputAdornment>
                        ),
                    }}/>
                <TextField
                    variant="outlined"
                    autoFocus
                    label="Description"
                    margin="normal"
                    value={values.description}
                    onChange={valueChangeHandler('description')}
                    multiline
                    minRows={2}
                    fullWidth/>

                {url && <TextField
                    variant="outlined"
                    label="Link"
                    margin="normal"
                    value={"https://customer-mid-pay.firebaseapp.com/" + url}
                    contentEditable={false}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleCopyLink}>
                                    <CopyAllRounded/>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                />}

                <Typography
                    margin="normal"
                    variant="subtitle2"
                    align="end">
                    Valid for 48 hours
                </Typography>
                <Snackbar
                    open={urlCopied}
                    autoHideDuration={3000}
                    onClose={() => setUrlCopied(false)}
                    message="Link copied to Clipboard"
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Dismiss
                </Button>
                <Button onClick={handleCreateLink} autoFocus>
                    Create Link
                </Button>
            </DialogActions>
        </Dialog>
    );
}