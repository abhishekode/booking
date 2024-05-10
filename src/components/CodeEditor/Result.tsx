/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useCodeEditor } from 'context/codeEditorContext';
import { DeviceEmulator, DeviceFrameset, DeviceFramesetProps } from "react-device-frameset";

type DeviceName = "iPhone X" | "iPhone 8" | "iPhone 8 Plus" | "iPhone 5s" | "iPhone 5c" | "iPhone 4s" | "Galaxy Note 8" | "Nexus 5" | "Lumia 920" | "Samsung Galaxy S5" | "HTC One" | "iPad Mini" | "MacBook Pro"

type DeviceEmulatorProps = {
    banDevices?: DeviceName[]
    children: (props: DeviceFramesetProps) => React.ReactNode,
    value?: DeviceName,
    onChange?: (deviceName: DeviceName) => void,
}


const MyDeviceEmulator: React.FC<DeviceEmulatorProps> = ({ children }) => {
    // Render DeviceEmulator with the provided children function
    return (
        <DeviceEmulator>
            {children}
        </DeviceEmulator>
    );
};
const Result: React.FC = () => {
    const { html, css, json } = useCodeEditor();
    const [srcDoc, setSrcDoc] = useState('');

    const formattedJson = JSON.parse(json || '[]')

    useEffect(() => {
        const constructHTML = () => {
            let constructedHTML = html;

            formattedJson && formattedJson.forEach((item: any) => {
                const regex = new RegExp(`\\$\\{template\\.${item.id}\\}`, 'g');
                constructedHTML = constructedHTML.replace(regex, item.default_value);
            });

            return constructedHTML;
        };

        const constructedHTML = constructHTML();
        const src = `
            <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>${constructedHTML}</body>
            </html>
        `;
        setSrcDoc(src);



    }, [html, css, json]);

    return (
        <div className={`h-full ${html || css ? '' : 'bg-gray-600'} border shadow`}>
            <MyDeviceEmulator>
                {(props) => (
                    <DeviceFrameset {...props}>
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            width="100%"
                            height="100%"
                        />
                    </DeviceFrameset>
                )}
            </MyDeviceEmulator>
        </div>
    );
};

export default Result;
