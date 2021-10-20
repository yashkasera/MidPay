import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Paths from '../util/paths.js';
import LoadingComponent from '../components/loading';

const Dashboard = lazy(() => import('../pages/dashboard'));
const Reviews = lazy(() => import('../pages/reviews'));
const Payments = lazy(() => import('../pages/payments'));
const Orders = lazy(() => import('../pages/orders'));
const Settings = lazy(() => import('../pages/settings'));
const Logs = lazy(() => import('../pages/logs'));
const Issues = lazy(() => import('../pages/issues'));
const ViewIssue = lazy(() => import('../pages/issues/view-issue'));
const Profile = lazy(() => import('../pages/profile'));
const Chat = lazy(() => import('../pages/chat'));
export default function PrivateRoutes() {

    return (
        <Suspense fallback={<LoadingComponent loading/>}>
            <Switch>
                <Route path={Paths.dashboard} component={Dashboard}/>
                <Route path={Paths.payments} component={Payments}/>
                <Route path={Paths.orders} component={Orders}/>
                <Route path={Paths.chat} component={Chat}/>

                <Route path={Paths.viewIssue} component={ViewIssue}/>
                <Route path={Paths.issues} component={Issues}/>
                <Route path={Paths.reviews} component={Reviews}/>

                <Route path={Paths.settings} component={Settings}/>
                <Route path={Paths.profile} component={Profile}/>
                <Route path={Paths.logs} component={Logs}/>
                <Redirect to={Paths.dashboard}/>
            </Switch>
        </Suspense>
    );
}


