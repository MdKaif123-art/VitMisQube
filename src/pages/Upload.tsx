import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const UPLOAD_ENDPOINT = `${API_URL}/api/upload`;

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
      const formData = new FormData();
      formData.append('file', files[0]);

      const response = await fetch(UPLOAD_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        if (response.ok) {
          data = { success: true, message: 'File uploaded successfully!' };
        } else {
          throw err;
        }
      }

      if (response.ok || data.success) {
        setUploadProgress(100);
        setStatus({ 
          type: 'success', 
          message: 'File uploaded successfully!'
        });
        setFiles([]);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: null });
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to upload file');
      }
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err instanceof Error ? err.message : 'Network error occurred while uploading' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00FFFF] mb-8 text-center">
          Upload Question Paper
        </h1>

        <div className="mb-8 text-center">
          <p className="text-lg text-white mb-4">
            Share your question papers to help fellow students prepare better.
          </p>
          <div className="bg-[#232136]/40 backdrop-blur-sm p-6 rounded-xl border border-[#00FFFF]/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <h2 className="text-[#00FFFF] font-semibold mb-3">Upload Guidelines</h2>
            <ul className="text-white text-sm space-y-2 text-left">
              <li className="flex items-center gap-2">
                <span className="text-[#00BFFF]">•</span>
                File must be in PDF format
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00BFFF]">•</span>
                Name format: CourseCode_ExamType_Slot (e.g., ISWE304L_CAT1_A1)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00BFFF]">•</span>
                Maximum file size: 10MB
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00BFFF]">•</span>
                Papers will be verified before publishing
              </li>
            </ul>
          </div>
        </div>

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
          <div className="mt-4 p-3 rounded-lg bg-[#008080]/20 border border-[#00FFFF] text-[#00FFFF] flex items-center animate-fadeIn">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>{status.message}</p>
          </div>
        )}
        
        {status.type === 'error' && status.message && (
          <div className="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-500 text-red-400 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{status.message}</p>
          </div>
        )}

        {/* Additional Information */}
        <div className="mt-16 mb-8">
          <div className="bg-[#232136]/40 backdrop-blur-sm p-6 rounded-xl border border-[#00FFFF]/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <h2 className="text-[#00FFFF] font-semibold mb-4">Need Help?</h2>
            <p className="text-white text-sm mb-4">
              If you're having trouble uploading papers or have any questions, feel free to reach out to us.
            </p>
            <Link
              to="/contact"
              className="inline-block text-[#00BFFF] hover:text-[#00FFFF] transition-colors"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;