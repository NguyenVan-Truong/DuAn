// components/ImageUploader.tsx
import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
    onImageChange: (newImage: string) => void;
}

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
    const [image, setImage] = useState<string>("");
    const [onlineImage, setOnlineImage] = useState<string>("");
    const [uploadMethod, setUploadMethod] = useState<"online" | "local">("local");

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", VITE_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setImage(data.secure_url);
        onImageChange(data.secure_url);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleOnlineImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setOnlineImage(url);
        setImage(url);
        onImageChange(url);
    };

    const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUploadMethod(e.target.value as "online" | "local");
    };

    return (
        <div>
            <label htmlFor="uploadMethod">Chọn phương thức tải ảnh:</label>
            <select
                id="uploadMethod"
                value={uploadMethod}
                onChange={handleMethodChange}
                className="form-select mb-3"
            >
                <option value="online">Sử dụng link ảnh online</option>
                <option value="local">Upload ảnh từ máy tính</option>
            </select>

            {uploadMethod === "online" && (
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Link ảnh online"
                        value={onlineImage}
                        onChange={handleOnlineImageChange}
                        className="form-control"
                    />
                </div>
            )}

            {uploadMethod === "local" && (
                <div {...getRootProps()} style={{ border: "2px dashed #cccccc", padding: "20px", textAlign: "center" }}>
                    <input {...getInputProps()} />
                    <p>Kéo và thả file tại đây, hoặc nhấp để chọn file</p>
                </div>
            )}

            {image && (
                <div className="mt-3">
                    <p>Ảnh đã chọn:</p>
                    <img src={image} alt="Selected" style={{ maxWidth: "250px", height: "250px" }} />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
