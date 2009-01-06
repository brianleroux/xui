
$tokens = [
	# End of source.
	"END",
	
	# Operators and punctuators.  Some pair-wise order matters, e.g. (+, -)
	# and (UNARY_PLUS, UNARY_MINUS).
	"\n", ";",
	",",
	"=",
	"?", ":", "CONDITIONAL",
	"||",
	"&&",
	"|",
	"^",
	"&",
	"==", "!=", "===", "!==",
	"<", "<=", ">=", ">",
	"<<", ">>", ">>>",
	"+", "-",
	"*", "/", "%",
	"!", "~", "UNARY_PLUS", "UNARY_MINUS",
	"++", "--",
	".",
	"[", "]",
	"{", "}",
	"(", ")",
	
	# Nonterminal tree node type codes.
	"SCRIPT", "BLOCK", "LABEL", "FOR_IN", "CALL", "NEW_WITH_ARGS", "INDEX",
	"ARRAY_INIT", "OBJECT_INIT", "PROPERTY_INIT", "GETTER", "SETTER",
	"GROUP", "LIST",
	
	# Terminals.
	"IDENTIFIER", "NUMBER", "STRING", "REGEXP",
	
	# Keywords.
	"break",
	"case", "catch", "const", "continue",
	"debugger", "default", "delete", "do",
	"else", "enum",
	"false", "finally", "for", "function",
	"if", "in", "instanceof",
	"new", "null",
	"return",
	"switch",
	"this", "throw", "true", "try", "typeof",
	"var", "void",
	"while", "with",
]

# Operator and punctuator mapping from token to tree node type name.
$opTypeNames = {
	"\n"  => "NEWLINE",
	';'   => "SEMICOLON",
	','   => "COMMA",
	'?'   => "HOOK",
	':'   => "COLON",
	'||'  => "OR",
	'&&'  => "AND",
	'|'   => "BITWISE_OR",
	'^'   => "BITWISE_XOR",
	'&'   => "BITWISE_AND",
	'===' => "STRICT_EQ",
	'=='  => "EQ",
	'='   => "ASSIGN",
	'!==' => "STRICT_NE",
	'!='  => "NE",
	'<<'  => "LSH",
	'<='  => "LE",
	'<'   => "LT",
	'>>>' => "URSH",
	'>>'  => "RSH",
	'>='  => "GE",
	'>'   => "GT",
	'++'  => "INCREMENT",
	'--'  => "DECREMENT",
	'+'   => "PLUS",
	'-'   => "MINUS",
	'*'   => "MUL",
	'/'   => "DIV",
	'%'   => "MOD",
	'!'   => "NOT",
	'~'   => "BITWISE_NOT",
	'.'   => "DOT",
	'['   => "LEFT_BRACKET",
	']'   => "RIGHT_BRACKET",
	'{'   => "LEFT_CURLY",
	'}'   => "RIGHT_CURLY",
	'('   => "LEFT_PAREN",
	')'   => "RIGHT_PAREN"
}

# Hash of keyword identifier to tokens index.
$keywords = {}

# Define const END, etc., based on the token names.  Also map name to index.
$consts = {}

$tokens.length.times do |i|
	t = $tokens[i]
	if /\A[a-z]/ =~ t
		$consts[t.upcase] = i
		$keywords[t] = i
	elsif /\A\W/ =~ t
		$consts[$opTypeNames[t]] = i
	else
		$consts[t] = i
	end
end

# Map assignment operators to their indexes in the tokens array.
$assignOps = ['|', '^', '&', '<<', '>>', '>>>', '+', '-', '*', '/', '%']
$assignOpsHash = {}

$assignOps.length.times do |i|
	t = $assignOps[i]
	$assignOpsHash[t] = $consts[$opTypeNames[t]]
end

$opPrecedence = {
	"SEMICOLON" => 0,
	"COMMA" => 1,
	"ASSIGN" => 2,
	"HOOK" => 3, "COLON" => 3, "CONDITIONAL" => 3,
	"OR" => 4,
	"AND" => 5,
	"BITWISE_OR" => 6,
	"BITWISE_XOR" => 7,
	"BITWISE_AND" => 8,
	"EQ" => 9, "NE" => 9, "STRICT_EQ" => 9, "STRICT_NE" => 9,
	"LT" => 10, "LE" => 10, "GE" => 10, "GT" => 10, "IN" => 10, "INSTANCEOF" => 10,
	"LSH" => 11, "RSH" => 11, "URSH" => 11,
	"PLUS" => 12, "MINUS" => 12,
	"MUL" => 13, "DIV" => 13, "MOD" => 13,
	"DELETE" => 14, "VOID" => 14, "TYPEOF" => 14, # PRE_INCREMENT: 14, PRE_DECREMENT: 14,
	"NOT" => 14, "BITWISE_NOT" => 14, "UNARY_PLUS" => 14, "UNARY_MINUS" => 14,
	"INCREMENT" => 15, "DECREMENT" => 15, # postfix
	"NEW" => 16,
	"DOT" => 17
}

