import { JSX } from 'react';

import styles from '../styles/CheckIfLoading.module.css';



interface CheckIfLoadingProps {
    loading: boolean;
    children: JSX.Element;
}



export default function CheckIfLoading({ loading, children }: CheckIfLoadingProps) {
    if (loading) {
        return (
            <div className={styles.container}>
                <h3 className={styles.title}>Loading...</h3>
            </div>
        );
    }

    return children;
}