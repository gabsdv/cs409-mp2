import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './pages/Search';
import Gallery from './pages/Gallery';
import ArtPiece from './pages/ArtPiece';

import Layout from './components/Layout';



export default function App() {
    return (
        <BrowserRouter basename='/mp2'>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Search />} />
                    <Route path='piece/:id' element={<ArtPiece />} />
                    <Route path='gallery' element={<Gallery />} />
                    <Route path='search' element={<Search />} />
                    <Route index element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}