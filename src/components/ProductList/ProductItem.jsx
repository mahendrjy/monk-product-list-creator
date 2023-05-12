import {
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ReorderIcon } from '../Logos'
import { ProductListContext } from '../../context/ProductListContext'
import { useContext, useEffect, useState } from 'react'
import Button from '../Button'
import SelectProducts from '../SelectProducts'
import { classNames } from '../../utils'

const ProductItem = ({
  value,
  currentItem,
  variant,
  index,
  handleRemove,
}) => {
  const [addDiscount, setAddDiscount] = useState(false)
  const [discount, setDiscount] = useState(null)
  const [selectedDiscountType, setSelectedDiscountType] =
    useState(null)
  const { items, setItems } = useContext(ProductListContext)

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

    setDiscount(newValue)
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

    setDiscount(newValue)
  }

  const handleVariantDiscountChange = (e) => {
    const updatedVariants = currentItem?.variants.map((item) =>
      item.id === value.id
        ? {
            ...item,
            discount: {
              value: Number(e.target.value) || discount,
              type: selectedDiscountType,
            },
          }
        : item
    )

    setItems((prev) =>
      prev.map((item) =>
        item.id === currentItem.id
          ? { ...item, variants: updatedVariants }
          : item
      )
    )
  }

  const handleVariantDiscountTypeChange = (e) => {
    setSelectedDiscountType(e.target.value)
    const newValue =
      typeof Number(discount) === 'number' ? Number(discount) : 0

    const updatedVariants = currentItem?.variants.map((item) =>
      item.id === value.id
        ? {
            ...item,
            discount: {
              value: newValue,
              type: e.target.value || selectedDiscountType,
            },
          }
        : item
    )

    setItems((prev) =>
      prev.map((item) =>
        item.id === currentItem.id
          ? { ...item, variants: updatedVariants }
          : item
      )
    )
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
      <SelectProducts isOpen={isOpen} closeModal={closeModal} />
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
              className="cursor-grab py-3 px-1 rounded-sm"
              data-movable-handle
              tabIndex={-1}
            >
              <ReorderIcon className="h-4 w-4" />
            </button>
            {!variant && (index || index === 0) ? (
              <span>{index + 1}.</span>
            ) : null}
            <span
              className={classNames(
                variant ? 'rounded-full' : ' rounded-sm',
                'py-2 flex-1 px-4 mr-0.5 bg-white drop-shadow-md text-sm cursor-pointer'
              )}
              onClick={openModal}
            >
              {value.title}
            </span>
          </div>
        </div>
        <div className="w-1/3 flex items-center gap-2">
          {addDiscount ? (
            <>
              <input
                type="number"
                min="0"
                className={classNames(
                  variant ? 'rounded-full' : 'rounded-sm',
                  'p-2 w-20  bg-white drop-shadow-md text-sm'
                )}
                value={discount}
                onChange={
                  variant
                    ? handleVariantDiscountChange
                    : handleDiscountChange
                }
              />
              <div className="relative">
                <select
                  value={selectedDiscountType}
                  onChange={
                    variant
                      ? handleVariantDiscountTypeChange
                      : handleDiscountTypeChange
                  }
                  className={classNames(
                    variant ? 'rounded-full' : 'rounded-sm',
                    'py-2 px-7 bg-white drop-shadow-md text-sm appearance-none'
                  )}
                >
                  <option value="percent">% Off</option>
                  <option value="flat">flat Off</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4">
                  <ChevronDownIcon className="w-4 h-4 text-gra-500 -mr-2" />
                </div>
              </div>
            </>
          ) : (
            <Button
              onClick={handleAddDiscount}
              className="w-full"
            >
              Add Discount
            </Button>
          )}
          {items.length > 1 ? (
            <button onClick={handleRemove}>
              <XMarkIcon
                className="h-6 w-6"
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
