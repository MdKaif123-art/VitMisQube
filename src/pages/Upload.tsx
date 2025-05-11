import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// Update this line to match your server port
const UPLOAD_ENDPOINT = 'http://localhost:5000/api/upload'; // Update this with your actual backend endpoint

const Upload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({ 
    type: null, 
    message: null 
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setStatus({ type: null, message: null });
    setUploadProgress(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      setStatus({ type: 'error', message: 'Please select a file to upload' });
      return;
    }

    setUploading(true);
    setStatus({ type: null, message: null });
    setUploadProgress(0);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', UPLOAD_ENDPOINT);

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      // Handle the completion
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100); // Ensure progress is 100%
          setStatus({ 
            type: 'success', 
            message: 'Successfully sent!' 
          });
          setFiles([]);
        } else {
          const error = JSON.parse(xhr.responseText);
          setStatus({ 
            type: 'error', 
            message: error.message || `Upload failed: ${xhr.status} ${xhr.statusText}` 
          });
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        setStatus({ 
          type: 'error', 
          message: 'Network error occurred while uploading' 
        });
        setUploading(false);
      };

      const formData = new FormData();
      formData.append('file', files[0]);
      xhr.send(formData);

    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err instanceof Error ? err.message : 'Failed to upload file. Please try again.' 
      });
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00FFFF] mb-8 text-center">
          Upload Question Paper
        </h1>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragActive ? 'border-[#00FFFF] bg-[#00FFFF]/10' : 'border-[#008080] hover:border-[#00FFFF] hover:bg-[#00FFFF]/5'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-white">
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <>
                <p className="text-lg mb-2">Drag and drop your PDF file here</p>
                <p className="text-sm text-[#00BFFF]">or click to select file</p>
              </>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6 p-4 bg-[#008080]/10 rounded-lg">
            <p className="text-white">
              Selected file: <span className="text-[#00BFFF]">{files[0].name}</span>
            </p>
            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`w-full px-6 py-2 rounded-lg text-white transition-all ${
                  uploading
                    ? 'bg-[#008080]/50 cursor-not-allowed'
                    : 'bg-[#00FFFF] hover:bg-[#00BFFF]'
                }`}
              >
                {uploading
                  ? uploadProgress < 100
                    ? `Uploading... ${uploadProgress}%`
                    : 'Processing...'
                  : 'Upload File'}
              </button>
              {uploading && (
                <div className="mt-3 w-full bg-[#008080]/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#00FFFF] transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {status.type === 'success' && status.message && (
          <div className="mt-4 p-3 rounded-lg border bg-green-500/10 border-green-500 text-green-500">
            <p>{status.message}</p>
          </div>
        )}
        {status.type === 'error' && status.message && (
          <div className="mt-4 p-3 rounded-lg border bg-red-500/10 border-red-500 text-red-500">
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;