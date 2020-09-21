import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/home.css'

function Home(props) {
    const history = useHistory();
    console.log('history: ', history);

    return (
        <div className="home-page">
            <p> add your family recipe cards here!</p>
</div>
    )
        
    
}

export default Home