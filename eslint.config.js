"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_1 = __importDefault(require("@eslint/js"));
const globals_1 = __importDefault(require("globals"));
const typescript_eslint_1 = __importDefault(require("typescript-eslint"));
const json_1 = __importDefault(require("@eslint/json"));
const markdown_1 = __importDefault(require("@eslint/markdown"));
const css_1 = __importDefault(require("@eslint/css"));
const config_1 = require("eslint/config");
exports.default = (0, config_1.defineConfig)([
    { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js: js_1.default }, extends: ["js/recommended"], languageOptions: { globals: globals_1.default.node } },
    typescript_eslint_1.default.configs.recommended,
    { files: ["**/*.json"], plugins: { json: json_1.default }, language: "json/json", extends: ["json/recommended"] },
    { files: ["**/*.jsonc"], plugins: { json: json_1.default }, language: "json/jsonc", extends: ["json/recommended"] },
    { files: ["**/*.md"], extends: [markdown_1.default.configs.recommended] },
    { files: ["**/*.css"], plugins: { css: css_1.default }, language: "css/css", extends: ["css/recommended"] },
    {
        rules: {
            semi: ["warn", "always"],
            "@typescript-eslint/no-empty-object-type": "off"
        },
    }
]);
//# sourceMappingURL=eslint.config.js.map