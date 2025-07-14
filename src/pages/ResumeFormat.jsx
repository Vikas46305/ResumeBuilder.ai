import { Link } from 'react-router-dom'

function ResumeFormat() {

    const ResumeFormat = [
        "https://www.hrcabin.com/wp-content/uploads/2021/09/B.Com-Freshe-Resume-for-Accounts-Job-ATS-Friendly-Download.png",
        "https://cdn.enhancv.com/predefined-examples/cZ2JlOHJlG63l7bVessOj0V2H7cyhiNIAmaJfZcK/image.png",
        "https://theartofresume.com/cdn/shop/files/1_resume_template_design_8_e5ac762b-bbb8-4750-8291-b7852a9e95e4.jpg?v=1716324415&width=1946",
        "https://venngage-wordpress.s3.amazonaws.com/uploads/2023/08/image-183.png"
    ]

    return (
        <div className="w-[95%] md:w-[80%] m-auto h-[90vh] md:h-[86vh]">

            { /* Heading */}
            <div>
                <h1 className="text-lg font-bold my-5">Select any format you want to print</h1>
            </div>

            { /* Format Map */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                {
                    ResumeFormat.map((format, index) => (
                        <Link
                            to={`/resume/format/${index + 1}`}
                            key={index}
                            className=" shadow shadow-gray-800 p-1 md:p-2 rounded-2xl">
                            <img
                                src={format}
                                alt="ResumeFormat"
                                className="w-44 h-52 md:w-64 md:h-72 m-auto rounded-2xl hover:scale-105 transition-all cursor-pointer" />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default ResumeFormat;