# Map operator type code to precedence.
$opPrecedence.keys.each do |i|
	$opPrecedence[$consts[i]] = $opPrecedence[i]
end

$opArity = {
	"COMMA" => -2,
	"ASSIGN" => 2,
	"CONDITIONAL" => 3,
	"OR" => 2,
	"AND" => 2,
	"BITWISE_OR" => 2,
	"BITWISE_XOR" => 2,
	"BITWISE_AND" => 2,
	"EQ" => 2, "NE" => 2, "STRICT_EQ" => 2, "STRICT_NE" => 2,
	"LT" => 2, "LE" => 2, "GE" => 2, "GT" => 2, "IN" => 2, "INSTANCEOF" => 2,
	"LSH" => 2, "RSH" => 2, "URSH" => 2,
	"PLUS" => 2, "MINUS" => 2,
	"MUL" => 2, "DIV" => 2, "MOD" => 2,
	"DELETE" => 1, "VOID" => 1, "TYPEOF" => 1, # PRE_INCREMENT: 1, PRE_DECREMENT: 1,
	"NOT" => 1, "BITWISE_NOT" => 1, "UNARY_PLUS" => 1, "UNARY_MINUS" => 1,
	"INCREMENT" => 1, "DECREMENT" => 1,   # postfix
	"NEW" => 1, "NEW_WITH_ARGS" => 2, "DOT" => 2, "INDEX" => 2, "CALL" => 2,
	"ARRAY_INIT" => 1, "OBJECT_INIT" => 1, "GROUP" => 1
}

# Map operator type code to arity.
$opArity.keys.each do |i|
	$opArity[$consts[i]] = $opArity[i]
end


# NB: superstring tokens (e.g., ++) must come before their substring token
# counterparts (+ in the example), so that the $opRegExp regular expression
# synthesized from this list makes the longest possible match.
$ops = [';', ',', '?', ':', '||', '&&', '|', '^', '&', '===', '==', 
	'=', '!==', '!=', '<<', '<=', '<', '>>>', '>>', '>=', '>', '++', '--',
	'+', '-', '*', '/', '%', '!', '~', '.', '[', ']', '{', '}', '(', ')']

# Build a regexp that recognizes operators and punctuators (except newline).
$opRegExpSrc = "\\A"
$ops.length.times do |i|
	$opRegExpSrc += "|\\A" if $opRegExpSrc != "\\A"
	$opRegExpSrc += $ops[i].gsub(/([?|^&(){}\[\]+\-*\/\.])/) {|s| "\\" + s}
end
$opRegExp = Regexp.new($opRegExpSrc, Regexp::MULTILINE)


# A regexp to match floating point literals (but not integer literals).
$fpRegExp = Regexp.new("\\A\\d+\\.\\d*(?:[eE][-+]?\\d+)?|\\A\\d+(?:\\.\\d*)?[eE][-+]?\\d+|\\A\\.\\d+(?:[eE][-+]?\\d+)?", Regexp::MULTILINE)


