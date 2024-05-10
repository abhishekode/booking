import Editor from 'components/CodeEditor';
import Result from 'components/CodeEditor/Result';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'components/common/ResizeablePanel';
import { useCodeEditor } from 'context/codeEditorContext';
import React from 'react'

const CodeEditorPage = () => {
    const { html, css, setHtml, setCss, json, setJson } = useCodeEditor();

    const [activeTab, setActiveTab] = React.useState<string>('html')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tabComponents: any = {
        'html': <Editor
            language="xml"
            heading="HTML"
            value={html}
            onChange={setHtml}
            icon='/'
            color='#FF3C41'
        />,
        'css': <Editor
            language="css"
            heading="CSS"
            value={css}
            onChange={setCss}
            icon='*'
            color='#0EBEFF'
        />,
        // 'js': <Editor
        //     language="javascript"
        //     heading="JS"
        //     value={js}
        //     onChange={setJs}
        //     icon='( )'
        //     color='#FCD000'
        // />,
        'json': <Editor
            language="json"
            heading="JSON"
            value={json}
            onChange={setJson}
            icon='( )'
            color='#FCD000'
        />
    };

    const tabContent = tabComponents[activeTab] || null;
    const handleTabClick = (key: string) => {
        setActiveTab(key);
    };



    return (
        <div>
            <div className="flex gap-1 font-semibold mb-2">
                {['html', 'css', 'json'].map((lang) => (
                    <div
                        className={`${activeTab === lang ? 'border-blue-500 text-blue-500' : 'border-slate-500'} inline-flex items-center justify-center px-8 py-2 border group cursor-pointer`}
                        key={lang}
                        onClick={() => handleTabClick(lang)}>
                        {lang}
                    </div>
                ))}
            </div>
            <div className="block">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel>
                        {tabContent}
                    </ResizablePanel>
                    <ResizableHandle color='red' />
                    <ResizablePanel>
                        <Result />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

        </div>
    )
}

export default CodeEditorPage