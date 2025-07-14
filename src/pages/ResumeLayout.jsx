import { useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setPage } from "@/redux/slice";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Lazy-loaded resume sections
const PersonalInfo = lazy(() => import("../components/web/PersonalInfo"));
const Objective = lazy(() => import("../components/web/Objective"));
const Education = lazy(() => import("../components/web/Education"));
const Experience = lazy(() => import("../components/web/Experience"));
const Skills = lazy(() => import("../components/web/Skills"));
const Projects = lazy(() => import("../components/web/Projects"));
const Certifications = lazy(() => import("../components/web/Certifications"));

function ResumeLayout() {
    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.data);

    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#F1C40F",
        "#BA68C8", "#FFA726", "#FF69B4", "#D2B48C",
        "#40E0D0", "#5DADE2", "#1ABC9C", "#F5B041"
    ];

    const [color, setColor] = useState("#3357FF"); // Default border color

    return (
        <div className="flex items-center justify-center h-[88vh]">
            <div className="w-[95%] md:w-[40%] m-auto h-full overflow-y-auto p-2">

                {/* Theme and Navigation */}
                <div className="flex items-center justify-between px-1 text-gray-800 sticky top-0 bg-transparent py-2">

                    {/* Theme Selector */}
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="rounded cursor-pointer" variant="outline">
                                    Theme <i className="ri-color-filter-line text-lg"></i>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-36 p-1.5">
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    {colors.map((clr, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setColor(clr)}
                                            className="w-5 h-5 rounded-full cursor-pointer"
                                            style={{ backgroundColor: clr }}
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => dispatch(setPage(page - 1))}
                            variant="outline"
                            disabled={page === 1}
                            className="rounded cursor-pointer"
                        >
                            <i className="ri-arrow-left-long-line font-bold"></i>
                            Back
                        </Button>
                        <Button
                            onClick={() => dispatch(setPage(page + 1))}
                            variant="outline"
                            disabled={page === 7}
                            className="rounded cursor-pointer"
                        >
                            Next
                            <i className="ri-arrow-right-long-line font-bold"></i>
                        </Button>
                    </div>
                </div>

                {/* Page Content Area */}
                <div
                    className="w-full border-t-4 border-b-4 rounded-2xl mt-1 p-3"
                    style={{ borderColor: color }}
                >
                    <Suspense fallback={
                        <div className="flex items-center justify-center max-h-screen">
                            <img src="/loading.gif" alt="Loading" />
                        </div>}>
                        {page === 1 && <PersonalInfo />}
                        {page === 2 && <Objective />}
                        {page === 3 && <Education />}
                        {page === 4 && <Experience />}
                        {page === 5 && <Skills />}
                        {page === 6 && <Projects />}
                        {page === 7 && <Certifications />}
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default ResumeLayout;