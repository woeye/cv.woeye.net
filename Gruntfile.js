// Lars' default Gruntfile for web development

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      options: {
        compress: true
      },
      development: {
        files: {
          "public/css/main.css": "public/css/main.less"
        }
      }
    },

    watch: {
      less: {
        files: ['public/css/*.less'],
        tasks: ['less']
      }
    },
    
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'public',
          hostname: '*'
        }
      }
    }
  });

  grunt.registerTask('default', ['connect', 'watch']);
};