class Tokenizer

	attr_accessor :cursor, :source, :tokens, :tokenIndex, :lookahead
	attr_accessor :scanNewlines, :scanOperand, :filename, :lineno

	def initialize (source, filename, line)
		@cursor = 0
		@source = source.to_s
		@tokens = []
		@tokenIndex = 0
		@lookahead = 0
		@scanNewlines = false
		@scanOperand = true
		@filename = filename or ""
		@lineno = line or 1
	end

	def input
		return @source.slice(@cursor, @source.length - @cursor)
	end

	def done
		return self.peek == $consts["END"];
	end

	def token
		return @tokens[@tokenIndex];
	end
	
	def match (tt)
		got = self.get
		#puts got
		#puts tt
		return got == tt || self.unget
	end
	
	def mustMatch (tt)
		raise SyntaxError.new("Missing " + $tokens[tt].downcase, self) unless self.match(tt)
		return self.token
	end

	def peek
		if @lookahead > 0
			#tt = @tokens[(@tokenIndex + @lookahead)].type
			tt = @tokens[(@tokenIndex + @lookahead) & 3].type
		else
			tt = self.get
			self.unget
		end
		return tt
	end
	
	def peekOnSameLine
		@scanNewlines = true;
		tt = self.peek
		@scanNewlines = false;
		return tt
	end

	def get
		while @lookahead > 0
			@lookahead -= 1
			@tokenIndex = (@tokenIndex + 1) & 3
			token = @tokens[@tokenIndex]
			return token.type if token.type != $consts["NEWLINE"] || @scanNewlines
		end
		
		while true
			input = self.input

			if @scanNewlines
				match = /\A[ \t]+/.match(input)
			else
				match = /\A\s+/.match(input)
			end
			
			if match
				spaces = match[0]
				@cursor += spaces.length
				@lineno += spaces.count("\n")
				input = self.input
			end
			
			match = /\A\/(?:\*(?:.)*?\*\/|\/[^\n]*)/m.match(input)
			break unless match
			comment = match[0]
			@cursor += comment.length
			@lineno += comment.count("\n")
		end
		
		#puts input
		
		@tokenIndex = (@tokenIndex + 1) & 3
		token = @tokens[@tokenIndex]
		(@tokens[@tokenIndex] = token = Token.new) unless token
		if input.length == 0
			#puts "end!!!"
			return (token.type = $consts["END"])
		end

		cursor_advance = 0
		if (match = $fpRegExp.match(input))
			token.type = $consts["NUMBER"]
			token.value = match[0].to_f
		elsif (match = /\A0[xX][\da-fA-F]+|\A0[0-7]*|\A\d+/.match(input))
			token.type = $consts["NUMBER"]
			token.value = match[0].to_i
		elsif (match = /\A(\w|\$)+/.match(input))
			id = match[0]
			token.type = $keywords[id] || $consts["IDENTIFIER"]
			token.value = id
		elsif (match = /\A"(?:\\.|[^"])*"|\A'(?:[^']|\\.)*'/.match(input))
			token.type = $consts["STRING"]
			token.value = match[0].to_s
		elsif @scanOperand and (match = /\A\/((?:\\.|[^\/])+)\/([gi]*)/.match(input))
			token.type = $consts["REGEXP"]
			token.value = Regexp.new(match[1], match[2])
		elsif (match = $opRegExp.match(input))
			op = match[0]
			if $assignOpsHash[op] && input[op.length, 1] == '='
				token.type = $consts["ASSIGN"]
				token.assignOp = $consts[$opTypeNames[op]]
				cursor_advance = 1 # length of '='
			else
				#puts $consts[$opTypeNames[op]].to_s + " " + $opTypeNames[op] + " " + op
				token.type = $consts[$opTypeNames[op]]
				if @scanOperand and (token.type == $consts["PLUS"] || token.type == $consts["MINUS"])
					token.type += $consts["UNARY_PLUS"] - $consts["PLUS"]
				end
				token.assignOp = nil
			end
			token.value = op
		else
			raise SyntaxError.new("Illegal token", self)
		end

		token.start = @cursor
		@cursor += match[0].length + cursor_advance
		token.end = @cursor
		token.lineno = @lineno
		
		return token.type
	end

	def unget
		#puts "start: lookahead: " + @lookahead.to_s + " tokenIndex: " + @tokenIndex.to_s
		@lookahead += 1
		raise SyntaxError.new("PANIC: too much lookahead!", self) if @lookahead == 4
		@tokenIndex = (@tokenIndex - 1) & 3
		#puts "end:   lookahead: " + @lookahead.to_s + " tokenIndex: " + @tokenIndex.to_s
		return nil
	end

end

class SyntaxError
	def initialize (msg, tokenizer)
		puts msg
		puts "on line " + tokenizer.lineno.to_s
	end
end


class Token
	attr_accessor :type, :value, :start, :end, :lineno, :assignOp
end


class CompilerContext
	attr_accessor :inFunction, :stmtStack, :funDecls, :varDecls
	attr_accessor :bracketLevel, :curlyLevel, :parenLevel, :hookLevel
	attr_accessor :ecmaStrictMode, :inForLoopInit

	def initialize (inFunction)
		@inFunction = inFunction
		@stmtStack = []
		@funDecls = []
		@varDecls = []
		
		@bracketLevel = @curlyLevel = @parenLevel = @hookLevel = 0
		@ecmaStrictMode = @inForLoopInit = false
	end
end


class Node < Array

	attr_accessor :type, :value, :lineno, :start, :end, :tokenizer, :initializer
	attr_accessor :name, :params, :funDecls, :varDecls, :body, :functionForm
	attr_accessor :assignOp, :expression, :condition, :thenPart, :elsePart
	attr_accessor :readOnly, :isLoop, :setup, :postfix, :update, :exception
	attr_accessor :object, :iterator, :varDecl, :label, :target, :tryBlock
	attr_accessor :catchClauses, :varName, :guard, :block, :discriminant, :cases
	attr_accessor :defaultIndex, :caseLabel, :statements, :statement

	def initialize (t, type = nil)
		token = t.token
		if token
			if type != nil
				@type = type
			else
				@type = token.type
			end
			@value = token.value
			@lineno = token.lineno
			@start = token.start
			@end = token.end
		else
			@type = type
			@lineno = t.lineno
		end
		@tokenizer = t
		#for (var i = 2; i < arguments.length; i++)
		#this.push(arguments[i]);
	end

	alias superPush push
	# Always use push to add operands to an expression, to update start and end.
	def push (kid)
		if kid.start and @start
			@start = kid.start if kid.start < @start
		end
		if kid.end and @end
			@end = kid.end if @end < kid.end
		end
		return superPush(kid)
	end

