import React from 'react';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';

import { Controlled as ControlledEditor } from 'react-codemirror2';


interface EditorProps {
    heading: string;
    language: string;
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
    color: string;
}
const Editor: React.FC<EditorProps> = (props) => {
    const { heading, language, value, onChange, icon, color } = props;
    console.log('props', props)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (_editor: any, _data: any, value: string) => {
        onChange(value);
    };

    return (
        <div className="">
            <div className="flex justify-between bg-gray-900 text-gray-300 font-semibold">
                <div className="bg-gray-700 py-3 px-4 flex">
                    <span
                        className="rounded-full mr-2 h-6 w-6 flex items-center justify-center text-black"
                        style={{ backgroundColor: color }}
                    >
                        {icon}
                    </span>
                    {heading}
                </div>

            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="controlled-editor"
                options={{
                    mode: language,
                    lineNumbers: true,
                    theme: 'material',
                }}
            />
        </div>
    );
};

export default Editor;
