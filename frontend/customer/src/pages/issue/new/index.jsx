/**
 * @author yashkasera
 * Created 08/10/21 at 8:47 PM
 */
import React from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    ImageList,
    ImageListItem,
    InputAdornment,
    LinearProgress,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useHistory} from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import {DropzoneDialog} from "material-ui-dropzone";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import API from '../../../util/api'
import Paths from '../../../util/paths'
import RecentOrderCard from './recentOrderCard';

const NewIssue = () => {
    const storage = getStorage();

    const [orderId, setOrderId] = React.useState('')
    const [fetching, setFetching] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState(null);
    const [imageDialog, showImageDialog] = React.useState(false)
    const history = useHistory();
    const handleOrderIdChange = (event) => {
        setOrderId(event.target.value)
    }
    const [values, setValues] = React.useState({
        orderId: '',
        sellerId: null,
        sellerName: null,
        title: '',
        description: '',
        image: [],
        createdAt: ''
    })
    const [uploadTask, setUploadTask] = React.useState(false)
    const [progressValues, setProgressValues] = React.useState({
        totalFiles: 0,
        currentFile: 0,
        progress: 0
    })
    const handleFileSave = (files) => {
        showImageDialog(false)
        setProgressValues({
            ...progressValues,
            totalFiles: files.length
        })
        setUploadTask(true)
        values.image.length = 0
        files.forEach((file, index) => {
            setProgressValues({
                ...progressValues,
                currentFile: (index + 1)
            })
            const storageRef = ref(storage, `/${values.orderId}/${index}.png`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgressValues({
                        ...progressValues,
                        progress
                    })
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    setSnackbarMessage("Unable to upload image!" + error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        values.image.push(downloadURL);
                        if (index === files.length - 1) {
                            setUploadTask(false);
                        }
                    });
                })
        })
    }

    const {response, loading, error} = useAxios('/customer/issue/recentOrders')

    const createIssueHandler = async () => {
        if (values.title.length === 0)
            setSnackbarMessage('Short Description Cannot be empty!')
        else if (values.description.length < 50)
            setSnackbarMessage('Long Description should be at least 50 characters')
        else if (values.image.length === 0)
            setSnackbarMessage('Please add atleast 1 image')
        else {
            try {
                const res = await API.post('/customer/issue', {
                    order: values.orderId,
                    seller: values.sellerId,
                    title: values.title,
                    description: values.description,
                    image: values.image,
                })
                setSnackbarMessage('Issue Raised Successfully. Redirecting you to dashboard...')
                setTimeout(() => {
                    history.push(Paths.dashboard)
                }, 5000)
            } catch (e) {
                setSnackbarMessage(e.response.data.message)
            }
        }
    }

    const fetchOrder = async () => {
        setFetching(true)
        try {
            const res = await API.get('/customer/issue/try/' + orderId)
            const order = res.data;
            setValues({
                ...values,
                orderId: order.orderId,
                sellerId: order.seller._id,
                sellerName: `${order.seller.storeName} (@${order.seller.username})`,
                createdAt: order.createdAt,
            })
        } catch (e) {
            setSnackbarMessage(e.response.data.message)
        } finally {
            setFetching(false)
        }
    }

    return (
        <Container>
            <Typography variant={'h5'} marginBottom={2}>New Issue</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                autoFocus
                value={orderId}
                onChange={handleOrderIdChange}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Typography
                                variant={"primary"}>
                                Order Id :
                            </Typography>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {/*<IconButton onClick={handleCopyLink}>*/}
                            {/*    <CopyAllRounded/>*/}
                            {/*</IconButton>*/}
                            <Button
                                variant={'contained'}
                                onClick={fetchOrder}
                                sx={{padding: '0.5rem 1.5rem'}}
                                disabled={(orderId.length !== 10) || fetching}>
                                Proceed
                            </Button>
                        </InputAdornment>
                    )
                }}
            />
            {orderId.length === 0 && error &&
            <Typography variant={'subtitle1'} color={'error'}>No Recent Orders!</Typography>
            }
            {orderId.length === 0 && response &&
            <Stack
                direction={'column'}
                sx={{marginTop: '1rem'}}
                spacing={2}>
                <Typography
                    variant={'body1'}
                    color={'info'}>
                    Recent Orders
                </Typography>
                <Grid container spacing={2}>
                    {response.map((order) => {
                        return (
                            <Grid item xs={12} sm={6} md={4}>
                                <RecentOrderCard
                                    order={order}
                                    setOrderId={setOrderId}
                                    setValues={setValues}
                                    values={values}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Stack>}
            {values.sellerId && orderId.length === 10 &&
            <Paper elevation={5} sx={{padding: 2}}>
                <Stack
                    direction={'row'}
                    justifyContent={'space-evenly'}
                    spacing={4}>
                    <Stack
                        direction={'column'}
                        sx={{width: '100%'}}
                        spacing={1}>
                        <TextField
                            label={'Order Id'}
                            fullWidth
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={values.orderId}
                        />
                        <TextField
                            label={'Sold By'}
                            fullWidth
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={values.sellerName}
                        />
                        <TextField
                            label={'Order Date'}
                            fullWidth
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={new Date(values.createdAt).toLocaleDateString()}
                        />
                        <TextField
                            label={'Short Description'}
                            fullWidth
                            onChange={(event) => {
                                setValues({
                                    ...values,
                                    title: event.target.value
                                })
                            }}
                            value={values.title}
                        />
                        <TextField
                        label={'Long Description'}
                        value={values.description}
                        onChange={(event) => {
                            setValues({
                                ...values,
                                description: event.target.value
                            })
                        }} multiline
                        minRows={5}
                        fullWidth
                    />
                    </Stack>
                    <Stack
                        direction={'column'}
                        sx={{width: '100%'}}
                        spacing={2}>
                        <Button onClick={() => showImageDialog(true)}>Choose Images</Button>
                        {values.image.length > 0 && (
                            <ImageList variant="masonry" cols={3} gap={8} rowHeight={164}>
                                {values.image.map((image, index) => {
                                    return (
                                        <ImageListItem item xs key={index}>
                                            <img
                                                src={`${image}`}
                                                loading='lazy'
                                                // index={index}
                                            />
                                        </ImageListItem>
                                    );
                                })}
                            </ImageList>
                        )}
                    </Stack>
                </Stack>
                <Stack
                    direction={'row'}
                    spacing={2}
                    marginTop={2}
                    justifyContent={'space-between'}>
                    <Button
                        variant={'contained'}
                        color={'error'}
                        onClick={() => {
                            setOrderId('');
                            setValues({
                                orderId: '',
                                sellerId: null,
                                sellerName: null,
                                title: '',
                                description: '',
                                image: [],
                                createdAt: ''
                            })
                        }}>Cancel
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={createIssueHandler}
                    >Create</Button>
                </Stack>
            </Paper>
            }
            <Snackbar
                open={snackbarMessage != null}
                onClose={() => setSnackbarMessage(null)}
                message={snackbarMessage}
                autoHideDuration={5000}/>

            <DropzoneDialog
                open={imageDialog}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                onSave={handleFileSave}
                onClose={() => showImageDialog(false)}
                maxFileSize={5000000}
            />
            <Dialog open={uploadTask} maxWidth='sm' fullWidth>
                <DialogTitle>
                    Uploading image {progressValues.currentFile} of {progressValues.totalFiles}
                </DialogTitle>
                <DialogContent>
                    <Typography variant={'body1'} color='textSecondary' sx={{marginBottom: 2}}>
                        Please wait while we are uploading your images...
                    </Typography>
                    <LinearProgress
                        variant={'determinate'}
                        value={progressValues.progress}/>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default NewIssue