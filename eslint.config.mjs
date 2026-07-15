import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "personal/**", "playwright-report/**", "test-results/**"] },
  ...nextVitals,
];

export default config;
