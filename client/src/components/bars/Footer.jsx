import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <span style={styles.text}>
                    © {new Date().getFullYear()} SchoolIo. All rights reserved.
                </span>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: '#222',
        color: '#fff',
        padding: '16px 0',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        zIndex: 100,
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    text: {
        fontSize: '1rem',
        letterSpacing: '0.5px',
    },
};

export default Footer;