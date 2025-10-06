import { useEffect, useState } from 'react';

import { searchBooks } from '../util/api';

import styles from '../styles/Search.module.css';



type BookType = {

};



export default function Search() {
    const [books, setBooks] = useState<BookType[]>([]);
    const [input, setInput] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('rating');
    const [direction, setDirection] = useState<string>('ASC');
    console.log(books)


    const fetchBooks = async () => {
        console.log(input, sortBy, direction)
        if (!input) {
            setBooks([]);
            return;
        }
        const r = await searchBooks(input, sortBy, direction);
        console.log(r)
        console.log(r.books.length)
    }

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks, input, sortBy, direction]);


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

            <div>
                {/* {books.map((b) => <Book b={b} />)} */}
            </div>
        </div>
    );
}



// function Book({ book }: { book: BookType }) {
//     return (
//         <div>
            
//         </div>
//     );
// }