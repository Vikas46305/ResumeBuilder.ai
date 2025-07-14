import { Link, Outlet } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { setTheme } from '@/redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react'
import { useEffect } from 'react'

function Navbar() {

    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        const HandleScroll = () => {
            setScroll(window.scrollY > 10)
        }

        window.addEventListener("scroll", HandleScroll)
        return () => window.removeEventListener("scroll", HandleScroll)

    }, [scroll])

    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.data)

    return (
        <>
            <nav
                className={`flex items-center justify-between px-8 py-3 shadow 
                    ${theme == "dark" ? "shadow-white" : "shadow-black"} fixed top-0 left-0 right-0 bg-transparent
                    ${scroll ? "backdrop-blur bg-white/40 dark:bg-black/60 z-[9999]" : ""}`
                }>

                { /*  Link for Home Page  */}
                <Link to="/" className='text-xl font-bold' style={{
                    fontFamily: "cursive"
                }}>ResumeBuilder.ai</Link>

                { /* Dark and Light Functionality */}
                <Popover>

                    { /* Open Button  */}
                    <PopoverTrigger asChild>
                        <Button className="cursor-pointer rounded bg-gray-200 text-gray-800" variant="outline">Theme</Button>
                    </PopoverTrigger>

                    { /*  Dark mode and Light mode Button */}
                    <PopoverContent className="w-44 p-2 mt-2 mr-2">
                        <div className="flex flex-col gap-2 m-auto">

                            { /*  Light Mode  */}
                            <Button
                                onClick={() => dispatch(setTheme("light"))}
                                className="cursor-pointer"
                                variant="outline"
                            >
                                Light
                                <i className="ri-sun-line text-xl"></i>
                            </Button>

                            { /*  Dark Mode */}
                            <Button
                                onClick={() => dispatch(setTheme("dark"))}
                                className="cursor-pointer"
                                variant="outline"
                            >
                                Dark
                                <i className="ri-sun-fill text-xl"></i>
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </nav>

            { /* Outlet */}
            <div className='py-8'>
                <Outlet />
            </div>
        </>
    )
}
export default Navbar;