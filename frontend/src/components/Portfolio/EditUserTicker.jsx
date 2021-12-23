import React, { Component } from 'react';   
import { 
    Row,
    Col,
    Table,
    Form,
    Button
 } from 'react-bootstrap';
import axiosInstance from '../../helpers/axiosInstance';
import { USER_ITEM_DETAIL_ENDPOINT } from '../../helpers/endpoints';


class EditUserTicker extends Component{

    constructor(props){
        super(props);

        this.state = {
            ticker: {},
            ticker_id: null,
            endpoint: null,
            doneLoading: false
        }
    }

    componentDidMount(){
        console.log('worked!');
        const { ticker_id } = this.props;
        const endpoint = USER_ITEM_DETAIL_ENDPOINT + `${ticker_id}/`;
        console.log(endpoint);

        
        axiosInstance.get(endpoint).then(
            respData=>{
                const ticker = respData.data;
                console.log('ticker', ticker);
                this.setState({
                    ticker:ticker,
                    doneLoading: true,
                    endpoint: endpoint
                })
            }
        )
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        const ticker = {
            ...this.state.ticker,
            [name]: value
        };
        this.setState({
           ticker: ticker
        })
    };

    handleDelete = (evt) => {
        const endpoint = this.state.endpoint;
        axiosInstance.delete(endpoint)
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        console.log('hiitddda')
        const data = this.state.ticker;
        const endpoint = this.state.endpoint;

        axiosInstance.put(endpoint, data)
            .then(
                respData=>{
                    const new_data = respData.data;
                    this.props.handleRefresh();
                }
            )
    }



    render() {
        const { ticker } = this.state;

        return (
            <Row>
                <Col>
                    <h4>{ticker.tag_ticker}</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label>Investment</Form.Label>
                            <Form.Control
                                name='starting_investment'
                                type='number'
                                value={ticker.starting_investment}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Starting Price</Form.Label>
                            <Form.Control
                                name='starting_value_of_ticker'
                                type='number'
                                value={ticker.starting_value_of_ticker}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button  onClick={this.handleSubmit} vatiant='primary'>Save</Button>
                    </Form>
                    <hr/>
                    <Button onClick={this.handleDelete} variant='danger'>Close</Button>
                </Col>
                <Col>
                    <Button variant='danger' onClick={this.handleDelete}>Delete</Button>
                </Col>
            </Row>
        )

    }



}

export default EditUserTicker;