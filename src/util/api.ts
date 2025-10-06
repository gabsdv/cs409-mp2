import axios from 'axios';



export type BookSimple = {
    id: number;
    title: string;
    image: string;
    authors: {
        id: string;
        name: string;
    }[];
    rating: {
        average: number;
    }
};

export type BookFull = BookSimple & {
    description: string;
    publish_date: number;
    number_of_pages: number;
    identifiers: {
        open_library_id: string;
        isbn_10: number;
        isbn_13: number;
    };
};



const URL = 'https://api.bigbookapi.com';
const API_KEY = '16aeba6ea47b4275acce7b591ff5712b';



export const searchBooks = async (query: string, sort: string, sortDirection: string) => {
    try {
        const response = await axios.get(`${URL}/search-books`, {
            params: {
                query,
                sort,
                'sort-direction': sortDirection,
                number: 100
            },
            headers: {
                'x-api-key': API_KEY
            }
        });
        return response.data;
    } catch (e) {
        console.log('Error fetching books: ', e);
    }
};