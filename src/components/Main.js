import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Surv from './Survey'
import Chart from './Chart'
import Method from './Method'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/survey' component={Surv}/>
            <Route path='/chart' component={Chart}/>
            <Route path='/method' component={Method}/>
        </Switch>
    </main>
);

export default Main;