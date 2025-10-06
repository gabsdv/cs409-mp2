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
// ACCOUNT 1:
// const API_KEY = '16aeba6ea47b4275acce7b591ff5712b';
// ACCOUNT 2:
const API_KEY = '1d641eb945ee48fe8245886e1dff6bfd';



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


export const getBook = async (id: number) => {
        try {
        const response = await axios.get(`${URL}/${id}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        return response.data;
    } catch (e) {
        console.log('Error fetching books: ', e);
        return null;
    }
};


export const browseGenre = async (genre: string) => {
    try {
        const response = await axios.get(`${URL}/search-books`, {
            params: {
                ...(genre && { genres: genre }),
                number: 100
            },
            headers: {
                'x-api-key': API_KEY
            }
        });
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.log('Error fetching books: ', e);
    }
};