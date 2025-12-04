import skull from '../../assets/skull.svg';
import skullOne from '../../assets/skullOne.svg';
import SondSwitch from '../../assets/magical-reveal-start.ogg'
import {useRef, useState } from 'react';

import {PlayOggSound} from '../../utils/interactSond.jsx';
import followMouse from '../../utils/followMouse.jsx';

const FollowObjectDown = ({muted, shifted}) => {
    const [isSkullOne, setIsSkullOne] = useState(false);
    const skullRef = useRef();

    const HandleClickSkull = () => {
        setIsSkullOne(!isSkullOne);
        if(!muted) PlayOggSound(SondSwitch, 0.2, true);
    }

    const handleImageLoad = () => {
        skullRef.current ? 
        followMouse(
            skullRef.current, 
            { invert: true },
            { animateSmoothly: 0.005 }
        ) : null;
    }

    return (
        <div className={`followObjectDown ${shifted ? 'shifted' : ''}`}  onClick={HandleClickSkull}>
            <img src={isSkullOne ? skullOne : skull} alt='skull img' ref={skullRef} onLoad={handleImageLoad}/>
        </div>
        
    );
};

export default FollowObjectDown;
