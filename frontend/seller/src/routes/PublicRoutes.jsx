import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Paths from '../util/paths.js';
import LoadingComponent from '../components/loading';

const Auth = lazy(() => import('../pages/auth'));

function PublicRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route path={Paths.auth} component={Auth} />
                <Redirect to={Paths.auth} />
            </Switch>
        </Suspense>
    );
}

export default PublicRoutes;
