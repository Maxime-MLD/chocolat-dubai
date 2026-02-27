export default function ProductCard({ product }) {
  // Si ton API stocke juste le nom de l'image, ajoute le chemin de ton dossier images
  const imageUrl =
    product.image_url || `http://localhost:5000/images/${product.image}`;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x400?text=Dubai+Choco";
          }}
        />
      </div>

      {/* INFOS */}
      <div className="p-6 flex flex-col grow text-center">
        <h3 className="text-xl font-arabic text-dxb-dark mb-2 uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 font-sans mb-6 line-clamp-3">
          {product.description ||
            "L'équilibre parfait entre le croquant du Kataïf et l'onctuosité de la pistache."}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="text-left">
            <span className="block text-[10px] text-stone-400 uppercase font-bold tracking-widest">
              Prix
            </span>
            <span className="text-2xl font-black text-dxb-gold">
              {product.price}€
            </span>
          </div>

          <button className="bg-dxb-dark text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-dxb-gold transition-all duration-300 shadow-md">
            AJOUTER
          </button>
        </div>
      </div>
    </div>
  );
}
