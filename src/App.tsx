import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import routes from './routes';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          {routes.map((r, i) =>
            <Link key={i} to={r.path}>
              <button className='header-link'>{r.name}</button>
            </Link>)}
        </header>
        <section>
          <Switch>
            {routes.map((r, i) => <Route key={i} path={r.path} component={r.component} />)}
            <Redirect from='/' to={routes[0].path} />
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
