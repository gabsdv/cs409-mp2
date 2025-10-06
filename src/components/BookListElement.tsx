import { Link } from 'react-router-dom';

import styles from '../styles/BookListElement.module.css'

import { BookSimple } from '../util/api';



interface BookListElementProps {
    book: BookSimple;
    allBookIds: number[];
}

export default function BookListElement({ book, allBookIds }: BookListElementProps) {
    return (
        <Link
            to={`/book/${book.id}`}
            state={{ bookIds: allBookIds }}
        >
            <div className={styles.container}>
                <img
                    src={book.image}
                    alt={book.title}
                    className={styles.image}
                />
            </div>
        </Link>
    );
}