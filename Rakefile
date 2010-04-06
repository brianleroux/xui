require 'date'
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
      
=begin      

two pass system
- files to concat
- then files to interpolate


      # compiled_filename = [lib_to_concat, lib_to_concat:token => lib_to_interpolate]
      profiles = [
        # works on a grade mobile browsers
        {"xui-core-#{ version }.js" => [
          'src/core/*', 
          :selector => 'snapple',
          :fx => 'packages/emile/emile.js' 
        ]},
        
        # works on a grade mobile browsers
        {"xui-more-#{ version }.js" => [
          'src/core/*',
          'src/more/*', 
          :selector => 'snapple',
          :fx => 'packages/emile/emile.js' 
        ]},
        
        # works on all mobile browsers
        {"xui-core-#{ version }.js" => [
          'src/core/*', 
          :selector => 'sizzle',
          :fx => 'packages/emile/emile.js' 
        ]},
                
        # end of profiles
      ]
=end      
      
      FileUtils.mkdir_p("#{ LIBPATH }/lib/")
      
      build_profiles.each do |xui| 
        File.open("#{ LIBPATH }/lib/#{ xui.keys.first }", 'w') do |f| 
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
      "/*
        * XUI JavaScript Library v#{ version }
        * http://xuijs.com
        * 
        * Copyright (c) 2009 Brian LeRoux, Rob Ellis, Brock Whitten
        * Licensed under the MIT license.
        * 
        * Date: #{ DateTime.now }
        */"
    end
    
    def compile(libs)
      b = split("\n")
      c = b.map do |line|
        if line.include?('///')
          "<%= #{ line.gsub('///','').strip.gsub('()',"(#{ libs })") } %>"
        else
          line == b.first ? versionize << line : line
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
    sh "java -jar \"#{ compress_jar }\" --compilation_level SIMPLE_OPTIMIZATIONS --js=\"#{ doc_file }\" --js_output_file=\"#{ min_file }\" --warning_level=QUIET"
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
