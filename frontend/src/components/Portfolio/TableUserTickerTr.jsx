import React, {Component} from 'react';
import { Button } from 'react-bootstrap';



class TableUserTickerTr extends Component{

    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handleUpdate = () =>{
        const id = this.props.item.id;

        this.props.handleUpdate(id)
    };

    render(){
        const {item} = this.props;

        return (
            <tr>
                <td>{item.tag_ticker}</td>
                <td>{item.tag_code}</td>
                <td>{item.starting_value_of_ticker}</td>
                <td>{item.qty}</td>
                <td>{item.starting_investment}</td>
                <td>{item.current_value_of_ticker}</td>
                <td>{item.tag_diff}</td>
                <td>{item.tag_diff_percent}</td>
                <td>{item.current_value}</td>
                <td>{item.updated}</td>
                <td>
                    <button onClick={this.handleUpdate} className='btn btn-primary'>Update</button>
                </td>
                <td>
                    <Button variant='danger'> Delete </Button>
                </td>
            </tr>
        )
    }
}


export default TableUserTickerTr;