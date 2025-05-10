import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchDrivePapers, Paper } from '../utils/fetchDriveFiles';
import { ArrowDownTrayIcon, ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const typeLabels: Record<string, string> = {
  CAT1: 'CAT-1',
  CAT2: 'CAT-2',
  FAT: 'FAT',
};
const typeColors: Record<string, string> = {
  CAT1: 'bg-blue-100 text-blue-800',
  CAT2: 'bg-green-100 text-green-800',
  FAT: 'bg-purple-100 text-purple-800',
};

const PaperView = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivePapers().then((papers) => {
      const found = papers.find((p) => p.id === id);
      if (!found) {
        navigate('/');
      } else {
        setPaper(found);
      }
      setLoading(false);
    });
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-10 text-lg text-gray-500">Loading...</div>;
  if (!paper) return null;

  const shareUrl = window.location.href;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${paper.id}`;
  const previewUrl = `https://drive.google.com/file/d/${paper.id}/preview`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${paper.courseCode} ${typeLabels[paper.type]}`,
        text: `${paper.courseName} (${typeLabels[paper.type]})`,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md border border-blue-100">
        <div className="p-6 md:p-10">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-blue-700 hover:underline text-sm font-medium group">
              <ArrowLeftIcon className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to search
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-extrabold text-blue-900 tracking-tight">{paper.courseCode}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${typeColors[paper.type]}`}>{typeLabels[paper.type]}</span>
              </div>
              <div className="font-bold text-lg text-gray-800 mb-1 tracking-tight">{paper.courseName.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-gray-600 text-sm mb-1">Date: <span className="font-medium">{paper.uploadDate}</span> &nbsp; | &nbsp; Slot: <span className="font-medium">{paper.slot}</span></div>
            </div>
            <div className="flex gap-3">
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-blue-600 px-5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold shadow-sm transition-all">
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download
              </a>
              <button onClick={handleShare} className="flex items-center gap-2 border border-blue-600 px-5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold shadow-sm transition-all">
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-xl shadow-inner p-2 md:p-4">
            <iframe
              src={previewUrl}
              title="PDF Preview"
              width="100%"
              height="500px"
              allow="autoplay"
              className="rounded-lg border border-blue-100 shadow-md bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperView; 