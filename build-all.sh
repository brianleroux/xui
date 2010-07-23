#!/bin/sh

SRC=`dirname $0`

BR=`head -n1 $SRC/.git/HEAD |sed -e 's|ref: refs/heads/\(.*\)|\1|g'`
VERSION="($BR trunk)"
if test -d $SRC/.git; then
  VERSION=`cd $SRC && git describe --tags --long HEAD 2>/dev/null`"-$BR"
fi

echo Building version $VERSION

cat <<EOF > lib/version.js
/*
 * XUI JavaScript Library $VERSION
 * http://xuijs.com
 *
 * Copyright (c) 2009 Brian LeRoux, Rob Ellis, Brock Whitten
 * Licensed under the MIT license.
 *
 * Date: `date`
 */
EOF

java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=core optimize=none out=lib/xui-core.js
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=core out=lib/xui-core.js.min
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=more optimize=none out=lib/xui-more.js
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=more out=lib/xui-more.js.min
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=bb optimize=none out=lib/xui-bb.js
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=bb out=lib/xui-bb.js.min
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=ie optimize=none out=lib/xui-ie.js
java -classpath util/requirejs/build/lib/rhino/js.jar:util/requirejs/build/lib/closure/compiler.jar org.mozilla.javascript.tools.shell.Main util/build.js build baseUrl=./ profile=ie out=lib/xui-ie.js.min
