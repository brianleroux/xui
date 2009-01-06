require 'erb'
require 'BlueCloth'
require 'util/narcissus.rb'



LIBPATH = File.expand_path(File.dirname(__FILE__)) + File::SEPARATOR


#
# builds and tests
#
desc 'writes lib/xui.js and lib/xui-min.js from src then launches tests'
task :default do
  write
  min
  spec
end 

#
# TODO open in MobileSafari, Fennec and MobileOpera
#
desc 'launches example app'
task :example do
  write unless File.exist? "#{ LIBPATH }#{ File::SEPARATOR }lib#{ File::SEPARATOR }xui.js"
  sh "open -a WebKit #{ LIBPATH }/example/index.html"
end 

#
# docs are inline to the code (as markdown)
#
# tree = parse(sauce, file)
desc 'bulds documentation from inline comments'
task :doc do
  write 
  file     = "#{ LIBPATH }#{ File::SEPARATOR }lib#{ File::SEPARATOR }xui.js"
  sauce    = File.open(file).read
  comments = sauce.to_s.scan(/\/(?:\*(?:.)*?\*\/|\/[^\n]*)/m)
  readme   = ""
  path     = "#{ LIBPATH }#{ File::SEPARATOR }README.md" 
  comments.each do |comment|
    # test if this is a multiline or inline comment (ignore inline for now / future use to populate TODO list)
    single_comments_removed = comment.gsub(/\/\/.*/m, '')
    comments_removed = single_comments_removed.gsub(/(\*|\/\*)/m, '')
    whitespace_removed = comments_removed.gsub(/^\s|\//, '')
    readme += BlueCloth.new(whitespace_removed)
  end 
  open(path, 'w'){|f| f.puts(readme) }
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
