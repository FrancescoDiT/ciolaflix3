import React from 'react'
import SplitText from '@/components/SplitText'
import {AnimatedSearchBar} from "@/app/(nav)/components/AnimatedSearchBar";
import {WelcomeSection} from "@/app/(nav)/components/WelcomeSection";

const Page = () => {
    return (
        <main>
            <div className="justify-center items-center flex ">
                {/*<SplitText*/}
                {/*    text="Benvenuto su Ciolaflix"*/}
                {/*    className="text-2xl font-semibold text-center"*/}
                {/*    delay={50}*/}
                {/*    duration={1.25}*/}
                {/*    ease="power3.out"*/}
                {/*    splitType="chars"*/}
                {/*    from={{ opacity: 0, y: 40 }}*/}
                {/*    to={{ opacity: 1, y: 0 }}*/}
                {/*    threshold={0.1}*/}
                {/*    rootMargin="-300px"*/}
                {/*    textAlign="center"*/}
                {/*/>*/}
                <div className={"flex flex-col items-center justify-center gap-8"}>
                    <WelcomeSection/>
                    <AnimatedSearchBar/>
                </div>
            </div>
        </main>
    )
}
export default Page
