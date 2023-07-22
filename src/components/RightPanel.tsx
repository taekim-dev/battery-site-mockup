import { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import InputEstimate from './InputEstimate/InputEstimate';
import BudgetSuggestion from './BudgetSuggestion/BudgetSuggestion';

function RightPanel(): JSX.Element {
    const [view, setView] = useState('inputEstimate');
  
    const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string) => {
      setView(newView);
    };
  
    return (
      <Box>
        <Box display="flex" justifyContent="center" mb={2} >
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view"
          >
            <ToggleButton value="inputEstimate">Estimate</ToggleButton>
            <ToggleButton value="budgetSuggestion">Budget</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {view === 'inputEstimate' ? <InputEstimate /> : <BudgetSuggestion />}
      </Box>
    );
  }
  
  export default RightPanel;
