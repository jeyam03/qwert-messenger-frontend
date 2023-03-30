module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        colors: {
          transparent: "transparent",
          currentColor: "currentColor",
          black: "#0B0B17",
          white: "#f5f5f5",
          darkblue: "#1C1C58",
          lavendar: "#806DBF",
          coral: "#C175B5",
          purple: "#7A469B",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
