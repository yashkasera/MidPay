/**
 * @author yashkasera
 * Created 16/10/21 at 8:36 PM
 */
import React from 'react';
import {
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import API from '../../util/api';

const SettingsComponent = () => {
    const changePasswordHandler = (event) => {
        event.preventDefault();
    }
    const [password, setPassword] = React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        instagramUsername: '',
        email: '',
        phoneNumber: '',
        gender: '',
        age: 18
    });
    const [notifications, setNotifications] = React.useState({
        all: true,
        order: true,
        issue: true
    });

    const handleValueChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value
        })
    }

    const fetchProfile = async () => {
        try {
            const res = await API.get('customer/profile');
            if (res.status === 200) {
                setValues({
                    ...res.data,
                    firstName: res.data.name.split(' ')[0],
                    lastName: res.data.name.slice(res.data.name.indexOf(' ') + 1),
                })
            }
        } catch (e) {
            console.error(e);
        }
    }
    React.useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
                <Card elevation={5} sx={{p: 2, height: '100%'}}>
                    <Stack spacing={2} direction={'column'} component={'form'} height={'100%'}
                           justifyContent={'space-between'}>
                        <Stack direction={'column'} spacing={2}>
                            <Typography variant={'h6'}>
                                Profile Settings
                            </Typography>
                            <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
                                <TextField
                                    label={'First Name'}
                                    type={'text'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.firstName}
                                    onChange={handleValueChange('firstName')}
                                    required
                                    fullWidth/>
                                <TextField
                                    label={'Last Name'}
                                    type={'text'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleValueChange('lastName')}
                                    value={values.lastName}
                                    required
                                    fullWidth/>
                            </Stack>
                            <TextField
                                label={'Instagram Username'}
                                type={'text'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleValueChange('instagramUsername')}
                                value={values.instagramUsername}
                                fullWidth/>
                            <TextField
                                label={'Email Address'}
                                type={'email'}
                                value={values.email}
                                onChange={handleValueChange('email')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth/>
                            <TextField
                                label={'Phone Number'}
                                type={'tel'}
                                onChange={handleValueChange('phoneNumber')}
                                value={values.phoneNumber}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth/>
                            <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id={'gender-label'}>Gender</InputLabel>
                                    <Select
                                        label={'gender'}
                                        value={values.gender}
                                        onChange={handleValueChange('gender')}
                                        labelId={'gender-label'}>
                                        <MenuItem value={'m'}>Male</MenuItem>
                                        <MenuItem value={'f'}>Female</MenuItem>
                                        <MenuItem value={'o'}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label={'Age'}
                                    type={'number'}
                                    onChange={handleValueChange('age')}
                                    value={values.age}
                                    fullWidth
                                />
                            </Stack>
                        </Stack>
                        {/*<Button color={'error'}>Disable my account</Button>*/}
                        <div style={{width: '100%'}}>
                            <Button
                                type={'reset'}
                                variant={'outlined'}
                                color={'error'}
                                sx={{width: 'calc(40% - 8px)', mr: '8px'}}
                                // onClick={changePasswordHandler}
                            >Cancel</Button>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                sx={{width: '60%'}}
                                // onClick={changePasswordHandler}
                            >Save</Button>
                        </div>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={12} md={5}>
                <Stack direction={'column'} spacing={2}>
                    <Card elevation={5} sx={{p: 2}}>
                        <Stack spacing={2} direction={'column'} component={'form'}>
                            <Typography variant={'h6'} color={'text.primary'}>
                                Change Password
                            </Typography>
                            <TextField
                                label={'Old Password'}
                                type={'password'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                value={password.oldPassword}
                                onChange={(event) => setPassword({
                                    ...password,
                                    oldPassword: event.target.value
                                })}
                                fullWidth/>
                            <TextField
                                label={'New Password'}
                                type={'password'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                value={password.newPassword}
                                onChange={(event) => setPassword({
                                    ...password,
                                    newPassword: event.target.value
                                })}
                                fullWidth/>
                            <TextField
                                label={'Confirm Password'}
                                type={'password'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={password.confirmPassword}
                                onChange={(event) => setPassword({
                                    ...password,
                                    confirmPassword: event.target.value
                                })}
                                required
                                fullWidth/>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={changePasswordHandler}>Change Password</Button>
                        </Stack>
                    </Card>
                    <Card elevation={5} sx={{p: 2}}>
                        <Stack spacing={2} component={'form'}>
                            <Typography variant={'h6'} color={'text.primary'}>
                                Notifications
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            value={notifications.all}
                                            onChange={(event) => setNotifications({
                                                ...notifications,
                                                all: event.target.value
                                            })}
                                        />
                                    }
                                    label="All Notifications"/>
                                <FormControlLabel
                                    disabled={!notifications.all}
                                    control={
                                        <Switch
                                            value={notifications.order}
                                            onChange={(event) => setNotifications({
                                                ...notifications,
                                                order: event.target.value
                                            })}
                                        />
                                    }
                                    label="Order Updates"/>
                                <FormControlLabel
                                    disabled={!notifications.all}
                                    control={
                                        <Switch
                                            value={notifications.issue}
                                            onChange={(event) => setNotifications({
                                                ...notifications,
                                                issue: event.target.value
                                            })}
                                        />
                                    }
                                    label="Issue Updates"/>
                            </FormGroup>
                            <div style={{width: '100%'}}>
                                <Button
                                    type={'reset'}
                                    variant={'outlined'}
                                    color={'error'}
                                    sx={{width: 'calc(40% - 8px)', mr: '8px'}}
                                    // onClick={changePasswordHandler}
                                >Reset Default</Button>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    sx={{width: '60%'}}
                                    // onClick={changePasswordHandler}
                                >Save</Button>
                            </div>
                        </Stack>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default SettingsComponent