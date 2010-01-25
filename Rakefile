require 'erb'
LIBPATH = File.expand_path(File.dirname(__FILE__))


desc 'writes compiled and minified src to lib and then launches specs'
task :default => :spec


desc 'use JSLint to validate source code...'
task :check do
  puts 'checking js for lint...'
  rhino_jar   = File.join(LIBPATH, 'util', 'js.jar')
  jslint_file = File.join(LIBPATH, 'util', 'jslint.js')
  
  FileList.new(File.join(LIBPATH,'lib','*')).each do |xui|
    sh "java -classpath #{rhino_jar} org.mozilla.javascript.tools.shell.Main #{jslint_file} #{xui}"
  end  
end


desc 'writes out an uncompiled version of xui-core and xui-more'
task :build do
  # forget sprockets: xui launches rockets!
  class << Rockets = IO.read('src/base.js')
    def version
      '1.0.0'
    end 
    
    def launch!
      puts 'building xui...'
      
      clobber!
      
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
    
    def clobber!
      `rm -rf #{LIBPATH}/lib/*`
    end
    
    def interpolate(libs)
      ERB.new(compile(libs)).result(binding)
    end
    
    def versionize
      s = ''
      s += "/*\n"
      s += "* XUI JavaScript Library v#{ version }\n"
      s += "* http://xuijs.com\n"
      s += "*\n"
      s += "* Copyright (c) 2009 Brian LeRoux, Rob Ellis, Brock Whitten\n"
      s += "* Licensed under the MIT license.\n"
      s += "*\n"
      s += "* Date: #{ DateTime.now }\n"
      s += "*/\n\n"
      s
    end
    
    def compile(libs)
      b = split("\n")
      c = b.map do |line|
        if line.include?('///')
          "<%= #{ line.gsub('///','').strip.gsub('()',"(#{ libs })") } %>"
        else
          if line == b.first
            versionize << line
          else
            line
          end
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
  compress_jar  = File.join(LIBPATH, 'util', 'compiler.jar')  
  yui_jar  = File.join(LIBPATH, 'util', 'yuicompressor-2.3.6.jar')
  FileList.new(File.join(LIBPATH,'lib','*')).each do |xui|
    min_file = "#{ xui.gsub('.js','.min.js') }"
    doc_file = xui
    puts "creating #{ min_file }..."
    sh "java -jar \"#{ compress_jar }\" --compilation_level ADVANCED_OPTIMIZATIONS --js=\"#{ doc_file }\" --js_output_file=\"#{ min_file }\" --warning_level=QUIET"
    puts ">>> gzipped compressed size: " + `gzip -c #{ min_file } | wc -c`.strip, ""
    # sh "java -jar #{yui_jar} --charset UTF-8 -o #{min_file} #{doc_file}"
  end 
end



desc 'opens up the specs'
task :spec => :min do
  puts 'running automated test suite...'
  spec_file = File.join(LIBPATH, 'spec', 'core.html')
  sh "open -a WebKit file://#{spec_file}"
  sh "open -a '/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone Simulator.app' file://#{spec_file}"
end
