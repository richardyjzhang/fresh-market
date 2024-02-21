import { Outlet } from 'umi';
import { ConfigProvider, Dropdown } from 'antd';
import styles from './index.css';

export default function Layout() {

    // 右上角用户名的下拉菜单选项
    const userMenuItems = [
        {
            key: 'editPassword',
            label: '修改密码',
            onClick: () => {
                console.log('TODO: 修改密码');
            }
        },
        {
            key: 'logout',
            label: '退出登录',
            onClick: () => {
                console.log('退出登录');
            }
        }
    ];

    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#00b96b',
            }
        }}>
            <div className={styles.root}>
                <nav className={styles.nav}>
                    <img className={styles.icon} src='icon.png' />
                    <div className={styles.title}>瑶总鲜选管理后台</div>
                    <div className={styles.space} />
                    <div>
                        <Dropdown menu={{ items: userMenuItems, }}>
                            <div className={styles.userName}>管理员</div>
                        </Dropdown>
                    </div>

                </nav>
                <Outlet />
            </div>
        </ConfigProvider>

    );
}
