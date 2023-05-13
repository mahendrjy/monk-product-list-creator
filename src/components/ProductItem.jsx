import {
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ReorderIcon } from './Logos'
import { useContext, useEffect, useState } from 'react'
import Button from './Button'
import SelectProducts from './SelectProducts'
import { classNames } from '../utils'
import { ProductListContext } from '../context/ProductListContext'

const ProductItem = ({
  value,
  currentItem,
  variant,
  index,
  handleRemove,
}) => {
  const { items, setItems } = useContext(ProductListContext)
  const [addDiscount, setAddDiscount] = useState(false)
  const [discount, setDiscount] = useState(null)
  const [selectedDiscountType, setSelectedDiscountType] =
    useState(null)

  useEffect(() => {
    if (value?.discount?.value)
      setDiscount(value?.discount?.value)
    if (value?.discount?.type)
      setSelectedDiscountType(value?.discount?.type)

    if (discount !== null && selectedDiscountType !== null) {
      setAddDiscount(true)
    }
  }, [
    value?.discount?.value,
    value?.discount?.type,
    discount,
    selectedDiscountType,
  ])

  const handleDiscountChange = (e) => {
    const newValue =
      typeof Number(e.target.value) === 'number'
        ? Number(e.target.value)
        : discount

    setItems((prev) =>
      prev.map((item) =>
        item.id === value.id
          ? {
              ...item,
              discount: {
                value: newValue,
                type: selectedDiscountType,
              },
            }
          : item
      )
    )
  }

  const handleDiscountTypeChange = (e) => {
    setSelectedDiscountType(e.target.value)
    const newValue =
      typeof Number(discount) === 'number' ? Number(discount) : 0

    setItems((prev) =>
      prev.map((item) =>
        item.id === value.id
          ? {
              ...item,
              discount: {
                value: newValue,
                type: e.target.value,
              },
            }
          : item
      )
    )
  }

  const handleVariantDiscountChange = (e) => {
    const newValue =
      typeof Number(e.target.value) === 'number'
        ? Number(e.target.value)
        : discount

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === currentItem.id) {
          return {
            ...item,
            variants: item.variants.map((variant) => {
              if (variant.id === value.id) {
                return {
                  ...variant,
                  discount: {
                    value: newValue,
                    type: selectedDiscountType,
                  },
                }
              } else {
                return variant
              }
            }),
          }
        } else {
          return item
        }
      })
    })
  }

  const handleVariantDiscountTypeChange = (e) => {
    setSelectedDiscountType(e.target.value)

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === currentItem.id) {
          return {
            ...item,
            variants: item.variants.map((variant) => {
              if (variant.id === value.id) {
                return {
                  ...variant,
                  discount: {
                    value: 0,
                    type: e.target.value,
                  },
                }
              } else {
                return variant
              }
            }),
          }
        } else {
          return item
        }
      })
    })
  }

  const handleAddDiscount = () => {
    setAddDiscount(true)
    setDiscount(0)
    setSelectedDiscountType('percent')
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <SelectProducts
        value={value}
        items={items}
        setItems={setItems}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      <div
        className={classNames(
          variant ? 'justify-end' : 'justify-between',
          'flex items-center w-full h-16 my-2 gap-4 list-none select-none'
        )}
      >
        <div
          className={classNames(
            variant ? 'justify-end flex' : '',
            'w-2/3'
          )}
        >
          <div
            className={classNames(
              variant
                ? 'w-3/4 rounded-2xl'
                : 'w-full rounded-sm',
              'flex items-center gap-4'
            )}
          >
            <button
              className="px-1 py-3 rounded-sm cursor-grab"
              data-movable-handle
              tabIndex={-1}
            >
              <ReorderIcon className="w-4 h-4" />
            </button>
            {!variant ? <span>{index + 1}.</span> : null}
            <div
              className={classNames(
                variant ? 'rounded-full' : ' rounded-sm',
                'pl-2 flex-1 mr-0.5 bg-white drop-shadow-md text-sm flex items-center justify-between'
              )}
            >
              {value?.title?.length > 0 ? (
                <span className="text-gray-800">
                  {value.title}
                </span>
              ) : (
                <span className="text-gray-500">
                  Select Product
                </span>
              )}
              <span
                onClick={openModal}
                className="flex items-center px-2 cursor-pointer h-9"
              >
                <PencilIcon className="w-5 h-5 text-gray-500" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {addDiscount ? (
            <>
              <input
                type="number"
                min="0"
                className={classNames(
                  variant ? 'rounded-full' : 'rounded-sm',
                  'px-3 py-2 h-9 w-16  bg-white drop-shadow-md text-xs border-none'
                )}
                value={discount}
                onChange={
                  variant
                    ? handleVariantDiscountChange
                    : handleDiscountChange
                }
              />
              <div className="relative bg-white w-22 h-9 drop-shadow-md">
                <select
                  value={selectedDiscountType}
                  onChange={
                    variant
                      ? handleVariantDiscountTypeChange
                      : handleDiscountTypeChange
                  }
                  className={classNames(
                    variant ? 'rounded-full' : 'rounded-sm',
                    'py-2 border-none appearance-none relative w-24 h-9 text-xs'
                  )}
                >
                  <option value="percent">% Off</option>
                  <option value="flat">flat Off</option>
                </select>
              </div>
            </>
          ) : (
            <Button onClick={handleAddDiscount} className="w-40">
              Add Discount
            </Button>
          )}
          {items.length > 1 ? (
            <button
              onClick={() => handleRemove(value.id, index)}
            >
              <XMarkIcon
                className="w-5 h-5 ml-1 text-gray-500"
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ProductItem
