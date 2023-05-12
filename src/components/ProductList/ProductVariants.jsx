import { List, arrayMove } from 'react-movable'
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import ProductItem from './ProductItem'
import { ProductListContext } from '../../context/ProductListContext'
import { useContext } from 'react'

const ProductVariants = ({ value, index, props }) => {
  const { items, setItems } = useContext(ProductListContext)

  const handleVariantMove = ({ oldIndex, newIndex }) => {
    const arrayMoveMutate = arrayMove(
      value.variants,
      oldIndex,
      newIndex
    )
    setItems((prev) =>
      prev.map((item) =>
        item.id === value.id
          ? { ...item, variants: arrayMoveMutate }
          : item
      )
    )
  }

  const handleVariantRemove = (itemIndex, variantIndex) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems]
      const item = updatedItems[itemIndex]

      if (item && item.variants) {
        item.variants = item.variants.filter(
          (_, index) => index !== variantIndex
        )
      }

      return updatedItems
    })
  }

  return (
    <List
      values={value?.variants || []}
      onChange={handleVariantMove}
      {...props}
      renderList={({ children, props }) => (
        <>
          {value?.variants.length > 1 ? (
            <Disclosure {...props}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full text-blue-500 underline underline-offset-4 flex items-center gap-1 justify-end">
                    {open ? (
                      <>
                        <span>Hide variants</span>
                        <ChevronUpIcon className="w-5 h-5 pt-1" />
                      </>
                    ) : (
                      <>
                        <span>Show variants</span>
                        <ChevronDownIcon className="w-5 h-5 pt-1" />
                      </>
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <ul {...props}>{children}</ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ) : (
            <div {...props}>{children}</div>
          )}
        </>
      )}
      renderItem={({
        value: variantValue,
        index: variantIndex,
        props,
      }) => (
        <div {...props} className="list-none">
          <ProductItem
            variant
            index={variantIndex}
            handleRemove={() =>
              handleVariantRemove(index, variantIndex)
            }
            items={items}
            currentItem={value}
            value={variantValue}
          />
        </div>
      )}
    />
  )
}

export default ProductVariants