# 	def to_s
# 		a = []
# 		
# 		#for (var i in this) {
# 		#	if (this.hasOwnProperty(i) && i != 'type')
# 		#		a.push({id: i, value: this[i]});
# 		#}
# 		#a.sort(function (a,b) { return (a.id < b.id) ? -1 : 1; });
# 		iNDENTATION = "    "
# 		n = (Node.indentLevel += 1)
# 		t = $tokens[@type]
# 		s = "{\n" + iNDENTATION.repeat(n) +
# 				"type: " + (/^\W/.test(t) and opTypeNames[t] or t.upcase)
# 		#for (i = 0; i < a.length; i++)
# 		#	s += ",\n" + INDENTATION.repeat(n) + a[i].id + ": " + a[i].value
# 			s += ",\n" + iNDENTATION.repeat(n) + @value + ": " + a[i].value
# 		n = (Node.indentLevel -= 1)
# 		s += "\n" + iNDENTATION.repeat(n) + "}"
# 		return s
# 	end

	def to_s
	
		attrs = [@value,
			@lineno, @start, @end,
			@name, @params, @funDecls, @varDecls, @body, @functionForm,
			@assignOp, @expression, @condition, @thenPart, @elsePart]
		
		#puts $tokens[@condition.type] if @condition != nil
		
		#if /\A[a-z]/ =~ $tokens[@type] # identifier
		#	print @tokenizer.source.slice($cursor, @start - $cursor) if $cursor < @start
		#	print '<span class="identifier">'
		#	print @tokenizer.source.slice(@start, $tokens[@type].length)
		#	print '</span>'
		#	$cursor = @start + $tokens[@type].length
		#end
		
		#puts (" " * $ind) + "{" + $tokens[@type] + "\n" if /\A[a-z]/ =~ $tokens[@type]
		#puts (" " * $ind) + " " + @start.to_s + "-" + @end.to_s + "\n"
		$ind += 1
		#puts @value
		self.length.times do |i|
			self[i].to_s if self[i] != self and self[i].class == Node
		end
		attrs.length.times do |attr|
			if $tokens[@type] == "if"
			#	puts $tokens[attrs[attr].type] if attrs[attr].class == Node and attrs[attr] !== self
			end
			attrs[attr].to_s if attrs[attr].class == Node #and attrs[attr] != self
			#puts (" " * $ind).to_s + attrs[attr].to_s if attrs[attr].to_s != nil and attrs[attr] != self
		end
		$ind -= 1
		#puts "\n}\n"
		
		if $ind == 0
			print @tokenizer.source.slice($cursor, @tokenizer.source.length - $cursor)
		end
		
		return ""
	end

	def getSource
		return @tokenizer.source.slice(@start, @end)
	end

	def filename
		return @tokenizer.filename
	end
end

$cursor = 0

$ind = 0

def Script (t, x)
	n = Statements(t, x)
	n.type = $consts["SCRIPT"]
	n.funDecls = x.funDecls
	n.varDecls = x.varDecls
	return n
end


# Statement stack and nested statement handler.
# nb. Narcissus allowed a function reference, here we use Statement explicitly
def nest (t, x, node, end_ = nil)
	x.stmtStack.push(node)
	n = Statement(t, x)
	x.stmtStack.pop
	end_ and t.mustMatch(end_)
	return n
end


def Statements (t, x)
	n = Node.new(t, $consts["BLOCK"])
	x.stmtStack.push(n)
	n.push(Statement(t, x)) while !t.done and t.peek != $consts["RIGHT_CURLY"]
	x.stmtStack.pop
	return n
end


def Block (t, x)
	t.mustMatch($consts["LEFT_CURLY"])
	n = Statements(t, x)
	t.mustMatch($consts["RIGHT_CURLY"])
	return n
end


DECLARED_FORM = 0
EXPRESSED_FORM = 1
STATEMENT_FORM = 2

