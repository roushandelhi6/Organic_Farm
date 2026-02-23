'use client';

import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
    const ringRef = useRef({ x: 0, y: 0 });
    const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            setPosition({ x, y });

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON'
            );

            // Add to trail
            setTrail(prev => [{ x, y }, ...prev.slice(0, 10)]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth ring following
    useEffect(() => {
        const followCursor = () => {
            ringRef.current = {
                x: ringRef.current.x + (position.x - ringRef.current.x) * 0.15,
                y: ringRef.current.y + (position.y - ringRef.current.y) * 0.15
            };
            setRingPos({ ...ringRef.current });
        };

        const rafId = requestAnimationFrame(followCursor);
        return () => cancelAnimationFrame(rafId);
    }, [position]);

    return (
        <>
            {/* Trail Particles */}
            {trail.map((point, i) => (
                <div
                    key={i}
                    className="cursor-particle hidden md:block"
                    style={{
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        transform: `translate(-50%, -50%) scale(${1 - i * 0.1})`,
                        opacity: 0.3 - i * 0.03,
                    }}
                />
            ))}

            {/* Central Dot */}
            <div
                className="custom-cursor-dot hidden md:block"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isPointer ? 0.5 : 1})`,
                    backgroundColor: isPointer ? '#D4A853' : '#0d7c66'
                }}
            />

            {/* Outer Animated Ring */}
            <div
                className="custom-cursor-ring hidden md:block animate-cursor-pulse"
                style={{
                    left: `${ringPos.x}px`,
                    top: `${ringPos.y}px`,
                    transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
                    borderColor: isPointer ? '#D4A853' : '#0d7c66',
                    borderWidth: isPointer ? '1px' : '2px'
                }}
            />
        </>
    );
};

export default CustomCursor;
