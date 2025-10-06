import { useCallback, useEffect, useState } from 'react';

import BookListElement from '../components/BookListElement';
import CheckIfLoading from '../components/CheckIfLoading';

import styles from '../styles/Gallery.module.css';

import { BookSimple, browseGenre } from '../util/api';



const genres = [
    'all',
    'action',
    'adventure',
    'art',
    'business',
    'classics',
    'crime',
    'economics',
    'education',
    'fantasy',
    'fiction',
    'historical',
    'horror',
    'humor',
    'mystery',
    'nonfiction',
    'romance',
    'sports',
    'thriller'
];


export default function Gallery() {
    const [books, setBooks] = useState<BookSimple[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>('all');


    const updateGenre = useCallback((newGenre: string) => {
        setSelectedGenre(newGenre);
    }, []);


    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const genre = selectedGenre == 'all' ? '' : selectedGenre;
            const data = await browseGenre(genre);
            setBooks(data.books.map((b: any) => b[0]));
            setLoading(false);
        };
        fetchBooks();
    }, [selectedGenre]);


    return (
        <div className={styles.container}>
            <div className={styles.genreContainer}>
                {genres.map(g => (
                    <div
                        className={`${styles.genre} ${g === selectedGenre ? styles.selectedGenre : ''}`}
                        key={g}
                        onClick={() => updateGenre(g)}
                    >
                        {g}
                    </div>
                ))}
            </div>

            {selectedGenre &&
                <div className={styles.bookListContainer}>
                    <CheckIfLoading loading={loading}>
                        {(books.length == 0) ?
                            <h3>No books found</h3>
                        :
                            <div className={styles.bookList}>
                                {books.map((b) => (
                                    <BookListElement
                                        key={b.id}
                                        book={b}
                                        allBookIds={books.map(book => book.id)}
                                    />
                                ))}
                            </div>
                        }
                    </CheckIfLoading>
                </div>
            }
        </div>
    );
}