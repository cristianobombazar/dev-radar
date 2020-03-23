import React, {useEffect, useState} from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {
    const [developers, setDevelopers] = useState([]);

    useEffect(() => {
        async function loadDevelopers() {
            const response = await api.get("/developer");
            setDevelopers(response.data);
        }
        loadDevelopers();
    }, []);

    async function handleSubmit(developer) {
        const response = await api.post('/developer', developer);
        setDevelopers([...developers, response.data]);
    }

    return (
        <div id="app">
            <aside>
                <strong>Register</strong>
                <DevForm onSubmit={handleSubmit}/>
            </aside>
            <main>
                <ul>
                    {developers.map(developer => (
                        <DevItem key={developer._id} developer={developer}/>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
