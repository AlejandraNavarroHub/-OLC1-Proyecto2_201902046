%{
    const TRADUCTOR  = require('./tablaSimbolo/TRADUCTOR');
    const Excepcion = require('./exceptions/EXCEPTION');
    const PRIMITIVO = require('./expresiones/PRIMITIVO');
    const VARIABLE = require('./expresiones/VARIABLE');
    const LISTA = require('./expresiones/LISTA');
    const VECTOR = require('./expresiones/VECTOR');
    const FUNCION_E = require('./expresiones/FUNCION');
    const IMPRIMIR  = require('./instrucciones/IMPRIMIR');
    const ADD  = require('./instrucciones/ADD');
    const IF  = require('./instrucciones/IF');
    const FOR  = require('./instrucciones/FOR');
    const WHILE  = require('./instrucciones/WHILE');
    const DO  = require('./instrucciones/DO');
    const FUNCION  = require('./instrucciones/FUNCION');
    const LLAMADA  = require('./instrucciones/LLAMAR');
    const CONTINUE  = require('./instrucciones/CONTINUE');
    const BREAK  = require('./instrucciones/BREAK');
    const RETURN  = require('./instrucciones/RETURN');
    const DECLARAR_VAR  = require('./instrucciones/VARIABLE');
    const DECLARAR_LISTA  = require('./instrucciones/LISTA');
    const DECLARAR_VECTOR  = require('./instrucciones/VECTOR');

    const TIPO = require('./tablaSimbolo/TIPO');
    const aritmetica = require('./expresiones/ARITMETICA');
    const TIPO_INSTRUCCION = require('./tablaSimbolo/TIPO_INSTRUCCION');
    const relacional = require('./expresiones/RELACIONALES');
    const logico = require('./expresiones/LOGICOS');
    const ternario = require('./expresiones/TERNARIO');
    const casteo = require('./expresiones/CAST');
    const crementar = require('./expresiones/IN_DECREMENTAR');
    const asignar_valor = require('./instrucciones/ASIGNACION');
    const indec = require('./instrucciones/IN_DECRE');
    const nativa = require('./expresiones/NATIVA');
    const upper = require('./expresiones/TOUPPER');
    const lower = require('./expresiones/TOLOWER');

    let Texto="";
    let TRADUCTOR1 = new TRADUCTOR.default([]);
    let TRADUCTOR2 = new TRADUCTOR.default([]);
%}

%lex

