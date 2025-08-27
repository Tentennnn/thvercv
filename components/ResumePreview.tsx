
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ResumeData, Language } from '../types';

declare const jspdf: any;
declare const html2canvas: any;

interface TemplateProps {
    data: ResumeData;
    t: (key: string) => string;
    language: Language;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
        <header className="flex items-center mb-6">
            {data.profile.photo && <img src={data.profile.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{data.profile.name}</h1>
                <h2 className="text-lg text-blue-600 font-semibold">{data.profile.title}</h2>
                <div className="flex text-xs text-gray-600 mt-2 space-x-4">
                    <span>{data.profile.email}</span>
                    <span>{data.profile.phone}</span>
                    <span>{data.profile.website}</span>
                </div>
            </div>
        </header>

        <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Summary</h3>
            <p className="text-gray-700">{data.summary}</p>
        </section>

        <section className="mt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Experience</h3>
            {data.experience.map(exp => (
                <div key={exp.id} className="mb-3">
                    <h4 className="text-md font-semibold text-gray-800">{exp.title}</h4>
                    <div className="flex justify-between text-sm">
                        <p className="text-gray-700">{exp.company}</p>
                        <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                </div>
            ))}
        </section>

        <section className="mt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Education</h3>
            {data.education.map(edu => (
                 <div key={edu.id} className="mb-2">
                    <h4 className="text-md font-semibold text-gray-800">{edu.degree}</h4>
                     <div className="flex justify-between text-sm">
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    </div>
                </div>
            ))}
        </section>

         <section className="mt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b-2 border-gray-200 pb-1 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{skill.name}</span>
            ))}
            </div>
        </section>
    </div>
);

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="p-6 bg-white dark:bg-gray-900 font-sans text-sm flex">
        <div className="w-1/3 bg-gray-800 text-white p-4">
             {data.profile.photo && <img src={data.profile.photo} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />}
             <h1 className="text-2xl font-bold text-center">{data.profile.name}</h1>
             <h2 className="text-md text-teal-400 font-light text-center mb-4">{data.profile.title}</h2>
             <hr className="border-gray-600 my-4" />
             <p className="text-xs text-center">{data.profile.email}</p>
             <p className="text-xs text-center">{data.profile.phone}</p>
             <p className="text-xs text-center">{data.profile.website}</p>
             <p className="text-xs text-center mt-2">{data.profile.location}</p>
             <hr className="border-gray-600 my-4" />
             <h3 className="text-md font-bold uppercase tracking-wider mb-2">Skills</h3>
             {data.skills.map(skill => (
                <div key={skill.id} className="mb-1">
                    <span className="text-xs">{skill.name}</span>
                    <div className="w-full bg-gray-600 rounded-full h-1.5">
                        <div className="bg-teal-400 h-1.5 rounded-full" style={{width: `${skill.level * 20}%`}}></div>
                    </div>
                </div>
            ))}
        </div>
        <div className="w-2/3 p-4 text-gray-800 dark:text-gray-100">
            <section>
                <h3 className="text-lg font-bold uppercase tracking-wider text-teal-500 border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">Summary</h3>
                <p className="text-xs">{data.summary}</p>
            </section>
             <section className="mt-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-teal-500 border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">Experience</h3>
                {data.experience.map(exp => (
                    <div key={exp.id} className="mb-3">
                        <h4 className="text-md font-semibold">{exp.title}</h4>
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-700 dark:text-gray-300">{exp.company}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{exp.description}</p>
                    </div>
                ))}
            </section>
            <section className="mt-4">
                <h3 className="text-lg font-bold uppercase tracking-wider text-teal-500 border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">Education</h3>
                {data.education.map(edu => (
                     <div key={edu.id} className="mb-2">
                        <h4 className="text-md font-semibold">{edu.degree}</h4>
                         <div className="flex justify-between text-sm">
                            <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    </div>
);

const KhmerDecorativeBorder: React.FC = () => (
    <div className="h-2 mt-1 mb-2" style={{
        backgroundImage: 'url(\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDYwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNEg1TTU1IDRINEDNNTI1IDRDMjYuNjY3IDQgMzAgMi41IDMwIDBDMzAgMi41IDMzLjMzMyA0IDM1IDRDMzMuMzMzIDQgMzAgNS41IDMwIDhDMzAgNS41IDI2LjY2NyA0IDI1IDRaIiBzdHJva2U9IiNDNzE5MkYiIHN0cm9rZS13aWR0aD0iMS4yIi8+PHBhdGggZD0iTTUgNEgyNU0zNSA0SDU1IiBzdHJva2U9IiNDMTlBNkIiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==\')',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
    }} />
);

const KhmerTemplate: React.FC<TemplateProps> = ({ data, t }) => (
    <div 
        className="bg-white text-gray-900 font-khmer text-[15px] leading-relaxed relative"
        style={{
            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cg fill='%23003366' fill-opacity='0.04'%3e%3cpolygon points='0 24 12 12 0 0'%3e%3c/polygon%3e%3cpolygon points='24 24 12 12 24 0'%3e%3c/polygon%3e%3c/g%3e%3c/svg%3e\")"
        }}
    >
        <div className="absolute inset-4 border border-blue-900/30" aria-hidden="true"></div>
        <div className="absolute inset-5 border border-red-700/30" aria-hidden="true"></div>

        <div className="relative p-8">
            <header className="text-center mb-6 pb-4">
                 {data.profile.photo && <img src={data.profile.photo} alt="Profile" className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-blue-800 shadow-md" />}
                <h1 className="text-4xl font-bold text-blue-900 mb-1">{data.profile.name}</h1>
                <h2 className="text-xl text-red-700 font-semibold">{data.profile.title}</h2>
                <div className="flex justify-center flex-wrap text-xs text-gray-600 mt-3 gap-x-4 gap-y-1 font-sans">
                    {data.profile.email && <span className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        {data.profile.email}
                    </span>}
                    {data.profile.phone && <span className="flex items-center gap-1.5">
                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                        {data.profile.phone}
                    </span>}
                    {data.profile.website && <span className="flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path></svg>
                        {data.profile.website}
                    </span>}
                </div>
            </header>
            
            <main>
                {data.summary && (
                    <section className="mb-5">
                        <h3 className="text-xl font-bold text-blue-900">{t('form.summary')}</h3>
                        <KhmerDecorativeBorder />
                        <p className="text-gray-700">{data.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                     <section className="mb-5">
                        <h3 className="text-xl font-bold text-blue-900">{t('form.experience')}</h3>
                        <KhmerDecorativeBorder />
                        {data.experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-lg font-semibold text-gray-800">{exp.title}</h4>
                                    <p className="text-sm text-gray-600 flex-shrink-0 ml-4 font-sans">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-md text-red-800">{exp.company}</p>
                                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                 {data.education.length > 0 && (
                    <section className="mb-5">
                        <h3 className="text-xl font-bold text-blue-900">{t('form.education')}</h3>
                        <KhmerDecorativeBorder />
                        {data.education.map(edu => (
                             <div key={edu.id} className="mb-3">
                                 <div className="flex justify-between items-baseline">
                                    <h4 className="text-lg font-semibold text-gray-800">{edu.degree}</h4>
                                    <p className="text-sm text-gray-600 flex-shrink-0 ml-4 font-sans">{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className="text-md text-red-800">{edu.institution}</p>
                            </div>
                        ))}
                    </section>
                )}

                {data.skills.length > 0 && (
                    <section>
                        <h3 className="text-xl font-bold text-blue-900">{t('form.skills')}</h3>
                        <KhmerDecorativeBorder />
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill.id} className="bg-blue-100 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">{skill.name}</span>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    </div>
);


const ResumePreview: React.FC = () => {
    const { resumeData, template, t, language } = useAppContext();
    const resumeRef = React.useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = React.useState(false);

    const handleDownloadPDF = () => {
        const input = resumeRef.current;
        if (!input) return;

        setIsDownloading(true);
        const { jsPDF } = jspdf;
        
        // Temporarily apply light mode for consistent PDF output
        const root = document.documentElement;
        const wasDark = root.classList.contains('dark');
        if(wasDark) root.classList.remove('dark');

        html2canvas(input, { scale: 3, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save("resume.pdf");
            setIsDownloading(false);
            if(wasDark) root.classList.add('dark'); // Restore dark mode if it was enabled
        }).catch(() => {
            setIsDownloading(false);
            if(wasDark) root.classList.add('dark');
        });
    };
    
    const handlePrint = () => {
        const input = resumeRef.current;
        if (!input) return;

        const content = input.innerHTML;
        const printWindow = window.open('', '', 'height=800,width=800');
        if (!printWindow) return;

        printWindow.document.write('<html><head><title>Print CV</title>');
        printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
        printWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Kantumruy+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">');
        printWindow.document.write(`<script>tailwind.config = { darkMode: 'class', theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'], khmer: ['Kantumruy Pro', 'sans-serif'] } } } }<\/script>`);
        printWindow.document.write('<style>body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    const templates = {
        classic: <ClassicTemplate data={resumeData} t={t} language={language} />,
        modern: <ModernTemplate data={resumeData} t={t} language={language} />,
        khmer: <KhmerTemplate data={resumeData} t={t} language={language} />,
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-end items-center mb-4 gap-2">
                 <button onClick={handleDownloadPDF} disabled={isDownloading} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:bg-green-400 transition-colors">
                    {isDownloading ? 'Downloading...' : t('preview.downloadPDF')}
                </button>
                <button onClick={handlePrint} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">{t('preview.print')}</button>
            </div>
            <div className="aspect-[210/297] border border-gray-200 dark:border-gray-700 overflow-auto bg-gray-100 dark:bg-gray-900">
                 <div ref={resumeRef} className={language === 'km' ? 'font-khmer' : 'font-sans'}>
                    {templates[template]}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
