import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';


export function PrivacyComp() {

    const [ markdownText, setMarkdownText ] = useState('');
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        loadMD().then(() => setLoading(false));
    }, []);

    async function loadMD() {
        const markdownFileContent = (await import(`./assets/PrivacyPolicy.md?raw`)).default;
        setMarkdownText(markdownFileContent);
    }


    return (
        loading ? <h1>Loading...</h1> :
            <ReactMarkdown children={markdownText} />
    );
}

export default PrivacyComp;