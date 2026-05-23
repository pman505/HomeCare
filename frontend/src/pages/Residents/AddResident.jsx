import { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;


function AddResident() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName : '',
        middleName : '',
        lastName : '',
        dob : '',
        photo : null,
    });

    //drag and drop
    const [file, setFile] = useState(null);
    const inputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile)
            setForm({...form, photo: droppedFile});
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }
    //drag and drop

    const handleChange = (e) => {
        if(e.target.name === 'photo'){
            setFile(e.target.files[0])
            setForm({...form, photo: e.target.files[0]})
        }
        else{
            setForm({...form, [e.target.name]: e.target.value});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("FirstName", form.firstName);
        formData.append("MiddleName", form.middleName);
        formData.append("LastName", form.lastName);
        formData.append("Dob", form.dob);
        formData.append("Photo", form.photo);

        await fetch(`${API_URL}/api/residents/addresident`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        navigate('/residents')
    }

    return (
        <div>
            <div><h3>Add Resident</h3></div>
            <div className='form-container'>
                <form className='add-res-form' onSubmit={handleSubmit}>
                    <div className='form-group'> 
                        <label>First Name</label>
                        <input
                        value={form.firstName}
                        name='firstName'
                        onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label>Middle Name</label>
                        <input 
                        value={form.middleName}
                        name='middleName'
                        onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input
                        value={form.lastName}
                        name='lastName'
                        onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label>Date of birth</label>
                        <input 
                        type='date'
                        name='dob'
                        onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label>Resident Image</label>
                        <input 
                        type='file'
                        name='photo'
                        ref={inputRef}
                        style={{display: 'none'}}
                        onChange={handleChange} />
                    </div>
                    <div
                    className='img-drag-drop-box form-group'
                    onDragOver={handleDragOver}
                    onClick={() => inputRef.current.click()} // click opens file picker
                    onDrop={handleDrop}>
                        {file?(
                            <p>{file.name}</p>
                        ):(
                            <p>Click to upload<br/>
                                or<br/>
                                Drag and Drop Image Here</p>
                        ) 
                        }
                        
                    </div>
                    <div className='form-group'>
                        <button className='form-submit-btn' type='submit'>Add</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
export default AddResident