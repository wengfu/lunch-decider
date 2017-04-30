module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      files: ['app/*']
    },
    bower_concat: {
      dev: {
        dest: {
          'js': 'app/lib/lib.js',
          'css': 'app/lib/lib.css'
        },
        mainFiles: {
          'bootstrap': ['dist/css/bootstrap.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  // grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['bower_concat:dev']);
};