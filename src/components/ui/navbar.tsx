'use client'
import React, { useState, useEffect } from 'react'
import GlassSurface from '../GlassSurface'
import { Button } from './button'
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import {useUser} from "@/context/UserContext";

const Navbar = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const { user } = useUser()

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
                        {!!user ? (
                            <>
                                <Button variant="ghost" size="sm">{user?.firstName}</Button>
                                <Button variant="destructive" size="sm">esci</Button>
                            </>
                        ) : (
                            <Button variant="ghost" size="sm">accedi</Button>
                        )}
                    </div>
                </GlassSurface>
            )}
        </div>
    )
}
export default Navbar
