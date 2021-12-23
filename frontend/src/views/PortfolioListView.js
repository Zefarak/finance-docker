import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

import { PORTFOLIO_ENDPOINT } from '../helpers/endpoints';
import { fetchUserPortfolios, fetchPortfolioUserData, fetchSelectedPortfolio, clearSelectedPortfolio } from '../redux/actions/portfolioActions';
import { fetchUserData } from '../redux/actions/authActions';
import MyNavbar from '../components/Navbar';
import EditPortfolioComponentView from '../components/portfolioListView/PortfolioDetailComponent';
import HomepageComponent from '../components/portfolioListView/HomepageComponent';



class PortfolioListView extends Component {

    constructor(props){
        super(props);
    }

    closeWindow = () =>{
        this.props.clearSelectedPortfolio()
    }

   
        
    render(){
        const { portfolio } = this.props;
        return(
            <div>
                <MyNavbar />
                <br />
                <hr />
                
                {portfolio ? <EditPortfolioComponentView portfolio={portfolio} closeWindow={this.closeWindow} /> : <HomepageComponent /> }
            </div>
        )
    }
}



const mapStateToProps = state => ({
    portfolio: state.portfolioReducer.portfolio 
})

export default compose(withRouter,
     connect(mapStateToProps, { 
        fetchSelectedPortfolio,
        clearSelectedPortfolio
    }))(PortfolioListView);