def Statement (t, x)
	tt = t.get

	# Cases for statements ending in a right curly return early, avoiding the
	# common semicolon insertion magic after this switch.
	case tt
		when $consts["FUNCTION"]
			return FunctionDefinition(t, x, true, 
				(x.stmtStack.length > 1) && STATEMENT_FORM || DECLARED_FORM)

		when $consts["LEFT_CURLY"]
			n = Statements(t, x)
			t.mustMatch($consts["RIGHT_CURLY"])
			return n
		
		when $consts["IF"]
			n = Node.new(t)
			n.condition = ParenExpression(t, x)
			x.stmtStack.push(n)
			n.thenPart = Statement(t, x)
			n.elsePart = t.match($consts["ELSE"]) ? Statement(t, x) : nil
			x.stmtStack.pop()
			return n

		when $consts["SWITCH"]
			n = Node.new(t)
			t.mustMatch($consts["LEFT_PAREN"])
			n.discriminant = Expression(t, x)
			t.mustMatch($consts["RIGHT_PAREN"])
			n.cases = []
			n.defaultIndex = -1
			x.stmtStack.push(n)
			t.mustMatch($consts["LEFT_CURLY"])
			while (tt = t.get) != $consts["RIGHT_CURLY"]
				case tt
					when $consts["DEFAULT"], $consts["CASE"]
						if tt == $consts["DEFAULT"] and n.defaultIndex >= 0
							raise SyntaxError.new("More than one switch default", t)
						end
						n2 = Node.new(t)
						if tt == $consts["DEFAULT"]
							n.defaultIndex = n.cases.length
						else
							n2.caseLabel = Expression(t, x, $consts["COLON"])
						end
					
					else
						raise SyntaxError.new("Invalid switch case", t)
				end
				t.mustMatch($consts["COLON"])
				n2.statements = Node.new(t, $consts["BLOCK"])
				while (tt = t.peek) != $consts["CASE"] and tt != $consts["DEFAULT"] and tt != $consts["RIGHT_CURLY"]
					n2.statements.push(Statement(t, x))
				end
				n.cases.push(n2)
			end
			x.stmtStack.pop
			return n
		
		when $consts["FOR"]
			n = Node.new(t)
			n.isLoop = true
			t.mustMatch($consts["LEFT_PAREN"])
			if (tt = t.peek) != $consts["SEMICOLON"]
				x.inForLoopInit = true
				if tt == $consts["VAR"] or tt == $consts["CONST"]
					t.get
					n2 = Variables(t, x)
				else
					n2 = Expression(t, x)
				end
				x.inForLoopInit = false
			end
			if n2 and t.match($consts["IN"])
				n.type = $consts["FOR_IN"]
				if n2.type == $consts["VAR"]
					if n2.length != 1
						raise SyntaxError.new("Invalid for..in left-hand side", t)
					end
					# NB: n2[0].type == IDENTIFIER and n2[0].value == n2[0].name.
					n.iterator = n2[0]
					n.varDecl = n2
				else
					n.iterator = n2
					n.varDecl = nil
				end
				n.object = Expression(t, x)
			else
				n.setup = n2 or nil
				t.mustMatch($consts["SEMICOLON"])
				n.condition = (t.peek == $consts["SEMICOLON"]) ? nil : Expression(t, x)
				t.mustMatch($consts["SEMICOLON"])
				n.update = (t.peek == $consts["RIGHT_PAREN"]) ? nil : Expression(t, x)
			end
			t.mustMatch($consts["RIGHT_PAREN"])
			n.body = nest(t, x, n)
			return n
		
		when $consts["WHILE"]
			n = Node.new(t)
			n.isLoop = true
			n.condition = ParenExpression(t, x)
			n.body = nest(t, x, n)
			return n
		
		when $consts["DO"]
			n = Node.new(t)
			n.isLoop = true
			n.body = nest(t, x, n, $consts["WHILE"])
			n.condition = ParenExpression(t, x)
			if !x.ecmaStrictMode
				# <script language="JavaScript"> (without version hints) may need
				# automatic semicolon insertion without a newline after do-while.
				# See http://bugzilla.mozilla.org/show_bug.cgi?id=238945.
				t.match($consts["SEMICOLON"])
				return n
			end
		
		when $consts["BREAK"], $consts["CONTINUE"]
			n = Node.new(t)
			if t.peekOnSameLine == $consts["IDENTIFIER"]
				t.get
				n.label = t.token.value
			end
			ss = x.stmtStack
			i = ss.length
			label = n.label
			if label
				begin
					i -= 1
					raise SyntaxError.new("Label not found", t) if i < 0
				end while (ss[i].label != label)
			else
				begin
					i -= 1
					raise SyntaxError.new("Invalid " + ((tt == $consts["BREAK"]) and "break" or "continue"), t) if i < 0
				end while !ss[i].isLoop and (tt != $consts["BREAK"] or ss[i].type != $consts["SWITCH"])
			end
			n.target = ss[i]
		
		when $consts["TRY"]
			n = Node.new(t)
			n.tryBlock = Block(t, x)
			n.catchClauses = []
			while t.match($consts["CATCH"])
				n2 = Node.new(t)
				t.mustMatch($consts["LEFT_PAREN"])
				n2.varName = t.mustMatch($consts["IDENTIFIER"]).value
				if t.match($consts["IF"])
					raise SyntaxError.new("Illegal catch guard", t) if x.ecmaStrictMode
					if n.catchClauses.length and !n.catchClauses.last.guard
						raise SyntaxError.new("Guarded catch after unguarded", t)
					end
					n2.guard = Expression(t, x)
				else
					n2.guard = nil
				end
				t.mustMatch($consts["RIGHT_PAREN"])
				n2.block = Block(t, x)
				n.catchClauses.push(n2)
			end
			n.finallyBlock = Block(t, x) if t.match($consts["FINALLY"])
			if !n.catchClauses.length and !n.finallyBlock
				raise SyntaxError.new("Invalid try statement", t)
			end
			return n
		
		when $consts["CATCH"]
		when $consts["FINALLY"]
			raise SyntaxError.new(tokens[tt] + " without preceding try", t)
		
		when $consts["THROW"]
			n = Node.new(t)
			n.exception = Expression(t, x)
		
		when $consts["RETURN"]
			raise SyntaxError.new("Invalid return", t) unless x.inFunction
			n = Node.new(t)
			tt = t.peekOnSameLine
			if tt != $consts["END"] and tt != $consts["NEWLINE"] and tt != $consts["SEMICOLON"] and tt != $consts["RIGHT_CURLY"]
				n.value = Expression(t, x)
			end
		
		when $consts["WITH"]
			n = Node.new(t)
			n.object = ParenExpression(t, x)
			n.body = nest(t, x, n)
			return n
		
		when $consts["VAR"], $consts["CONST"]
			n = Variables(t, x)
		
		when $consts["DEBUGGER"]
			n = Node.new(t)
	
		when $consts["NEWLINE"], $consts["SEMICOLON"]
			n = Node.new(t, $consts["SEMICOLON"])
			n.expression = nil
			return n

		else
			if tt == $consts["IDENTIFIER"] and t.peek == $consts["COLON"]
				label = t.token.value
				ss = x.stmtStack
				(ss.length - 1).times do |i|
					raise SyntaxError.new("Duplicate label", t) if ss[i].label == label
				end
				t.get
				n = Node.new(t, $consts["LABEL"])
				n.label = label
				n.statement = nest(t, x, n)
				return n
			end

			t.unget
			n = Node.new(t, $consts["SEMICOLON"])
			n.expression = Expression(t, x)
			n.end = n.expression.end
	end

	if t.lineno == t.token.lineno
		tt = t.peekOnSameLine
		if tt != $consts["END"] and tt != $consts["NEWLINE"] and tt != $consts["SEMICOLON"] and tt != $consts["RIGHT_CURLY"]
			raise SyntaxError.new("Missing ; before statement", t)
		end
	end
	t.match($consts["SEMICOLON"])
	return n
