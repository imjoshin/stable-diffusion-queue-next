import React, { ReactNode, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Query, QueryStatus } from '../util/types'

type QueryContextType = {
  queries: Query[],
  addQuery: (query?: Partial<Query>) => void,
  updateQuery: (query: Query) => void,
}

const QueriesContext = React.createContext<QueryContextType>({
  queries: [],
  addQuery: (query?: Partial<Query>) => console.error("useQueries is not initialized!"),
  updateQuery: (query: Query) => console.error("useQueries is not initialized!"),
})

export const QueriesProvider = (props: {children: ReactNode}) => {
  const [queries, setQueries] = useLocalStorage<Query[]>('queries', [])

  const addQuery = (query?: Partial<Query>) => {
    queries.push({
      id: queries.length,
      prompt: query?.prompt || '',
      negativePrompt: query?.negativePrompt || '',
      steps: query?.steps || 50,
      method: query?.method || 'Euler a',
      width: query?.width || 512,
      height: query?.height || 512,
      restoreFaces: query?.restoreFaces === undefined ? true : query.restoreFaces,
      cfg: query?.cfg || 8,
      status: QueryStatus.NotStarted,
      expanded: true,
    })

    setQueries([...queries])
  }

  const updateQuery = (query: Query) => {
    const indexToUpdate = queries.findIndex(q => q.id === query.id)
    if (indexToUpdate >= 0) {
      const newQueries = [...queries]
      newQueries[indexToUpdate] = {...query}

      setQueries(newQueries)
    }
  }

  return (
    <QueriesContext.Provider value={{ queries, addQuery, updateQuery }}>
      {props.children}
    </QueriesContext.Provider>
  )
}

export const useQueries = () => {
  const context = useContext(QueriesContext)

  return context
}