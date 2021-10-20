import React from 'react'

import IssueCard from "./IssueCard";
import {Grid} from "@mui/material";
import useAxios from "../../hooks/useAxios";
import LoadingComponent from "../../components/loading";

export default function Issues() {

    const {response, loading, error} = useAxios({
        url: 'seller/issue',
        method: 'GET',
    })
    return (
        <>
            {loading && <LoadingComponent/>}
            {response && <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 2, sm: 8, md: 16}}>
                {response.map((issue, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <IssueCard issue={issue}/>
                    </Grid>
                ))}
            </Grid>}
        </>
    )
}