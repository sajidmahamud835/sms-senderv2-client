import React from 'react';
import { useDropzone } from 'react-dropzone';

const DragBox = () => {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: {
            'data/csv': ['.csv'],
        }
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));
    console.log(fileRejectionItems)
    return (
        <section className="container" style={{ border: '2px solid red', display: 'flex', justifyContent: "center" }}>
            <div>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
                <aside >
                    {
                        fileRejectionItems.length ? (<>
                            <h3>File Rejected</h3>
                            <h4>This Type is not accept able</h4>
                        </>) : ('')
                    }

                    {/* <ul>{fileRejectionItems}</ul> */}
                </aside>
            </div>

        </section>
    );
};

export default DragBox;
