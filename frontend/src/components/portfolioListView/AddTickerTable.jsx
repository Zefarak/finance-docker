import React, {useEffect, useState } from 'react';

import {
    Table,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import AddItemForm from './AddItemForm';


class AddTickerTable extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            showAddView: false,
            ticker: {}
        }
    }

    handleSelectTicker = (ticker) =>{
        console.log('select', ticker)
        this.setState({
            showAddView: true,
            ticker:ticker
        })
    }

    closeWindow = (swither=false) => {
        if (swither){
            this.setState({
                showAddView: false
            })
            this.props.closewindow('showTickerList')
        } else {
            this.setState({
                showAddView: false
            })
        }
        
    }


    render(){
        const { ticker, showAddView } = this.state;
        const { portfolio } = this.props;
        console.log('render', ticker)
        return (
            <div>
            <Row>
                <Col></Col>
                <Col><h4 className='center'>Add Ticker</h4></Col>
                <Col><Button variant='warning' onClick={()=>this.props.closewindow('showTickerList')}>Close Window</Button></Col>
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Code</th>
                                <th>Value</th>
                                <th>Return</th>
                                <th>Variance</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.tickersdata.tickers.results.map((ticker, i)=>{
                            return (
                                <tr>
                                    <td>{ticker.title}</td>
                                    <td>{ticker.ticker}</td>
                                    <td>{ticker.price}</td>
                                    <td>{ticker.simply_return}</td>
                                    <td>{ticker.standard_deviation}</td>
                                    <td><Button onClick={() => this.handleSelectTicker(ticker)} variant='success'>Add</Button></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    {showAddView ? <AddItemForm selectedticker={ticker}  portfolio={portfolio} closewindow={this.closeWindow} /> : null}
                </Col>
            </Row>
            
            
                        </div>
        )
    }
}



export default AddTickerTable;