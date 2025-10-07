import { useCallback, useEffect, useState } from 'react';

import { useParams, Link, useLocation } from 'react-router-dom';

import CheckIfLoading from '../components/CheckIfLoading';

import styles from '../styles/BookView.module.css';

import { BookFull, getBook } from '../util/api';



export default function BookView() {
    const { id } = useParams();
    const location = useLocation();

    const [book, setBook] = useState<BookFull | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const currentId = Number(id);
    const bookIds = location.state?.bookIds || [];
    const currentIndex = bookIds.indexOf(currentId);

    const prevId = currentIndex > 0 ? bookIds[currentIndex - 1] : null;
    const nextId = currentIndex < bookIds.length - 1 ? bookIds[currentIndex + 1] : null;

    const fetchBook = useCallback(async () => {
        setLoading(true);
        const book = await getBook(Number(id));
        setBook(book);
        setLoading(false);
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetchBook();
    }, [id, fetchBook]);


    return (
        <CheckIfLoading loading={loading}>
            <div className={styles.container}>
                {prevId &&
                    <Link 
                        to={`/book/${prevId}`} 
                        className={styles.navButton}
                        state={{ bookIds }}
                    >
                        {'<'}
                    </Link>
                }

                {book ?
                    <div className={styles.bookContainer}>
                        {book.image && <div className={styles.imageSection}>
                            <img 
                                src={book.image} 
                                alt={book.title}
                                className={styles.bookImage}
                            />
                        </div>}

                        <div className={styles.detailsSection}>
                            {book.title && <h1 className={styles.title}>{book.title}</h1>}

                            <div>
                                {book.authors &&
                                    <div className={styles.info}>
                                        <strong>Authors:</strong>{' '}
                                        {book.authors.map((author, index) => (
                                            <span key={author.id}>
                                                {author.name}
                                                {index < book.authors.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                }

                                {book.rating &&
                                    <div className={styles.info}>
                                        <strong>Rating:</strong> {book.rating.average.toFixed(1)} / 5
                                    </div>
                                }

                                {book.publish_date &&
                                    <div className={styles.info}>
                                        <strong>Published:</strong> {book.publish_date}
                                    </div>
                                }

                                <div className={styles.info}>
                                    <strong>Pages:</strong> {book.number_of_pages}
                                </div>
                            </div>

                            <div className={styles.info}>
                                <strong>Description:</strong>
                                <p>{book.description}</p>
                            </div>

                            {book.identifiers &&
                                <div className={styles.info}>
                                    <strong>Identifiers:</strong>
                                    {book.identifiers.isbn_10 && <div>ISBN-10: {book.identifiers.isbn_10}</div>}
                                    {book.identifiers.isbn_13 && <div>ISBN-13: {book.identifiers.isbn_13}</div>}
                                    {book.identifiers.open_library_id && <div>Open Library: {book.identifiers.open_library_id}</div>}
                                </div>
                            }
                        </div>
                    </div>
                :
                    <div>
                        <h1>Book not found</h1>
                    </div>
                }

                {nextId &&
                    <Link 
                        to={`/book/${nextId}`} 
                        className={styles.navButton}
                        state={{ bookIds }}
                    >
                        {'>'}
                    </Link>
                }
            </div>
        </CheckIfLoading>
    );
}