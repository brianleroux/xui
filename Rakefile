require 'rake/clean'

CLEAN.include('lib')
LIBPATH = File.expand_path(File.dirname(__FILE__))

#
# builds and tests
#
desc 'writes lib/xui.js and lib/xui-min.js from src then launches specs'
task :default => :spec

desc 'writes out an uncompiled version of xui'
task :build do
  # returns filename to create as key / concated files as value
  def import(params)
    s = ""
    params[:js].each do |js_lib|
      FileList.new(js_lib).each do |js_file| 
        open(js_file) {|f| s << f.read }
      end
    end
    {params[:as]=>s}
  end
  
  # opens the file, attaches the import method to it
  open('src/base.js') do |f|
    working = f.read
  end 
  # finds the ///
  # grabs the text to eval after it
  # inserts result and uses the filename given to write the file out
   
=begin  
  require File.join(LIBPATH, 'util', 'sprockets', 'lib', 'sprockets')

  secretary = Sprockets::Secretary.new(:load_path=>['vendor/emile/**','src/js/**'], :source_files=>["src/js/xui.js"])
  concatenation = secretary.concatenation

  FileUtils.mkdir_p(File.join(LIBPATH, 'lib'))
  concatenation.save_to("lib/xui.js")
=end  
end

desc 'creates lib/xui-min.js (tho not obfuscates)'
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
