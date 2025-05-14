import { useEffect, useState, useRef, Fragment } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon, CheckIcon } from '@heroicons/react/24/outline';
import { fetchDrivePapers, Paper } from '../utils/fetchDriveFiles';
import { Link, useNavigate } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { trackSearch, trackFilter, trackInteraction, trackError } from '../utils/analytics';

const typeColors: Record<string, string> = {
  'CAT1': 'bg-[#008080] text-white',
  'CAT2': 'bg-[#00BFFF] text-black',
  'FAT': 'bg-[#00FFFF] text-black',
};

const examTypes = [
  { value: 'all', label: 'All Exams' },
  { value: 'CAT1', label: 'CAT-1' },
  { value: 'CAT2', label: 'CAT-2' },
  { value: 'FAT', label: 'FAT' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch papers and update course options
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    setLoading(true);
    
    fetchDrivePapers()
      .then((data) => {
        if (!mounted) return;
        
        // Sort papers by upload date (most recent first)
        const sortedPapers = [...data].sort((a, b) => {
          const dateA = new Date(a.uploadDate || 0);
          const dateB = new Date(b.uploadDate || 0);
          return dateB.getTime() - dateA.getTime();
        });
        
        setPapers(sortedPapers);
        
        // Update course options
        const options = Array.from(
          new Set(sortedPapers.map((p) => `${p.courseCode} - ${p.courseName}`))
        );
        setCourseOptions(options);
      })
      .catch((error) => {
        console.error('Error fetching papers:', error);
        trackError('fetch_papers', error.message, 'Home.tsx');
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);  // Empty dependency array since we only want to fetch once

  // Update suggestions as user types with debounce
  useEffect(() => {
    if (searchQuery.length === 0 || selectedCourse) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const q = searchQuery.toLowerCase();
      setSuggestions(
        courseOptions.filter(
          (c) => c.toLowerCase().includes(q)
        ).slice(0, 8)
      );
    }, 150); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCourse, courseOptions]);

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

  // Get papers to display - either 9 most recent or all filtered results
  const displayPapers = searchQuery 
    ? filteredPapers // Show all papers when searching
    : (selectedType !== 'all' || selectedCourse)
      ? filteredPapers.slice(0, 9) // Show latest 9 papers when filtering
      : papers.slice(0, 9); // Show latest 9 papers by default

  // Status text showing filter/search results
  const getStatusText = () => {
    if (searchQuery) {
      return `Found ${filteredPapers.length} papers`;
    }
    if (selectedType !== 'all' || selectedCourse) {
      return 'Showing latest papers';
    }
    return 'Displaying latest papers';
  };

  // Track search after debounce
  useEffect(() => {
    if (searchQuery.length > 0) {
      const timeoutId = setTimeout(() => {
        trackSearch(searchQuery, filteredPapers.length);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filteredPapers.length]);

  // Track filter changes
  useEffect(() => {
    if (selectedType !== 'all') {
      trackFilter('exam_type', selectedType);
    }
  }, [selectedType]);

  // Handle suggestion click with tracking
  const handleSuggestionClick = (course: string) => {
    setSelectedCourse(course);
    setSearchQuery(course);
    setSuggestions([]);
    trackInteraction('suggestion_click', 'search_suggestions', course);
  };

  // Clear selection with tracking
  const clearSelection = () => {
    setSelectedCourse(null);
    setSearchQuery('');
    inputRef.current?.focus();
    trackInteraction('clear_selection', 'search_clear_button');
  };

  return (
    <div className="relative min-h-screen w-full bg-black pb-10">
      <div className="absolute inset-0 bg-black" />
      
      <div className="relative z-10">
        <HeroGeometric 
          badge="VIT Question Papers"
          title1="VIT"
          title2="MISQUBE"
        />
        
        {/* Stats Section */}
        <div className="relative z-10 text-center mt-[-100px] mb-8">
          <h1 className="text-[#00FFFF] text-3xl md:text-4xl font-bold mb-4">Latest Question Papers</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#232136]/40 backdrop-blur-sm border border-[#00FFFF]/20">
            <span className="text-[#008080]">Total Papers:</span>
            <span className="text-[#00FFFF] font-bold">{papers.length}</span>
          </div>
        </div>

        {/* Search bar and filter */}
        <div className="w-full md:w-[700px] mx-auto px-2">
          <form 
            role="search" 
            onSubmit={(e) => e.preventDefault()} 
            className="relative flex items-center gap-2 mb-4"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="search"
                id="course-search"
                name="course-search"
                placeholder="Search by course name or code..."
                className="search-bar w-full"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCourse(null);
                }}
                autoComplete="off"
                aria-label="Search courses"
              />
              {selectedCourse ? (
                <button
                  type="button"
                  id="clear-selection"
                  name="clear-selection"
                  onClick={clearSelection}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-500"
                  title="Clear selection"
                  aria-label="Clear selection"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              ) : null}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500">
                <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              
              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul
                  id="search-suggestions"
                  role="listbox"
                  className="absolute z-30 w-full bg-[#232136]/40 backdrop-blur-sm border border-[#00FFFF]/20 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.1)] mt-1 max-h-[300px] overflow-y-auto"
                >
                  {suggestions.map((s) => (
                    <li
                      key={s}
                      role="option"
                      className="px-4 py-2 hover:bg-[#00FFFF]/10 cursor-pointer text-[#00FFFF] transition-colors"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Listbox value={selectedType} onChange={setSelectedType} name="exam-type">
              <div className="relative">
                <Listbox.Button
                  id="exam-type-select"
                  name="exam-type"
                  className="border border-blue-300 rounded-lg px-4 py-2 flex items-center gap-2 text-gray-200 bg-[#232136]/80 hover:bg-[#393053] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Select exam type"
                >
                  <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                  <span className="hidden md:inline">Filter</span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute right-0 mt-1 w-48 rounded-lg bg-[#232136] border border-blue-100 shadow-lg z-20 py-2">
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
          </form>

          {/* Status text showing filter/search results */}
          <div className="flex justify-end mb-8">
            <div className="bg-[#232136]/40 backdrop-blur-sm px-6 py-1.5 rounded-full border border-[#00FFFF]/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
              <p className="text-[#00FFFF] text-sm font-medium tracking-wide">
                {getStatusText()}
              </p>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto mt-4">
          {loading ? (
            <div className="text-center text-lg text-[#00FFFF] col-span-full">Loading papers...</div>
          ) : displayPapers.length === 0 ? (
            <div className="text-center text-lg text-[#00FFFF] col-span-full">No papers found.</div>
          ) : (
            displayPapers.map((paper) => (
              <Link
                to={`/paper/${paper.id}`}
                key={paper.id}
                className={`bg-black rounded-xl p-6 flex flex-col border border-[#00FFFF] hover:border-[#00BFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all cursor-pointer ${isNavigating ? 'pointer-events-none opacity-50' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsNavigating(true);
                  navigate(`/paper/${paper.id}`);
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#00FFFF] font-semibold">{paper.courseCode}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${typeColors[paper.type] || 'bg-gray-600 text-white'}`}>
                    {paper.type}
                  </span>
                </div>
                <h3 className="text-[#00BFFF] font-bold mb-2">{paper.courseName}</h3>
                <div className="text-[#008080] text-sm">{paper.semester}</div>
                <div className="text-[#008080] text-sm mt-1">Slot: {paper.slot}</div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;