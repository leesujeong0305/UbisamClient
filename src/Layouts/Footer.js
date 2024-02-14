import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div style={{
                minHeight: "13.5vh",
                display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1.4rem',
                backgroundColor: '#ADB5BD',
                color: 'white'
            }}>
                &copy; 2024 Ubisam. All Rights Reserved.    
            </div>
        </footer>
    );
};

export default Footer