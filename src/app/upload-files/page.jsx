'use client'
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

const UploadFiles = () => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) toast.error('No file selected');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'MittiMahal');
        formData.append('cloud_name', 'dqrqbx6oi');

        axios.post('http://api.cloudinary.com/v1_1/dqrqbx6oi/image/upload',formData )
        .then((result) => {
            console.log(result.data);
            
            toast.success('Image uploaded');
        }).catch((err) => {
            toast.success('Image upload failed');
        });

    }
  return (
    <div><input type="file" onChange={handleFileUpload} /></div>
  )
}

export default UploadFiles