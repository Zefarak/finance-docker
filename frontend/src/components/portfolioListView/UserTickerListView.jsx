import React, {useEffect} from 'react';
import {
    Button,
    Table,
    Row,
    Col

} from 'react-bootstrap';


function UserTickerListView(props){

  
    function handleUserTicker(ticker){
        props.handleUserTicker(ticker)
    }


    return(
        
        <Table>
            <thead>
                <tr>
                    <th>Ticker</th>
                        <th>Investment</th>
                        <th>Starting Price</th>
                        <th>Current Price</th>
                        <th>Qty</th>
                        <th>Current Value</th>
                         <th>+/-</th>
                        <th>+/- %</th>
                        <th></th>
                    </tr>
            </thead>
                        <tbody>
                            {props.items.results ? props.items.results.map((item, i)=> {
                                return (
                                    <tr>
                                        <td>{item.tag_ticker}</td>
                                        <td>{item.starting_investment}</td>
                                        <td>{item.starting_value_of_ticker}</td>
                                        <td>{item.current_value_of_ticker}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.current_value}</td>
                                        <td>{item.tag_diff}</td>
                                        <td>{item.tag_diff_percent}</td>
                                        <td><Button variant='primary' onClick={()=>handleUserTicker(item)}>Edit</Button> </td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </Table>
    )
}

export default UserTickerListView;