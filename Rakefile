require 'erb'

task :default do
  write
end 

# - helpers

LIBPATH = File.expand_path(File.dirname(__FILE__)) + File::SEPARATOR

# writes out an uncompiled version of xui
def write
  path = "#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }xui.js"
  template = ERB.new(open(path).read)
  puts template.result
end

# used in precompiled xui.js
def import(fname)
  path = "#{ LIBPATH }src#{ File::SEPARATOR }js#{ File::SEPARATOR }lib#{ File::SEPARATOR }#{ fname }.js"
  erb = File.open(path) { |fp| ERB.new(fp.read) }
  erb.run
end