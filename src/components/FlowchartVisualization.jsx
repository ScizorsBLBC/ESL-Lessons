import React from 'react';
import { Box, Typography, Paper, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import CallSplitIcon from '@mui/icons-material/CallSplit';

/**
 * Component to display a Flowchart, visualizing procedural or conditional logic.
 * This is a highly simplified, structural placeholder component using MUI Stepper.
 *
 * @param {object} props
 * @param {object} props.data - The data object conforming to the flowchart schema.
 * @param {object} [props.accessibility] - The accessibility object.
 * @returns {JSX.Element}
 */
const FlowchartVisualization = ({ data, accessibility }) => {
    const theme = useTheme();
    const { title, steps } = data;

    // Theme-aware colors for monochrome compatibility
    const isMonochrome = theme.palette.mode === 'light'
        ? theme.palette.primary.main === '#000000' || theme.palette.secondary.main === '#757575'
        : theme.palette.primary.main === '#FFFFFF' || theme.palette.secondary.main === '#BDBDBD';

    const visualizationColors = isMonochrome ? {
        border: 'grey.400',
        icon: 'grey.600',
        text: 'grey.600',
        secondary: 'grey.500',
        accent: 'grey.500'
    } : {
        border: 'info.main',
        icon: 'info.main',
        text: 'text.secondary',
        secondary: 'warning.main',
        accent: 'warning.main'
    };

    // --- Placeholder Visualization Rendering ---
    const renderPlaceholderVisualization = () => {
        // Find the "start" step to begin the sequence
        const startStep = steps.find(step => step.type === 'start');
        let currentStep = startStep;
        const orderedSteps = [];

        // Simple chain traversal to show a linear flow for the placeholder
        const visitedIds = new Set();
        while (currentStep && !visitedIds.has(currentStep.id)) {
            orderedSteps.push(currentStep);
            visitedIds.add(currentStep.id);

            if (currentStep.type === 'decision') {
                // For decision, we'll follow the 'true' path for a linear visual representation
                currentStep = steps.find(step => step.id === currentStep.trueNextId);
            } else {
                currentStep = steps.find(step => step.id === currentStep.nextStepId);
            }
        }

        return (
            <Box sx={{ mt: 3, p: 3, border: '2px dashed', borderColor: visualizationColors.border, borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: visualizationColors.icon }}>
                    <CallSplitIcon sx={{ verticalAlign: 'middle', mr: 1, color: visualizationColors.icon }} /> Flowchart Visualization (In Development)
                </Typography>
                <Typography variant="body2" sx={{ color: visualizationColors.text, mb: 2 }}>
                    **Visualization Data Structure Preview:** This area will render an interactive flowchart showing procedural steps.
                </Typography>
                <Stepper orientation="vertical" activeStep={orderedSteps.length} sx={{ '& .MuiStepConnector-line': { minHeight: '50px' } }}>
                    {orderedSteps.map((step, index) => (
                        <Step key={step.id} active={false}>
                            <StepLabel icon={
                                step.type === 'decision' ? <CallSplitIcon sx={{ color: visualizationColors.secondary }} /> : null
                            }>
                                <Paper elevation={2} sx={{ p: 1.5, bgcolor: visualizationColors.secondary + '.light', color: 'text.primary', borderRadius: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{step.label} ({step.type})</Typography>
                                    <Typography variant="caption">{step.content.substring(0, 80)}...</Typography>
                                </Paper>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {orderedSteps.length > 0 && <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>**Note:** Decision branching logic is represented structurally but not visually fully here.</Typography>}
            </Box>
        );
    };
    // --- End Placeholder Visualization Rendering ---

    const renderAccessibilityTable = () => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>Accessibility & Data Table</Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                    **Alt Text:** {accessibility.altText}
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
                    **Long Description:** {accessibility.longDescription}
                </Typography>
                {/* Simplified Table Render: This is just a structural confirmation */}
                {accessibility.dataTable && (
                    <Typography variant="caption" display="block">
                         Data Table available with {accessibility.dataTable.headers.length} columns and {accessibility.dataTable.rows.length} rows.
                    </Typography>
                )}
            </Paper>
        </Box>
    );

    return (
        <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3, borderLeft: '8px solid', borderColor: visualizationColors.border }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: visualizationColors.icon, fontWeight: 'bold' }}>
                Flowchart: {title}
            </Typography>
            {renderPlaceholderVisualization()}
            {accessibility && renderAccessibilityTable()}
        </Paper>
    );
};

export default FlowchartVisualization;