end


def FunctionDefinition (t, x, requireName, functionForm)
	f = Node.new(t)
	if f.type != $consts["FUNCTION"]
		f.type = (f.value == "get") and $consts["GETTER"] or $consts["SETTER"]
	end
	if t.match($consts["IDENTIFIER"])
		f.name = t.token.value
	elsif requireName
		raise SyntaxError.new("Missing function identifier", t)
	end
	t.mustMatch($consts["LEFT_PAREN"])
	f.params = []
	while (tt = t.get) != $consts["RIGHT_PAREN"]
		raise SyntaxError.new("Missing formal parameter", t) unless tt == $consts["IDENTIFIER"]
		f.params.push(t.token.value)
		t.mustMatch($consts["COMMA"]) unless t.peek == $consts["RIGHT_PAREN"]
	end
	
	t.mustMatch($consts["LEFT_CURLY"])
	x2 = CompilerContext.new(true)
	f.body = Script(t, x2)
	t.mustMatch($consts["RIGHT_CURLY"])
	f.end = t.token.end
	f.functionForm = functionForm
	x.funDecls.push(f) if functionForm == $consts["DECLARED_FORM"]
	return f
end


def Variables (t, x)
	n = Node.new(t)

	begin
		t.mustMatch($consts["IDENTIFIER"])
		n2 = Node.new(t)
		n2.name = n2.value
		if t.match($consts["ASSIGN"])
			raise SyntaxError.new("Invalid variable initialization", t) if t.token.assignOp
			n2.initializer = Expression(t, x, $consts["COMMA"])
		end
		n2.readOnly = (n.type == $consts["CONST"])
		n.push(n2)
		x.varDecls.push(n2)
	end while t.match($consts["COMMA"])
	return n
end


def ParenExpression (t, x)
	t.mustMatch($consts["LEFT_PAREN"])
	n = Expression(t, x)
	t.mustMatch($consts["RIGHT_PAREN"])
	return n
end


def Expression(t, x, stop = nil)
	operators = []
	operands = []
	bl = x.bracketLevel
	cl = x.curlyLevel
	pl = x.parenLevel
	hl = x.hookLevel
	
	def reduce(operators, operands, t)
		n = operators.pop
		op = n.type
		arity = $opArity[op]
		if arity == -2
			if operands.length >= 2
				# Flatten left-associative trees.
				left = operands[operands.length - 2]
				
				if left.type == op
					right = operands.pop
					left.push(right)
					return left
				end
			end
			arity = 2
		end
		
		# Always use push to add operands to n, to update start and end.
		a = operands.slice!(operands.length - arity, operands.length)

		arity.times do |i|
			n.push(a[i])
		end
		
		# Include closing bracket or postfix operator in [start,end).
		n.end = t.token.end if n.end < t.token.end
		
		operands.push(n)
		return n
	end

