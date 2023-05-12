import { useContext, useState } from 'react'
import useInfiniteLoading from '../hooks/useInfiniteLoading'
import Modal from './Modal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ProductListContext } from '../context/ProductListContext'

const SelectProducts = ({ isOpen, closeModal }) => {
  const { setItems } = useContext(ProductListContext)
  const [checkedProducts, setCheckedProducts] = useState([])
  const [checkedVariants, setCheckedVariants] = useState([])

  const handleCheckboxProductChange = (productId) => {
    setCheckedProducts((prevCheckedItems) => {
      const newCheckedProducts = { ...prevCheckedItems }
      newCheckedProducts[productId] =
        !newCheckedProducts[productId]

      const newCheckedVariants = { ...checkedVariants }
      products.forEach((product) => {
        if (product.id === productId) {
          product.variants.forEach((variant) => {
            newCheckedVariants[variant.id] =
              newCheckedProducts[productId]
          })
        }
      })

      setCheckedVariants(newCheckedVariants)

      return newCheckedProducts
    })
  }

  const handleCheckboxVariantChange = (variantId, productId) => {
    setCheckedVariants((prevCheckedItems) => {
      const newCheckedVariants = { ...prevCheckedItems }
      newCheckedVariants[variantId] =
        !newCheckedVariants[variantId]

      const product = products.find((p) => p.id === productId)
      const allVariantsSelected = product.variants.every(
        (variant) => newCheckedVariants[variant.id]
      )

      setCheckedProducts((prevCheckedItems) => {
        const newCheckedProducts = { ...prevCheckedItems }
        newCheckedProducts[productId] = allVariantsSelected
        return newCheckedProducts
      })

      return newCheckedVariants
    })
  }

  const { items: products, loadMoreRef } = useInfiniteLoading({
    getItems: async ({ page }) => {
      const res = await fetch(
        `https://stageapibc.monkcommerce.app/admin/shop/product?page=${page}`
      )
      return res.json()
    },
  })

  const handleSelectProduct = () => {
    const selectedProducts = products
      .filter((product) => checkedProducts[product.id])
      .map((product) => ({
        id: product.id,
        title: product.title,
        discount: product.discount,
        variants: product.variants,
        image: product.image,
      }))

    const selectedVariants = products.flatMap((product) =>
      product.variants.filter(
        (variant) => checkedVariants[variant.id]
      )
    )

    const selectedData = selectedProducts.map((product) => {
      const filteredVariants = selectedVariants.filter(
        (variant) => variant.product_id === product.id
      )

      return {
        ...product,
        variants: filteredVariants,
      }
    })

    setItems((prevItems) => [...prevItems, ...selectedData])
    closeModal()
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="h-153 overflow-y-auto">
        <div className="flex items-center justify-between border-b px-6 p-2 fixed bg-white w-full top-0 left-0 right-0">
          <h2>Select Products</h2>
          <button onClick={closeModal}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <ul className="py-8 mb-20">
          {products?.length > 0 &&
            products.map((product) => (
              <li key={product.id} className="border-b">
                <div className="flex p-6 pl-0 border-b items-center gap-4">
                  <div className="flex items-center gap-4 pl-6">
                    <input
                      id={product.id}
                      name="product"
                      aria-describedby={product.title}
                      type="checkbox"
                      className="h-5 w-5 rounded-md border-gray-300"
                      checked={
                        checkedProducts[product.id] || false
                      }
                      onChange={() =>
                        handleCheckboxProductChange(product.id)
                      }
                    />

                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.image.src}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900">
                      {product.title}
                    </h3>
                  </div>
                </div>
                {product?.variants?.length > 0 && (
                  <ul className="py-6 ml-6">
                    {product?.variants.map((variant) => (
                      <li
                        key={variant.id}
                        className="flex p-3 px-12 border-b items-center gap-4 justify-between"
                      >
                        <div className="flex items-center gap-8">
                          <input
                            id={variant.id}
                            name="variant"
                            aria-describedby={variant.title}
                            type="checkbox"
                            className="h-5 w-5 rounded-md border-gray-300"
                            checked={
                              checkedVariants[variant.id] ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxVariantChange(
                                variant.id,
                                product.id
                              )
                            }
                          />
                          <h3 className="text-lg text-gray-900">
                            {variant.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-8">
                          <p className="text-lg text-gray-900">
                            {variant.inventory_quantity}{' '}
                            available
                          </p>
                          <p className="text-lg text-gray-900">
                            ${variant.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
        <p className="-mt-24 text-3xl w-full text-center">
          Loading...
        </p>
        <div ref={loadMoreRef} />
        <div className="flex items-center justify-between border-t px-6 p-2 fixed bg-white w-full bottom-0 left-0 right-0 mt-40">
          <h2>Footer</h2>
          <button onClick={handleSelectProduct}>Add</button>
        </div>
      </div>
    </Modal>
  )
}

export default SelectProducts
