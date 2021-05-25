/* eslint-disable no-console */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import { Store } from './Store/Store';

interface Comment {
    comment: {
        name: string;
        email: string;
        body: string;
    };
}

export const StoreContext = React.createContext(Store);

function App() {
    const [comment, setComment] = React.useState<Comment>({
        comment: {
            name: '',
            email: '',
            body: '',
        },
    });
    const value: any = { comment, setComment };

    return (
        <StoreContext.Provider value={value}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
                <Home />
            </div>
        </StoreContext.Provider>
    );
}

export default App;