gotoloopContinue = false
until gotoloopContinue or (t.token and t.token.type == $consts["END"])
gotoloopContinue = catch(:gotoloop) do
#loop:
	while (tt = t.get) != $consts["END"]
		# Stop only if tt matches the optional stop parameter, and that
		# token is not quoted by some kind of bracket.
		if tt == stop and x.bracketLevel == bl and x.curlyLevel == cl and x.parenLevel == pl and x.hookLevel == hl
			throw :gotoloop, true
		end
		
		case tt
			when $consts["SEMICOLON"]
				# NB: cannot be empty, Statement handled that.
				throw :gotoloop, true;
			
			when $consts["ASSIGN"], $consts["HOOK"], $consts["COLON"]
				if t.scanOperand
					throw :gotoloop, true
				end
								
				# Use >, not >=, for right-associative ASSIGN and HOOK/COLON.
				while operators.length > 0 && $opPrecedence[operators.last.type] && $opPrecedence[operators.last.type] > $opPrecedence[tt]
					reduce(operators, operands, t)
				end
				if tt == $consts["COLON"]
					n = operators.last
					raise SyntaxError.new("Invalid label", t) if n.type != $consts["HOOK"]
					n.type = $consts["CONDITIONAL"]
					x.hookLevel -= 1
				else
					operators.push(Node.new(t))
					if tt == $consts["ASSIGN"]
						operands.last.assignOp = t.token.assignOp
					else
						x.hookLevel += 1 # tt == HOOK
					end
				end
				t.scanOperand = true
			
			when $consts["COMMA"],
				# Treat comma as left-associative so reduce can fold left-heavy
				# COMMA trees into a single array.
				$consts["OR"], $consts["AND"], $consts["BITWISE_OR"], $consts["BITWISE_XOR"],
				$consts["BITWISE_AND"], $consts["EQ"], $consts["NE"], $consts["STRICT_EQ"],
				$consts["STRICT_NE"], $consts["LT"], $consts["LE"], $consts["GE"],
				$consts["GT"], $consts["INSTANCEOF"], $consts["LSH"], $consts["RSH"],
				$consts["URSH"], $consts["PLUS"], $consts["MINUS"], $consts["MUL"],
				$consts["DIV"], $consts["MOD"], $consts["DOT"], $consts["IN"]

				# An in operator should not be parsed if we're parsing the head of
				# a for (...) loop, unless it is in the then part of a conditional
				# expression, or parenthesized somehow.
				if tt == $consts["IN"] and x.inForLoopInit and x.hookLevel == 0 and x.bracketLevel == 0 and x.curlyLevel == 0 and x.parenLevel == 0
					throw :gotoloop, true
				end
				
				if t.scanOperand
					throw :gotoloop, true
				end

				reduce(operators, operands, t) while operators.length > 0 && $opPrecedence[operators.last.type] && $opPrecedence[operators.last.type] >= $opPrecedence[tt]

				if tt == $consts["DOT"]
					t.mustMatch($consts["IDENTIFIER"])
					node = Node.new(t, $consts["DOT"])
					node.push(operands.pop)
					node.push(Node.new(t))
					operands.push(node)
				else
					operators.push(Node.new(t))
					t.scanOperand = true
				end
			
			when $consts["DELETE"], $consts["VOID"], $consts["TYPEOF"], $consts["NOT"],
				$consts["BITWISE_NOT"], $consts["UNARY_PLUS"], $consts["UNARY_MINUS"],
				$consts["NEW"]

				if !t.scanOperand
					throw :gotoloop, true
				end
				operators.push(Node.new(t))
			
			when $consts["INCREMENT"], $consts["DECREMENT"]
				if t.scanOperand
					operators.push(Node.new(t)) # prefix increment or decrement
				else
					# Use >, not >=, so postfix has higher precedence than prefix.
					reduce(operators, operands, t) while operators.length > 0 && $opPrecedence[operators.last.type] && $opPrecedence[operators.last.type] > $opPrecedence[tt]
					n = Node.new(t, tt)
					n.push(operands.pop)
					n.postfix = true
					operands.push(n)
				end
			
			when $consts["FUNCTION"]
				if !t.scanOperand
					throw :gotoloop, true
				end
				operands.push(FunctionDefinition(t, x, false, $consts["EXPRESSED_FORM"]))
				t.scanOperand = false
			
			when $consts["NULL"], $consts["THIS"], $consts["TRUE"], $consts["FALSE"],
				$consts["IDENTIFIER"], $consts["NUMBER"], $consts["STRING"],
				$consts["REGEXP"]

				if !t.scanOperand
					throw :gotoloop, true
				end
				operands.push(Node.new(t))
				t.scanOperand = false
			
			when $consts["LEFT_BRACKET"]
				if t.scanOperand
					# Array initialiser.  Parse using recursive descent, as the
					# sub-grammar here is not an operator grammar.
					n = Node.new(t, $consts["ARRAY_INIT"])
					while (tt = t.peek) != $consts["RIGHT_BRACKET"]
						if tt == $consts["COMMA"]
							t.get
							n.push(nil)
							next
						end
						n.push(Expression(t, x, $consts["COMMA"]))
						break if !t.match($consts["COMMA"])
					end
					t.mustMatch($consts["RIGHT_BRACKET"])
					operands.push(n)
					t.scanOperand = false
				else
					# Property indexing operator.
					operators.push(Node.new(t, $consts["INDEX"]))
					t.scanOperand = true
					x.bracketLevel += 1
				end
			
			when $consts["RIGHT_BRACKET"]
				if t.scanOperand or x.bracketLevel == bl
					throw :gotoloop, true
				end
				while reduce(operators, operands, t).type != $consts["INDEX"]
					nil
				end
				x.bracketLevel -= 1
			
			when $consts["LEFT_CURLY"]
				if !t.scanOperand
					throw :gotoloop, true
				end
				# Object initialiser.  As for array initialisers (see above),
				# parse using recursive descent.
				x.curlyLevel += 1
				n = Node.new(t, $consts["OBJECT_INIT"])

