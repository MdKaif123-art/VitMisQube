# VitMisQube - Paper Bank Website

A modern web application for accessing and managing examination papers. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Search papers by course name or code
- Filter papers by type (CAT-1, CAT-2, FAT)
- View paper details including upload date and slot
- Direct access to papers through Google Drive
- Responsive design for all devices
- Contact form for user feedback

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vitmisqube.git
cd vitmisqube
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Drive API credentials:
```
VITE_GOOGLE_DRIVE_API_KEY=your_api_key
VITE_GOOGLE_DRIVE_CLIENT_ID=your_client_id
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Google Drive API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 