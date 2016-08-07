
var basePaths = {
    src: "src/",
    dest: "dist/",
};

module.exports = {
    base: {
        src: basePaths.src,
        dest: basePaths.dest,
    },
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
        src: basePaths.src + "**/*.scss",
        file: basePaths.src + "styles/styles.scss",
        dest: basePaths.dest + "css/",
    },
    images: {
        src: basePaths.src + "images/*",
        dest: basePaths.dest + "images/",
        favicon: {
            src: basePaths.src + "images/favicons/*",
            dest: basePaths.dest
        }
    }
};
