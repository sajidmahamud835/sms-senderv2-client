import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import TopBar from '../../components/topbar/Topbar';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import "./Main.css";

const Main = () => {
    const [small, setSmall] = useState(false);
    const [close, setClose] = useState(true);
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < 960) {
            setSmall(true);
        } else {
            setSmall(false);
        }
    }, [width]);

    return (
        <div>
            <section>
                <TopBar small={small} setClose={setClose} close={close} />

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
        </div>
    );
};

export default Main;