import React from 'react';

import {
    Col,
    Row,
    
} from 'react-bootstrap';


function LoadingMessage(message='Wait a little, we are Loading data!'){

    return (
        <Row>
            <Col>
                <h5>{message}</h5>
            </Col>
        </Row>
    )
}

export default LoadingMessage;