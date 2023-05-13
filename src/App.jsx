import { useContext } from 'react'
import Button from './components/Button'
import Header from './components/Header'
import ProductList from './components/ProductList'
import { ProductListContext } from './context/ProductListContext'

// TODO: Show Internal Server Error on screen

const App = () => {
  const { handleAddProduct } = useContext(ProductListContext)

  return (
    <div className="min-h-screen mx-auto bg-gray-50 md:max-w-7xl drop-shadow-2xl">
      <Header />
      <div className="px-4 mt-16 md:max-w-lg md:ml-80 md:px-0">
        <h1 className="text-base font-semibold">Add Products</h1>
        <div className="mt-8">
          <ProductList />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleAddProduct} size="large">
            Add Product
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
