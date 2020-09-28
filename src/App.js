import React from 'react';
import logo from './logo.svg';
import './App.css';
import RestContainer from './containers/RestContainer'
import Navbar from './containers/Navbar'
import Account from './components/Account'
import Reservation from './components/Reservation'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
let baseUrl= "http://localhost:3000/api/v1/"
let restUrl = baseUrl + "restaurants"
let loginUrl = baseUrl + 'login'

class App extends React.Component{
  // state = {
  //   page: "restaurants"
  // }

  // changePage = page => {
  //   this.setState({page})
  // }


  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar baseUrl={baseUrl} restUrl={restUrl} loginUrl={loginUrl} />
          {/* {this.state.page === "restaurants" 
          ? 
          <RestContainer baseUrl={baseUrl} restUrl={restUrl} loginUrl={loginUrl}/>
          :
          this.state.page === "account" 
          ?
          <Account />: */}
          {/* <Reservation />} */} 
          <Switch>
            <Route exact path="/" render={(routerProps)=>  <RestContainer {...routerProps} baseUrl={baseUrl} restUrl={restUrl} loginUrl={loginUrl}/>}/>
            <Route exact path="/account" render={(routerProps)=>  <Account {...routerProps} baseUrl={baseUrl} restUrl={restUrl} loginUrl={loginUrl}/>}/>
            <Route exact path="/reservations" render={(routerProps)=>  <Reservation {...routerProps} baseUrl={baseUrl} restUrl={restUrl} loginUrl={loginUrl}/>}/>
          </Switch>


        </div>
        </BrowserRouter>
    );
  }
}

export default App;
