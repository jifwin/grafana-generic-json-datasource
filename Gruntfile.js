module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-execute");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-package-modules");
    grunt.loadNpmTasks("grunt-tslint");

    grunt.initConfig({
        clean: {
            dist: ["dist"],
            post: ["dist/node_modules"]
        },
        packageModules: {
            dist: {
                src: "package.json",
                dest: "dist"
            },
        },
        copy: {
            src_to_dist: {
                cwd: "src",
                expand: true,
                src: ["**/*", "!**/*.js", "!**/*.scss", "!node_modules/**/*"],
                dest: "dist"
            },
            jmespath: {
                cwd: "src",
                expand: true,
                src: ["jmespath.min.js"],
                dest: "dist"
            },
            pluginDef: {
                expand: true,
                src: ["plugin.json"],
                dest: "dist"
            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: [
                    "src/**/*.ts"
                ]
            },
        },
        typescript: {
            build: {
                src: [
                    "dist/**/*.ts"
                ],
                dest: "dist/",
                options: {
                    module: "system",
                    target: "es5",
                    rootDir: "dist/",
                    keepDirectoryHierarchy: false,
                    declaration: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    sourceMap: true,
                    noImplicitAny: false
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ["es2015"]
            },
            distTestsSpecsNoSystemJs: {
                files: [{
                    expand: true,
                    cwd: "src/spec",
                    src: ["**/*.js"],
                    dest: "dist/test/spec",
                    ext: ".js"
                }]
            }
        }
    });

    grunt.registerTask("default", [
        "clean:dist",
        "copy",
        "packageModules",
        "tslint",
        "typescript:build",
        "babel",
        "clean:post"
    ]);
};
