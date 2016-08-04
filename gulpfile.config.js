
var basePaths = {
    src: "src/",
    dest: "dist/",
    htmlBaseHref: "/Rezeptwelt"
};

module.exports = {

    html: {
        src: basePaths.src + "**/*.html",
        dest: basePaths.dest,
    },
    scripts: {
        src: basePaths.src + "app/**/*.ts",
        dest: basePaths.dest + "app",
        app: basePaths.src + "app/boot",
    },
    font: {
        src: basePaths.src + "fonts/*",
        dest: basePaths.dest + "css/fonts/"
    },
    css: {
        src: basePaths.src + "**.*.scss",
        file: basePaths.src + "styles/styles.scss",
        dest: basePaths.dest + "css/",
    }

};
