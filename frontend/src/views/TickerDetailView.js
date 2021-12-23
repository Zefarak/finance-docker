import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {withRouter} from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import {TICKER_ANALYSIS_ENDPOINT, TICKER_UPDATE_ENDPOINT} from '../helpers/endpoints';
import { fetchTicker } from '../redux/actions/tickersActions';
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    Form
} from 'react-bootstrap';

import axiosInstance from '../helpers/axiosInstance';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [0.1, 0.2, 0., 0.5, 0.2, 40],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
    maintainAspectRatio: true,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

class TickerUpdateView extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            showEdit: false,
            formData:{
                title: '',
                ticker: ''
            },
            analysis_data: {
                create_data_for_chart: null
            },
            
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        const endpoint = TICKER_UPDATE_ENDPOINT + id + '/';
        const analysis_endpoint = TICKER_ANALYSIS_ENDPOINT + id + '/';
        this.props.fetchTicker(endpoint);
        axiosInstance.get(analysis_endpoint)
            .then(respData=>{
                this.setState({
                    data: respData.data,
                    formData:{
                        title: this.props.ticker.title,
                        ticker:this.props.ticker.ticker,

                    }
                })
            })
    }

    handleChange = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        const formData = {
            ...this.state.formData,
            [name]: value
        };
        this.setState({
            ...this.state,
            formData
        })
    };

    handleShowEdit =() => {
        this.setState({
            showEdit: !this.state.showEdit
        })
    };

    handleFormSubmit = () => {
        const data = this.state.formData;
        const endpoint = TICKER_UPDATE_ENDPOINT + `${this.props.match.params.id}/`;
        axiosInstance.put(endpoint, data)
            .then(respData=>{
                window.location.reload()
            })
    }

    renderLineChart(){
        const fetched_data = this.state.analysis_data;
        const chart_data = fetched_data.create_data_for_chart ? fetched_data.create_data_for_chart : [];
        
        const my_datasets = [];
        for (let i=0; i<chart_data.length; i++){
            console.log('chart data', i, '=',chart_data[i])
        }
        
        const my_data = {
            labels: ['1', '2', '3', '4', '5', '6'],
            
            datasets:[
                
            ]
        };

        const data = {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
              {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
            ],
          };


        const options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };

        return  <Line data={data} options={options} />
    }

    render(){
        
        const { ticker } = this.props;
        const {chart_data, data, showEdit} = this.state;
        const {chart}= this.renderLineChart();
        console.log('data', data);
        return (
            <Container fluid='xxl'>
                <Row>
                    <Col xs={8}>
                        <br />
                        <hr />
                        <h4>Analysis Moving Average</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>Price</th>
                                    <th>sma(periods =2)</th>
                                    <th>sma(periods=12)</th>
                                    <th>Upper_bb</th>
                                    <th>Lower_bb</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data ? data.api_sma.reverse().slice(0,50).map((ele, i)=>{
                                return (
                                    <tr>
                                        <th>{ele[0]}</th>
                                        <th>{ele[1]}</th>
                                        <th>{ele[2]}</th>
                                        <th>{ele[3]}</th>
                                        <th>{ele[4]}</th>
                                        <th>{ele[5]}</th>
                                    </tr>
                                )
                            }): null}
                                
                            </tbody>
                        </Table>
                        
                    </Col>
                    <Col xs={4}>
                        <h4>{ticker.title}</h4>
                        <p>Updated {ticker.analysis}</p>
                        <br />
                        <Button variant='info'>Refresh Data</Button>
                        <Button onClick={this.handleShowEdit} variant='primary'>Edit</Button>
                        <br />
                        {showEdit ?
                            <div>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control onChange={this.handleChange} type='text' name='title' value={this.state.formData.title} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control onChange={this.handleChange} type='text' name='ticker' value={this.state.formData.ticker} />
                                    </Form.Group>
                                    <Button variant='primary' onClick={this.handleFormSubmit}> <i className='fa fa-save' /> Save </Button>
                                </Form>
                            </div>
                            : null}
                        <Table>
                            <thead>
                                <tr>
                                    <th>-</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Price</th>
                                    <td>{ticker.price}</td>
                                </tr>
                                <tr>
                                    <th>STD</th>
                                    <td>{ticker.standard_deviation}</td>
                                </tr>
                                <tr>
                                    <th>BETA</th>
                                    <td>{ticker.beta}</td>
                                </tr>
                                <tr>
                                    <th>Coverage</th>
                                    <td>{ticker.coverage}</td>
                                </tr>
                                <tr>
                                    <th>Market Variance</th>
                                    <td>{ticker.market_variance}</td>
                                </tr>
                                <tr>
                                    <th>Camp</th>
                                    <td>{ticker.camp}</td>
                                </tr>
                                <tr>
                                    <th>Simply Return</th>
                                    <td>{ticker.simply_return}</td>
                                </tr>
                                <tr>
                                    <th>Log Return</th>
                                    <td>{ticker.log_return}</td>
                                </tr>
                                <tr>
                                    <th>Sharp</th>
                                    <td>{ticker.sharp}</td>
                                </tr>
                            </tbody>
                        </Table>
                        
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state =>({
    ticker: state.tickerReducer.ticker
})






export default compose(withRouter, connect(mapStateToProps, {fetchTicker}))(TickerUpdateView)