catch(:gotoobject_init) do
#object_init:
				if !t.match($consts["RIGHT_CURLY"])
					begin
						tt = t.get
						if (t.token.value == "get" or t.token.value == "set") and t.peek == $consts["IDENTIFIER"]
							raise SyntaxError.new("Illegal property accessor", t) if x.ecmaStrictMode
							n.push(FunctionDefinition(t, x, true, $consts["EXPRESSED_FORM"]))
						else
							case tt
								when $consts["IDENTIFIER"], $consts["NUMBER"], $consts["STRING"]
									id = Node.new(t)
								
								when $consts["RIGHT_CURLY"]
									raise SyntaxError.new("Illegal trailing ,", t) if x.ecmaStrictMode
									throw :gotoobject_init
								
								else
									raise SyntaxError.new("Invalid property name", t)
							end
							t.mustMatch($consts["COLON"])
							n2 = Node.new(t, $consts["PROPERTY_INIT"])
							n2.push(id)
							n2.push(Expression(t, x, $consts["COMMA"]))
							n.push(n2)
						end
					end while t.match($consts["COMMA"])
					t.mustMatch($consts["RIGHT_CURLY"])
				end
				operands.push(n)
				t.scanOperand = false
				x.curlyLevel -= 1
end

			when $consts["RIGHT_CURLY"]
				raise SyntaxError.new("PANIC: right curly botch", t) if !t.scanOperand and x.curlyLevel != cl
				throw :gotoloop, true
			
			when $consts["LEFT_PAREN"]
				if t.scanOperand
					operators.push(Node.new(t, $consts["GROUP"]))
				else
					reduce(operators, operands, t) while operators.length > 0 && $opPrecedence[operators.last.type] && $opPrecedence[operators.last.type] > $opPrecedence[$consts["NEW"]]
					# Handle () now, to regularize the n-ary case for n > 0.
					# We must set scanOperand in case there are arguments and
					# the first one is a regexp or unary+/-.
					n = operators.last
					t.scanOperand = true
					if t.match($consts["RIGHT_PAREN"])
						if n && n.type == $consts["NEW"]
							operators.pop
							n.push(operands.pop)
						else
							n = Node.new(t, $consts["CALL"])
							n.push(operands.pop)
							n.push(Node.new(t, $consts["LIST"]))
						end
						operands.push(n)
						t.scanOperand = false
						#puts "woah"
						break
					end
					if n && n.type == $consts["NEW"]
						n.type = $consts["NEW_WITH_ARGS"]
					else
						operators.push(Node.new(t, $consts["CALL"]))
					end
				end
				x.parenLevel += 1
				
			when $consts["RIGHT_PAREN"]
				if t.scanOperand or x.parenLevel == pl
					throw :gotoloop, true
				end
				while (tt = reduce(operators, operands, t).type) != $consts["GROUP"] \
						and tt != $consts["CALL"] and tt != $consts["NEW_WITH_ARGS"]
					nil
				end
				if tt != $consts["GROUP"]
					n = operands.last
					if n[1].type != $consts["COMMA"]
						n2 = n[1]
						n[1] = Node.new(t, $consts["LIST"])
						n[1].push(n2)
					else
						n[1].type = $consts["LIST"]
					end
				end
				x.parenLevel -= 1
				
			# Automatic semicolon insertion means we may scan across a newline
			# and into the beginning of another statement.  If so, break out of
			# the while loop and let the t.scanOperand logic handle errors.
			else
				throw :gotoloop, true
		end
	end

end
end

	raise SyntaxError.new("Missing : after ?", t) if x.hookLevel != hl
	raise SyntaxError.new("Missing operand", t) if t.scanOperand
		
	# Resume default mode, scanning for operands, not operators.
	t.scanOperand = true
	t.unget
	reduce(operators, operands, t) while operators.length > 0
	return operands.pop
end

def parse (source, filename, line = 1)
	t = Tokenizer.new(source, filename, line)
	x = CompilerContext.new(false)
	n = Script(t, x)
	raise SyntaxError.new("Syntax error", t) if !t.done
    return n
end

