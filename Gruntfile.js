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

    shell: {
      size: {
         command: 'sh scripts/publish/size.sh',
         options: {
           callback: size
         },
      },
      publish: {
        command: 'sh scripts/publish/publish.sh'
      }
    },

    copy: {
      main: {
        files: [
        {expand: true, cwd: 'root/', src: '*', dest: 'output/', filter: 'isFile'},
        {expand: true, src: ['images/**'], dest: 'output/'},
        {expand: true, src: ['json/**'], dest: 'output/'},
        {expand: true, src: ['fonts/**'], dest: 'output/'}
        ],
      },
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['styles/styles.css', '!*.min.css'],
          dest: 'output/',
          ext: '.min.css'
        }]
      }
    },

    sitemap: {
      dist: {
            pattern: ['**/*.html', '!**/google*.html'],
            siteRoot: 'output/'
          }
        },

        jshint: {
          all: ['scripts/*.js']
        },

        csslint: {
          strict: {
            src: ['styles/*.css']
          }
        },

        clean: {
          example: ['<%= site.destination %>/*.html']
        },

        uglify: {
          target: {
            files: {
              'output/scripts/site.min.js': ['scripts/site.js']
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sitemap');
  grunt.loadNpmTasks('grunt-git');

  // Default to tasks to run with the "grunt" command.
  grunt.registerTask('default', ['jshint', 'csslint', 'cssmin', 'uglify', 'copy', 'shell:size', 'shell:publish']);
};

// utility functions

function addStat(value) {
  var fs = require('fs');

  var statistics = require('./json/statistics.json');
  statistics.statistics.push(value);

  fs.writeFileSync('json/statistics.json', JSON.stringify(statistics), 'utf-8'); 
}

function clearStats() {
  var fs = require('fs');
  var statistics = {
   statistics: []
 };

 fs.writeFileSync('json/statistics.json', JSON.stringify(statistics), 'utf-8'); 
}

function size(err, stdout, stderr, cb) {
  var size = 'Is currently ' + stdout;
  clearStats();
  addIntroStat();
  addStat(size);
  addTextStats();
  console.log(size);
  cb();
}

function addIntroStat() {
  addStat('This site...');  
}

function addTextStats() {
  addStat('Can be found on Github, and is open source');
  addStat('Is HTTPS, I\'m using cloudflare');
  addStat('Hosting is taken care of by Github pages, with a custom CNAME');
  addStat('The link images were generated using Icomoon, a lovely tool for fonts');
  addStat('These stats are automatically generated at build time, using grunt for CI');
  addStat('The font used is Cabin, one of the Google fonts');
  addStat('It doesn\'t use any javascript libraries, just plain JS');
}
