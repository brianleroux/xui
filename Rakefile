require 'erb'
require 'BlueCloth'

LIBPATH = File.expand_path(File.dirname(__FILE__)) + File::SEPARATOR


#
# builds and tests
#
desc 'writes lib/xui.js and lib/xui-min.js from src then launches specs'
task :default do
  write
  min
  spec
end 

#
# TODO open in MobileSafari, Fennec and MobileOpera
#
desc 'launches the semi official but seriously example app example'
task :example do
  write unless File.exist? "#{ LIBPATH }#{ File::SEPARATOR }lib#{ File::SEPARATOR }xui.js"
  sh "open -a WebKit #{ LIBPATH }/example/index.html"
end 

#
# docs are inline to the code (as markdown)
#
desc 'bulds documentation from inline comments into README.md'
task :doc do
  write 
  file = "#{ LIBPATH }#{ File::SEPARATOR }lib#{ File::SEPARATOR }xui.js"
  sauce = File.open(file).read
  # fetches all
  comments = sauce.scan(/\/(?:\*(?:.)*?\*\/|\/[^\n]*)/m)

  # removes single line comments (TODO extract TODOs)

  # removes comment debris (method chaining gone wrong)
  comments = comments.map{|r| r.gsub('*/','').gsub(/^\s+\* |\* |\/\*+|^\*|^\s+\*|^\s+\/\*+/, '').gsub( /\s+\/\/.*/,'' )}
  
  # build a readme
  readme = comments.join("\n")
  # write out the README.md
  open("#{ LIBPATH }#{ File::SEPARATOR }README.md", 'w'){|f| f.puts(readme) }
  # write out the doc/index.html
  FileUtils.mkdir_p "#{ LIBPATH }#{ File::SEPARATOR }doc"
  open("#{ LIBPATH }#{ File::SEPARATOR }doc#{ File::SEPARATOR }index.html", 'w'){|f| f.puts(BlueCloth.new(readme).to_html) }
  # launch docs in safari
  sh "open -a WebKit #{ LIBPATH }#{ File::SEPARATOR }doc#{ File::SEPARATOR }index.html"
end 


# - helpers

# writes out an uncompiled version of xui
def write
  puts 'writing the full source into lib/xui.js'
  path  = "#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }xui.js"
  final = "#{ LIBPATH }lib#{ File::SEPARATOR }xui.js"
  html  = ERB.new(open(path).read).result
  FileUtils.mkdir_p "#{ LIBPATH }lib"
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
    s << import("#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }lib#{ File::SEPARATOR }#{ lib }.js")
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

# creates lib/xui-min.js (tho not obfuscates)
def min
  puts 'minifying js'
  min_file = "#{ LIBPATH }lib#{ File::SEPARATOR }xui-min.js"
  doc_file = "#{ LIBPATH }lib#{ File::SEPARATOR }xui.js"
  sh "java -jar #{LIBPATH}/util/yuicompressor-2.3.6.jar --nomunge --charset UTF-8 -o #{min_file} #{doc_file}"
end 

# opens up the specs
def spec
  puts 'running automated test suite'
  sh "open -a WebKit file://#{ LIBPATH }/spec/index.html"
  sh "open -a '/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone Simulator.app' file://#{ LIBPATH }/spec/index.html"
end 
