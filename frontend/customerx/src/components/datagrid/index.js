/**
 * @author yashkasera
 * Created 14/10/21 at 4:56 PM
 */
import {createTheme} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import {ButtonGroup, createStyles, LinearProgress, Stack, Typography} from "@mui/material";
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

const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) =>
        createStyles({
            root: {
                border: `1px solid ${'rgba(238,238,238,0.25)'}`,
                borderRadius: 5,
                WebkitFontSmoothing: 'auto',
                letterSpacing: 'normal',
                '& .MuiDataGrid-columnsContainer': {
                    backgroundColor: theme.palette.elevatedPaper,
                    borderRadius: '5px 5px 0 0',
                },
                '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                    borderBottom: `1px solid ${'rgba(238,238,238,0.25)'}`,
                },
                '& .MuiDataGrid-cell': {
                    color: 'rgba(255,255,255,0.65)',
                },
                minHeight: 500,
            },
        }),
    {defaultTheme},
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
        <div style={{height: 400, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{flexGrow: 1}}>
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
                </div>
            </div>
        </div>
    )
}

export default StyledDataGrid