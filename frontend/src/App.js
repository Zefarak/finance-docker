import React from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link
} from 'react-router-dom';


import HomepageView from '../src/views/Homepage';
import LoginView from '../src/views/Login';
import TickersListView from '../src/views/tickersList';
import TickerUpdateView from './views/TickerDetailView';
import PortfolioDetailView from './views/PortfolioDetailView';
import ChatRoomView from './views/ChatView';
import PortfolioListView from './views/PortfolioListView';


import store from './redux/store';
import MyNavbar from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          
          <hr />
          <Switch>
            <Route exact path='/'><HomepageView /></Route>
            <Route exact path='/login/'><LoginView /></Route>
            <Route exact path='/tickers/'><TickersListView /></Route>
            <Route exact path='/ticker/detail/:id'><TickerUpdateView /></Route>
            <Route exact path='/portfolio/detail/:id' component={PortfolioDetailView} />
            <Route exact path='/chat/' component={ChatRoomView} />
            <Route exact path='/portfolio-list/' component={PortfolioListView} />
            
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
