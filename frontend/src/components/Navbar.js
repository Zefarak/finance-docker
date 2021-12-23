import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { logoutAction } from '../redux/actions/authActions'

import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';


class MyNavbar extends React.Component {

    constructor(props){
      super(props);

      this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
      this.props.logoutAction()
    
    }

    componentDidUpdate(prevProps){
      console.log('check Updated')
      const oldAuth = prevProps.isAuthenticated;
      if( oldAuth !==  this.props.isAuthenticated){
        const { isAuthenticated } = this.props;
        if(isAuthenticated){

        } else {
          this.props.history.push('/login/')
        }
      }
    }

    render(){
      const { isAuthenticated } = this.props;
      console.log('render image', isAuthenticated);
      if(isAuthenticated === null){
        this.props.history.push('/login/')
    }
      

      return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tickers/">Tickers</Nav.Link>
            <Nav.Link href="/portfolio-list/">My Portfolio</Nav.Link>

          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
              <p>{this.props.username ? this.props.username : 'No data'}</p>
              {this.props.isAuthenticated ? <Button onClick={this.handleLogout} variant='danger'>Logout {this.props.userID}</Button>: <Button variant='success'>Login</Button>}
          </Form>
        </Navbar>
    )
  }

}


const mapStateToProps = state => ({
    username: state.authReducer.username,
    isAuthenticated: state.authReducer.isAuthenticated,
    userID: state.authReducer.userID
})

export default compose(withRouter, connect(mapStateToProps, {logoutAction}))(MyNavbar);