%options case-insensitive
%x CADENA
%x CARACTER
%%
/* Espacios en blanco */
"//".*            	{$$="";}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {$$="";}
[ \r\t]+            {$$="";}
\n                  {$$="";}
\s+                 {$$="";}
[']                 {Texto=""; this.begin("CARACTER");}
<CARACTER>[^'\\]"'"     {yytext = yytext.substr(0,yyleng-1); this.popState(); return 'CARACTER';}
<CARACTER>"\\n'"        {yytext = '\n'; this.popState(); return 'CARACTER';}
<CARACTER>"\\t'"        {yytext = "\t"; this.popState(); return 'CARACTER';}
<CARACTER>"\\r'"        {yytext = "\r"; this.popState(); return 'CARACTER';}
<CARACTER>"\\\"'"       {yytext = "\""; this.popState(); return 'CARACTER';}
<CARACTER>"\\''"        {yytext = "'"; this.popState(); return 'CARACTER';}       
<CARACTER>"\\\\'"       {yytext = "\\"; this.popState(); return 'CARACTER';}
<CARACTER>[^'\\]*"'"    {this.popState(); return 'CARACTER_ERROR';}

["]                 {Texto=""; this.begin("CADENA");}
<CADENA>[^"\\]+     {Texto+=yytext;}
<CADENA>"\\n"       {Texto+='\n';}
<CADENA>"\\t"       {Texto+="\t";}
<CADENA>"\\r"       {Texto+="\r";}
<CADENA>"\\\""      {Texto+="\"";}
<CADENA>"\\'"       {Texto+="\'";}
<CADENA>"\\\\"      {Texto+="\\";}
<CADENA>["]         {yytext = Texto; this.popState(); return 'CADENA';}




//INCREMENTO Y DECREMENTO
"++"                    return "INMAS";
"--"                    return "INMENOS";

"?"                     return "INTERROGACION";

//comparadores
"!="                    return "DIFERENTE";
"=="                    return "IGUALDAD";
">="                    return "MAYORIGUAL";
"<="                    return "MENORIGUAL"; 
"<"                     return "MENORQUE";
">"                     return "MAYORQUE";
"="                     return "IGUAL";

//aritmetica
"+"                     return "MAS";
"-"                     return "MENOS";
"*"                     return "POR";
"/"                     return "DIV";
"%"                     return "MODULO";
"^"                     return "ELEVADO";
//logicos
"&&"                    return "AND";
"||"                    return "OR";
"!"                     return "NOT";




"INT"                   return "INT";
"DOUBLE"                return "DOUBLE";
"BOOLEAN"               return "BOOLEAN";
"CHAR"                  return "CHAR";
"STRING"                return "STRING";
"TRUE"                  return "TRUE";
"FALSE"                 return "FALSE";

//funciones
"PRINT"                 return "PRINT";
"IF"                    return "IF";
"ELSE"                  return "ELSE";
"FOR"                   return "FOR";
"WHILE"                 return "WHILE";
"DO"                    return "DO";
"SWITCH"                return "SWITCH";
"NEW"                   return "NEW";
"RETURN"                return "RETURN";
"CONTINUE"              return "CONTINUE";
"BREAK"                 return "BREAK";
"LIST"                  return "LIST";
"ADD"                   return "ADD";
"CASE"                  return "CASE";
"DEFAULT"               return "DEFAULT";
"VOID"                  return "VOID";
"toLower"               return "TOLOWER";
"toUpper"               return "TOUPPER";
"Length"                return "LENGTH";
"Truncate"              return "TRUNCATE";
"Round"                 return "ROUND";
"Typeof"                return "TYPEOF";
"toString"              return "TOSTRING";
"toCharArray"           return "TOCHARARRAY";
"Exec"                  return "EXEC";


//otros
";"                     return "PTCOMA";
":"                     return "DOSPT"
"."                     return "PT";
","                     return "COMA";
"("                     return "PIZQ";
")"                     return "PDER";
"["                     return "CIZQ";
"]"                     return "CDER";
"{"                     return "LLIZQ";
"}"                     return "LLDER";


[A-Za-z]([A-Za-z]|[0-9]|[_])*  return "NOMBRE";
[0-9]+"."[0-9]+\b         return "DECIMAL";
[0-9]+\b                  return "ENTERO";

<<EOF>>                 return 'EOF';

. {
    TRADUCTOR1.newError("LEXICO", "Símbolo "+yytext+" no reconocido.", yylloc.first_line, yylloc.first_column); 
}
/lex
                
/* Asociación de operadores y precedencia */
%left 'INTERROGACION'
%left 'IGUALDAD' 'DIFERENTE','MENORQUE','MENORIGUAL','MAYORQUE'.'MAYORIGUAL'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MODULO'
%left 'ELEVADO'
%right UMENOS
%right FUNCAST
%left 'INMAS','INMENOS'

%start INICIO

%%

INICIO
    : INSTRUCCIONES EOF         {TRADUCTOR1.instrucciones = $1; TRADUCTOR2 = TRADUCTOR1; TRADUCTOR1 = new TRADUCTOR.default([]); return TRADUCTOR2;}
    | error EOF                 {TRADUCTOR1.newError("Sintactico", "Símbolo "+yytext+" no reconocido.", this._$.first_line, this._$.first_column);}
    | error                     {console.log("error");}
;

INSTRUCCIONES
    :INSTRUCCIONES INSTRUCCION          {$1.push($2); $$=$1;}
    |INSTRUCCION                        {$$= []; $$.push($1);}
;

INSTRUCCION
    : PRINT PIZQ EX PDER PTCOMA                         {$$ = new IMPRIMIR.default($3,this._$.first_line, this._$.first_column);}
    | DECLE PTCOMA                                      {$$ = $1}
    | ASIG PTCOMA                                       {$$ = $1}
    | NOMBRE PT ADD PIZQ EX PDER PTCOMA                 {$$ = new ADD.default(this._$.first_line, this._$.first_column, $1, $5);}
    | INCREMENTAR PTCOMA                                {$$ = new indec.default($1,this._$.first_line, this._$.first_column);}
    | DECREMENTO PTCOMA                                 {$$ = new indec.default($1,this._$.first_line, this._$.first_column);}
    | INS_IF                                            {$$ = $1}
    | INS_TERNARIO PTCOMA                               {$$ = $1}
    | INS_SWITCH                                        {$$ = $1}
    | INS_WHILE                                         {$$ = $1}
    | INS_FOR                                           {$$ = $1}
    | INS_DOWHILE                                       {$$ = $1}
    | FUNCION                                           {$$ = $1}
    | LLAMADA PTCOMA                                    {$$ = ''; if($1!==''){$$ = new LLAMADA.default(this._$.first_line, this._$.first_column, $1);}}
    | INS_RETURN                                        {$$ = $1}
    | BREAK PTCOMA                                      {$$ = new BREAK.default(this._$.first_line, this._$.first_column);}
    | CONTINUE PTCOMA                                   {$$ = new CONTINUE.default(this._$.first_line, this._$.first_column);}
    | error PTCOMA                                      {$$ = "fda"}
    | error LLDER                                       {console.log("error");}

;


DECLE
    :INS_TIPO NOMBRE                                                                        {$$= new DECLARAR_VAR.default(this._$.first_line, this._$.first_column, $1, $2);}
    |INS_TIPO NOMBRE IGUAL EX                                                               {$$= new DECLARAR_VAR.default(this._$.first_line, this._$.first_column, $1, $2, $4);}
    |INS_TIPO CIZQ CDER NOMBRE IGUAL NEW INS_TIPO CIZQ EX CDER                              {$$= new DECLARAR_VECTOR.default(this._$.first_line, this._$.first_column, $1,$4, undefined, $9, $7);}
    |INS_TIPO CIZQ CDER NOMBRE IGUAL LLIZQ LISTA_EX LLDER                                   {$$= new DECLARAR_VECTOR.default(this._$.first_line, this._$.first_column, $1,$4, $7, undefined, undefined);}
    |LIST MENORQUE INS_TIPO MAYORQUE NOMBRE IGUAL NEW LIST MENORQUE INS_TIPO MAYORQUE       {$$=new DECLARAR_LISTA.default(this._$.first_line, this._$.first_column, $3,$5, undefined, $10);}
    |LIST MENORQUE INS_TIPO MAYORQUE NOMBRE IGUAL EX                                        {$$=new DECLARAR_LISTA.default(this._$.first_line, this._$.first_column, $3,$5, $7, undefined);}
;


ASIG
    :NOMBRE IGUAL EX                                    {$$= new asignar_valor.default(this._$.first_line, this._$.first_column,$1,$3);}
    |NOMBRE CIZQ CIZQ EX CDER CDER IGUAL EX             {$$="";}
    |NOMBRE CIZQ EX CDER IGUAL EX                       {$$="";}
;


INCREMENTAR
    :EX INMAS               {$$= new crementar.default(this._$.first_line, this._$.first_column,$1,$2);}
;

DECREMENTO
    :EX INMENOS             {$$=new crementar.default(this._$.first_line, this._$.first_column,$1,$2);}
;

INS_IF
    :IF PIZQ EX PDER LLIZQ INSTRUCCIONES LLDER                                      {$$= new IF.default(this._$.first_line, this._$.first_column,$3, $6);}
    |IF PIZQ EX PDER LLIZQ INSTRUCCIONES LLDER ELSE INS_IF                          {$$= new IF.default(this._$.first_line, this._$.first_column,$3, $6, undefined, $9);}
    |IF PIZQ EX PDER LLIZQ INSTRUCCIONES LLDER ELSE LLIZQ INSTRUCCIONES LLDER       {$$= new IF.default(this._$.first_line, this._$.first_column,$3, $6, $10);}
    |IF error LLDER                                                                 {}    
;


INS_WHILE
    :WHILE PIZQ EX PDER LLIZQ INSTRUCCIONES LLDER               {$$= new WHILE.default(this._$.first_line, this._$.first_column, $3, $6);}
    |WHILE error LLDER                                          {$$="";}
;


INS_SWITCH
    :SWITCH PIZQ EX PDER LLIZQ INS_CASOS DEFAULT DOSPT INSTRUCCIONES LLDER              {$$="";}
    |SWITCH PIZQ EX PDER LLIZQ INS_CASOS LLDER                                          {$$="";}
    |SWITCH PIZQ EX PDER LLIZQ DEFAULT DOSPT INSTRUCCIONES LLDER                        {$$="";}
    |SWITCH error PDER                                                                  {$$="";}
;

INS_CASOS
    :INS_CASOS CASE EX DOSPT INSTRUCCIONES                                                   {$$="";}
    |CASE EX DOSPT INSTRUCCIONES                                                             {$$="";}
;


INS_FOR
    :FOR PIZQ DECLE PTCOMA EX PTCOMA ACTUALIZACION LLIZQ INSTRUCCIONES LLDER     {$$= new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, $9);}
    |FOR PIZQ ASIG PTCOMA EX PTCOMA ACTUALIZACION LLIZQ INSTRUCCIONES LLDER      {$$= new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, $9);}
    |FOR error LLDER                                                             {$$="";}
;


ACTUALIZACION
    :ASIGNACION PDER      {$$ = $1}
    | INCREMENTAR PDER    {$$ = $1}
    | DECREMENTO PDER     {$$ = $1}
;


INS_DOWHILE
    :DO LLIZQ INSTRUCCIONES LLDER WHILE PIZQ EX PDER PTCOMA             {$$= new DO.default(this._$.first_line, this._$.first_column, $7, $3);}
    |DO error PTCOMA                                                    {$$="";}
;

FUNCION
    :INS_TIPO NOMBRE PIZQ PDER LLIZQ INSTRUCCIONES LLDER                {$$="";TRADUCTOR1.FUNCTIONS.push(new FUNCION.default(this._$.first_line, this._$.first_column, $1, $2, $6, undefined));}
    |INS_TIPO NOMBRE PIZQ PARAMETROS PDER LLIZQ INSTRUCCIONES LLDER     {$$="";TRADUCTOR1.FUNCTIONS.push(new FUNCION.default(this._$.first_line, this._$.first_column, $1, $2, $7, $4));}
    |VOID NOMBRE PIZQ PARAMETROS PDER LLIZQ INSTRUCCIONES LLDER         {$$="";TRADUCTOR1.FUNCTIONS.push(new FUNCION.default(this._$.first_line, this._$.first_column, new TIPO.default(TIPO.tipos.ERROR), $2, $7, $4));}
    |VOID NOMBRE PIZQ PDER LLIZQ INSTRUCCIONES LLDER                    {$$="";TRADUCTOR1.FUNCTIONS.push(new FUNCION.default(this._$.first_line, this._$.first_column, new TIPO.default(TIPO.tipos.ERROR), $2, $6, undefined));}
    |VOID error LLDER                                                   {$$="";}
;

PARAMETROS
    :PARAMETROS COMA INS_TIPO NOMBRE        {$$= $1; $1.push(new DECLARAR_VAR.default(this._$.first_line, this._$.first_column, $3, $4));}
    |INS_TIPO NOMBRE                        {$$=[]; $$.push(new DECLARAR_VAR.default(this._$.first_line, this._$.first_column, $1, $2));}
;


LLAMADA
    :NOMBRE PIZQ LISTA_EX PDER              {$$=new FUNCION_E.default(this._$.first_line, this._$.first_column, $1, $3);}
    |NOMBRE PIZQ PDER                       {$$=new FUNCION_E.default(this._$.first_line, this._$.first_column, $1);}
    |EXEC NOMBRE PIZQ LISTA_EX PDER         {$$=""; TRADUCTOR1.EXEC.push(new LLAMADA.default(this._$.first_line, this._$.first_column, new FUNCION_E.default(this._$.first_line, this._$.first_column, $2, $4)));}
    |EXEC NOMBRE PIZQ PDER                  {$$=""; TRADUCTOR1.EXEC.push(new LLAMADA.default(this._$.first_line, this._$.first_column, new FUNCION_E.default(this._$.first_line, this._$.first_column, $2)));}
;

INS_RETURN
    : RETURN PTCOMA                     {$$ = new RETURN.default(this._$.first_line, this._$.first_column, undefined);}
    | RETURN EX PTCOMA                  {$$ = new RETURN.default(this._$.first_line, this._$.first_column, $2);}
;

EX
    :INS_TERNARIO                                   {$$ = $1;}
    |EX MAS EX                                      {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX MENOS EX                                    {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX POR EX                                      {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX DIV EX                                      {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX MODULO EX                                   {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX ELEVADO EX                                  {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |MENOS EX %prec UMENOS                          {$$= new aritmetica.default(this._$.first_line, this._$.first_column,$2,$1);}
    |PIZQ EX PDER                                   {$$=$2;}
    |VALORES                                        {$$ = $1;}
    |EX MENORQUE EX                                 {$$= new relacional.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX MAYORQUE EX                                 {$$= new relacional.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX DIFERENTE EX                                {$$= new relacional.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX IGUALDAD EX                                 {$$= new relacional.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX MAYORIGUAL EX                               {$$= new relacional.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX MENORIGUAL EX                               {$$= new relacional.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX AND EX                                      {$$= new logico.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |EX OR EX                                       {$$= new logico.default(this._$.first_line, this._$.first_column,$1,$2,$3);}
    |NOT EX                                         {$$= new logico.default(this._$.first_line, this._$.first_column,$2,$1);}
    |INS_CAST                                       {$$= $1;}
    |INCREMENTAR                                    {$$=$1;}
    |DECREMENTO                                     {$$=$1;}
    |INS_NATIVAS                                    {$$=$1;}
    |INS_TOLOWER                                    {$$=$1;}
    |INS_TOUPPER                                    {$$=$1;}
    |NOMBRE                                         {$$= new VARIABLE.default($1,this._$.first_line, this._$.first_column);}
    |LLAMADA                                        {$$=$1;}
    |NOMBRE CIZQ  EX CDER                           {$$=new VECTOR.default(this._$.first_line, this._$.first_column, $1, $3);}
    |NOMBRE CIZQ CIZQ EX CDER CDER                  {$$=new LISTA.default($1,this._$.first_line, this._$.first_column, $4);}
;

INS_TERNARIO
    :EX INTERROGACION EX DOSPT EX     {$$ = new ternario.default(this._$.first_line, this._$.first_column,$1,$3,$5);}
;


INS_TIPO
    :INT                    {$$ = new TIPO.default(TIPO.tipos.ENTERO);}
    |DOUBLE                 {$$ = new TIPO.default(TIPO.tipos.DECIMAL);}
    |CHAR                   {$$ = new TIPO.default(TIPO.tipos.CARACTER);}
    |BOOLEAN                {$$ = new TIPO.default(TIPO.tipos.BOOLEANO);}
    |STRING                 {$$ = new TIPO.default(TIPO.tipos.CADENA);}
;

VALORES
    :ENTERO             {$$ = new PRIMITIVO.default(new TIPO.default(TIPO.tipos.ENTERO),$1,this._$.first_line, this._$.first_column);}
    |DECIMAL            {$$ = new PRIMITIVO.default(new TIPO.default(TIPO.tipos.DECIMAL),$1,this._$.first_line, this._$.first_column);}
    |CARACTER           {$$ = new PRIMITIVO.default(new TIPO.default(TIPO.tipos.CARACTER),$1,this._$.first_line, this._$.first_column);}
    |CADENA             {$$ = new PRIMITIVO.default(new TIPO.default(TIPO.tipos.CADENA),$1,this._$.first_line, this._$.first_column);}
    |TRUE               {$$ = new PRIMITIVO.default(new TIPO.default(TIPO.tipos.BOOLEANO),$1,this._$.first_line, this._$.first_column);}
    |FALSE              {$$ = new PRIMITIVO.default(new TIPO.default(TIPO.tipos.BOOLEANO),$1,this._$.first_line, this._$.first_column);}
;

INS_CAST
    :PIZQ INS_TIPO PDER EX %prec FUNCAST     {$$= new casteo.default(this._$.first_line, this._$.first_column,$2,$4);}
;

LISTA_EX
    :LISTA_EX COMA EX       {$$=$1; $$.push($3);}
    |EX                     {$$=[]; $$.push($1);}
;

                                     
INS_TOLOWER
    :TOLOWER PIZQ EX PDER       {$$= new lower.default(this._$.first_line, this._$.first_column,$1,$3);}
;                        
INS_TOUPPER
    :TOUPPER PIZQ EX PDER       {$$=new upper.default(this._$.first_line, this._$.first_column,$1,$3);}
;   

INS_NATIVAS
    :LENGTH PIZQ EX PDER            {$$= new nativa.default(this._$.first_line, this._$.first_column,$1,$3);}
    |TRUNCATE PIZQ EX PDER          {$$= new nativa.default(this._$.first_line, this._$.first_column,$1,$3);}
    |ROUND PIZQ EX PDER             {$$= new nativa.default(this._$.first_line, this._$.first_column,$1,$3);}
    |TYPEOF PIZQ EX PDER            {$$= new nativa.default(this._$.first_line, this._$.first_column,$1,$3);}
    |TOSTRING PIZQ EX PDER          {$$= new nativa.default(this._$.first_line, this._$.first_column,$1,$3);}
    |TOCHARARRAY PIZQ EX PDER       {$$= new nativa.default(this._$.first_line, this._$.first_column,$1,$3);}
;