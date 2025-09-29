import React from 'react';
import DetailCard from './DetailCard';
import QuizComponent from './Quiz';
import FillInTheBlanks from './FillInTheBlanks';
import Flashcard from './Flashcard';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ContentBlockRenderer = ({ contentBlocks }) => {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }}>
      {contentBlocks.map((block) => (
        <BlockRenderer key={block.blockId} block={block} />
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
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>YouTube Embed Component</Typography>
          <Typography variant="body2" color="text.secondary">
            YouTube embed functionality will be implemented in future phases.
          </Typography>
          <pre style={{ marginTop: 16, fontSize: '0.75rem', backgroundColor: 'action.hover', padding: 16, borderRadius: 8 }}>
            {JSON.stringify(block.data, null, 2)}
          </pre>
        </Paper>
      );
    case 'chart':
      return <TableDisplay tableData={block.data} />;
    default:
      return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" color="error" gutterBottom>
            ⚠️ Unsupported content type: {block.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Block ID: {block.blockId}
          </Typography>
          <pre style={{ marginTop: 16, fontSize: '0.75rem', backgroundColor: 'action.hover', padding: 16, borderRadius: 8 }}>
            {JSON.stringify(block.data, null, 2)}
          </pre>
        </Paper>
      );
  }
};

// Table component for displaying summary tables
const TableDisplay = ({ tableData }) => {
  const { title, headers, rows } = tableData;

  return (
    <Paper sx={{ maxWidth: '100%', mx: 'auto', borderRadius: 2 }}>
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
                <TableCell key={index} sx={{ fontWeight: 'bold', backgroundColor: 'action.hover' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={{ '&:nth-of-type(even)': { backgroundColor: 'action.hover' } }}>
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
