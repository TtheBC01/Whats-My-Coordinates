import { TfiGithub } from 'react-icons/tfi';
import './App.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className='copyright'> Copyright © 2023 <a href='https://toddchapman.io' className='copyright'>toddchapman.io</a></div>
            <div className='social'>
                <a href="https://github.com/TtheBC01/Whats-My-Coordinates"
                    className='github'>
                    <TfiGithub size='25px' />
                </a>
            </div>
        </footer>
    );
}