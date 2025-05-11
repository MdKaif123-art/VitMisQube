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
  CAT1: 'bg-[#008080] text-white',
  CAT2: 'bg-[#00BFFF] text-black',
  FAT: 'bg-[#00FFFF] text-black',
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
    <div className="min-h-screen bg-black py-10 px-2">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-2xl bg-black/90 backdrop-blur-md border border-[#00FFFF]">
        <div className="p-6 md:p-10">
          <div className="flex items-center mb-6">
            <Link to="/" className="flex items-center text-[#00BFFF] hover:text-[#00FFFF] text-sm font-medium group">
              <ArrowLeftIcon className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to search
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl font-extrabold text-[#00FFFF] tracking-tight">{paper.courseCode}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${typeColors[paper.type]}`}>{typeLabels[paper.type]}</span>
              </div>
              <div className="font-bold text-lg text-[#00BFFF] mb-1 tracking-tight">{paper.courseName.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-[#008080] text-sm mb-1">Semester: <span className="font-medium text-[#00BFFF]">{paper.semester}</span> &nbsp; | &nbsp; Slot: <span className="font-medium text-[#00BFFF]">{paper.slot}</span></div>
            </div>
            <div className="flex gap-3">
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[#00FFFF] px-5 py-2 rounded-lg bg-black hover:bg-[#00FFFF]/10 text-[#00FFFF] font-semibold shadow-sm transition-all">
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download
              </a>
              <button onClick={handleShare} className="flex items-center gap-2 border border-[#00FFFF] px-5 py-2 rounded-lg bg-black hover:bg-[#00FFFF]/10 text-[#00FFFF] font-semibold shadow-sm transition-all">
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-black to-[#008080]/20 rounded-xl shadow-inner p-2 md:p-4 border border-[#00FFFF]/30">
            <iframe
              src={previewUrl}
              title="PDF Preview"
              width="100%"
              height="500px"
              allow="autoplay"
              className="rounded-lg border border-[#00FFFF] shadow-md bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperView;