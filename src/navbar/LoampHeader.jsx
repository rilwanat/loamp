import React, { useState, useEffect } from 'react';

import LoampHeaderHead from './LoampHeaderHead';
import AdminMobileNavbar from './AdminMobileNavbar';
// import AdminSideNavbar from './AdminSideNavbar';

import MarqueeTextContainer from "./MarqueeTextContainer";

export default function LoampHeader({ isMobile, gotoPage, showMarqees}) {
    
    return (
        <div className='fixed w-full  z-[9999]'>
            {/* { showMarqees ? <MarqueeTextContainer /> : <div></div> } */}
            <div>
                {isMobile ? <AdminMobileNavbar gotoPage={gotoPage} /> : <div></div>}
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    {isMobile ? <div></div> : <LoampHeaderHead gotoPage={gotoPage} />}
                </div>
            </div>
        </div>
    );
}
