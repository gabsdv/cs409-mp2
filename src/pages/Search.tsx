import { useEffect, useState } from 'react';

import CheckIfLoading from '../components/CheckIfLoading';
import BookListElement from '../components/BookListElement';

import { BookSimple, searchBooks } from '../util/api';

import styles from '../styles/Search.module.css';



export default function Search() {
    const [books, setBooks] = useState<BookSimple[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('rating');
    const [direction, setDirection] = useState<string>('ASC');


    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const fetchBooks = async () => {
                if (!input) {
                    setBooks([]);
                    setLoading(false);
                    return;
                }
                const data = await searchBooks(input, sortBy, direction);
                setBooks(data.books.map((b: any) => b[0]));
                setLoading(false);
            }
            fetchBooks();
        }, 1500);

        return () => clearTimeout(timer);
    }, [input, sortBy, direction]);


    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input
                    type='text'
                    className={styles.searchInput}
                    placeholder='Search for books'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value='rating'>Rating</option>
                    <option value='publish-date'>Date Published</option>
                </select>
                
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type='radio'
                            name='order'
                            value='ASC'
                            checked={direction === 'ASC'}
                            onChange={(e) => setDirection(e.target.value)}
                            defaultChecked
                        />
                        ascending
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type='radio'
                            name='order'
                            value='DESC'
                            checked={direction === 'DESC'}
                            onChange={(e) => setDirection(e.target.value)}
                        />
                        descending
                    </label>
                </div>
            </div>

            {input &&
                <div className={styles.bookListContainer}>
                    <CheckIfLoading loading={loading}>
                        {(books.length == 0) ?
                            <h3>No books found</h3>
                        :
                            <div className={styles.bookList}>
                                {books.map((b) => <BookListElement book={b} />)}
                            </div>
                        }
                    </CheckIfLoading>
                </div>
            }
        </div>
    );
}