import { Grid } from '@material-ui/core';
import { Outlet } from 'react-router-dom';
import LayOut from '../../components/LayOut/LayOut';
import Sidebar from '../../components/sidebar/Sidebar';
import useSidebarToggles from '../../Hooks/useSidebarToggles';
import "./Main.css";

const Main = () => {
    const [small, close, setClose] = useSidebarToggles()

    return (
        <LayOut>
            <section>
                <div className="container" style={{ max: "1000px" }}>
                    <Grid container spacing={2}>
                        {!small &&
                            <>
                                <Grid item xs={12} md={3} style={{ width: "100%" }}>
                                    <Sidebar setClose={setClose} />
                                </Grid>
                                <Grid item xs={12} md={9} style={{ width: "100%" }}>
                                    <Outlet />
                                </Grid>
                            </>
                        }
                        {small &&
                            <>
                                {!close &&
                                    <Grid item sm={12} md={3} style={{ width: "100%" }}>
                                        <Sidebar setClose={setClose} />
                                    </Grid>
                                }
                                {close &&
                                    <Grid item sm={12} md={9} style={{ width: "100%" }}>
                                        <Outlet />
                                    </Grid>
                                }
                            </>
                        }
                    </Grid>
                </div>
            </section>
        </LayOut>
    );
};

export default Main;