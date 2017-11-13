grammar scs;

options
{
  language = JavaScript;
}

tokens
{
}

@header {
import { SCsParseCallbacks } from '../scs_parser_data';
}

@parser::members {

public parserCallbacks:any = null;

private makeLocation(obj) {
  return {
    line: obj.line,
    offset: obj.charPositionInLine,
    len: obj.text.length
  };
};

private makeError(token, msg) {
  
  this.parserCallbacks.onParseError({
    line: token.line - 1,
    offset: token.pos,
    len: token.text.length,
    msg: msg
  });
};

}

content
  locals[count: number = 1]
  : ('_')? r='['
    (
        { $count > 0 }?
        (
          ~ ('[' | ']')
          | '[' { $count++; }
          | ']' { $count--; }
        )
    )*
    { 
      const tok = { line: $r.line, pos: $r.pos, text: $r.text};
      if ($count > 0) { this.makeError(tok, "Expected ']' symbol"); }
    }
  ;

contour
  : '_'? b='[*' sentence_wrap* e='*]'
    {
      const tok = { line: $b.line, pos: $b.pos, text: $b.text };
      if (!$e) { this.makeError(tok, "Expected '*]' symbol"); }
    }
  ;

// ------------- Rules --------------------

syntax 
  : sentence_wrap*
  ;

sentence_wrap
  : (sentence ';;')
  ;

sentence
  : sentence_lvl1
  | sentence_lvl_common
  | sentence_assign
  ;

sentence_assign
  : IdtfSystem '=' idtf_common
  ;
    
idtf_lvl1_preffix
  : 'sc_node'
  | 'sc_link'
  | 'sc_edge_dcommon'
  | 'sc_edge_ucommon'
  | 'sc_edge_main'
  | 'sc_edge_access'
  ;
    
idtf_lvl1_value
   : (idtf_lvl1_preffix '#')? idtf_system
  ;

idtf_lvl1
  : idtf_lvl1_value
  | Link
  ;

idtf_system
  : IdtfSystem
    {
      const loc = this.makeLocation($IdtfSystem);
      this.parserCallbacks.onAddIdtf($IdtfSystem.text, loc);
    }
  | '...'
  ;

idtf_edge
  : '(' idtf_system
        Connector attr_list?
        idtf_system
    ')'
  ;
  
idtf_set
  : '{' attr_list? idtf_common 
        (';' attr_list? idtf_common)*
    '}'
  ;

idtf_common
  : idtf_system
  | idtf_edge
  | idtf_set
  | contour
  | content
  | Link
  ;

idtf_list
  : idtf_common internal_sentence_list? 
    (';' idtf_common internal_sentence_list?)*
  ;

internal_sentence
  : Connector attr_list? idtf_list
  ;

internal_sentence_list
  : '(*' (internal_sentence ';;')+ '*)'
  ;

sentence_lvl1
  : idtf_lvl1 s1='|' idtf_lvl1 s2='|' idtf_lvl1
  ;

sentence_lvl_common
  : idtf_common Connector attr_list? idtf_list
    (p=';' c=Connector attr_list? idtf_list)*
  ;

attr_list
  : (IdtfSystem EdgeAttr)+
  ;

// ----- Lexer rules -----
IdtfSystem
  : ('a'..'z'|'A'..'Z'|'_'|'.'|'0'..'9'|'#')+
  ;

Link
  : '"' (~('"') | '\\"' )* '"'
  ;
  
Connector
  : ( '<>' | '>' | '<' | '..>' | '<..'
  | '->' | '<-' | '<=>' | '=>' | '<='
  | '-|>' | '<|-' | '-/>' | '</-'
  | '~>' | '<~' | '~|>' | '<|~'
  | '~/>' | '</~' | '_<>' | '_>' | '_<'
  | '_..>' | '_<..' | '_->' | '_<-'
  | '_<=>' | '_=>' | '_<=' | '_-|>' | '_<|-'
  | '_-/>' | '_</-' | '_~>' | '_<~'
  | '_~|>' | '_<|~' | '_~/>' | '_</~' )
  ;

EdgeAttr
  : ':'
  | '::'
  ;

LINE_COMMENT
  : '//' ~[\r\n]* -> channel(HIDDEN)
  ;

MULTINE_COMMENT
  : '/*' .*? '*/' -> channel(HIDDEN)
  ;

WS
  : [ \t\r\n\u000C]+ -> skip
  ;