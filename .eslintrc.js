module.export = {
    parser: "@typescript-esLint/parser",
    Plugin: ["@typescript-esLint"],
    extends: [
        "esLint:recommended",
        "plugin:@typescript-esLint/recommended"
    ]
}