import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Browse from './Browse';
import Update from './Update';
import Create from './Create';

export default () =>
  <Switch>
    <Route path='/payments/create' component={Create}></Route>
    <Route path='/payments/:id/update' component={Update}></Route>
    <Route path='/payments' component={Browse}></Route>
  </Switch>