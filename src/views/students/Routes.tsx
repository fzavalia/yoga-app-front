import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Browse from './Browse';
import Update from './Update';
import Create from './Create';

export default () =>
  <Switch>
    <Route path='/students/create' component={Create}></Route>
    <Route path='/students/:id/update' component={Update}></Route>
    <Route path='/students' component={Browse}></Route>
  </Switch>