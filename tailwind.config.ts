import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Purple
        purple: "#633CFF",
        purpleHover: "#BEADFF",
        lightPurple: "#EFEBFF",

        // Grey
        darkGrey: "#333333",
        grey: "#737373",
        lightGrey: "#FAFAFA",

        hoverRed: "#FF3939",
        black: "#333333",
        white: "#FFFFFF",

        // icons
        Github: "#1A1A1A",
        FrontendMentor: "#FFFFFF",
        Twitter: "#43B7E9",
        LinkedIn: "#2D68FF",
        YouTube: "#EE3939",
        Facebook: "#2442AC",
        Twitch: "#EE3FC8",
        Devto: "#333333",
        Codewars: "#8A1A50",
        freeCodeCamp: "#302267",
        GitLab: "#EB4925",
        Hashnode: "#0330D1",
        StackOverflow: "#EC7100"
      },
      maxWidth: {
        "10xl": "1440px"
      },
      border: {
        border: "#D9D9D9"
      },
      borderRadius: {
        10: "8px"
      },
      boxShadow: {
        "3xl": "-5px 0 50px -15px #633CFF"
      }
    }
  },
  plugins: []
}
export default config
