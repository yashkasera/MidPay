import React from 'react'

import classes from './LoadingComponent.module.css'

export default function LoadingComponent() {
    return (
        <div className={classes.container}>
            <div className={classes.loading} />
        </div>
    )
};
