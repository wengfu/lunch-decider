module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      files: ['app/*']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};