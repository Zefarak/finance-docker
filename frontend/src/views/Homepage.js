import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import MyNavbar from '../components/Navbar';

import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Form,


} from 'react-bootstrap';

import { fetchPortfolios, fetchTickers } from '../redux/actions/tickersActions';
import {fetchUserData} from "../redux/actions/authActions";
import axiosInstance from "../helpers/axiosInstance";
import {PORTFOLIO_ENDPOINT} from "../helpers/endpoints";


class HomepageView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                title: '',
                starting_investment: 0,
                is_public: true
            }
        }
    }

    componentDidMount(){
        this.props.fetchPortfolios();
        this.props.fetchTickers();
        this.props.fetchUserData();

        const isAuthenticated  = this.props.isAuthenticated;
        if(isAuthenticated === null){
            this.props.history.push('/login/');
        }
    }

    nextPath(path) {
        this.props.history.push(path);
      }

     handleChange = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        const formData = {
            ...this.state.formData,
            [name]: value
        };
        this.setState({
            ...this.state,
            formData
        })
     };

    handleCheckBox = (evt) => {
        evt.preventDefault();
        const formData = {
            ...this.state.formData,
            is_public: !this.state.formData.is_public
        };
        this.setState({
            ...this.state,
            formData
        })
    };

    handleSubmit = () => {
        let data = this.state.formData;
        data = {
            ...data,
            user: this.props.userID
        }
        axiosInstance.post(PORTFOLIO_ENDPOINT, data)
            .then(
                respData=>{
                    this.props.fetchPortfolios()
                }
            )
    };



    render(){
        const { portfolios, username, userID, isAuthenticated } = this.props;
        const { title, is_public, starting_investment} =  this.state.formData;
        
        return (
            <div>
                <MyNavbar/>
            
            <Container>
                <Row>
                    <Col>
                        <h4>Create Portfolio  | {username} | {userID}</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type='text' onChange={this.handleChange} value={title} name='title' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Investment</Form.Label>
                                <Form.Control type='number' onChange={this.handleChange} value={starting_investment} name='starting_investment' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Is Public</Form.Label>
                                <br />
                                  <input
                                    onChange={this.handleCheckBox}
                                    type="checkbox"
                                    checked={is_public}

                                  />


                            </Form.Group>
                        </Form>
                        <br />
                        <Button onClick={this.handleSubmit}>Save</Button>
                        <hr />

                    </Col>
                    <Col xs={6}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Return</th>
                                    <th>Variance</th>
                                    <th>Public</th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolios.results ? portfolios.results.map((item, i)=>{
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.expected_portfolio_return}</td>
                                            <td>{item.expected_portfolio_variance}</td>
                                            <td>yes</td>
                                            <td><Button variant='primary' onClick={()=>this.nextPath('/portfolio/detail/'+ item.id)}>Edit</Button> </td>
                                        </tr>
                                    )
                                }): null}
                            </tbody>
                        </Table>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    portfolios: state.tickerReducer.portfolios,
    username: state.authReducer.username,
    userID: state.authReducer.userID

})

export default compose(withRouter, connect(mapStateToProps, {fetchPortfolios, fetchTickers, fetchUserData}))(HomepageView);