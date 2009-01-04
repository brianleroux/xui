require 'erb'

LIBPATH = File.expand_path(File.dirname(__FILE__)) + File::SEPARATOR

=begin
- the individual libs need to be merged into the xui obj
- minfication
- docs
- autotesting
=end
task :default do
  write
  min
end 


# - helpers

# writes out an uncompiled version of xui
def write
  puts 'writing the full source into lib/xui.js'
  path  = "#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }xui.js"
  final = "#{ LIBPATH }lib#{ File::SEPARATOR }xui.js"
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
    s << import("#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }lib#{ File::SEPARATOR }#{ lib }.js")
  end
  s
end

# helper for build_sub_libaries
def import(lib)
	s = ""
	File.open(lib) { |f| s << "\n#{f.read}\n\n" }
	s
end

# TODO add yahoo min
def min
  puts 'minifying js'
end 
