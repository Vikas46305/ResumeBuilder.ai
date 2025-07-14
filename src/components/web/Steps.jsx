function Steps() {

    const Step = [
        {
            img: "https://png.pngtree.com/png-clipart/20230315/ourmid/pngtree-white-computer-mouse-with-wire-png-image_6648731.png",
            name: "step 1",
            title: "Click on create new",
            description: "Click on create new resume button. To create a new resume"
        },
        {
            img: "https://cdn-images.zety.com/images/zety/landings/builder/builder-image-cta@1x.webp",
            name: "step 2",
            title: "Fill the details",
            description: "Fill all the required details correct and best of your knowledge"
        },
        {
            img: "https://cdn-images.zety.com/images/zety/landings/builder/benefits-image-5@1x.webp",
            name: "step 3",
            title: "Download you resume",
            description: "Now you can download your resume in pdf or doc formate"
        },
    ]

    return (
        <div className="text-center py-5">

            { /*  Heading */}
            <h1
                className="text-2xl font-semibold my-5">
                Create a Job-Winning Resume in 3 easy Steps
            </h1>

            { /*  Steps Map */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    Step.map((items, index) => (
                        <div
                            className="m-auto bg-transparent border-2 rounded-2xl p-2"
                            key={index}>
                            <img src={items.img} alt={items.title} className="w-44 h-44 m-auto" />
                            <p className="font-semibold">{items.name}</p>
                            <h1 className="text-lg font-semibold">{items.title}</h1>
                            <p className="text-sm px-5">{items.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Steps;