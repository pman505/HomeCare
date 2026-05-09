import { useState } from 'react';

function ImageDragDrop() {

    const [file, setFile] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div
        className='img-drag-drop-box'
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
            <p>Drag and Drop Image Here</p>
        </div>
    )
}
export default ImageDragDrop