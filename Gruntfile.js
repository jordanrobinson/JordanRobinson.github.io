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
       }
     },
     cssCharCount: {
       command: 'sh scripts/publish/cssCharCount.sh',
       options: {
         callback: cssCharCount
       }
     },
     jsCharCount: {
       command: 'sh scripts/publish/jsCharCount.sh | grep total',
       options: {
         callback: jsCharCount
       }
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

  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['scripts/cheet.js', 'scripts/ga.js', 'scripts/site.js'],
      dest: 'output/scripts/site.min.js',
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
    all: ['scripts/site.js']
  },

  csslint: {
    strict: {
      src: ['styles/*.css']
    }
  },

  uglify: {
    target: {
      files: {
        'output/scripts/site.min.js': ['output/scripts/site.min.js']
      }
    }
  }
});

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
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
  grunt.registerTask('default', ['jshint', 'cssmin', 'concat', 'uglify', 'shell:size', 'shell:cssCharCount', 'shell:jsCharCount', 'copy']);
  grunt.registerTask('publish', ['default', 'shell:publish']);
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
  var size = 'Is currently ' + stdout.replace(' ', '').replace('\n', '') + 'B';
  clearStats();
  addStat(size);
  addTextStats();
  cb();
}

function cssCharCount(err, stdout, stderr, cb) {
  var charCount = 'Has ' + stdout.replace('styles', '').replace('styles.css', '').replace('\n', '').replace(' \/', '') + ' lines of CSS (before minification)';
  addStat(charCount);
  cb(); 
}

function jsCharCount(err, stdout, stderr, cb) {
  var charCount = 'Has ' + stdout.replace(/\n/g, '').replace(/\//g, '').replace(/\W/g, '').replace(/total/g, '') + ' lines of JS (before minification)';
  console.log(charCount);
  addStat(charCount);
  cb(); 
}

function addTextStats() {
  addStat('Can be found on Github, and is open source');
  addStat('Is HTTPS, I\'m using cloudflare');
  addStat('Hosting is taken care of by Github pages, with a custom CNAME');
  addStat('The link images were generated using Icomoon, a lovely tool for fonts');
  addStat('These stats are automatically generated at build time, using grunt for CI');
  addStat('The font used is Cabin, one of the Google fonts');
  addStat('It doesn\'t use any javascript libraries, just plain JS');
  addStat('Is fully Konami code compliant');
}
