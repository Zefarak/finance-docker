import React, {Component} from 'react';
import { connect } from 'react-redux';


import {
    Form,
    Card,
    Button,
    Row,
    Col

} from 'react-bootstrap';

import axiosInstance from '../../helpers/axiosInstance';
import { USER_ITEMS_ENDPOINT, USER_ITEM_DETAIL_ENDPOINT, PORTFOLIO_DETAIL_ENDPOINT } from '../../helpers/endpoints';
import { fetchSelectedPortfolio, fetchSelectedPortfolioItems} from '../../redux/actions/portfolioActions'


class EditUserTickerComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            formData:{},
        }

    }

    componentDidMount(){
        const { userticker } = this.props;
        const endpoint = USER_ITEM_DETAIL_ENDPOINT + `${userticker.id}/`;
        const portEndpoint = PORTFOLIO_DETAIL_ENDPOINT + `${userticker.portfolio}/`;
        const itemsEndpoint = USER_ITEMS_ENDPOINT + `?portfolio=${userticker.portfolio}`
        this.setState({
            formData: userticker,
            userData: userticker,
            endpoint: endpoint,
            portEndpoint: portEndpoint,
            itemsEndpoint: itemsEndpoint
        })

    }

    handleFormInput = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        const formData = {
            ...this.state.formData,
            [name]: value
        }
        this.setState({
            formData: formData
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const data = this.state.formData;
        axiosInstance.put(this.state.endpoint, data)
            .then(
                respData=>{
                    const {status } = respData;
                    if(status === 200){
                        this.props.fetchSelectedPortfolio(this.state.portEndpoint);
                        this.props.fetchSelectedPortfolioItems(this.state.itemsEndpoint);
                        this.props.closewindow('showTickerList');
                    }
                    
                    
                }
            )  
    }

    handleDelete = (evt) => {
        evt.preventDefault();
        axiosInstance.delete(this.state.endpoint)
            .then(respData=>{
                this.props.fetchSelectedPortfolio(this.state.portEndpoint);
                this.props.fetchSelectedPortfolioItems(this.state.itemsEndpoint);
                this.props.closewindow('showEditUserTickerScreen', null)
            })
    }

    handleSell = (evt) => {
        evt.preventDefault();
        const data = {
            ...this.state.formData,
            is_sell: true
        }
        axiosInstance.post(this.state.endpoint, data)
            .then(
                respData=>{

                }            
                )
    }

    handleCloseWindow = () => {
        this.props.closewindow('showTickerList')
    }


    render(){
        const {userticker} = this.props;
        const {formData} = this.state;
        
        return (
            <Row>
                <Col></Col>
                <Col>
                    <Card>
                        <Card.Header><h4>Edit {userticker.tag_ticker}</h4></Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Starting Investment</Form.Label>
                                    <Form.Control onChange={this.handleFormInput} name='starting_investment' value={formData.starting_investment} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Starting Value of Ticker</Form.Label>
                                    <Form.Control onChange={this.handleFormInput} name='starting_value_of_ticker' value={formData.starting_value_of_ticker} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Current Value</Form.Label>
                                    <Form.Control onChange={this.handleFormInput} name='current_value' value={formData.current_value} />
                                </Form.Group>
                                <Button onClick={this.handleSubmit} variant='success'>Save</Button>
                            </Form>

                            </Card.Body>
                            <Card.Footer>
                            <Row>
                                <Col>
                                    <Button variant='success'>Sell</Button>
                                </Col>
                                <Col>
                                    <Button onClick={this.handleDelete} variant='danger'>Delete</Button>
                                </Col>
                            </Row>
                            </Card.Footer>
                        
                    </Card>
                </Col>
                <Col>
                    <Button variant='warning' onClick={this.handleCloseWindow}>Close Window</Button>
                </Col>
            </Row>
            
        )
    }
}


const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, {fetchSelectedPortfolio, fetchSelectedPortfolioItems})(EditUserTickerComponent);