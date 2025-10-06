import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Search from './pages/Search';
import Gallery from './pages/Gallery';
import BookView from './pages/BookView';

import Layout from './components/Layout';



export default function App() {
    return (
        <BrowserRouter basename='/cs409-mp2'>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Search />} />
                    <Route path='book/:id' element={<BookView />} />
                    <Route path='gallery' element={<Gallery />} />
                    <Route path='search' element={<Search />} />
                    <Route index element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}