// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// Components
import App from './Components/App';
import Profile from './Components/Profile';
import Contacts from './Components/Contacts';
import TimeLine from './Components/Timeline';
import Summary from './Components/Summary';

const PrivateRoutes = () =>
<App>
    <Switch>
        <Route exact path ="/p/profile" component={Profile}/>
        <Route exact path ="/p/contacts" component={Contacts}/>
        <Route exact path ="/p/timeline" component={TimeLine}/>
        <Route exact path ="/p/summary" component={Summary}/>
    </Switch>
</App>

export default PrivateRoutes;
