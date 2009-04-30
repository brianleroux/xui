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
  write
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


# - helpers

# writes out an uncompiled version of xui
def write
  puts 'writing the full source into lib/xui.js'
  FileUtils.mkdir_p(File.join(LIBPATH, 'lib'))
  path  = File.join(LIBPATH, 'src', 'js', 'xui.js')
  final = File.join(LIBPATH, 'lib', 'xui.js')
  html  = ERB.new(open(path).read).result
  open(final,'w'){|f| f.puts( html )} 
end

# the sub libraries used by xui
def libs_to_build
  %w(dom event style fx xhr)
end 

# used within src/js/xui.js erb call
def build_sub_libraries
  s = ""
  libs_to_build.each do |lib|
    lib_file = File.join(LIBPATH, 'src', 'js', 'lib', lib + '.js')
    s << import(lib_file)
  end
  s
end

# helper for build_sub_libaries
def import(lib)
	s = ""
	r = ""
  open(lib) { |f| s << "\n#{f.read}\n\n" }
	s.each_line {|l| r << "		#{l}"}
	r
end