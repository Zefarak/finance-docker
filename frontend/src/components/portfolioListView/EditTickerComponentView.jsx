import React, {useEffect, useState } from 'react';


function EditTickerComponentView(props) {
    const [title, setTitle] = useState('');

    useEffect = () => {
        const ticker = props.ticker;
        setTitle(ticker.tag_title)
    };


    return (
        <div>
            <h4>{title}</h4>
        </div>
    )

    
}


export default EditTickerComponentView;