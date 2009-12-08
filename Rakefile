require 'erb'

LIBPATH = File.expand_path(File.dirname(__FILE__))


desc 'writes compiled and minified src to lib and then launches specs'
task :default => :build

desc 'writes out an uncompiled version of xui-core and xui-more'
task :build do
  # forget sprockets: xui launches rockets!
  class << Rockets = IO.read('src/base.js')
    def launch!
      
      # TODO move to a txt file
      version = '1.0.0'
      
      # create your custom xui builds here
      build_profiles = [
        {"xui-core-#{ version }.js" => "['src/core/*', 'packages/emile/emile.js']"},
        {"xui-more-#{ version }.js" => "['src/core/*', 'src/more/*', 'packages/emile/emile.js']"}
      ]
      
      build_profiles.each do |xui| 
        open("#{ LIBPATH }/lib/#{ xui.keys.first }", 'w') do |f| 
          f.puts interpolate(xui.values.first)
        end
      end
    end
    
    def interpolate(libs)
      ERB.new(compile(libs)).result(binding)
    end
    
    def compile(libs)
      c = split("\n").map do |line|
        if line.include?('///')
          "<%= #{ line.gsub('///','').strip.gsub('()',"(#{ libs })") } %>"
        else
          line
        end 
      end
      c.join("\n") 
    end
    
    def imports(libs)
      s = ''
      libs.each do |js_lib|
        js_files = FileList.new(js_lib)
        js_files.each do |js_file| 
          path = File.join(LIBPATH, js_file)
          open(path) do |f| 
            if js_files.first == js_file
              s << '    '
            end 
            s << "#{ f.read.gsub("\n","\n    ") }" 
          end
        end
      end
      s
    end
  end 
  
  Rockets.launch!
end

desc 'minifies all the files in the lib directory'
task :min => :build do
  puts 'minifying js'
  min_file = File.join(LIBPATH, 'lib', 'xui-min.js')
  doc_file = File.join(LIBPATH, 'lib', 'xui.js')
  compress_jar  = File.join(LIBPATH, 'util', 'compiler.jar')
  sh "java -jar #{compress_jar} --js=#{doc_file} --js_output_file=#{min_file}"
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
