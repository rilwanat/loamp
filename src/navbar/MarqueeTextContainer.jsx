import React, { useState, useEffect } from 'react';
// import { useSpring, animated } from 'react-spring';

const MarqueeTextContainer = () => {
  const sampleTexts = [
    "Welcome to Scrapp Ventures!",
    "Welcome to Scrapp Ventures!",
    "Welcome to Scrapp Ventures!",
    "Welcome to Scrapp Ventures!",
    "Welcome to Scrapp Ventures!",
    "Welcome to Scrapp Ventures!",
    "Welcome to Scrapp Ventures!",
  ];

//   // State to control animation trigger
//   const [startAnimation, setStartAnimation] = useState(false);

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => {
//         window.removeEventListener('resize', handleResize);
//     };
// }, []);
// const handleResize = () => {
//     setIsMobile(window.innerWidth <= 500);
// };


//   useEffect(() => {
//     setStartAnimation(true);
//   }, []);

  // const styles = useSpring({
  //   from: { transform: 'translateX(100%)' },
  //   to: { transform: 'translateX(-100%)' },
  //   loop: true, 
  //   config: { duration: isMobile ? 20000 : 40000 },  // Adjust speed here
  //   reset: true,
  //   reverse: false,
  //   immediate: !startAnimation,
  // });

  return (
    <div className='bg-gradient-to-r from-scrappGreenDark to-scrappGreenLight py-2.5 flex justify-center text-white' style={{ overflow: 'hidden', width: '100%', whiteSpace: 'nowrap' }}>
      {/* <animated.div style={{ ...styles, whiteSpace: 'nowrap' }}> */}
        {/* {sampleTexts.join(' • ')} */}
        {sampleTexts[0]}
      {/* </animated.div> */}
    </div>
  );
};

export default MarqueeTextContainer;
