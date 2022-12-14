import React from 'react';
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Slider, 
  TextField, 
  Typography 
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Query, QueryStatus } from "../../util/types"
import './QueryCard.module.css'
import { useQueries } from "../../contexts/useQueries";

interface QueryCardProps {
  query: Query,
  defaultExpanded?: boolean,
}

export const QueryCard = ({ query, defaultExpanded }: QueryCardProps) => {
  // TODO optimize this, it rerenders all queries
  const {updateQuery} = useQueries()

  const disabled = [QueryStatus.InProgress, QueryStatus.Complete].indexOf(query.status) >= 0
  let title = "New Query"
  if (query.prompt.length) {
    title = query.prompt.length > 15
      ? query.prompt.substring(0, 15) + '...'
      : query.prompt
  }

  return (
    <Accordion 
      className="query-card" 
      defaultExpanded={defaultExpanded}
      expanded={query.expanded}
      onChange={(e, expanded) => {
        const newQuery = { ...query }
        newQuery.expanded = expanded
        updateQuery(newQuery)
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}, Status: {query.status || 'Not Started'}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          id="prompt"
          label="Prompt"
          fullWidth
          multiline
          value={query.prompt}
          disabled={disabled}
          onChange={(e) => {
            const newQuery = { ...query }
            newQuery.prompt = e.target.value
            updateQuery(newQuery)
          }}
        />
        <TextField
          id="negativePrompt"
          label="Negative Prompt"
          fullWidth
          multiline
          value={query.negativePrompt}
          disabled={disabled}
          onChange={(e) => {
            const newQuery = { ...query }
            newQuery.negativePrompt = e.target.value
            updateQuery(newQuery)
          }}
        />
        <Slider
          disabled={disabled}
          value={query.steps}
          min={0}
          max={150}
          onChange={(e, value) => {
            if (typeof value === 'number') {
              const newQuery = { ...query }
              newQuery.steps = value
              updateQuery(newQuery)
            }
          }}
        />
        <Slider
          disabled={disabled}
          value={query.width}
          step={64}
          min={256}
          max={1408}
          onChange={(e, value) => {
            if (typeof value === 'number') {
              const newQuery = { ...query }
              newQuery.width = value
              updateQuery(newQuery)
            }
          }}
        />
        <Slider
          disabled={disabled}
          value={query.height}
          step={64}
          min={256}
          max={1408}
          onChange={(e, value) => {
            if (typeof value === 'number') {
              const newQuery = { ...query }
              newQuery.height = value
              updateQuery(newQuery)
            }
          }}
        />
        <Slider
          disabled={disabled}
          value={query.cfg}
          min={1}
          max={30}
          step={0.5}
          onChange={(e, value) => {
            if (typeof value === 'number') {
              const newQuery = { ...query }
              newQuery.cfg = value
              updateQuery(newQuery)
            }
          }}
        />
      </AccordionDetails>
    </Accordion>
  )
}