import { Link } from 'react-router-dom';

import styles from '../styles/BookListElement.module.css'

import { BookSimple } from '../util/api';



interface BookListElementProps {
    book: BookSimple;
}

export default function BookListElement({ book }: BookListElementProps) {
    return (
        <Link to={`/book/${book.id}`}>
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