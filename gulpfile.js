/* Imprtando o modulo do gulp */
const gulp = require('gulp');

/* Importando o modulo do gulp-concat */
const gulpConcat = require('gulp-concat');

/* Importando o modulo do gulp-cssmin */
const gulpCssMin = require('gulp-cssmin');

/* Importando o modulo do gulp-uncss */
const gulpUnCss = require('gulp-uncss');

/* Importando o modulo do browser-sync e executando o método create */
const browserSync = require('browser-sync').create();

/* Tarefa que irá transferir os arquivos js da pasta node_modules para a pasta js */
gulp.task('js', function() {
    return gulp.src([ /* Origem dos arquivos */
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery/dist/jquery.min.js'
    ])
    .pipe(gulp.dest('js')); /* Pasta de destino */
});

/*
    Tarefa que irá transferir os arquivos css da pasta node_modules para a pasta css
    Concatena todos os arquivos em um único arquivo com o gulp-concat
    Minifica o arquivo final com o gulp-cssmin
    Remove todo css não utilizado das views com o gulp-uncss
*/
gulp.task('css', function() {
    return gulp.src([ /* Origem dos arquivos */
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './etc/file.css'
    ])
    .pipe(gulpConcat('style.min.css')) /* Arquivo concatenado */
    .pipe(gulpCssMin()) /* Minificando o arquivo */
    .pipe(gulpUnCss({ html: ['html/**/*.html'] })) /* Removendo css não utilizado nas views */
    .pipe(gulp.dest('css')) /* Pasta de destino */
    .pipe(browserSync.stream()); /* Quando a tarefa for executada o browser-sync atualizará o navegador */
});

/* Tarefa observa determinadas pastas, se houver alguma alteração ela executa a tarefa especificada */
gulp.task('watch', function() {
    gulp.watch('./etc/**/*.css', gulp.series('css')); /* Método series identifica a tarefa que será executada */
});

/* Tarefa para iniciar o browser-sync */
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost:3000' /* Endereço do servidor onde a aplicação está rodando */
    });

    /* Opcional, executa o watch ao iniciar o browser-sync */
    gulp.watch('./etc/**/*.css', gulp.series('css'));
});

/* Tarefa que executa todas as tarefas listadas no método parallel */
gulp.task('default', gulp.parallel('js', 'css', 'watch'));