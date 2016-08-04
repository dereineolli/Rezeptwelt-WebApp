var basePaths = {
    src: 'src/',
    dest: 'dist/'
};
var paths = {
    html: {
        src: basePaths.src + "index.html",
        dest: basePaths.dest + "index.html"
    }
    scripts: {
        src: basePaths.src + 'app/',
        dest: basePaths.dest + 'js/'
    },
    styles: {
        src: basePaths.src + 'styles/',
        dest: basePaths.dest + 'css/'
    },
    font: {
        src: basePaths.src + 'fonts/',
        dest: basePaths.dest + 'css/fonts/'
    }
};
var appFiles = {
    style: paths.styles.src + 'styles.scss',
    script: [paths.scripts.src + 'boot']
};
