import { List, arrayMove, arrayRemove } from 'react-movable'
import { useContext } from 'react'
import ProductItem from './ProductItem'
import ProductVariants from './ProductVariants'
import { ProductListContext } from '../../context/ProductListContext'

const ProductList = () => {
  const { items, setItems } = useContext(ProductListContext)

  const handleRemove = (index) => {
    setItems(
      typeof index !== 'undefined'
        ? arrayRemove(items, index)
        : items
    )
  }

  const handleMove = ({ oldIndex, newIndex }) =>
    setItems(arrayMove(items, oldIndex, newIndex))

  return (
    <div className="mt-10">
      <div className="flex font-medium w-full">
        <div className="w-2/3 pl-16">Product</div>
        <div className="w-1/3">Discount</div>
      </div>
      <List
        values={items}
        onChange={handleMove}
        renderList={({ children, props }) => (
          <div {...props}>{children}</div>
        )}
        renderItem={({ value, index, props }) => (
          <div {...props}>
            <ProductItem
              value={value}
              variant={false}
              productIndex={index}
              handleRemove={handleRemove}
            />

            {value?.variants?.length > 0 ? (
              <ProductVariants
                value={value}
                variantIndex={index}
                props={props}
                {...props}
              />
            ) : null}
          </div>
        )}
      />
    </div>
  )
}

export default ProductList
