export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero pt-20">
      {/* 1. ÉLÉMENTS DÉCORATIFS (Optionnel : pour le côté luxe) */}
      {/* <div className="absolute top-0 right-0 w-1/3 h-full bg-dxb-gold/5 -skew-x-25 transform translate-x-2" /> */}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* TEXTE A GAUCHE */}
        <div className="text-left">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-widest text-dxb-gold uppercase border border-dxb-gold rounded-full">
            L'original de Dubaï
          </span>

          <h1 className="leading-tight text-5xl mb-6">
            L'Or Vert du <br />
            <span className="text-dxb-gold italic">Désert</span>
          </h1>

          <p className="text-lg text-dxb-dark mb-10 max-w-lg leading-relaxed">
            Succombez à la fameuse tablette croustillante au Kataïf et à la
            pistache fine. Une expérience sensorielle unique, importée
            directement du cœur de Dubaï.
          </p>

          <div className="flex flex-wrap gap-5">
            <button className="bg-dxb-dark text-white px-10 py-4 rounded-full font-bold hover:bg-dxb-gold transition-all duration-300 shadow-xl hover:-translate-y-1">
              Commander maintenant
            </button>
            {/* <button className="group flex items-center gap-3 text-dxb-dark font-bold hover:text-dxb-gold transition">
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-dxb-dark group-hover:border-dxb-gold transition">
                ▶
              </span>
              Voir la vidéo
            </button> */}
          </div>
        </div>

        {/* IMAGE A DROITE */}
        <div className="relative">
          {/* Un cercle décoratif derrière l'image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-dxb-gold/10 rounded-full blur-3xl" />

          <img
            src="/hero.jpeg" // Remplace par ton image
            alt="Dubai Chocolate Pistachio"
            className="relative z-10 w-full h-auto drop-shadow-2xl rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
