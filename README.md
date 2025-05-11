# QP-Sphere

QP-Sphere is a modern web application for accessing and managing question papers. It provides an intuitive interface to browse, search, and view question papers based on course codes, exam types, and semesters.

## Features

- Browse question papers by course code and name
- Filter by exam type (CAT-1, CAT-2, FAT)
- Search functionality
- Responsive design
- Google Drive integration for paper storage

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Headless UI
- Hero Icons

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qp-sphere.git
cd qp-sphere
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google Drive API credentials:
```env
VITE_GOOGLE_API_KEY=your_api_key
VITE_FOLDER_ID=your_folder_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Build for production:
```bash
npm run build
# or
yarn build
```

## File Naming Convention

Question paper files should follow this format:
```
COURSECODE_COURSENAME_TYPE_SEMESTER_SlotXXX.pdf
```
Example:
```
ICSE102L_Structured and Object Oriented Programming_CAT1_Winter Semester_SlotD2.pdf
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 