// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// Components
import App from './Components/App';
import Profile from './Components/Profile';
import Contacts from './Components/Contacts';
import TimeLine from './Components/Timeline';
import Settings from './Components/Settings';

const PrivateRoutes = () =>
<App>
    <Switch>
        <Route exact path ="/" component={Profile}/>
        <Route path ="/contacts" component={Contacts}/>
        <Route path ="/timeline" component={TimeLine}/>
        <Route path ="/settings" component={Settings}/>
        <Route exact path ="/user/:username" component={Profile}/>
        <Route exact path ="/user/:username/timeline" component={TimeLine}/>
    </Switch>
</App>

export default PrivateRoutes;
