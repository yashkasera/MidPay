/**
 * @author yashkasera
 * Created 10/10/21 at 12:53 AM
 */

import React from 'react';
import useAxios from "../../hooks/useAxios";
import LoadingComponent from "../../components/loading";
import {Grid} from "@mui/material";
import IssueCard from "./IssueCard";

const Issue = () => {
    const {response, loading, error} = useAxios({
        url: 'customer/issue',
        method: 'GET',
    })
    console.log(response)
    return(
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

export default Issue