import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Pages/Home';
import './App.css'

import { ScrollToHash } from './Components/ScrollToHash';

function App() {
    return (
        <Router basename="/copacabana">
            <ScrollToHash />
            <Routes>
                <Route path="/" element={<Index />} />
            </Routes>
        </Router>
    );
}

export default App;