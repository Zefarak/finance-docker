import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { loginAction } from '../redux/actions/authActions';

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
} from 'react-bootstrap';
import axiosInstance from '../helpers/axiosInstance';
import { LOGIN_ENDPOINT } from '../helpers/endpoints';



class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginView: true,
            registerView: false,
            username: '',
            password: '',
            isAuthenticated: false
            
        }
    }

    handleText = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        
        axiosInstance.post(LOGIN_ENDPOINT, data)
            .then(
                respData=>{
                    console.log('respData Login', respData)
                    const {status, data} = respData;
                    if (status === 200) {
                        console.log('login success')
                        this.props.loginAction(data);
                    }
                }
            )

        
       
        
    }

    componentDidMount(){
        const {isAuthenticated} = this.props;
        this.setState({
            isAuthenticated: isAuthenticated
        })
        
        
    }

    componentDidUpdate(prevProps){
        console.log('update', this.props.isAuthenticated)
        if (prevProps.isAuthenticated !== this.props.isAuthenticated){
            if (this.props.isAuthenticated){
                this.props.history.push('/');
            }
        }
    }

    

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    


    render(){
        const { username, password } = this.state;
        const {isAuthenticated} = this.props;
        console.log('login View ', isAuthenticated);
        if (isAuthenticated) {
            console.log('hitted!')
            this.props.history.push('/')
        }

        return (
            <Container>
                <Row> 
                    <Col></Col>
                    <Col>
                        <Card style={{ marginTop:'15%' }}>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control name='username' type="text" placeholder="Enter email" value={username} onChange={this.handleText} />
                                        
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control name='password' type="password" placeholder="Password" value={password} onChange={this.handleText} />
                                    </Form.Group>
                                    
                                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default compose(withRouter, connect(mapStateToProps, {loginAction}))(LoginView);