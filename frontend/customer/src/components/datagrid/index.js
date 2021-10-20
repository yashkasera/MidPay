/**
 * @author yashkasera
 * Created 14/10/21 at 4:56 PM
 */
import {createTheme} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import {ButtonGroup, LinearProgress, Stack, Typography} from "@mui/material";
import {
    DataGrid,
    GridOverlay,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";

import ErrorImage from '../../assets/images/ic_not_found.svg'

const useStyles = makeStyles((theme) => ({
        root: {
            border: `1px solid ${'rgba(17,17,17,0.25)'}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 5,
            WebkitFontSmoothing: 'auto',
            letterSpacing: 'normal',
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme.palette.highlightColor,
                borderRadius: '5px 5px 0 0',
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: `1px solid ${'rgba(17,17,17,0.25)'}`,
            },
            '& .MuiDataGrid-cell': {
                color: 'rgba(0,0,0,0.65)',
            },
            minHeight: 500,
        },
    }),
);

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <ButtonGroup sx={{margin: 1}}>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
                <GridToolbarExport/>
            </ButtonGroup>
        </GridToolbarContainer>
    );
}

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{position: 'absolute', top: 0, width: '100%'}}>
                <LinearProgress/>
            </div>
        </GridOverlay>
    );
}

function CustomNoRowsOverlay() {
    return (
        <GridOverlay>
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} spacing={2}>
                <img src={ErrorImage}/>
                <Typography variant={'subtitle1'} color={'text.secondary'}>No Rows Found!</Typography>
            </Stack>
        </GridOverlay>
    );
}

const StyledDataGrid = (data) => {
    const classes = useStyles();
    return (
        <DataGrid
            {...data}
            className={classes.root}
            disableSelectionOnClick
            disableDensitySelector
            density={'comfortable'}
            components={{
                LoadingOverlay: CustomLoadingOverlay,
                Toolbar: CustomToolbar,
                NoRowsOverlay: CustomNoRowsOverlay,
            }}
            autoHeight/>
    )
}

export default StyledDataGrid