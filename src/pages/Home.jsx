import { lazy } from "react";

const Hero = lazy(() => import("../components/web/Hero"))
const Steps = lazy(() => import("../components/web/Steps"))

function Home() {
    return (
        <div className="w-[90%] md:w-[80%] m-auto py-10">
            <Hero />
            <Steps />
        </div>
    )
}
export default Home;