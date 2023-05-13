import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const ProductListContext = createContext()

const ProductListProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const handleAddProduct = () => {
    setItems((prevProducts) => [
      ...prevProducts,
      [
        {
          id: uuidv4(),
          title: '',
          variants: [],
        },
      ],
    ])
  }

  return (
    <ProductListContext.Provider
      value={{
        items,
        setItems,
        handleAddProduct,
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export default ProductListProvider
