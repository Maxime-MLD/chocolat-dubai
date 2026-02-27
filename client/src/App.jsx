import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard"; // On importe le nouveau composant

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Petit état pour le chargement

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="app-container bg-dxb-cream min-h-screen">
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto py-20 px-6">
        {/* TITRE DE SECTION */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-dxb-dark">
            Nos Créations
          </h2>
          <div className="w-24 h-1 bg-dxb-gold mx-auto"></div>
        </div>

        {loading ? (
          <div className="text-center font-arabic text-2xl text-dxb-gold animate-pulse">
            Préparation de vos chocolats...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
