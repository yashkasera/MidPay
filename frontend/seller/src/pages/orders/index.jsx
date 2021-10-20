import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import {useHistory} from "react-router-dom";
import Path from "../../util/paths";

export default function Payments() {
    const history = useHistory();

    return (
        <>
            <ButtonGroup variant="contained" color="primary" aria-label="">
              <Button onClick={()=>history.push(Path.payments)}>New Payment Link</Button>
              <Button>
              </Button>
            </ButtonGroup>
        </>
    )
}