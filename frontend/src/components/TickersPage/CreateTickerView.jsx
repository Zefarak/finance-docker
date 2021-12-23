import React, { Component } from 'react';
import { connect } from 'react-redux';
import axiosInstance from '../../helpers/axiosInstance';
import { TICKER_LIST_ENDPOINT } from '../../helpers/endpoints';
import {
    Row,
    Col,
    Button,
    Card,
    Form,

} from 'react-bootstrap';

import { fetchTickers, fetchGroup } from '../../redux/actions/tickersActions';
import LoadingMessage from '../../components/LoadingMessage'

class CreateTickerView extends Component{

    constructor(props){
        super(props);

        this.state = {
            formData: {
                title: '',
                ticker: '',
            },
            showMessage: false
        }
    }

    componentDidMount(){
        this.props.fetchGroup();
    }

    handleChange = (evt) => {
        evt.preventDefault();
        const { name, value } = evt.target;
        const formData = {...this.state.formData, [name]: value };
        this.setState({...this.state, formData })
        console.log(this.state)
    };

    handleDropDown = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
    }

    handleSubmit = evt => {
        evt.preventDefault();
        const { formData } = this.state;
        this.setState({
            showMessage: true
        })
        axiosInstance.post(TICKER_LIST_ENDPOINT, formData).then(
            respData=>{
                const { status } = respData;
                if (status === 201) {
                    this.props.fetchTickers();
                    this.closeWindow();
                }
            }
        ) 


    }

    closeWindow = () => {
        this.props.closeWindow('showListScreen')
    }
    

    render() {
        const { groups } = this.props;
        const { title , ticker, showMessage} = this.state.formData;

        return (
            <Row>
                <Col></Col>
                <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Create New Ticker</Card.Title>
                            <Card.Text>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control onChange={this.handleChange} value={title} name='title' type="text" placeholder="Enter...." />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Ticker code</Form.Label>
                                        <Form.Control onChange={this.handleChange} value={ticker} name='ticker' type="text" placeholder="Enter...." />
                                        <Form.Text className="text-muted">
                                            Must be unique.
                                        </Form.Text>
                                    </Form.Group>
                                            <div className="form-group">
                                              <label htmlFor="exampleFormControlSelect1">Example select</label>
                                                <select onClick={this.handleDropDown} name='group' className="form-control" id="exampleFormControlSelect1">
                                                   <option >Choose...</option>
                                                    {groups.length > 0 ? groups.results.map((group, i)=>{
                                                        return <option value={group.id}>{group.title}</option>
                                                    }) : null}
                                                  </select>
                                          </div>
                                      </Form>

                                </Card.Text>
                                <Button onClick={this.handleSubmit} variant="primary">Submit</Button>
                        </Card.Body>
                    </Card>
                    {showMessage ? <LoadingMessage /> : null}
                </Col>
                <Col><Button variant='warning' onClick={this.closeWindow}>Close Window</Button></Col>
            </Row>
        )
    }


}


const mapStateToProps = state => ({
    groups: state.tickerReducer.groups

})

export default connect(mapStateToProps, { fetchTickers, fetchGroup })(CreateTickerView);