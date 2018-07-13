// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// Components 
import App from './Components/App'; 
import Profile from './Components/Profile';
import Contacts from './Components/Contacts';
import TimeLine from './Components/Timeline';
import Summary from './Components/Summary';

const AppRoutes = () =>
<App> 
    <Switch> 
        <Route exact path ="/" component={Profile}/>
        <Route exact path ="/contacts" component={Contacts}/>
        <Route exact path ="/timeline" component={TimeLine}/>
        <Route exact path ="/summary" component={Summary}/>
    </Switch>
</App>

export default AppRoutes;