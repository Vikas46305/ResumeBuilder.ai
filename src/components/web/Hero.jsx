import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className="text-center md:w-[70%] m-auto">

            { /* Heading  */}
            <h1
                className="text-4xl font-bold">
                Build standout resumes with our smart,
                <span className="text-indigo-800"> AI-driven </span>
                resume tool.
            </h1>

            { /*  Paragraph */}
            <p
                className="text-xl px-5 mt-3">
                Build a professional and outstanding resume with our free builder and templates.
            </p>

            { /* Create and Watch Links */}
            <div className="my-5 space-x-5">

                { /* Create now Link  */}
                <Link
                    to="/resume/new"
                    className="p-3 bg-indigo-700 text-white rounded">
                    Create Now
                </Link>

                { /*  Watch video link  */}
                <Link
                    to="https://drive.google.com/file/d/1joWcbpuyTqzKeseX4HjiLUnZn2VQr8eB/view?usp=sharing"
                    target='_blank'
                    className="p-3 bg-indigo-700 text-white rounded">
                    Watch video
                </Link>
            </div>
        </div>

    )
}
export default Hero;