import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions:
    {
      globals:
      {
        ...globals.browser,
        "Splide": "readonly",
        "mixitup": "readonly",
        "gsap": "readonly",
        "ScrollTrigger": "readonly",
        "$": "readonly",
      }
    },
    "rules": {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "prefer-arrow-callback": "warn",
    }
  },
  pluginJs.configs.recommended,
];