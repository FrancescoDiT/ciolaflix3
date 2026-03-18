'use client'
import React, { useState, useEffect } from 'react'
import GlassSurface from '../GlassSurface'
import { Button } from './button'
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";
import {useUser} from "@/context/UserContext";
import GradientText from "@/components/GradientText";
import {zodClient} from "@/api/client";
import Link from "next/link";

const Navbar = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const { user, setUser } = useUser()

    const onLogout = async () => {
        try {
            await zodClient.logout(undefined)
            setUser(null)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center items-center fixed py-6 z-50 w-full">
            {isMounted && (
                <GlassSurface
                    width="96%"
                    borderRadius={40}
                    displace={0.5}
                    distortionScale={-180}
                    redOffset={20}
                    greenOffset={10}
                    blueOffset={0}
                    brightness={50}
                    opacity={1}
                    mixBlendMode="screen"
                    blur={10}
                >
                    <div className="w-full h-full flex justify-between items-center gap-2 px-6">
                        <div>
                            <GradientText
                                animationSpeed={3.5}
                                direction={"horizontal"}
                                yoyo={false}
                                colors={["#ff5e1a", "#fb7e7e", "#e29832", "#ff8f8f"]}
                                className={"text-4xl"}
                            >
                                Ciolaflix
                            </GradientText>
                        </div>
                        <div className={"flex gap-4 items-center"}>
                        {/*<ThemeToggleButton/>*/}
                        {!!user ? (
                            <>
                                <Button variant={"outline"} className={"text-xl p-6"}>Il mio profilo</Button>
                                <Button variant="destructive" onClick={onLogout} className={"text-xl p-6"}>Esci</Button>
                            </>
                        ) : (
                            <Link href={"/login"}>
                                <Button variant="outline" className={"text-xl p-6"}>
                                    Accedi
                                </Button>
                            </Link>
                        )}
                        </div>
                    </div>
                </GlassSurface>
            )}
        </div>
    )
}
export default Navbar
