import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Form,
    Button,
} from 'react-bootstrap';


import axiosInstance from '../../helpers/axiosInstance';
import { PORTFOLIO_DETAIL_ENDPOINT, USER_ITEMS_ENDPOINT } from '../../helpers/endpoints';
import { fetchSelectedPortfolio, fetchSelectedPortfolioItems } from  '../../redux/actions/portfolioActions'
import LoadingMessage from '../LoadingMessage';


class AddItemForm extends Component {

    constructor(props){
        super(props);
        this.handleFormData = this.handleFormData.bind(this);
        this.state = {
            formData: {},
            loadingMessage: false
        }
    }

    handleFormData(event){
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        const formData = {
            ...this.state.formData,
            [name]: value
        }
        this.setState({
            formData: formData
        })
    }

    componentDidMount(){
        const selectedticker = this.props.selectedticker;
        this.setState({
            formData: {
                ticker: selectedticker.id,
                portfolio: this.props.portfolio.id,
                starting_investment: 50,
                starting_value_of_ticker: 0
            }
        })
    }

    handleSubmitTicker = (evt) => {
        evt.preventDefault();
        this.setState({
            loadingMessage: true
        })
        const { portfolio } = this.props;
        const data = this.state.formData;
        console.log('submit data', data)
        axiosInstance.post(USER_ITEMS_ENDPOINT, data)
            .then(
                respData=>{
                    const { data, status} = respData;
                    this.setState({
                        loadingMessage: true
                    })
                    const response = respData;
                    const endpoint = PORTFOLIO_DETAIL_ENDPOINT + `${portfolio.id}`;
                    const itemsEndpoint = USER_ITEMS_ENDPOINT + `?portfolio=${portfolio.id}`;
                    this.props.fetchSelectedPortfolio(endpoint);
                    this.props.fetchSelectedPortfolioItems(itemsEndpoint);
                    this.props.closewindow(true)
                }
            )

    }

    handleCloseWindow = () => {
        this.props.closewindow()
    }

    render(){
        const { formData, loadingMessage } = this.state;
        return (
            <div>
                <h4>{this.props.selectedticker.title}</h4>
                <Button onClick={this.handleCloseWindow} variant='warning'>Close</Button>
               
               <br /> <hr />
                <Form>
                    <Form.Group>
                        <Form.Label>Starting Investment</Form.Label>
                        <Form.Control type='number' onChange={this.handleFormData} name='starting_investment' value={formData.starting_investment} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ticker Value</Form.Label>
                        <Form.Control type='number' onChange={this.handleFormData} name='starting_value_of_ticker' value={formData.starting_value_of_ticker} />
                    </Form.Group>
                    <Button variant='success' onClick={this.handleSubmitTicker}>Save</Button>
                    {loadingMessage ? LoadingMessage('Loading Data ,wait a little.') : null }
                </Form>
             </div>
        )
    }
}


AddItemForm.propTypes = {
    fetchSelectedPortfolio: PropTypes.func,
    fetchSelectedPortfolioItems: PropTypes.func,
    portfolio: PropTypes.object
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { fetchSelectedPortfolio, fetchSelectedPortfolioItems})(AddItemForm);