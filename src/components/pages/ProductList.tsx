import { useState } from "react";
import Filters from "../Filters/Filters";
import ProductGrid from "../ProductGrid/ProductGrid";
import productsData from "../../data/products.json";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size: number[];
  color: string;
}

interface FilterState {
  category: string[];
  size: number[];
  color: string[];
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsData);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = products.filter((product) => {
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(product.category);
      const sizeMatch =
        filters.size.length === 0 ||
        product.size.some((s) => filters.size.includes(s));
      const colorMatch =
        filters.color.length === 0 ||
        filters.color.some((c) =>
          product.color.toLowerCase().includes(c.toLowerCase())
        );
      return categoryMatch && sizeMatch && colorMatch;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trail Running Shoes</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4">
          <ProductGrid products={filteredProducts} />{" "}
          {/* products passed here */}
        </div>
      </div>
    </div>
  );
}
