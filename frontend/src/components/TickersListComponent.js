import React from 'react';

import { connect } from 'react-redux';

import {
    Card,
    Table,
    Button,
    Row,
    Col

} from  'react-bootstrap';




import { fetchTickers} from "../redux/actions/tickersActions";
import axiosInstance from "../helpers/axiosInstance";
import {USER_ITEM_DETAIL_ENDPOINT, USER_ITEMS_ENDPOINT} from "../helpers/endpoints";


class TickersListComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            formData:{
                portfolio: 0,
                value: 40,
                ticker: ''
            }
        }

    }

    componentDidMount(){
        this.props.fetchTickers();

        this.setState({
            formData:{
                portfolio: this.props.portfolioID
            }


        })
    };

    handleValue = (evt) => {
        const value = evt.target.value;
        const formData = {
            ...this.state.formData,
            starting_investment: value
        };
        this.setState({
            ...this.state,
            formData
        })
    };

    addTickerToPortfolio = (id) => {
        const data = {
            ...this.state.formData,
            ticker: id
        };
        console.log('data', data);

        axiosInstance.post(USER_ITEMS_ENDPOINT, data)
            .then(
                respData=>{
                    this.props.refreshPortfolio()
                }
            )
    };

    refreshUserTicker = (id) => {
        const endpoint = USER_ITEM_DETAIL_ENDPOINT + `${id}/`;
        axiosInstance.put(endpoint, {})
            .then(
                respData=>{

                }
            )
    }

    render(){
        const {tickers} = this.props;
        console.log(tickers);
        return (
            <Card>
                <Card.Title>
                    Tickers
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <Row>
                        <Col>
                            <input className='form-control' type='text' placeholder='Search' />
                        </Col>
                        <Col>
                            <input onChange={this.handleValue} className='form-control' type='number' value={this.state.formData.starting_investment} />
                        </Col>
                    </Row>


                </Card.Subtitle>
                <Card.Text>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ticker</th>
                                <th>Price</th>
                                <th>Expected Return</th>
                                <th>standard_deviation</th>
                                <th>Beta</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                        {tickers.results ? tickers.results.map((ticker, i)=>{
                            return (
                                <tr>
                                    <td>{ticker.id}</td>
                                    <td>{ticker.title}</td>
                                    <td>{ticker.price}</td>
                                    <td>{ticker.simply_return}</td>
                                    <td>{ticker.standard_deviation}</td>
                                    <td>{ticker.beta}</td>
                                    <td onClick={()=>this.addTickerToPortfolio(ticker.id)}><Button>Add</Button></td>
                                </tr>
                            )
                        }): null}
                        </tbody>
                    </Table>
                </Card.Text>
            </Card>
        )
    }



}


const mapStateToProps = state => ({
    tickers: state.tickerReducer.tickers
});


export default connect(mapStateToProps, {fetchTickers})(TickersListComponent)