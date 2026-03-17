import React from 'react'
import ColorBends from "@/components/ColorBends";

const Background = () => {
    return (
        <div className="fixed inset-0">
            <ColorBends className="blur-2xl opacity-50 mix-blend-multiply"
                        // colors={["#ff0000", "#000000", "#00ff00", "#000000", "#0000ff"]}
                        colors={["#c07758", "#f5a46a", "#96432f", "#000000"]}
                        rotation={-76}
                        speed={0.2}
                        scale={0.8}
                        frequency={1}
                        warpStrength={1}
                        mouseInfluence={0}
                        parallax={0.5}
                        noise={0.1}
                        transparent
                        autoRotate={0}
            />
        </div>
    )
}
export default Background
