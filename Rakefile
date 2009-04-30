require 'rake/clean'
require 'erb'
require 'BlueCloth'

CLEAN.include('lib')
CLOBBER.include('doc/*.html')

LIBPATH = File.expand_path(File.dirname(__FILE__))

#
# builds and tests
#
desc 'writes lib/xui.js and lib/xui-min.js from src then launches specs'
task :default => :spec

desc 'writes out an uncompiled version of xui'
task :build do
  require File.join(LIBPATH, 'util', 'sprockets', 'lib', 'sprockets')

  secretary = Sprockets::Secretary.new(:load_path    => ['src/js/**'], 
                                       :source_files => ["src/js/xui.js"])
  concatenation = secretary.concatenation

  FileUtils.mkdir_p(File.join(LIBPATH, 'lib'))
  concatenation.save_to("lib/xui.js")
end

desc 'creates lib/xui-min.js (tho not obfuscates)'
task :min => :build do
  puts 'minifying js'
  min_file = File.join(LIBPATH, 'lib', 'xui-min.js')
  doc_file = File.join(LIBPATH, 'lib', 'xui.js')
  yui_jar  = File.join(LIBPATH, 'util', 'yuicompressor-2.3.6.jar')
  sh "java -jar #{yui_jar} --charset UTF-8 -o #{min_file} #{doc_file}"
end

desc 'opens up the specs'
task :spec => :min do
  puts 'running automated test suite'
  spec_file = File.join(LIBPATH, 'spec', 'index.html')
  sh "open -a WebKit file://#{spec_file}"
  sh "open -a '/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone Simulator.app' file://#{spec_file}"
end

desc 'use JSLint to validate source code'
task :check => :build do
  puts 'checking js for lint'
  doc_file    = File.join(LIBPATH, 'lib', 'xui.js')
  rhino_jar   = File.join(LIBPATH, 'util', 'js.jar')
  jslint_file = File.join(LIBPATH, 'util', 'jslint.js')
  sh "java -classpath #{rhino_jar} org.mozilla.javascript.tools.shell.Main #{jslint_file} #{doc_file}"  
end

#
# TODO open in MobileSafari, Fennec and MobileOpera
#
desc 'launches the semi official but seriously example app example'
task :example => :build do
  example_file = File.join(LIBPATH, 'example', 'index.html')
  sh "open -a WebKit #{example_file}"
end 

#
# docs are inline to the code (as markdown)
#
desc 'bulds documentation from inline comments into README.md'
task :doc => :build do
  sauce = File.open(File.join(LIBPATH, 'lib', 'xui.js')).read
  # fetches all multiline comments
  comments = sauce.gsub( /\s+\/\/.*/,'' ).scan(/\/(?:\*(?:.)*?\*\/|\/[^\n]*)/m)
  # removes comment debris
  comments = comments.map{|r| r.gsub('*/','').gsub(/^\s+\* |\* |\/\*+|^\*|^\s+\*|^\s+\/\*+/, '')}
  # build a readme
  readme = comments.join("\n")
  # write out the README.md
  
  open(File.join(LIBPATH, 'README.md'), 'w'){|f| f.puts(readme) }
  # write out the doc/index.html
  FileUtils.mkdir_p(File.join(LIBPATH, 'doc'))
  index_file = File.join(LIBPATH, 'doc', 'index.html')
  open(index_file, 'w') { |f| f.puts(BlueCloth.new(readme).to_html) }
  # launch docs in safari
  sh "open -a WebKit #{index_file}"
end