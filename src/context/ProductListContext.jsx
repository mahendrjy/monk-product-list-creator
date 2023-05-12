import { createContext, useEffect, useState } from 'react'

export const ProductListContext = createContext()

const ProductListProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [selectedProductVariant, setSelectedProductVariant] =
    useState({
      variant: false,
      product: false,
      variantIndex: 0,
      productIndex: 0,
    })

  useEffect(() => {
    setItems([
      {
        id: 77,
        title: 'Fog Linen Chambray Towel - Beige Stripe',
        discount: {
          value: 20,
          type: 'percent',
        },
        variants: [
          {
            id: 1,
            product_id: 77,
            title: 'XS / Silver',
            price: '49',
          },
          {
            id: 2,
            product_id: 77,
            title: 'S / Silver',
            price: '49',
          },
          {
            id: 3,
            product_id: 77,
            title: 'M / Silver',
            price: '49',
          },
        ],
        image: {
          id: 266,
          product_id: 77,
          src: 'https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1',
        },
      },
      {
        id: 80,
        title: 'Orbit Terrarium - Large',
        discount: {
          value: 20,
          type: 'percent',
        },
        variants: [
          {
            id: 64,
            product_id: 80,
            title: 'Default Title',
            price: '109',
          },
        ],
        image: {
          id: 272,
          product_id: 80,
          src: 'https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1',
        },
      },
    ])
  }, [])

  return (
    <ProductListContext.Provider
      value={{
        items,
        setItems,
        selectedProductVariant,
        setSelectedProductVariant,
      }}
    >
      {children}
    </ProductListContext.Provider>
  )
}

export default ProductListProvider
