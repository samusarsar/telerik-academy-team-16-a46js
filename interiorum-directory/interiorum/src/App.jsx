import { Routes, Route } from 'react-router-dom';

import RootLayout from './components/Views/RootLayout/RootLayout.jsx';
import Home from './components/Views/Home/Home.jsx';
import About from './components/Views/About/About.jsx';

import './App.css';

const App = () => {

    return (<>
        <Routes>
            <Route path='/' element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='about' element={<About />} />
            </Route>
        </Routes>

    </>);
};

export default App;
