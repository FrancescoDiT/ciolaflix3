import React from 'react'
import SplitText from '@/components/SplitText'

const Page = () => {
    return (
        <main>
            <div className="justify-center items-center flex ">
                <SplitText
                    text="Benvenuto su Ciolaflix"
                    className="text-2xl font-semibold text-center"
                    delay={50}
                    duration={1.25}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-300px"
                    textAlign="center"
                />
            </div>
        </main>
    )
}
export default Page
