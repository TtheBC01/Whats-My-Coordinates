import { useState, useEffect } from 'react';
import './App.css';

export default function Header() {

    const [installPrompt, setInstallPrompt] = useState<Event|null>(null);
    const [hideInstallPrompt, setHideInstallPrompt] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event: Event) => {
            console.log("App not installed yet.")
            event.preventDefault();
            setInstallPrompt(event);
            setHideInstallPrompt(false);
        })
    }, [])

    async function handleOnClick() {
        if(!installPrompt) {
            return;
        }
        const result = await (installPrompt as any).prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        disableInAppInstallPrompt();
    }

    function disableInAppInstallPrompt() {
        setInstallPrompt(null);
        setHideInstallPrompt(true);
      }

    return (
        <header className="App-header">
            <div></div>
            <div className='button-68-div' hidden={hideInstallPrompt}>
                <button className="button-68" onClick={handleOnClick}>Install</button>
            </div>
        </header>
    );
}