import { useEffect } from 'react';
import { useState } from 'react';
import useWindowDimensions from './useWindowDimensions';

const useSidebarToggles = () => {
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
    return [small, close, setClose];
};

export default useSidebarToggles;