import { useEffect, useState, useRef, Fragment } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon, CheckIcon } from '@heroicons/react/24/outline';
import { fetchDrivePapers, Paper } from '../utils/fetchDriveFiles';
import { Link } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';

const typeLabels: Record<string, string> = {
  all: 'All Exams',
  CAT1: 'CAT-1',
  CAT2: 'CAT-2',
  FAT: 'FAT',
};

const typeColors: Record<string, string> = {
  CAT1: 'bg-blue-100 text-blue-800',
  CAT2: 'bg-green-100 text-green-800',
  FAT: 'bg-purple-100 text-purple-800',
};

const examTypes = [
  { value: 'all', label: 'All Exams' },
  { value: 'CAT1', label: 'CAT-1' },
  { value: 'CAT2', label: 'CAT-2' },
  { value: 'FAT', label: 'FAT' },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchDrivePapers().then((data) => {
      setPapers(data);
      setLoading(false);
    });
  }, []);

  // Extract unique course names and codes
  const courseOptions = Array.from(
    new Set(papers.map((p) => `${p.courseCode} - ${p.courseName}`))
  );

  // Update suggestions as user types
  useEffect(() => {
    if (searchQuery.length === 0 || selectedCourse) {
      setSuggestions([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    setSuggestions(
      courseOptions.filter(
        (c) => c.toLowerCase().includes(q)
      ).slice(0, 8)
    );
  }, [searchQuery, courseOptions, selectedCourse]);

  // Filter papers by selected course or search query and type
  const filteredPapers = papers.filter((paper) => {
    const matchesType = selectedType === 'all' || paper.type === selectedType;
    if (selectedCourse) {
      const [code, ...nameParts] = selectedCourse.split(' - ');
      const name = nameParts.join(' - ');
      return paper.courseCode === code && paper.courseName === name && matchesType;
    }
    const matchesQuery =
      paper.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery && matchesType;
  });

  // Handle suggestion click
  const handleSuggestionClick = (course: string) => {
    setSelectedCourse(course);
    setSearchQuery(course);
    setSuggestions([]);
  };

  // Clear selected course
  const clearSelection = () => {
    setSelectedCourse(null);
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-tight text-blue-900">VitMisQube Paper Bank</h1>
        <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Access past exam papers by searching for your course. Find CAT-1, CAT-2, and FAT papers to help you prepare for your exams.
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6 relative">
          <div className="w-full md:w-[700px] mx-auto relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a subject or course code..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCourse(null);
                }}
                autoComplete="off"
              />
              {selectedCourse ? (
                <button
                  onClick={clearSelection}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-500"
                  title="Clear selection"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              ) : null}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </span>
            </div>
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="suggestion-list">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative">
              <Listbox.Button className="border border-blue-300 rounded-lg px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-blue-50 transition-colors font-medium ml-auto md:ml-0 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FunnelIcon className="w-5 h-5" />
                <span className="hidden md:inline">Filter</span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-blue-100 shadow-lg z-20 py-2">
                  <div className="px-4 py-2 text-xs text-gray-500 font-semibold">Exam Type</div>
                  {examTypes.map((type) => (
                    <Listbox.Option
                      key={type.value}
                      value={type.value}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 text-sm flex items-center gap-2 ${
                          active ? 'bg-blue-50 text-blue-900' : 'text-gray-800'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className="flex-1">{type.label}</span>
                          {selected ? <CheckIcon className="w-4 h-4 text-blue-600" /> : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading papers...</div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{filteredPapers.length} Papers Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPapers.map((paper) => (
              <Link
                to={`/paper/${paper.id}`}
                key={paper.id}
                className="card cursor-pointer no-underline"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-900 font-semibold text-lg">{paper.courseCode}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${typeColors[paper.type]}`}>{typeLabels[paper.type]}</span>
                  </div>
                  <div className="font-bold text-md mb-2">{paper.courseName.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <span className="mr-2">📅 {paper.uploadDate}</span>
                    <span>Slot: {paper.slot}</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-2">PDF Document</div>
                </div>
                <div className="mt-3 w-full text-center border border-blue-600 text-blue-700 px-4 py-2 rounded hover:bg-blue-50 transition-colors font-semibold">
                  View Paper
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home; 