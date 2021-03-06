import React from 'react';
import Tilt from 'react-tilt';
import brain from './icon.png'
import './logo.css'

const Logo = () => {
    return (
        <div className='ma4 mto'>
            <Tilt className="Tilt br2 shadow-2 center divTilt" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px'}}src={brain} alt='logo'></img></div>
            </Tilt>
        </div>
    )
}

export default Logo;