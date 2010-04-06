/**
 * Handles the build commands for XUI. Call the build.sh or build.bat file
 * in the root XUI directory to start a build. Call build.sh or build.bat with
 * any options to get the help text.
 */

/*jslint plusplus: false */
/*global load: false, print: false, fileUtil: false, build: false */
"use strict";

load('util/requirejs/build/jslib/build.js');
load('util/requirejs/build/jslib/fileUtil.js');

(function (args) {
    var profileArg = 'profile=',
    
        commands = {
            /**
             * The help command
             */
            helpDoc: 'Gives help on how to run the build.',
            help: function () {
                //build up a list of commands
                var cmds = '', prop;
                for (prop in commands) {
                    if (commands.hasOwnProperty(prop) && prop.indexOf('Doc') === -1) {
                        cmds += '\t' + prop + ': ' + (commands[prop + 'Doc'] || '') + '\n\n';
                    }
                }
    
                print('build.sh command [args]\n' +
                      'where command can be one of the following:\n\n' +
                      cmds + '\n'
                );
            },

            /**
             * The clean command
             */
            cleanDoc: 'Cleans out the built files in lib',
            clean: function () {
                fileUtil.deleteFile('lib');
            },

            /**
             * The build command
             */
            buildDoc: 'Builds a version of XUI. Example commands:\n' +
                      '\t\tThis build uses the build profile util/profiles/enchilada.js\n' +
                      '\t\t> build.sh build profile=enchilda\n\n' +
                      '\t\tThis build defines a name for the build file and what files to include\n' +
                      '\t\t> build.sh build out=lib/xui-basedom.js include=base,core/dom',
            build: function (args) {
                //See if there is a profile arg, and if so get it and remove
                //the option from the other build options.
                var profile, hasBaseUrl = false, i, arg;
                //Go backwards because when the slice happens do not want to
                //mess up traversing the options.
                for (i = args.length - 1; i > -1 && (arg = args[i]); i--) {
                    if (arg.indexOf(profileArg) === 0) {
                        profile = arg.substring(profileArg.length, arg.length);
                        args.splice(i, 1);
                    } else if (arg.indexOf("baseUrl=") === 0) {
                        hasBaseUrl = true;
                    }
                }

                if (profile) {
                    args.unshift('util/profiles/' + profile + '.js');
                }

                //Tell RequireJS build where to find itself
                args.unshift('util/requirejs/build');

                //If no baseUrl, add it on now.
                args.push('baseUrl=src/');

                //Call RequireJS build
                build(args);
            }
        },
        command = args.shift();

    if (!command || !commands[command]) {
        command = "help";
    }

    commands[command](args);

}(Array.prototype.slice.call(arguments)));
