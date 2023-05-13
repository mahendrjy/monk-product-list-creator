import { List, arrayMove } from 'react-movable'
import ProductItem from './ProductItem'
import ProductVariants from './ProductVariants'
import { useContext } from 'react'
import { ProductListContext } from '../context/ProductListContext'

const ProductList = () => {
  const { items, setItems } = useContext(ProductListContext)

  const handleRemove = (id, index) => {
    setItems((prev) => {
      const updatedItems = [...prev]
      updatedItems.splice(index, 1)
      return updatedItems
    })
  }

  const handleMove = ({ oldIndex, newIndex }) =>
    setItems(arrayMove(items, oldIndex, newIndex))

  return (
    <>
      {items.length > 0 ? (
        <div className="flex w-full font-medium">
          <div className="w-3/4 pl-16 ml-0.5">Product</div>
          <div className="w-1/2 ml-22">Discount</div>
        </div>
      ) : null}
      <List
        values={items}
        onChange={handleMove}
        renderList={({ children, props }) => (
          <div {...props}>{children}</div>
        )}
        renderItem={({ value, index, props }) => {
          return (
            <div {...props} className="border-b">
              <ProductItem
                value={value}
                variant={false}
                index={index}
                handleRemove={handleRemove}
                items={items}
                setItems={setItems}
              />

              {value?.variants?.length > 0 ? (
                <ProductVariants
                  value={value}
                  index={index}
                  props={props}
                />
              ) : null}
            </div>
          )
        }}
      />
    </>
  )
}

export default ProductList
