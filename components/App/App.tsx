import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Button } from '@mui/material';
import { useQueries } from '../../contexts/useQueries';
import { QueryCard } from '../QueryCard';

export const App = () => {
  const {queries, addQuery, updateQuery} = useQueries()
  const [initialRender, setInitialRender] = useState(true)

  useEffect(() => {
    setInitialRender(false)
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Button variant="contained" onClick={() => addQuery()}>Add</Button>
      </header>

      <div className={styles.appBody}>
        {initialRender ? null : queries.map((q, i) => <QueryCard key={i} query={q} />).reverse()}
      </div>
    </div>
  );
}
