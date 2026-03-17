import React from 'react'
import ColorBends from "@/components/ColorBends";

const Background = () => {
    return (
        <div className="fixed inset-0 -z-10">
            <ColorBends className="blur-[15px] opacity-100"
                        colors={["#ff0000", "#000000", "#00ff00", "#000000", "#0000ff"]}
                        rotation={0}
                        speed={0.5}
                        scale={0.5}
                        frequency={1}
                        warpStrength={1}
                        mouseInfluence={1}
                        parallax={0.5}
                        noise={0.1}
                        transparent
                        autoRotate={0}
            />
        </div>
    )
}
export default Background
