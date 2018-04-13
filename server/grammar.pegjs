{
    var thisParser = this;

    function flatten(array){
      var flat = [];
      for (var i = 0, l = array.length; i < l; i++){
          var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
          if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
      }
      return flat;
   }
    
    function resolveSymbol(parser, symbol){
        const flatSymbol = flatten(symbol).join("");
        if (!parser.symbols.hasOwnProperty(flatSymbol)) { throw new Error(`Variable, ${flatSymbol}, not defined`) };
        return Number.parseFloat(parser.symbols[flatSymbol]);
    }
}

Start
  = Expression

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:(Function / Factor) tail:(_ ("*" / "/") _ (Function / Factor))* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }
    
Function "known function"
  = SumFunc / ExpFunc / ProductFunc / PowerFunc
  
SumFunc
  = "$sum(" _ list:Variable _ ")" { return list.reduce((acc, val) => acc + val, 0);; }
  
ProductFunc
  = "$product(" _ list:Variable _ ")" { return list.reduce((acc, val) => acc * val, 1); }
  
ExpFunc
  = "$exp(" _ val:(Variable / Factor) _ ")" { return Math.exp(val); }

PowerFunc
  = "$power(" _ base:(Variable / Factor) _ "," _ power:(Variable / Factor) _ ")" { return Math.pow(base, power); }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Float / Integer / Variable

Variable "variable"
  = _ name:[A-z_]+ { return resolveSymbol(thisParser, name); }

Float "float"
  = _ [0-9]+.[0-9]+ { return parseFloat(text()); }

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
