import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Browse from './Browse';
import Create from './Create';
import Update from './Update';

export default () =>
  <Switch>
    <Route path='/admin/students/create' component={Create}/>
    <Route path='/admin/students/update/:id' component={Update}/>
    <Route path='/admin/students' component={Browse} />
  </Switch>