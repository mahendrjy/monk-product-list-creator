import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-cool-inview'

const useInfiniteLoading = (props) => {
  const [page, setPage] = useState(1)
  const { getItems } = props
  const [items, setItems] = useState([])
  const initialPageLoaded = useRef(false)
  const [hasMore] = useState(true)

  const loadItems = useCallback(async () => {
    setPage((prev) => prev + 1)
    const products = await getItems({
      page,
    })
    setItems((prevItems) => [...prevItems, ...products])
  }, [getItems, page])

  useEffect(() => {
    if (initialPageLoaded.current) {
      return
    }

    loadItems()
    initialPageLoaded.current = true
  }, [loadItems])

  const { observe } = useInView({
    onEnter: () => {
      loadItems()
    },
  })

  return {
    items,
    hasMore,
    loadItems,
    loadMoreRef: observe,
  }
}
export default useInfiniteLoading
