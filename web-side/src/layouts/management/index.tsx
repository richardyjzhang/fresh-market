import { Outlet } from 'umi';
import styles from './index.css';

export default function Layout() {
    return (
        <div className={styles.navs}>
            <Outlet />
        </div>
    );
}
