import Header from './components/Header'
import ProductList from './components/ProductList'

const App = () => {
  return (
    <div className="bg-gray-50 max-w-7xl mx-auto min-h-screen drop-shadow-2xl">
      <Header />
      <div className="mx-auto max-w-2xl py-20">
        <h1 className="text-base font-semibold">Add Products</h1>
        <ProductList />
      </div>
    </div>
  )
}

export default App
