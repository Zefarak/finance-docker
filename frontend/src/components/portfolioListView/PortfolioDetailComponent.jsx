import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import axiosInstance from '../../helpers/axiosInstance';
import { fetchUserPortfolios, fetchSelectedPortfolio, fetchSelectedPortfolioItems } from '../../redux/actions/portfolioActions';
import { PORTFOLIO_DETAIL_ENDPOINT, TICKER_LIST_ENDPOINT, USER_ITEMS_ENDPOINT, PORTFOLIO_ENDPOINT, PORTFOLIO_REFRESH_DATA_ENDPOINT } from '../../helpers/endpoints';
import {
    Row,
    Col, 
    Table,
    Button,

} from 'react-bootstrap';

import EditUserTickerComponent from './EditUserTicker';
import UserTickerListView from './UserTickerListView';
import AddTickerTable from './AddTickerTable';
import AddItemForm from './AddItemForm';


class EditPortfolioComponentView extends Component{

    constructor(props){
        super(props);
        this.reloadPage = this.reloadPage.bind(this);
        this.handleUserTicker = this.handleUserTicker.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            portfolio: {},
            items: {
                results: null
            },

            screens: {
                showDetail: false,
                showAddItem: false,
                showAddTickerTable: false,
                showEditUserTickerScreen: false,
                showTickerList: true
            },

            selectedTicker:{
                formData: {},
                ticker: {}
            },

            selectedUserTicker:{
                ticker:{}
            },

            tickersData: {
                searchText: '',
                tickers: [],
                doneLoading: false
            }
        }
    }

    componentDidMount(){
        const {portfolio} = this.props;
        console.log('here!, detail', portfolio.id)
        const itemsEnpoint = USER_ITEMS_ENDPOINT + `?portfolio=${portfolio.id}`;

        axiosInstance.get(itemsEnpoint)
            .then(respData=>{
                const items = respData.data;
                
                const screens = {
                    ...this.state.screens,
                    showDetail: true,
                    showAddItem: false,
                    showAddTickerTable: false
                }
                this.setState({
                    ...this.state,
                    items,
                    portfolio,
                    screens
                })
            })
        
    }

    componentDidUpdate(prevProps){
       
        if (prevProps.portfolio !== this.props.portfolio){
            this.reloadPage()
        }
    }

    reloadPage(){
        const {portfolio} = this.props;
        const itemsEnpoint = USER_ITEMS_ENDPOINT + `?portfolio=${portfolio.id}`;

        axiosInstance.get(itemsEnpoint)
            .then(respData=>{
                const items = respData.data;
                this.closeAllWindows()
                this.setState({
                    ...this.state,
                    items,
                    portfolio,
                })

            })
    }

    handleSelectTicker = (ticker) => {
        const selectedTicker = {
            ticker: ticker,
            formData: {
                ticker: ticker.id,
                portfolio: this.state.portfolio.id,
                qty: 0,
                starting_value_of_ticker: 0
            }
        }
        this.setState({
            ...this.state,
            screens: {
                ...this.state.screens,
                showAddItem: true,
                showAddTickerTable: false

            },
            selectedTicker

        })
    }
    

    handleSubmitTicker = ()=>{
        const endpoint = USER_ITEMS_ENDPOINT;
        const data = this.state.selectedTicker.formData;

        axiosInstance.post(endpoint, data)
            .then(
                respData=>{
                    const repsData = respData.data;
                    const screens = {
                        ...this.state.screens,
                        showAddItem: false,
                        showAddTickerTable: false,
                        
                    }
                    
                }
            )
    }

    handleSearch = (evt) => {
        evt.preventDefault();
        const value = evt.target.value;
        const endpoint = TICKER_LIST_ENDPOINT + `?search=${value}`;
        axiosInstance.get(endpoint)
            .then(respData=>{
                const data = respData.data;
                
                const tickersData = {
                    searchText: value,
                    tickers: data
                }
                
                this.setState({
                    ...this.state,
                    tickersData,

                })
                this.handleNavigate('showAddTickerTable')
            })

    }

    handleUserTicker(ticker){
        this.handleNavigate('showEditUserTickerScreen')
        this.setState({
            selectedUserTicker: {
                ticker: ticker
            }
        })
    }

    resetScreens(){
        const scr = {
            showDetail: false,
            showAddItem: false,
            showAddTickerTable: false,
            showEditUserTickerScreen: false,
            showTickerList: false
        }
        return scr
        
    }

    handleNavigate = (openScreen='showTickerList') => {
        const myScreens = this.resetScreens();
        this.setState({
            screens:{
                ...myScreens,
                [openScreen]: true
            }
        })
    }

    closeAllWindows = (openScreen) =>{
        const screens = {
            ...this.state.screens,
            showAddItem: false,
            showAddTickerTable:false
        }
    }

    closeWindow = (openScreen)=>{
        this.handleNavigate(openScreen)
    }

    handleDelete(){
        const endpoint = PORTFOLIO_DETAIL_ENDPOINT  + `${this.props.portfolio.id}/`;
        axiosInstance.delete(endpoint)
            .then(
                respData=>{
                    const { status } = respData;
                    if ( status === 204 ){
                        this.props.closeWindow()
                    }
                }
            )
    }

    

    handleUpdatePortfolio = () =>{
        const { portfolio } = this.props;
        const endpoint = PORTFOLIO_REFRESH_DATA_ENDPOINT + `${portfolio.id}/`;
        axiosInstance.get(endpoint)
            .then(respData=>{
                const { status } = respData;
                console.log('refresh Data', status, respData)
            })
    }

    render(){
        const { portfolio } = this.props;
        const { tickersData, selectedTicker, items, screens, selectedUserTicker } = this.state;
        
        return (
            <div>
                <Row>
                    <Col><Button onClick={this.handleDelete} variant='danger'>Delete</Button></Col>
                    <Col>{portfolio ?<h4>{portfolio.title}</h4> : null}</Col>
                    <Col><Button onClick={() => this.props.closeWindow()} variant='warning'>Close Window</Button></Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Current Value: {portfolio.current_value}</th>
                                    <th>+/- %: {portfolio.percent_difference}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Starting Investment</th>
                                    <td>{portfolio.starting_investment}   ({portfolio.get_difference})</td>
                                </tr>
                                <tr>
                                    <th>Volatility</th>
                                    <td>{portfolio.expected_portfolio_volatility}</td>
                                </tr>
                                <tr>
                                    <th>Variance</th>
                                    <td>{portfolio.expected_portfolio_variance}</td>
                                </tr>
                                <tr>
                                    <th>Return</th>
                                    <td>{portfolio.expected_portfolio_return}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                    <input className='form-control' type='text' placeholder='Search Tickers' value={tickersData.searchText} onChange={this.handleSearch} />
                    <br />
                    <Button onClick={this.handleUpdatePortfolio} variant='primary'>Update Tickers</Button>
                    </Col>
                </Row>
                    
                    <br />
                    {screens.showTickerList ? <UserTickerListView items={items} handleUserTicker={this.handleUserTicker} /> : null }
                    {screens.showAddTickerTable ? <AddTickerTable tickersdata={tickersData} handleSelectTicker={this.handleSelectTicker} portfolio={portfolio} closewindow={this.handleNavigate} /> :null}
                    {screens.showAddItem ? <AddItemForm selectedticker={selectedTicker}  portfolio={portfolio} closewindow={this.closeWindow} /> : null}
                    {screens.showEditUserTickerScreen ? <EditUserTickerComponent userticker={selectedUserTicker.ticker}  closewindow={this.handleNavigate} />:null}
                </div>
                
            
        )
    }
}

EditPortfolioComponentView.propTypes = {
    port: PropTypes.object,
    items: PropTypes.array,
    fetchUserPortfolios: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    port: state.portfolioReducer.portfolio,
    myItems: state.portfolioReducer.user_items
})

const acts = {
    fetchSelectedPortfolioItems,
    fetchSelectedPortfolio,
    fetchUserPortfolios
}

export default connect(mapStateToProps, { acts })(EditPortfolioComponentView);