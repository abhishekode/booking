import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CodeEditorContextType {
    html: string;
    setHtml: React.Dispatch<React.SetStateAction<string>>;
    css: string;
    setCss: React.Dispatch<React.SetStateAction<string>>;
    js: string;
    setJs: React.Dispatch<React.SetStateAction<string>>;
    json: string;
    setJson: React.Dispatch<React.SetStateAction<string>>;
}

export const CodeEditorContext = createContext<CodeEditorContextType | null>(null);

export const CodeEditorProvider = ({ children }: { children: ReactNode }) => {
    const [html, setHtml] = useState('');
    const [js, setJs] = useState('');
    const [css, setCss] = useState('');
    const [json, setJson] = useState('');

    return (
        <CodeEditorContext.Provider
            value={{
                html,
                setHtml,
                css,
                setCss,
                js,
                setJs,
                json,
                setJson,
            }}>
            {children}
        </CodeEditorContext.Provider>
    );
}

export const useCodeEditor = () => {
    const context = useContext(CodeEditorContext);
    if (!context) {
        throw new Error('useCodeEditor must be used within a CodeEditorProvider');
    }
    return context;
};

