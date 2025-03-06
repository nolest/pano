import '@/styles/giant/giant.scss'

function Giant() {
    return (
        <>
            <div className="giant">
                <img src="/giant/zealot.jpg" className="giant__image" />
                <div className="giant__cover">
                    <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink">
                        <filter id="blurMe">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                        </filter>

                        <circle cx="220" cy="16" r="15" fill="hsla(179, 100% , 68%, 0.5)" className='giant__circle' filter="url(#blurMe)">
                        <animate attributeName="fill" 
                            dur="2s" 
                            repeatCount="indefinite" 
                            keyTimes="0;0.5;1" values="hsla(179, 100% , 68%, 0.5);hsla(179, 100% , 68%, 1);hsla(179, 100% , 68%, 0.5);" />
                        </circle>

                        {/* <circle cx="170" cy="60" r="50" fill="green" filter="url(#blurMe)" /> */}
                    </svg>
                </div>
            </div>
            {/* <svg width="806" height="454" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
                </feMerge>
                </filter>
                <path d="M 1250,450 Q 800,300 350,850" stroke="blue" stroke-width="50" filter="url(#glow)" className="flash" />
                </svg> */}
        </>
    )
}

export default Giant
