module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite", // Flotación suave
        pop: "pop 0.5s ease-out forwards", // Explosión
        "spin-slow": "spin 2s linear infinite", // Animación de rotación lenta
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "70%": { transform: "scale(1.5)", opacity: "0.7" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      transform: {
        "preserve-3d": "preserve-3d",
      },
      backfaceVisibility: {
        hidden: "hidden",
      },
      rotate: {
        "y-180": "rotateY(180deg)", // Rotación para las tarjetas giratorias
      },
    },
  },
  plugins: [],
};
