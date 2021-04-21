import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleCookingSession from './pages/SingleCookingSession';
import CreateCookingSession from './pages/CreateCookingSession';

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import MenuBar from './components/MenuBar'

import 'semantic-ui-css/semantic.min.css';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path="/session/:sessionId" component={SingleCookingSession} />
          <Route exact path="/new" component={CreateCookingSession} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
