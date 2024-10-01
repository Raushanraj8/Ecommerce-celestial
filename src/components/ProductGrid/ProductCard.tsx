import { useCart } from '../Cart/CartContext'


interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  color: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category} | {product.color}</p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}