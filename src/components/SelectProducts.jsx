import { useEffect, useState } from 'react'
import useInfiniteLoading from '../hooks/useInfiniteLoading'
import Modal from './Modal'
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import useDebounce from '../hooks/useDebounce'
import Button from './Button'

const SelectProducts = ({
  isOpen,
  closeModal,
  setItems,
  value,
}) => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const { items: allProducts, loadMoreRef } = useInfiniteLoading(
    {
      getItems: async ({ page }) => {
        try {
          const res = await fetch(
            `https://stageapibc.monkcommerce.app/admin/shop/product?page=${page}`
          )
          return res.json()
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      },
    }
  )

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true)
      fetchProductsWithSearch(debouncedSearchTerm)
    } else {
      setProducts(allProducts)
    }
  }, [debouncedSearchTerm, allProducts])

  const fetchProductsWithSearch = async (searchTerm) => {
    try {
      const res = await fetch(
        `https://stageapibc.monkcommerce.app/admin/shop/product?search=${searchTerm}`
      )
      const data = await res.json()

      if (data.length > 0) {
        setProducts(data)
      } else {
        setProducts([])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error fetching searchProducts:', error)
      setLoading(false)
    }
  }

  const [productCheckboxes, setProductCheckboxes] = useState({})
  const [variantCheckboxes, setVariantCheckboxes] = useState({})

  const handleProductCheckboxChange = (event) => {
    const { id } = event.target
    const isChecked = productCheckboxes[id]
    setProductCheckboxes((prev) => {
      const updatedProductCheckboxes = { ...prev }
      if (isChecked) {
        delete updatedProductCheckboxes[id]
      } else {
        updatedProductCheckboxes[id] = true
      }
      return updatedProductCheckboxes
    })
    setVariantCheckboxes((prev) => {
      const updatedCheckboxes = { ...prev }
      const productVariants = products?.find(
        (product) => product.id === Number(id)
      )?.variants
      if (productVariants && productVariants.length > 0) {
        if (isChecked) {
          productVariants.forEach((variant) => {
            delete updatedCheckboxes[variant.id]
          })
        } else {
          productVariants.forEach((variant) => {
            updatedCheckboxes[variant.id] = true
          })
        }
      }
      return updatedCheckboxes
    })
  }

  const handleVariantCheckboxChange = (event, productId) => {
    const { id } = event.target
    if (!productCheckboxes[productId]) {
      productCheckboxes[productId] = true
    }
    setVariantCheckboxes((prev) => {
      const updatedCheckboxes = { ...prev }
      if (updatedCheckboxes[id]) {
        delete updatedCheckboxes[id]
      } else {
        updatedCheckboxes[id] = true
      }
      const hasNoVariantCheckboxes =
        Object.values(updatedCheckboxes).filter(
          (checkbox) => checkbox
        ).length === 0
      if (hasNoVariantCheckboxes) {
        setProductCheckboxes((prev) => {
          const updatedProductCheckboxes = { ...prev }
          delete updatedProductCheckboxes[productId]
          return updatedProductCheckboxes
        })
      }
      return updatedCheckboxes
    })
  }

  const handleSelectProduct = () => {
    if (
      Object.keys(productCheckboxes).length === 0 ||
      Object.keys(variantCheckboxes).length === 0
    ) {
      closeModal()
    }

    const selectedProducts = products?.filter(
      (product) => productCheckboxes[product.id]
    )

    const selectedProductsWithVariants = selectedProducts.map(
      (product) => {
        const productVariants = product.variants
        const variants = []

        if (productVariants && productVariants.length > 0) {
          productVariants.forEach((variant) => {
            if (variantCheckboxes[variant.id]) {
              variants.push(variant)
            }
          })
        }

        return {
          ...product,
          variants,
        }
      }
    )
    setItems((prev) =>
      prev.map((item) =>
        item?.id === value?.id
          ? selectedProductsWithVariants.shift()
          : item
      )
    )

    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => {
        const isSelected = selectedProductsWithVariants.some(
          (selectedProductWithVariants) =>
            selectedProductWithVariants.id === item.id
        )

        return !isSelected
      })

      updatedItems.push(...selectedProductsWithVariants)
      return updatedItems
    })

    closeModal()
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="px-6 py-4 mt-10">
        <label htmlFor="search" className="relative">
          <MagnifyingGlassIcon className="absolute top-0 w-5 h-5 text-gray-500 left-3" />
          <input
            type="text"
            id="search"
            placeholder="Search searchProducts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded focus:ring-green-700 focus:border-green-700"
          />
        </label>
      </div>
      <div className="overflow-y-auto h-153">
        <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full p-2 px-6 pt-3 bg-white border-b">
          <h2 className="text-lg font-medium">
            Select Products
          </h2>
          <button onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 -mr-1" />
          </button>
        </div>
        {loading || products.length === 0 ? (
          <p className="w-full text-center">Loading...</p>
        ) : (
          <div className="max-h-40">
            <ul>
              {products?.length > 0 &&
                products?.map((product) => (
                  <li key={product.id}>
                    <div className="relative flex items-center gap-4 py-3 border-b">
                      <input
                        id={product.id}
                        aria-describedby={product.title}
                        name={product.title}
                        type="checkbox"
                        checked={
                          productCheckboxes[product.id] || false
                        }
                        onChange={handleProductCheckboxChange}
                        className="w-6 h-6 ml-6 text-green-700 border-gray-300 rounded focus:ring-green-700"
                      />
                      <label
                        htmlFor={product.id}
                        className="flex items-center gap-4"
                      >
                        <div className="flex-shrink-0 w-12 h-12 overflow-hidden border border-gray-200 rounded-md">
                          <img
                            src={product.image.src}
                            alt={product.title}
                            className="object-cover object-center w-full h-full"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm text-gray-600 md:text-lg">
                            {product.title}
                          </h3>
                        </div>
                      </label>
                    </div>
                    {product?.variants?.length > 0 && (
                      <ul id="product-variants">
                        {product?.variants.map((variant) => (
                          <li key={variant.id}>
                            <div className="flex items-center w-full gap-4 py-5 pl-16 border-b">
                              <input
                                id={variant.id}
                                name={variant.title}
                                type="checkbox"
                                checked={
                                  variantCheckboxes[
                                    variant.id
                                  ] || false
                                }
                                onChange={(e) =>
                                  handleVariantCheckboxChange(
                                    e,
                                    product.id
                                  )
                                }
                                className="w-6 h-6 ml-3 text-green-700 border-gray-300 rounded focus:ring-green-700"
                              />
                              <label
                                htmlFor={variant.id}
                                className="flex items-center justify-between w-full"
                              >
                                <h3 className="text-sm text-gray-600 md:text-lg">
                                  {variant.title}
                                </h3>
                                <div className="flex items-center gap-10 pr-8">
                                  <p className="text-sm text-gray-600 md:text-lg">
                                    {variant.inventory_quantity}{' '}
                                    available
                                  </p>
                                  <p className="text-sm text-gray-600 md:text-lg">
                                    ${variant.price}
                                  </p>
                                </div>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
            <div ref={loadMoreRef} className="mb-16" />
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between w-full px-6 py-3 bg-white border-t mt-96">
          <h2 className="text-sm md:text-lg">
            {Object.keys(productCheckboxes).length} product
            selected
          </h2>
          <div className="flex items-center w-40 gap-4 md:w-56">
            <Button
              onClick={closeModal}
              size="medium"
              className="w-56 px-4"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSelectProduct}
              className="px-4"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelectProducts
