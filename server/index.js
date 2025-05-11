const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample data
const papers = [
  {
    id: '1',
    courseCode: 'CSE1001',
    courseName: 'Introduction to Programming',
    type: 'CAT-1',
    semester: 'Winter 2023',
    slot: 'A1+TA1',
    uploadDate: '2024-01-15'
  },
  {
    id: '2',
    courseCode: 'CSE2002',
    courseName: 'Data Structures',
    type: 'CAT-2',
    semester: 'Winter 2023',
    slot: 'B1+TB1',
    uploadDate: '2024-01-20'
  },
  {
    id: '3',
    courseCode: 'MAT1001',
    courseName: 'Calculus',
    type: 'FAT',
    semester: 'Winter 2023',
    slot: 'C1+TC1',
    uploadDate: '2024-01-25'
  }
];

// Get all papers
app.get('/api/papers', (req, res) => {
  res.json({ files: papers });
});

// Get paper by ID
app.get('/api/papers/:id', (req, res) => {
  const paper = papers.find(p => p.id === req.params.id);
  if (!paper) {
    return res.status(404).json({ message: 'Paper not found' });
  }
  res.json(paper);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 