import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

import axiosInstance from "../helpers/axiosInstance.js";
import { PORTFOLIO_DETAIL_ENDPOINT, USER_ITEMS_ENDPOINT } from '../helpers/endpoints';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Card,
    ListGroup

    
} from 'react-bootstrap';
import TickerListComponent from '../components/TickersListComponent';
import EditUserTicker from '../components/Portfolio/EditUserTicker.jsx';
import TableUserTickerTr from "../components/Portfolio/TableUserTickerTr";



class PortfolioDetailView extends React.Component {

    constructor(props){
        super(props);
        
        this.handleEditWindow = this.handleEditWindow.bind(this);

        this.state = {
            items: null,
            portfolio: {},
            showTickers: false,
            showEditWindow: false,
            editID: null
        }
    }


    checkDateDiff(date){
        const now = new Date();
        console.log('date', now)
    }

    componentDidMount(){
        this.refreshPortfolio();
        this.checkDateDiff('hello')
    }

    handleEditWindow(id){

        this.setState({
            ...this.state,
            showEditWindow: !this.state.showEditWindow,
            editID: id
        })
    };
    
    handleRefreshButton = () => {
        const {items} = this.state;
        console.log('hitted', items);
        for(let i=0; i<items.count; i++){
            const item = items.results[i];
            axiosInstance.put(item.url, {})
                .then(
                    resp=>{
                        this.refreshPortfolio()
                    }
                )
        }
    };

    refreshPortfolio = () => {
        const {id} = this.props.match.params;
        const portfolio_endpoint = PORTFOLIO_DETAIL_ENDPOINT + id + '/';
        axiosInstance.get(portfolio_endpoint)
            .then(respData=>{
                const portfolio = respData.data;
                this.setState({
                    portfolio: portfolio
                })

            });

        const user_items_endpoint = USER_ITEMS_ENDPOINT + '?portfolio=' + id  ;
        axiosInstance.get(user_items_endpoint)
            .then(respData=>{
                const items = respData.data;
                this.setState({
                    items: items
                })
            });
    }

    showTickers = () => {
        this.setState({
            showTickers: !this.state.showTickers
        })
    };

    

    render(){
        const {portfolio, items, showTickers, showEditWindow, editID} = this.state;


        return(
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h6>{portfolio.title}</h6>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>Current Value: {portfolio.current_value}</ListGroup.Item>
                                    <ListGroup.Item>Starting Value: {portfolio.starting_investment}</ListGroup.Item>
                                    <ListGroup.Item>+/-: {portfolio.get_difference}</ListGroup.Item>
                                    <ListGroup.Item>+/- %: {portfolio.percent_difference}</ListGroup.Item>
                                    <ListGroup.Item>annual_returns: {portfolio.annual_returns}</ListGroup.Item>
                                    <ListGroup.Item>expected_portfolio_return: {portfolio.expected_portfolio_return}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Button onClick={this.handleRefreshButton} variant='danger'>Refresh</Button>
                            </Card.Header>
                            {showEditWindow ? <EditUserTicker handleRefresh={this.handleRefreshButton} handleClose={this.handleEditWindow} ticker_id={editID} />: null }
                        </Card>
                    </Col>
                </Row>
                <br />
                <hr />
                <Row>
                    <Col xs={10}>
                    <h4>Selected Tickers</h4>
                    <Table bordered>
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Code</th>
                                    <th>Priced buyed</th>
                                    <th>Qty(Units)</th>
                                    <th>Invested</th>
                                    <th>Current Price</th>
                                    <th>Diff</th>
                                    <th>Diff %</th>
                                    <th>Current Value</th>
                                    <th>Last Updated</th>
                                    <th>-</th>
                                    <th>-</th>

                                </tr>
                            </thead>
                            <tbody>
                                {items ? items.results.map(item =>{
                                    return (
                                        <TableUserTickerTr item={item} handleUpdate={this.handleEditWindow} this_={this} />
                                    )
                                }) : null}
                            </tbody>
                        </Table>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.showTickers}>Show Tickers</Button>
                        <br />
                        <hr />
                        {showTickers ? <TickerListComponent portfolioID={portfolio.id}  refreshPortfolio={this.refreshPortfolio} /> : null}
                    </Col>
                </Row>
            </Container>
        )
    }





}


const mapStateToProps = state =>({
    tickers: state.tickerReducer.tickers
})


export default compose(withRouter, connect(mapStateToProps, {}))(PortfolioDetailView);
