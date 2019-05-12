import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Browse from './Browse';
import Create from './Create';
import Update from './Update';

export default () =>
  <Switch>
    <Route path='/admin/payments/create' component={Create}/>
    <Route path='/admin/payments/update/:id' component={Update}/>
    <Route path='/admin/payments' component={Browse} />
  </Switch>