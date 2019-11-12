import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: "./src/waterfall.ts",
  output: {
    file: "dist/waterfall.js",
    format: "umd",
    sourcemap: true,
    name: "waterfall"
  },
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
      declaration: true
    }),
    sourceMaps()
  ]
};
