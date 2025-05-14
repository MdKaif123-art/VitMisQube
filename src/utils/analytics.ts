// Google Analytics Configuration for VitMisQube
// Stream ID: 11220276551
// Stream URL: https://vitmisqube.netlify.app/
const GA_MEASUREMENT_ID = 'G-KJ9K4KNFZH';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initializeGA = () => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      send_page_view: true,
      cookie_flags: 'secure;samesite=strict',
      page_title: document.title,
      page_location: window.location.href,
      allow_google_signals: true,
      allow_ad_personalization_signals: true
    });
  `;
  
  document.head.appendChild(script1);
  document.head.appendChild(script2);
};

// Track page views with enhanced data
export const trackPageView = (path: string) => {
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    engagement_time_msec: 1000,
  });
};

// Track paper views with enhanced data
export const trackPaperView = (paperCode: string, paperName: string, paperType?: string, semester?: string) => {
  window.gtag('event', 'view_paper', {
    paper_code: paperCode,
    paper_name: paperName,
    paper_type: paperType,
    semester: semester,
    timestamp: new Date().toISOString(),
    referrer: document.referrer,
  });
};

// Track paper downloads with enhanced data
export const trackPaperDownload = (paperCode: string, paperName: string, paperType?: string) => {
  window.gtag('event', 'download_paper', {
    paper_code: paperCode,
    paper_name: paperName,
    paper_type: paperType,
    timestamp: new Date().toISOString(),
    device_category: getDeviceCategory(),
  });
};

// Track searches with enhanced data
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  window.gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
    search_type: 'course_search',
  });
};

// Track filter usage
export const trackFilter = (filterType: string, filterValue: string) => {
  window.gtag('event', 'apply_filter', {
    filter_type: filterType,
    filter_value: filterValue,
    timestamp: new Date().toISOString(),
  });
};

// Track user interactions
export const trackInteraction = (interactionType: string, elementId: string, value?: string) => {
  window.gtag('event', 'user_interaction', {
    interaction_type: interactionType,
    element_id: elementId,
    value: value,
    timestamp: new Date().toISOString(),
  });
};

// Track errors
export const trackError = (errorType: string, errorMessage: string, errorLocation: string) => {
  window.gtag('event', 'error', {
    error_type: errorType,
    error_message: errorMessage,
    error_location: errorLocation,
    timestamp: new Date().toISOString(),
  });
};

// Track share events
export const trackShare = (contentType: string, contentId: string, shareMethod: string) => {
  window.gtag('event', 'share', {
    content_type: contentType,
    content_id: contentId,
    share_method: shareMethod,
    timestamp: new Date().toISOString(),
  });
};

// Track upload attempts
export const trackUpload = (status: 'success' | 'failure', fileType: string, errorMessage?: string) => {
  window.gtag('event', 'upload_attempt', {
    status: status,
    file_type: fileType,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

// Helper function to determine device category
const getDeviceCategory = (): string => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}; 