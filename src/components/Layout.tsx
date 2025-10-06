import { Outlet, Link } from 'react-router-dom';

import styles from '../styles/Layout.module.css';



export default function Layout() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Book Search Directory</h1>

            <nav className={styles.navContainer}>
                <LinkElement
                    route='/search'
                    title='Search'
                />

                <LinkElement
                    route='/gallery'
                    title='Gallery'
                />
            </nav>

            <Outlet />
        </div>
    );
}



interface LinkElementProps {
    route: string;
    title: string;
}

function LinkElement({ route, title }: LinkElementProps) {
    return <Link to={route} className={styles.navItem}>{title}</Link>;
}