module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'primary': "#DD5902",
        'secondary': "#FCB618",
        'accent': "#F5F5F5",
        'neutral': "#EFEFEF",
        'highlight': "#2ECC71",
      },
      textColor: {
        'primary': "#DD5902",
        'secondary': "#FCB618",
        'accent': "#F5F5F5",
        'neutral': "#333333",
        'highlight': "#2ECC71",
      },
      border: {
        'primary': "#DD5902",
        'secondary': "#FCB618",
        'accent': "#F5F5F5",
        'neutral': "#333333",
        'highlight': "#2ECC71",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
