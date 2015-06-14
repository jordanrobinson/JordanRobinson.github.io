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
      }
    },

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
  grunt.loadNpmTasks('grunt-shell');

  // Default to tasks to run with the "grunt" command.

  grunt.registerTask('updatejson', function () {
    var projectFile = "json/statistics.json";

    if (!grunt.file.exists(projectFile)) {
      grunt.log.error("file " + projectFile + " not found");
            return true;//return false to abort the execution
          }
        var project = grunt.file.readJSON(projectFile);//get file as json object

        project['statistics'] = ['thing', 'other thing', size];//edit the value of json object, you can also use projec.key if you know what you are updating

        grunt.file.write(projectFile, JSON.stringify(project, null, 2));//serialize it back to file

      });
  grunt.registerTask('default', ['jshint', 'csslint', 'uglify', 'shell']);
};


// function addStat(value) {
//  var projectFile = "json/statistics.json";

//  if (!grunt.file.exists(projectFile)) {
//   grunt.log.error("file " + projectFile + " not found");
// return true;//return false to abort the execution
// }
// var project = grunt.file.readJSON(projectFile);//get file as json object

// project['statistics'] = ['thing', 'other thing', value];//edit the value of json object, you can also use projec.key if you know what you are updating

// grunt.file.write(projectFile, JSON.stringify(project, null, 2));//serialize it back to file
// }

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
  var size = 'The project size is ' + stdout.replace(/ /g,'');
  clearStats();
  addStat(size);
  addTextStats();
  console.log(size);
  cb();
}

function addTextStats() {
  addStat('The whole website can be found on Github, and is open source');
  addStat('For HTTPS, I\'m using cloudflare');
  addStat('Hosting is taken care of by Github pages, with a custom CNAME');
  addStat('The link images were generated using Icomoon, a lovely tool for fonts');
  addStat('These stats are automatically generated at build time, using grunt for CI');
  addStat('The font used on this site is Cabin, one of the Google fonts');
  addStat('This site doesn\'t use any javascript libraries, and is just plain JS (though there are some node libraries for the grunt build)');
}