module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: "messaging_app/static/stylesheets",
          src: ['*.scss'],
          dest: 'messaging_app/static/stylesheets',
          ext: '.css'
       }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass']);
};