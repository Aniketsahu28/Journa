'use client'
import { useEffect, useState } from "react";

export default function useDeviceType(breakpoint: number = 640) {
    const [deviceType, setDeviceType] = useState<string>('mobile');

    useEffect(() => {
        const handleResize = () => setDeviceType(window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "laptop");
        handleResize();

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

    return deviceType;
}