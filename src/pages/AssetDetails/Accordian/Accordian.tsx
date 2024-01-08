import { IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState, type FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AccordionContentProps, IAccordion } from '../types';

const AccordionWrapper = styled('div')({
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  padding: '5px',
  borderRadius: '10px',
  marginBottom: '20px',
  background: '#F5F5F5',
  width: '100%'
});

const AccordionHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  cursor: 'pointer'
});

const AccordionContent = styled('div')<AccordionContentProps>(({ expanded }) => ({
  padding: '10px',
  display: expanded ? 'block' : 'none'
}));

const Accordian: FC<IAccordion> = ({ header, content }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleAccordion = (): void => {
    setExpanded(!expanded);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={toggleAccordion}>
        <Typography fontSize="22px" fontWeight="bold" color="grey" mb="20px">
          {header}
        </Typography>
        <IconButton size="small">
          <ExpandMoreIcon />
        </IconButton>
      </AccordionHeader>
      <AccordionContent expanded={expanded}>{content}</AccordionContent>
    </AccordionWrapper>
  );
};

export default Accordian;
