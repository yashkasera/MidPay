import React, {lazy, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Paths from '../util/paths.js';
import LoadingComponent from '../components/loading';

const Dashboard = lazy(() => import('../pages/dashboard'));
// const Reviews = lazy(() => import('../pages/reviews'));
// const Payments = lazy(() => import('../pages/payments'));
// const Logs = lazy(() => import('../pages/logs'));
const Orders = lazy(() => import('../pages/order'));
const Issues = lazy(() => import('../pages/issue'));
const NewIssue = lazy(() => import('../pages/issue/new'));
const NewPayment = lazy(() => import('../pages/payment/new'));
const Chat = lazy(() => import('../pages/chat'));
const Settings = lazy(() => import('../pages/settings'));

export default function PrivateRoutes() {

    return (
        <Suspense fallback={<LoadingComponent loading/>}>
            <Switch>
                <Route path={Paths.dashboard} component={Dashboard}/>
                <Route path={Paths.newIssue} component={NewIssue}/>
                <Route path={Paths.newPaymentById} component={NewPayment}/>
                <Route path={Paths.newPayment} component={NewPayment}/>
                <Route path={Paths.orders} component={Orders}/>
                <Route path={Paths.issues} component={Issues}/>
                <Route path={Paths.chat1} component={Chat}/>
                <Route path={Paths.chat} component={Chat}/>
                <Route path={Paths.settings} component={Settings}/>
                {/*<Route path={Paths.issues} component={Issues} />*/}
                {/* <Route path={Paths.payments} component={Payments} />
                <Route path={Paths.reviews} component={Reviews} />
                <Route path={Paths.profile} component={Dashboard} />
                <Route path={Paths.account} component={Dashboard} />
                <Route path={Paths.logs} component={Logs} />*/}
                <Redirect to={Paths.dashboard}/>
            </Switch>
        </Suspense>
    );
}


