import { useEffect, useState, useRef, Fragment } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon, CheckIcon } from '@heroicons/react/24/outline';
import { fetchDrivePapers, Paper } from '../utils/fetchDriveFiles';
import { Link } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';

const typeLabels: Record<string, string> = {
  all: 'All Exams',
  CAT1: 'CAT-1',
  CAT2: 'CAT-2',
  FAT: 'FAT',
};

const typeColors: Record<string, string> = {
  'Winter CAT-1': 'bg-[#008080] text-white',
  'Winter CAT-2': 'bg-[#00BFFF] text-black',
  'Winter FAT': 'bg-[#00FFFF] text-black',
  'Summer CAT-1': 'bg-[#008080] text-white',
  'Summer CAT-2': 'bg-[#00BFFF] text-black',
  'Summer FAT': 'bg-[#00FFFF] text-black',
};

const examTypes = [
  { value: 'all', label: 'All Exams' },
  { value: 'CAT-1', label: 'CAT-1' },
  { value: 'CAT-2', label: 'CAT-2' },
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
    <div className="relative min-h-screen w-full bg-black pb-10 overflow-hidden">
      <HeroGeometric 
        badge="VIT Question Papers"
        title1="Question Paper"
        title2="Sphere"
      />
      
      {/* Stats Section */}
      <div className="relative z-10 text-center mt-[-100px] mb-8">
        <div className="text-[#008080] text-sm mb-6">
          Total Papers Available: <span className="font-medium text-[#00FFFF]">{papers.length}</span>
        </div>
        <p className="text-[#00BFFF] text-lg mb-8">
          Find and download previous year question papers
        </p>
      </div>

      {/* Search bar and filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-10 relative px-2">
        <div className="w-full md:w-[700px] mx-auto relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by course name or code..."
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
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative">
              <Listbox.Button className="border border-blue-300 rounded-lg px-4 py-2 flex items-center gap-2 text-gray-200 bg-[#232136]/80 hover:bg-[#393053] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FunnelIcon className="w-5 h-5" />
                <span className="hidden md:inline">Filter</span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute right-0 mt-2 w-48 rounded-lg bg-[#232136] border border-blue-100 shadow-lg z-20 py-2">
                  <div className="px-4 py-2 text-xs text-purple-200 font-semibold">Exam Type</div>
                  {examTypes.map((type) => (
                    <Listbox.Option
                      key={type.value}
                      value={type.value}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 text-sm flex items-center gap-2 ${
                          active ? 'bg-[#393053] text-purple-200' : 'text-gray-200'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className="flex-1">{type.label}</span>
                          {selected ? <CheckIcon className="w-4 h-4 text-purple-300" /> : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
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
      </div>

      {/* Cards grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-lg text-[#00FFFF] col-span-full">Loading papers...</div>
        ) : filteredPapers.length === 0 ? (
          <div className="text-center text-lg text-[#00FFFF] col-span-full">No papers found.</div>
        ) : (
          filteredPapers.map((paper) => (
            <Link
              to={`/paper/${paper.id}`}
              key={paper.id}
              className="bg-black rounded-xl border border-[#00FFFF] p-6 hover:border-[#00BFFF] transition-colors relative group"
            >
              {/* Exam Type Tag in top right */}
              <div className="absolute top-4 right-4">
                <span className="bg-[#008080] text-white px-3 py-1 rounded-md text-sm">
                  {paper.type}
                </span>
              </div>

              {/* Course Info */}
              <div className="space-y-3">
                <h3 className="text-[#00FFFF] text-2xl font-bold">
                  {paper.courseCode}
                </h3>
                <p className="text-[#00BFFF] text-lg">
                  {paper.courseName}
                </p>
                <p className="text-[#00FFFF] font-medium">
                  {paper.semester}
                </p>
                <p className="text-[#008080]">
                  Slot: {paper.slot}
                </p>
              </div>

              {/* View Paper Button */}
              <div className="mt-4">
                <div className="w-full text-center border border-[#00FFFF] text-[#00FFFF] px-4 py-2 rounded-lg group-hover:bg-[#00FFFF]/10 transition-colors">
                  View Paper
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
};

export default Home;