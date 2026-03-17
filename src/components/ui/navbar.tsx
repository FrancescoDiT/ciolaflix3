'use client'
import React, { useState, useEffect } from 'react'
import GlassSurface from '../GlassSurface'
import { Button } from './button'
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className="flex justify-center items-center h-40">
            {isMounted && (
                <GlassSurface
                    width="93%"
                    height="70px"
                    borderRadius={40}
                    displace={0.5}
                    distortionScale={-180}
                    redOffset={0}
                    greenOffset={10}
                    blueOffset={20}
                    brightness={50}
                    opacity={0.80}
                    mixBlendMode="screen"
                    blur={10}
                >
                    <div className="w-full h-full flex justify-end items-center gap-2 px-6">
                        <ThemeToggleButton/>
                        {isLoggedIn ? (
                            <>
                                <Button variant="ghost" size="sm">profilo</Button>
                                <Button variant="destructive" size="sm" onClick={() => setIsLoggedIn(false)}>esci</Button>
                            </>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(true)}>accedi</Button>
                        )}
                    </div>
                </GlassSurface>
            )}
        </div>
    )
}
export default Navbar
