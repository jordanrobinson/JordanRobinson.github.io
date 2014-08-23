/**
 * jordan-robinson-site
 * https://github.com/jordanrobinson/jordan-robinson-site/
 * Copyright (c) 2014 Jordan Robinson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: ['src/scripts/*.js']
    },

    htmllint: {
      all: ['*.html']
    },

    csslint: {
      strict: {
        src: ['*.css']
      }
    },
    
    clean: {
      example: ['<%= site.destination %>/*.html']
    },

    uglify: {
      target: {
        files: {
          'assets/scripts/site.min.js': ['src/scripts/site.js']
        }
      }
    },

    watch: {
      jshint: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint:lint']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html');

  // Default to tasks to run with the "grunt" command.
  grunt.registerTask('default', ['htmllint', 'jshint', 'csslint', 'uglify']);
};
