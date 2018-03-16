
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import App from './App'
import AppForExample1 from './app-components/AppForExample1'
import AppForExample2 from './app-components/AppForExample2'
import AppForExample3 from './app-components/AppForExample3'


const Root = () => (
    <Switch>
    
    <Route path = '/example1' component ={AppForExample1} />
    <Route path = '/example2' component ={AppForExample2} />
    <Route path = '/example3' component ={AppForExample3} />
    <Route path = '/' component ={App} />
    </Switch>
)

export default Root