import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import TopBar from '../../components/topbar/Topbar';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

const Main = () => {
    const [small, setSmall] = useState(false);
    const [close, setClose] = useState(false);
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

                <div className="container">
                    <Grid container spacing={2}>
                        {!small &&
                            <>
                                <Grid item sm={12} md={4}>
                                    <Sidebar setClose={setClose} />
                                </Grid>
                                <Grid item sm={12} md={8}>
                                    <Outlet />
                                </Grid>
                            </>
                        }
                        {small &&
                            <>
                                {!close &&
                                    <Grid item sm={12} md={4}>
                                        <Sidebar setClose={setClose} />
                                    </Grid>
                                }
                                {close &&
                                    <Grid item sm={12} md={8}>
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