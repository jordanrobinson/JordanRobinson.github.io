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

    csslint: {
      strict: {
        src: ['assets/styles/*.css']
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
        files: ['src/scripts/*.js'],
        tasks: ['jshint', 'uglify']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default to tasks to run with the "grunt" command.

  grunt.registerTask('updatejson', function () {
        var projectFile = "json/statistics.json";

        if (!grunt.file.exists(projectFile)) {
            grunt.log.error("file " + projectFile + " not found");
            return true;//return false to abort the execution
        }
        var project = grunt.file.readJSON(projectFile);//get file as json object

        project['statistics'] = ['thing', 'other thing'];//edit the value of json object, you can also use projec.key if you know what you are updating

        grunt.file.write(projectFile, JSON.stringify(project, null, 2));//serialize it back to file

    });
  grunt.registerTask('default', ['jshint', 'csslint', 'uglify', 'updatejson']);
};
