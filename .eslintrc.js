module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  "extends": [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "prettier"
  ],
  "rules": {
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  }
}