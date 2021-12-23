import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { fetchTickers } from '../redux/actions/tickersActions';

import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Card,
    Form,

} from 'react-bootstrap';
import axiosInstance from "../helpers/axiosInstance";
import {TICKER_LIST_ENDPOINT} from "../helpers/endpoints";
import MyNavbar from '../components/Navbar';
import CreateTickerView from '../components/TickersPage/CreateTickerView';
import TickerDetailView from '../components/TickersPage/TickerDetailView';


class TickerListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screens:{
                showCreateScreen: false,
                showEditScreen: false,
                showListScreen: true
            },
            selectedTicker: {},

            search_data: '',
            form_data: {
                title: '',
                ticker: ''
            }
        }
       
    }

    componentDidMount(){
        this.props.fetchTickers();
    }

    handleCreateScreen = () => {
        this.handleNavigation('showCreateScreen')
    }

    handleSelectTicker = (ticker) => {
        this.setState({
            selectedTicker: ticker
        })
        this.handleNavigation('showEditScreen')
    }


    handleNavigation = (screen='showListScreen') => {
        const defaultScreens = {
            showCreateScreen: false,
            showEditScreen: false,
            showListScreen: false
            
        }
        this.setState({
            ...this.state.screens,
            screens:{
                ...defaultScreens,
                [screen]: true
            }
            
        })
    }


    handleCreateButton  = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    };

    handleChange = (evt) => {
        evt.preventDefault();
        const name = evt.target.name;
        const value = evt.target.value;
        console.log(name, value);
        const form_data = {
            ...this.state.form_data,
            [name]: value
        };
        this.setState({
            ...this.state,
            form_data: form_data
        })
    };

    handleSearch = (evt) => {
        evt.preventDefault();
        const value = evt.target.value;
        this.setState({
            search_data: value
        });
        console.log('handle data', value)
        if( value.length > 2){
            const ticker_endpoint = TICKER_LIST_ENDPOINT + `?search=${value}`;
            this.props.fetchTickers(ticker_endpoint)

        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state.form_data;

        axiosInstance.post(TICKER_LIST_ENDPOINT, data)
            .then(
                respData=>{
                    const data = respData.data;
                    this.props.fetchTickers()
                    
                }
            )
    };

    handleDropDown = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
    }

    


    render(){
        const { tickers } = this.props;
        const { showCreateScreen, showListScreen, showEditScreen } = this.state.screens;
        const { selectedTicker } = this.state;
        const color = showCreateScreen ? 'danger' : 'success';
        console.log('ticker list', selectedTicker, showEditScreen)
        return (
            <div>
                <MyNavbar />
                <Container>
                <br />
                {showListScreen ? 
                <Row>
                    <Col>
                        <h5>Tickers List</h5>
                        <Button variant={color} onClick={this.handleCreateScreen}>{showCreateScreen ? "Close Window" : "Create" }</Button>
                        <br /> <hr />
                        <input onChange={this.handleSearch} className='form-control' placeholder='Search...' name='search' value={this.state.search_data}  />
                        <br />
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Code</th>
                                    <th>beta</th>
                                    <th>coverage</th>
                                    <th>market_variance</th>
                                    <th>camp</th>
                                    <th>price</th>
                                    <th>simply_return</th>
                                    <th>log_return</th>
                                    <th>standard_deviation</th>
                               
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickers.results ? tickers.results.map((item, i)=>{
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.ticker}</td>
                                            <td>{item.beta}</td>
                                            <td>{item.coverage}</td>
                                            <td>{item.market_variance}</td>
                                            <td>{item.camp}</td>
                                            <td>{item.price}</td>
                                            <td>{item.simply_return}</td>
                                            <td>{item.log_return}</td>
                                            <td>{item.standard_deviation}</td>
                                           
                                            <td><Button onClick={()=> this.handleSelectTicker(item)} variant='primary'>Edit</Button></td>
                                        </tr>
                                    )
                                }): null }
                            </tbody>
                        </Table>
                        <hr />
                        <p>Next Page</p>

                    </Col>

                </Row> : null }
                {showCreateScreen ? <CreateTickerView closeWindow={this.handleNavigation}  /> : null}
                {showEditScreen ? <TickerDetailView ticker={selectedTicker} closeWindow={this.handleNavigation} /> :null}
                </Container>
            </div>
        )
    }
        
    
}


const mapStateToProps = state => ({
    tickers: state.tickerReducer.tickers,

})

export default compose(withRouter, connect(mapStateToProps, {fetchTickers}))(TickerListView);