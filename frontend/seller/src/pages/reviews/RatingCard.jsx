import React from 'react';
import {Rating, Stack, Typography} from "@mui/material";
import ProgressBar from "../../components/progress-bar";
import {styled} from "@mui/material/styles";
import useAxios from "../../hooks/useAxios";
import LoadingComponent from "../../components/loading";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FFD868',
    },
});

const RatingCard = ({profile,dashboard}) => {

    const {response, error, loading} = useAxios({
        url: '/seller/ratings',
        method: 'GET',
    })
    const renderStat = (title, rating, number) => {
        return (
            <ProgressBar value={response.reviewCount === 0 ? 0 : (rating / response.reviewCount) * 100} label={title}
                         number={number}/>
        );
    }

    return (
        <>
            {loading && <LoadingComponent/>}
            {response && <Stack direction={'column'} spacing={1}>
                {response.overallRating && profile &&
                <Stack direction={'row'} spacing={2} sx={{marginTop: 1, marginBottom: 1}}>
                    <Typography>Store Rating :</Typography>
                    <StyledRating readOnly value={response.overallRating} precision={0.1}/>
                </Stack>
                }
                {response.overallRating && dashboard &&
                <Stack direction={'row'} spacing={1} justifyContent={'flex-start'} alignItems={'center'}>
                    <StyledRating precision={0.1} value={response.overallRating} readOnly/>
                    <Typography variant={'h6'}>{response.overallRating}</Typography>
                    <Typography variant={'body2'} color={'textSecondary'}>({response.reviewCount} Ratings)</Typography>
                </Stack>}
                {renderStat('5 Star', response.storeRatings.r5, response.storeRatings.r5)}
                {renderStat('4 Star', response.storeRatings.r4, response.storeRatings.r4)}
                {renderStat('3 Star', response.storeRatings.r3, response.storeRatings.r3)}
                {renderStat('2 Star', response.storeRatings.r2, response.storeRatings.r2)}
                {renderStat('1 Star', response.storeRatings.r1, response.storeRatings.r1)}
            </Stack>}
        </>
    );
}

export default RatingCard;