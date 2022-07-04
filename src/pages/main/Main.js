import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/Topbar';

const Main = () => {
    return (
        <div>
            <section>
                <TopBar />
                <div className="container">
                    <Sidebar />
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

export default Main;