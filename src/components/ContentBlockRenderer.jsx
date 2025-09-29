import React from 'react';
import DetailCard from './DetailCard';
import QuizComponent from './Quiz';
import FillInTheBlanks from './FillInTheBlanks';
import Flashcard from './Flashcard';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ContentBlockRenderer = ({ contentBlocks }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {contentBlocks.map((block) => (
        <Box key={block.blockId} sx={{ mb: 4 }}>
          <BlockRenderer block={block} />
        </Box>
      ))}
    </Box>
  );
};

const BlockRenderer = ({ block }) => {
  switch (block.type) {
    case 'text':
      return <DetailCard content={block.data.htmlContent} />;
    case 'quiz':
      return <QuizComponent quizData={block.data} />;
    case 'fillInTheBlanks':
      return <FillInTheBlanks data={block.data} />;
    case 'flashcard':
      return <Flashcard frontContent={block.data.front} backContent={block.data.back} />;
    case 'youtubeEmbed':
      return (
        <div>
          <h3>YouTube Embed Component</h3>
          <p>YouTube embed functionality will be implemented in future phases.</p>
          <pre>{JSON.stringify(block.data, null, 2)}</pre>
        </div>
      );
    case 'chart':
      return <TableDisplay tableData={block.data} />;
    default:
      return (
        <div>
          <p style={{ color: 'red' }}>⚠️ Unsupported content type: {block.type}</p>
          <p>Block ID: {block.blockId}</p>
          <pre>{JSON.stringify(block.data, null, 2)}</pre>
        </div>
      );
  }
};

// Table component for displaying summary tables
const TableDisplay = ({ tableData }) => {
  const { title, headers, rows } = tableData;

  return (
    <Paper sx={{ maxWidth: '100%', mx: 'auto', mb: 3 }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" component="h3" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: 'bold', backgroundColor: 'grey.50' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} sx={{ py: 2 }}>
                    <div dangerouslySetInnerHTML={{ __html: cell }} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ContentBlockRenderer;
