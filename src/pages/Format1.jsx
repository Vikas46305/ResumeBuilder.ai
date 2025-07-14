import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function Formate1() {

    const { value } = useSelector((state) => state.data);

    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setEducation(value?.educations || []);
        setSkills(value?.skills || []);
        setExperiences(value?.experiences || []);
        setProjects(value?.Projects || []);
    }, [value]);

    const elementRef = useRef(null)
    const handleDownload = () => {
        const content = elementRef.current;
        if (!content) return;

        const printWindow = window.open('', '', 'width=800,height=600');

        const styles = Array.from(document.styleSheets).map((styleSheet) => {
            try {
                if (styleSheet.href) {
                    return `<link rel="stylesheet" href="${styleSheet.href}" />`;
                } else if (styleSheet.cssRules) {
                    // Inline styles
                    const cssText = Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('\n');
                    return `<style>${cssText}</style>`;
                }
            } catch (e) {
                return '';
            }
        }).join('\n');

        printWindow.document.writeln(
            `
            <html>
            <head>
            <title>Print</title>
            ${styles}
            </head>
            <body>
            ${content.outerHTML}
            </body>
            </html>
            `);

        printWindow.document.close();
        printWindow.focus();

        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }

    return (
        <div className="w-[90%] md:w-1/2 m-auto p-2 rounded shadow text-sm bg-white text-gray-900">

            {/* Print Button */}
            <div className="flex items-center justify-end py-2">
                <Button
                    variant="outline"
                    className="rounded cursor-pointer px-5"
                    onClick={handleDownload}>
                    Print
                </Button>
            </div>

            <div className="shadow px-3 py-2" ref={elementRef}>

                {/* Name and Contact Info */}
                <div>
                    <h1 className="text-xl font-bold">{value?.name}</h1>
                    <div className="flex items-center gap-2 mt-0.5">
                        <i className="ri-phone-fill text-xl" />
                        <p>+91 {value?.mobile}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ri-mail-line text-xl" />
                        <p>{value?.email}</p>
                    </div>
                    <div className="flex gap-2">
                        <i className="ri-map-pin-line text-xl" />
                        <div className="w-[65%]">
                            <p>{value?.address}</p>
                        </div>
                    </div>
                </div>

                {/* Career Objective */}
                <div className="my-2">
                    <div className="bg-gray-300 text-center">
                        <h1 className="font-bold py-1">CAREER OBJECTIVE</h1>
                    </div>
                    <div className="p-1 flex gap-2">
                        <i className="ri-circle-line text-[8px] mt-1" />
                        <p>{value?.summery}</p>
                    </div>
                </div>

                {/* Education */}
                <div className="my-2">
                    <div className="bg-gray-300 text-center">
                        <h1 className="font-bold py-1">EDUCATION</h1>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Class/Degree</TableHead>
                                <TableHead className="text-center">Board/University</TableHead>
                                <TableHead className="text-center">Percentage</TableHead>
                                <TableHead className="text-center">Passing Year</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {education.map((edu, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="text-center">{edu?.degree}</TableCell>
                                    <TableCell className="text-center">{edu?.university}</TableCell>
                                    <TableCell className="text-center">{edu?.cgpa}</TableCell>
                                    <TableCell className="text-center">{edu?.year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Skills */}
                <div className="my-2">
                    <div className="bg-gray-300 text-center">
                        <h1 className="font-bold py-1">SKILLS SUMMARY</h1>
                    </div>
                    <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {skills.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <h1>{item?.skill}</h1>
                                <div className="bg-red-200 h-3 w-[100px]">
                                    <span
                                        className="block bg-red-500 h-3"
                                        style={{ width: `${(item?.rating || 0) * 20}px` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                {experiences.length > 0 || experiences.company !== "" && (
                    <div>
                        <div className="bg-gray-300 text-center">
                            <h1 className="font-bold py-1">WORK EXPERIENCE</h1>
                        </div>
                        <div className="m-3 space-y-3">
                            {experiences.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between">
                                        <div>
                                            <h1 className="font-semibold">{exp?.position}</h1>
                                            <p className="text-xs font-semibold">{exp?.company}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <p>{exp?.from}</p>
                                            <p>-</p>
                                            <p>{exp?.to}</p>
                                        </div>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: exp?.description }}
                                        className="pl-6 list-disc"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects.length > 0 || projects.title !== "" && (
                    <div>
                        <div className="bg-gray-300 text-center">
                            <h1 className="font-bold py-1">PROJECTS</h1>
                        </div>
                        {projects.map((project, idx) => (
                            <div className="m-2" key={idx}>
                                <div className="flex justify-between">
                                    <div>
                                        <h1 className="font-semibold flex items-center">
                                            {project?.title}
                                            {project?.url && (
                                                <a href={project?.url} target="_blank" rel="noopener noreferrer">
                                                    <i className="ri-external-link-line ml-2 hover:text-blue-700 cursor-pointer"></i>
                                                </a>
                                            )}
                                        </h1>
                                        <p className="text-sm font-semibold">{project?.company}</p>
                                        <p className="text-sm flex items-center gap-3">
                                            <i className="ri-github-fill text-xl" />
                                            <span>{project?.gitHub}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p>[ {project?.tech} ]</p>
                                    </div>
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{ __html: project?.description }}
                                    className="pl-6 list-disc"
                                />
                            </div>
                        ))}
                    </div>
                )}

                { /* Certifications, Achievements & Languages */}
                <div>
                    <div className="bg-gray-300 text-center">
                        <h1 className="font-bold py-1">OTHER DETAILS</h1>
                    </div>
                    <div className="p-2">

                        { /*  Languages  */}
                        {
                            value.Languages != 0 && value.Languages != "" && (
                                <div>
                                    <h1 className="font-semibold">Languages</h1>
                                    <p className="ml-5">{value?.Languages}</p>
                                </div>
                            )
                        }

                        { /* Certifications */}
                        {
                            value.Certifications != 0 && value.Certifications != "" && (
                                <div>
                                    <h1 className="font-semibold">Certifications</h1>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: value?.Certifications }}
                                        className="pl-6 list-disc"
                                    />
                                </div>
                            )
                        }

                        { /* Achievements */}
                        {
                            value.Achievements != 0 && value.Achievements != "" && (
                                <div>
                                    <h1 className="font-semibold">Achievements</h1>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: value?.Achievements }}
                                        className="pl-6 list-disc"
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Declaration */}
                <div className="my-2">
                    <div className="bg-gray-300 text-center">
                        <h1 className="font-bold py-1">DECLARATION</h1>
                    </div>
                    <div className="my-3">
                        <h1>
                            I hereby declare that all the information provided in this resume is true and correct to the
                            best of my knowledge and belief.
                        </h1>
                    </div>
                    <div className="mx-3">
                        <p>Sign .............</p>
                        <p>Date .............</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formate1;