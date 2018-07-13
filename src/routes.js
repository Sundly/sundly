// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom'

// Components 
import App from './Components/App'; 
import Profile from './Components/Profile';
import Contacts from './Components/Contacts';

const AppRoutes = () =>
<App> 
    <Switch> 
        <Route exact path ="/" component={Profile}/>
        <Route exact path ="/contacts" component={Contacts}/>
    </Switch>
</App>

export default AppRoutes;