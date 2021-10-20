/**
 * @author yashkasera
 * Created 14/10/21 at 1:31 AM
 */
import React from 'react';
import {IconButton, Paper, Stack, Typography} from "@mui/material";
import {OpenInNew} from "@mui/icons-material";
import useAxios from "../../hooks/useAxios";
import {styled} from "@mui/styles";
import theme from "../../theme";
import LoadingComponent from "../../components/loading";

const IssuePaper = styled(Paper)({
    backgroundColor: 'rgba(255,255,255,0,25)',
    padding: theme.spacing(1),
})
const NewIssues = () => {
    const {response, error, loading} = useAxios({
        url: 'seller/issues/new',
        method: 'GET'
    })

    const renderIssue = (issue) => {
        return (
            <IssuePaper elevation={0} key={issue._id}>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={1} alignItems={'flex-start'}>
                    <Stack direction={'column'} justifyContent={'space-between'}>
                        <Typography variant={'body1'} color={'error.secondary'} noWrap>{issue.title}</Typography>
                        <Typography variant={'body2'} color={'textSecondary'} noWrap>{issue.customer.name}</Typography>
                        <Typography
                            variant={'body2'}
                            color={'text.disabled'}
                            noWrap>
                            {new Date(issue.createdAt).toDateString()}
                        </Typography>
                    </Stack>
                    <IconButton size={'small'}>
                        <OpenInNew/>
                    </IconButton>
                </Stack>
            </IssuePaper>
        );
    }
    return (
        <>
            {loading && <LoadingComponent/>}
            {response && <Stack direction={'column'} spacing={1} sx={{marginTop: 2}}>
                {response.map(issue => renderIssue(issue))}
            </Stack>}
        </>
    )
}

export default NewIssues;

