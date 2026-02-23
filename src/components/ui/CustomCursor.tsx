'use client';

import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [leafPos, setLeafPos] = useState({ x: 0, y: 0 });
    const [wheatPos, setWheatPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON'
            );
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Lagging effect for leaf and wheat
    useEffect(() => {
        const followCursor = () => {
            setLeafPos(prev => ({
                x: prev.x + (position.x - prev.x) * 0.15,
                y: prev.y + (position.y - prev.y) * 0.15
            }));
            setWheatPos(prev => ({
                x: prev.x + (position.x - prev.x) * 0.1,
                y: prev.y + (position.y - prev.y) * 0.1
            }));
        };

        const rafId = requestAnimationFrame(followCursor);
        return () => cancelAnimationFrame(rafId);
    }, [position]);

    return (
        <>
            <div
                className="custom-cursor hidden md:block"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isPointer ? 2.5 : 1})`,
                    backgroundColor: isPointer ? 'rgba(13, 124, 102, 0.3)' : '#0d7c66'
                }}
            />

            {/* Leaf - Follows with delay */}
            <div
                className="cursor-leaf hidden md:block pointer-events-none"
                style={{
                    left: `${leafPos.x}px`,
                    top: `${leafPos.y}px`,
                    transform: `translate(15px, -25px) rotate(${position.x * 0.1}deg)`
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00012 22C2.00012 22 10.0001 21 17.0001 14C24.0001 7.00002 22.0001 2.00002 22.0001 2.00002C22.0001 2.00002 17.0001 -0.000109196 10.0001 6.99989C3.00012 13.9999 2.00012 22 2.00012 22Z" fill="#2D5A27" fillOpacity="0.6" />
                    <path d="M2 22L12 12" stroke="#1B3A18" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>

            {/* Wheat - Follows with more delay */}
            <div
                className="cursor-wheat hidden md:block pointer-events-none"
                style={{
                    left: `${wheatPos.x}px`,
                    top: `${wheatPos.y}px`,
                    transform: `translate(-25px, 15px) rotate(${position.y * 0.05}deg)`
                }}
            >
                <svg width="20" height="30" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 36V12M12 32L16 28M12 28L8 24M12 24L16 20M12 20L8 16M12 16L16 12M12 12L8 8" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="16" cy="28" r="2" fill="#D4A853" fillOpacity="0.7" />
                    <circle cx="8" cy="24" r="2" fill="#D4A853" fillOpacity="0.7" />
                    <circle cx="16" cy="20" r="2" fill="#D4A853" fillOpacity="0.7" />
                    <circle cx="8" cy="16" r="2" fill="#D4A853" fillOpacity="0.7" />
                </svg>
            </div>
        </>
    );
};

export default CustomCursor;
