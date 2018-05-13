const testSCs =
`
// test level 1
// append set of apples into fruit set
sc_node#fruit | sc_edge_main#edge | sc_node#apple;;
// append set of bananas into fruit set
sc_node#fruit | sc_edge_main#... | sc_node#banana;;

sc_node#apple | sc_edge_dcommon#..e | "file://apple.png";;
/*append edge from nrel_image relation into
  edge between apple set and it's image*/
sc_node#nrel_image | sc_edge_main#... | sc_edge_dcommon#..e;;

// test level 2
x 
    > _y;
    < ._y1;
    -> .._y2; 
    <- .y3;
    <> ..y4;
    ..> y5;
    <.. y6;
    <=> y7;
    _<=> y8;
    => y9;
    <= y10;
    _=> y11;
    _<= y12;
    _-> y13;
    _<- y14;
    -|> y15;
    <|- y16;
    _-|> y17;
    _<|- y18;
    -/> y19;
    </- y20;
    _-/> y21;
    _</- y22;
    ~> y23;
    <~ y24;
    _~> y25;
    _<~ y26;
    ~|> y27;
    <|~ y28;
    _~|> y29;
    _<|~ y30;
    ~/> y31;
    </~ y32;
    _~/> y33;
    _</~ y34;;

x>y;;
x<y1;;
x->y2;;
x<-y3;;
x<>y4;;
x..>y5;;
x<..y6;;
x<=>y7;;

// test type keynodes
sc_type
    -> sc_const;
    -> sc_var;
    
    -> sc_node;
    -> sc_link;
    -> sc_edge_dcommon;
    -> sc_edge_ucommon;
    -> sc_edge_main;
    -> sc_edge_access;

    // edge types
    -> sc_edge_pos;
    -> sc_edge_neg;
    -> sc_edge_fuz;
    -> sc_edge_perm;
    -> sc_edge_temp;
    
    -> sc_node_not_binary_tuple;
    -> sc_node_struct;
    -> sc_node_role_relation;
    -> sc_node_norole_relation;
    -> sc_node_not_relation; // deprecated: use sc_node_class instead
    -> sc_node_class;
    -> sc_node_abstract;
    -> sc_node_material;;

// test common
sc_type_node -> .node1;;
..node -> node2;;

auto -> [test content];;

fix -> [*
	begin -> test;;
	end -> [test content];;
*];;


/* Comment */
vars = {
	_var1;
	_var2	
};;

// errors
begin_el _-> end_el;;
end_el _~> end_el2;;

// comment


link = "file:///test.html";;

light_led_el_dl_25cw
	=> nrel_main_idtf:
		[светодиодная лампа EL-DL-25CW] (* <- lang_ru;; *);
	=> nrel_main_idtf:
		[led EL-DL-25CW] (* <- lang_en;; *);
	=> nrel_light_color:
		light_led_color_cold_white;
    => nrel_standby_energy_usage:
        [^"float:1"]
        (* <- binary_float;; *);
    => nrel_energy_usage:
        [^"float:15"]
        (* <- binary_float;; *);;

literary_source
=> nrel_main_idtf:
	[литературный источник]
	(* <- lang_ru;;*);;

nrel_reference_standard
<- sc_node_norole_relation;
=> nrel_main_idtf:
	[ссылка по стандарту]
	(* <- lang_ru;;*);;

aizenman_m_a_1988kn_dinamgkfcog
<-literary_source;
=> nrel_main_idtf:
	[Айзерман М.А.1988кн-ДинамПкФСОГ]
	(* <- lang_ru;;*);
<- nrel_reference_standard:
	...
	(*
		<= nrel_sc_text_translation:
			...
			(*
				-> [Айзерман, М.А. Динамический подход к анализу структур, описываемых графами (основы графодинамики) / М. А. Айзерман,  Л. А. Гусев, С. В. Петров, И. М. Смирнова, Л. А. Тененбаум // Исследования по теории структур. - М. : Наука, 1988. - С. 5-76.]
					(*<- lang_ru;;*);;
			*);;
	*);
	=>nrel_author:
	{
		[Айзерман М.А.];
		[Гусев Л.А.];
		[Петров С.В.];
		[Смирнова И.М.];
		[Тенненбаум Л.А.]
	};;

facebook 
	=> nrel_main_idtf:
		[facebook] (* <- lang_en;; *);
	=> nrel_main_idtf:
		[фейсбук] (* <- lang_ru;; *);;

`;