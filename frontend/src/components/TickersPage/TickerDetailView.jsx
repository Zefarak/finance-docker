import React, { Component} from 'react';
import { connect } from 'react-redux';
import axiosInstance from '../../helpers/axiosInstance';
import { TICKER_ANALYSIS_ENDPOINT, TICKER_UPDATE_ENDPOINT } from '../../helpers/endpoints';
import {
    Row,
    Col,
    Form,
    Button,
    Table,
    Tab
} from 'react-bootstrap';
import LoadingMessage from '../LoadingMessage';

class TickerDetailView extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            endpoint: '',
            obj: {},
            data: [],
            formData: {
                title: '',
                ticker: ''
            },
            loadingMessage: false
        }
    }

    componentDidMount(){
        console.log('here')
        const { ticker } = this.props;
        console.log('ticker detail', ticker)
        const  endpoint = TICKER_UPDATE_ENDPOINT + `${ticker.id}/`;
        const analysisEnpoint = TICKER_ANALYSIS_ENDPOINT + `${ticker.id}/`;
        this.setState({
            obj: ticker,
            endpoint: endpoint,
            formData: ticker
        })
        
    }

    closeWindow = () => {
        this.props.closeWindow('showListScreen')
    };

    handleChange = (evt)=> {
        evt.preventDefault();
        const { name, value } = evt.target;
        const formData = {...this.state.formData, [name]: value };
        this.setState({...this.state, formData})
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            loadingMessage: true
        })
        const data = this.state.formData;
        axiosInstance.put(this.state.endpoint, data).then(respData=>{
            const { status, data} = respData;
            if (status == 200){
                this.setState({
                    obj: data,
                    loadingMessage: false,
                    formData: data
                })
            }
        })
    }



    render(){
        const { obj, loadingMessage } = this.state;
        const { title, ticker } = this.state.formData;

        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col>{obj.title}</Col>
                    <Col><Button onClick={this.closeWindow} variant='warning'>Close Window</Button></Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <br />
                        <h3>{obj.title}</h3>
                        <br />
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Price</th>
                                    <td>{obj.price}</td>
                                </tr>
                                <tr>
                                    <th>Simply Return</th>
                                    <td>{obj.simply_return}</td>
                                </tr>
                                <tr>
                                    <th>Log Return</th>
                                    <td>{obj.log_return}</td>
                                </tr>
                                <tr>
                                    <th>Standard Deviation</th>
                                    <td>{obj.standard_deviation}</td>
                                </tr>
                                <tr>
                                    <th>Camp</th>
                                    <td>{obj.camp}</td>
                                </tr>
                                <tr>
                                    <th>Beta</th>
                                    <td>{obj.beta}</td>
                                </tr>
                                <tr>
                                    <th>Coverage</th>
                                    <td>{obj.coverage}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h4>Edit</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control onChange={this.handleChange} type='text' name='title' value={title} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Code</Form.Label>
                                <Form.Control onChange={this.handleChange} type='text' name='ticker' value={ticker} />
                            </Form.Group>
                            <Button variant='primary' onClick={this.handleSubmit}> <i className='fa fa-save' /> Save </Button>
                            
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}



export default TickerDetailView;