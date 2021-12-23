import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { 
    Row,
    Col,
    Card,
    Form,
    Button,
    Table


} from 'react-bootstrap';
import { PORTFOLIO_ENDPOINT, PORTFOLIO_DETAIL_ENDPOINT } from '../../helpers/endpoints';
import axiosInstance from '../../helpers/axiosInstance';
import { fetchUserPortfolios, fetchPortfolioUserData, fetchSelectedPortfolio } from '../../redux/actions/portfolioActions';
import { fetchUserData } from '../../redux/actions/authActions';

class HomepageComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            formData : {
                title: '',
                user: '',
                isPublic: false
            }
        }
    }

    async componentDidMount(){
        const userID = localStorage.getItem('userID')
        const endpoint = PORTFOLIO_ENDPOINT + `?user=${userID}`;
        console.log('userID', endpoint)
        await this.props.fetchUserPortfolios(endpoint);
        await this.props.fetchUserData();
        this.setState({
            formData:{
                ...this.state.formData,
                user: userID
            }
        })
    }

    handleFormData = evt => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        const formData = {
            ...this.state.formData,
            [name]: value
        }
        this.setState({
            ...this.state,
            formData
        })
    }

    
    handleFormSubmit = evt =>{
        evt.preventDefault();
        const formData = this.state.formData;
        console.log('formData', formData)
        axiosInstance.post(PORTFOLIO_ENDPOINT, formData)
            .then(
                respData=>{
                    const {status, data } = respData;
                    if (status === 201){
                        this.handleSelectedPortfolio(data)
                        this.setState({
                            formData : {
                                ...this.state.formData,
                                title: ''
                            }
                        })
                        this.props.fetchUserPortfolios(this.state.userPortEndpoint);
                        this.props.fetchPortfolioUserData();
                        }
                    }
                )
    }

    handleSelectedPortfolio = (portfolio) => {
        console.log()
        const endpoint = PORTFOLIO_DETAIL_ENDPOINT + `${portfolio.id}/`;
        this.props.fetchSelectedPortfolio(endpoint);
    }

    render() {
    
        const { userPortfolios, userData  } = this.props;
        const { title } = this.state.formData;

        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <h4>Total Stats</h4>
                                </Card.Header>
                                <Card.Body>
                                    {userData ? 
                                        <ul>
                                            <li>Total Investment: {userData.starting_investment}</li>
                                            <li>Current Value: {userData.current_value}</li>
                                        </ul>
                                        
                                    :null}
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <h4>Percent Stats</h4>
                                </Card.Header>
                                <Card.Body>
                                    {userData ? 
                                        <ul>
                                            <li>Return: {userData.return}</li>
                                            <li>Volatility: {userData.volatility}</li>
                                        </ul>
                                        
                                    :null}
                                    
                                </Card.Body>
                            </Card>
                            
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col></Col>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <h4>Create New Portfolio</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control name='title' type='text' value={title} onChange={this.handleFormData} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Public Portfolio </Form.Label>
                                            <Form.Control type='checkbox' placeholder='' onChange={this.handleFormData} />
                                        </Form.Group>
                                        <Button onClick={this.handleFormSubmit} variant='primary'>Save</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
                <Col>
                    <h4>My List</h4>
                    <Table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Investment</th>
                                    <th>Current money</th>
                                    <th>+/- %</th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userPortfolios.results ? userPortfolios.results.map((port, i)=>{
                                    return (
                                        <tr>
                                            <td>{port.title}</td>
                                            <td>{port.starting_investment}</td>
                                            <td>{port.current_value}</td>
                                            <td>{port.get_difference}</td>
                                            <td><Button onClick={() => this.handleSelectedPortfolio(port)} variant='success'>Edit</Button></td>
                                        </tr>
                                    )
                                }) :null}
                            </tbody>
                        </Table>
                          
                            
                        
                    
                </Col>
            </Row>
        )
    }
}


const mapStateToProps = state => ({
    userPortfolios: state.portfolioReducer.userPortfolios,
    userID: state.authReducer.userID,
    userData: state.portfolioReducer.total_portofolio_user_data,
    portfolio: state.portfolioReducer.portfolio,
    userID: state.authReducer.userID
})

export default compose(withRouter,
     connect(mapStateToProps, { 
        fetchUserPortfolios, 
        fetchPortfolioUserData,
        fetchUserData,
        fetchSelectedPortfolio
    }))(HomepageComponent);