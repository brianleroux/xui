require 'erb'

LIBPATH = File.expand_path(File.dirname(__FILE__)) + File::SEPARATOR


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

def min
  puts 'minifying js'
end 

def import(lib)
	s = ""
	File.open(lib) { |f| s << "\n#{f.read}\n\n" }
	s
end

def build_sub_libraries
  libs = %w(dom event style fx xhr)
  s = ""
  libs.each do |lib|
    s << import("#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }lib#{ File::SEPARATOR }#{ lib }.js")
  end
  s
end