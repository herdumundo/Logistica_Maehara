    var ruta_contenedores               =   "./contenedores/";
    var cruds                           =   "./crud/";
    var ruta_grillas                    =   "./grillas/";
    var ruta_consultas                  =   "./consultas/";

    var direccion                       ="1";
    var contador_mixto_pedido_log_ccha  =0;
    var contador_mixto_pedido_log_cchb  =0;
    var contador_mixto_pedido_log_cchh  =0;
    var contador_mixto_pedido_log_lavado=0;
    var array_mixto_pedidos             ="";
    var cantidad_total_ccha             =0;
    var cantidad_total_cchb             =0;
    var cantidad_total_cchh             =0;
    var cantidad_total_ovo              =0;
    var cantidad_total                  =0;  
    var elem = document.documentElement;
    var pantalla="SI";
    
    
    
    
function openFullscreen() {
    
    if(pantalla=="SI")
    {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
      pantalla="NO";
    }
    
    else if(pantalla=="NO")
    {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
        pantalla="SI";
    }
}  
 

    $(document).ready(function()
    {
        $('body').loadingModal({text: 'Consultando...', 'animation': 'wanderingCubes'});
        ir_menu_principal();
        
      
        $('body').loadingModal('hide');
                       
    });
   
    function generar_grilla_pedido(tipo,codigo)
    {
        var pagina="";
        var area="";//este sirve solo para enviar para que clasificadora es
        if(tipo==1)
        {
            pagina="generar_grilla_preembarque.jsp";
        }
        else if(tipo==2) 
        {
            pagina="generar_grilla_preembarque_editar_log.jsp?id="+codigo;
        }
        else if(tipo==3) 
        {
            pagina="generar_grilla_preembarque_cyo.jsp?id="+codigo;
        }
        $.ajax({
                type: "POST",
                url: ruta_consultas+pagina,
            beforeSend: function() 
            {
                $('body').loadingModal("show");
            },           
            success: function (res) 
            {
                //TIPO 1 ES IGUAL A GENERACION DE PEDIDO
                //TIPO 2 ES IGUAL A FACTURACION
                //TIPO 3 ES IGUAL A CYO
                //FIRT ES EL DIV EN DONDE SE ALMACENA LA GRILLA DE CARROS ENTERO, EL SECOND ALMACENA LOS CARROS MIXTOS.
                 $("#contenido_grillas").html(res.grilla +" "+ res.grilla_mixto  );
                  seleccionar_todo_input();
               if(tipo!=3){
                   
            
              $("#tb_preembarque").DataTable({
            scrollY:        "500px",
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   {
            left:1
        },
         /*          scrollY:        '50vh',
        scrollCollapse: true,
         "pageLength": 100,
        paging:         false
                        "scrollX": true,
                     "ordering": false, */
                    
                        "language": {
              "sUrl": "js/Spanish.txt"
        } 
            });   }
                $('body').loadingModal('hide');
                $("#btn_atras").show();
                solo_numeros_td();//LAS CELDAS SOLO PERMITIRAN NUMEROS. 
                
                if(tipo==2||tipo==3)//CASO DE PEDIDOS QUE SE EDITARAN, YA SEA EN FACTURACION O EN CYO
                {  
                    var arr=res.cod_camion.split("_");
                    var codigo_camion=arr[1];
                    var capacidad=arr[0];
                    $("#"+res.cod_camion).attr({"selected": true});//SELECCIONA PARA PRIMERA OPCION
                    $("#"+res.cod_chofer).attr({"selected": true});//SELECCIONA PARA PRIMERA OPCION
                    $('#txt_obs').val(res.obs); //AQUI TRAE SOLO LOS TIPOS DE HUEVOS.
                    
                    
                    if(tipo==2)// 
                    {
                        $('#txt_disponibilidad').val(capacidad); 
                    }
                    else if (tipo==3) 
                    {
                        $('#txt_disponibilidad').val(res.cantidad_area);  //AQUI SE OBTIENE SOLO LA CANTIDAD DE DICHA AREA, NO EL TOTAL DE TODAS LAS AREAS.
                        $('#validacion_cantidades').val(res.validacion_cantidades); //AQUI TRAE LOS TIPOS DE HUEVOS CON SUS CANTIDADES
                        $('#validacion_tipos').val(res.validacion_tipos); //AQUI TRAE SOLO LOS TIPOS DE HUEVOS.
                        
                        
                        document.getElementById('txt_obs').disabled = true;// SE DENIEGA LA SELECCION DEL CAMION.
                        document.getElementById('cbox_camion').disabled = true;// SE DENIEGA LA SELECCION DEL CAMION.
                        document.getElementById('cbox_chofer').disabled = true;// SE DENIEGA LA SELECCION DEL CHOFER.
                        
                        
                        area=res.area;// SE RECUPERA EL AREA
                    }
                    if(res.carros_mixtos.length>0)//ESTE PROCESO, NO DEBE ENTRAR AL GENERAR EL PEDIDO, YA QUE EL JSON NO CONTIENE ESTE VALOR.
                    {
                        var array_carros = res.carros_mixtos.split(",");
                        for(i = 0; i < array_carros.length; i++)
                        {
                            $("#"+array_carros[i]).removeClass('btn-dark ').addClass(' btn-primary  bg1 ');
                            $("#"+array_carros[i]).html("SELECCIONADO");
                        }
                        contar_mixtos_seleccionados();
                    }
                    $('#id_pedido').val(res.id_pedido);// SE RECIBE EL ID DEL PEDIDO PARA USARLO.
                    
                }
                   
                
                if(tipo==2||tipo==1)
                {
                    $("td").focus(function()
                    {
                        var range = document.createRange();
                        range.selectNodeContents(this);  
                        var sel = window.getSelection(); 
                        sel.removeAllRanges(); 
                        sel.addRange(range);
                        obtener_valores_celda('1');
                    });
                    
                    
                       if(tipo==2){ //SI ES PEDIDO GENERADO, ENTONCES EL CLIC DE GENERAR PEDIDO, HARA OTRA COSA.
                        $('#btn_generar').click(function(){
                            obtener_valores_celda('2','EDITAR');
                        });
                        }
                        else if(tipo==1) {
                            $('#btn_generar').click(function(){
                            obtener_valores_celda('2','REGISTRO');
                        });                }
                        obtener_valores_celda('1');//EN ESTA CASO, REALIZARA VERIFICACIONES CUANDO ES 1, Y NO EJECUTARA EL REGISTRO.
                }
                else if(tipo==3)
                {
                     $("td").focus(function()
                    {
                        var range = document.createRange();
                        range.selectNodeContents(this);  
                        var sel = window.getSelection(); 
                        sel.removeAllRanges(); 
                        sel.addRange(range);
                        calculo_cantidades_grilla_cyo(1,"CHEQUEO",area);
                    });
                     
                        calculo_cantidades_grilla_cyo(1,"CHEQUEO",area);// CUANDO ES 1 CASO OMISO AL REGISTRO
                        
                        $('#btn_generar').click(function(){
                        calculo_cantidades_grilla_cyo(2,"EDITARCYO",area);// CUANDO EL TIPO ES DOS, SIGNIFICA QUE SE EJECUTARA EL REGISTRO
                        });
                }
                
                cargar_cantidades_ingresadas_editar(tipo);
             
            },
            error: function (error) 
            {
                 //ir_pedido_generar();
            }
            
                });  
    }
    
    function obtener_valores_celda(tipo,generacion_pedido)
    {
        var filas = document.querySelectorAll("#tb_preembarque tbody tr");
        var verificar_excedido_td=1;
        var ccha_lib;
        var ccha_cant_lib;
        var ccha_acep;
        var ccha_cant_acep;
        var ccha_invo;
        var ccha_cant_invo;
        var ccha_ldo;
        var ccha_cant_ldo;
        var cchb_cant_lib;
        var cchb_cant_acep;
        var cchb_cant_invo;
        var cchb_cant_ldo;
        var cchb_lib;
        var cchb_acep;
        var cchb_invo;
        var cchb_ldo;

        var cchh_cant_lib;
        var cchh_cant_acep;
        var cchh_cant_invo;
        var cchh_cant_ldo;
        var cchh_lib;
        var cchh_acep;
        var cchh_invo;
        var cchh_ldo; 

        var ovo_cant_lib;
        var ovo_cant_acep;
        var ovo_cant_invo;
        var ovo_lib;
        var ovo_acep;
        var ovo_invo;

        cantidad_total_ccha=0;
        cantidad_total_cchb=0;
        cantidad_total_cchh=0;
        cantidad_total_ovo=0;
        var c = 0;
        var valores = '';
        var cantidad_excedida=0;   
        var tipoA=0;
        var tipoB=0;
        var tipoC=0;
        var tipoD=0;
        var tipoS=0;
        var tipoJ=0;
         cantidad_total=0;
        filas.forEach(function (e) 
        {
            var columnas = e.querySelectorAll("td");

            fecha_puesta    =  columnas[0].textContent ;
            tipo_huevo      =  columnas[1].textContent ;

            ccha_lib        = parseInt(columnas[2].textContent);
            ccha_cant_lib   = parseInt(columnas[3].textContent);    
            ccha_acep       = parseInt(columnas[4].textContent);    
            ccha_cant_acep  = parseInt(columnas[5].textContent);
            ccha_invo       = parseInt(columnas[6].textContent);    
            ccha_cant_invo  = parseInt(columnas[7].textContent);    
            ccha_ldo        = parseInt(columnas[8].textContent);
            ccha_cant_ldo   = parseInt(columnas[9].textContent);    

            cchb_lib        = parseInt(columnas[10].textContent);   
            cchb_cant_lib   = parseInt(columnas[11].textContent);
            cchb_acep       = parseInt(columnas[12].textContent);   
            cchb_cant_acep  = parseInt(columnas[13].textContent);
            cchb_invo       = parseInt(columnas[14].textContent);   
            cchb_cant_invo  = parseInt(columnas[15].textContent);   
            cchb_ldo        = parseInt(columnas[16].textContent);
            cchb_cant_ldo   = parseInt(columnas[17].textContent);   

            cchh_lib        = parseInt(columnas[18].textContent);
            cchh_cant_lib   = parseInt(columnas[19].textContent);   
            cchh_acep       = parseInt(columnas[20].textContent);
            cchh_cant_acep  = parseInt(columnas[21].textContent);   
            cchh_invo       = parseInt(columnas[22].textContent);
            cchh_cant_invo  = parseInt(columnas[23].textContent);   
            cchh_ldo        = parseInt(columnas[24].textContent);
            cchh_cant_ldo   = parseInt(columnas[25].textContent);   

            ovo_lib        = parseInt(columnas[26].textContent);
            ovo_cant_lib   = parseInt(columnas[27].textContent);    
            ovo_acep       = parseInt(columnas[28].textContent);
            ovo_cant_acep  = parseInt(columnas[29].textContent);    
            ovo_invo       = parseInt(columnas[30].textContent);
            ovo_cant_invo  = parseInt(columnas[31].textContent);    

                 switch (tipo_huevo.trim()) {
                    case "A":
                            tipoA=parseInt(tipoA)+
                              parseInt(ccha_cant_lib)+parseInt(ccha_cant_acep)+
                              parseInt(ccha_cant_invo)+parseInt(ccha_cant_ldo)+
                              parseInt(cchb_cant_lib)+parseInt(cchb_cant_acep)+
                              parseInt(cchb_cant_invo)+parseInt(cchb_cant_ldo)+ 
                              parseInt(cchh_cant_lib)+parseInt(cchh_cant_acep)+
                              parseInt(cchh_cant_invo)+parseInt(cchh_cant_ldo)+ 
                              parseInt(ovo_cant_lib)+parseInt(ovo_cant_acep)+
                              parseInt(ovo_cant_invo);
                      break;
                    case "B":
                      tipoB=parseInt(tipoB)+
                              parseInt(ccha_cant_lib)+parseInt(ccha_cant_acep)+
                              parseInt(ccha_cant_invo)+parseInt(ccha_cant_ldo)+
                              parseInt(cchb_cant_lib)+parseInt(cchb_cant_acep)+
                              parseInt(cchb_cant_invo)+parseInt(cchb_cant_ldo)+ 
                              parseInt(cchh_cant_lib)+parseInt(cchh_cant_acep)+
                              parseInt(cchh_cant_invo)+parseInt(cchh_cant_ldo)+ 
                              parseInt(ovo_cant_lib)+parseInt(ovo_cant_acep)+
                              parseInt(ovo_cant_invo);
                      break;
                     case "C":
                      tipoC=parseInt(tipoC)+
                              parseInt(ccha_cant_lib)+parseInt(ccha_cant_acep)+
                              parseInt(ccha_cant_invo)+parseInt(ccha_cant_ldo)+
                              parseInt(cchb_cant_lib)+parseInt(cchb_cant_acep)+
                              parseInt(cchb_cant_invo)+parseInt(cchb_cant_ldo)+ 
                              parseInt(cchh_cant_lib)+parseInt(cchh_cant_acep)+
                              parseInt(cchh_cant_invo)+parseInt(cchh_cant_ldo)+ 
                              parseInt(ovo_cant_lib)+parseInt(ovo_cant_acep)+
                              parseInt(ovo_cant_invo);
                      break;
                        case "D":
                     tipoD=parseInt(tipoD)+
                              parseInt(ccha_cant_lib)+parseInt(ccha_cant_acep)+
                              parseInt(ccha_cant_invo)+parseInt(ccha_cant_ldo)+
                              parseInt(cchb_cant_lib)+parseInt(cchb_cant_acep)+
                              parseInt(cchb_cant_invo)+parseInt(cchb_cant_ldo)+ 
                              parseInt(cchh_cant_lib)+parseInt(cchh_cant_acep)+
                              parseInt(cchh_cant_invo)+parseInt(cchh_cant_ldo)+ 
                              parseInt(ovo_cant_lib)+parseInt(ovo_cant_acep)+
                              parseInt(ovo_cant_invo);
                      break;
                    case "S":
                      tipoS=parseInt(tipoS)+
                              parseInt(ccha_cant_lib)+parseInt(ccha_cant_acep)+
                              parseInt(ccha_cant_invo)+parseInt(ccha_cant_ldo)+
                              parseInt(cchb_cant_lib)+parseInt(cchb_cant_acep)+
                              parseInt(cchb_cant_invo)+parseInt(cchb_cant_ldo)+ 
                              parseInt(cchh_cant_lib)+parseInt(cchh_cant_acep)+
                              parseInt(cchh_cant_invo)+parseInt(cchh_cant_ldo)+ 
                              parseInt(ovo_cant_lib)+parseInt(ovo_cant_acep)+
                              parseInt(ovo_cant_invo);
                      break;
                     case "J":
                      tipoJ=parseInt(tipoJ)+
                              parseInt(ccha_cant_lib)+parseInt(ccha_cant_acep)+
                              parseInt(ccha_cant_invo)+parseInt(ccha_cant_ldo)+
                              parseInt(cchb_cant_lib)+parseInt(cchb_cant_acep)+
                              parseInt(cchb_cant_invo)+parseInt(cchb_cant_ldo)+ 
                              parseInt(cchh_cant_lib)+parseInt(cchh_cant_acep)+
                              parseInt(cchh_cant_invo)+parseInt(cchh_cant_ldo)+ 
                              parseInt(ovo_cant_lib)+parseInt(ovo_cant_acep)+
                              parseInt(ovo_cant_invo);
                      break;
                   
                  }
             
            if(ccha_cant_lib>0&&ccha_cant_lib<=ccha_lib){
                columnas[3].style.backgroundColor = 'blue';
             }
            else if (ccha_lib>0 &&ccha_cant_lib==0){
                columnas[3].style.backgroundColor = 'black'; 
                }
            else if (ccha_lib<ccha_cant_lib ){
                columnas[3].style.backgroundColor = 'red'; 
                }    

            if(ccha_cant_acep>0&&ccha_cant_acep<=ccha_acep){
                columnas[5].style.backgroundColor = 'blue';
             }
            else if (ccha_acep>0 &&ccha_cant_acep==0){
                columnas[5].style.backgroundColor = 'black'; 
                }
            else if (ccha_acep<ccha_cant_acep ){
                columnas[5].style.backgroundColor = 'red'; 
                }      

            if(ccha_cant_invo>0&&ccha_cant_invo<=ccha_invo){
                columnas[7].style.backgroundColor = 'blue';
             }
            else if (ccha_invo>0 &&ccha_cant_invo==0){
                columnas[7].style.backgroundColor = 'black'; 
                }
            else if (ccha_invo<ccha_cant_invo ){
                columnas[7].style.backgroundColor = 'red'; 
                }     

            if(ccha_cant_ldo>0&&ccha_cant_ldo<=ccha_ldo){
                columnas[9].style.backgroundColor = 'blue';
             }
            else if (ccha_ldo>0 &&ccha_cant_ldo==0){
                columnas[9].style.backgroundColor = 'black'; 
                } 
            else if (ccha_ldo<ccha_cant_ldo ){
                columnas[9].style.backgroundColor = 'red'; 
                }  
        /////////////////////////////////////          
            if(cchb_cant_lib>0&&cchb_cant_lib<=cchb_lib){
                columnas[11].style.backgroundColor = 'blue';
             }
            else if (cchb_lib>0 &&cchb_cant_lib==0){
                columnas[11].style.backgroundColor = 'black'; 
                }
            else if (cchb_lib<cchb_cant_lib ){
                columnas[11].style.backgroundColor = 'red'; 
                }      

            if(cchb_cant_acep>0&&cchb_cant_acep<=cchb_acep){
                columnas[13].style.backgroundColor = 'blue';
             }
            else if (cchb_acep>0 &&cchb_cant_acep==0){
                columnas[13].style.backgroundColor = 'black'; 
                }
            else if (cchb_acep<cchb_cant_acep ){
                columnas[13].style.backgroundColor = 'red'; 
                } 
            if(cchb_cant_invo>0&&cchb_cant_invo<=cchb_invo){
                columnas[15].style.backgroundColor = 'blue';
             }
            else if (cchb_invo>0 &&cchb_cant_invo==0){
                columnas[15].style.backgroundColor = 'black'; 
                }
            else if (cchb_invo<cchb_cant_invo ){
                columnas[15].style.backgroundColor = 'red'; 
                }     

            if(cchb_cant_ldo>0&&cchb_cant_ldo<=cchb_ldo){
                columnas[17].style.backgroundColor = 'blue';
             }
            else if (cchb_ldo>0 &&cchb_cant_ldo==0){
                columnas[17].style.backgroundColor = 'black'; 
                }        
            else if (cchb_ldo<cchb_cant_ldo ){
                columnas[17].style.backgroundColor = 'red'; 
                }     
            //////////////////////

            if(cchh_cant_lib>0&&cchh_cant_lib<=cchh_lib){
                columnas[19].style.backgroundColor = 'blue';
             }
            else if (cchh_lib>0 &&cchh_cant_lib==0){
                columnas[19].style.backgroundColor = 'black'; 
                }
            else if (cchh_lib<cchh_cant_lib ){
                columnas[19].style.backgroundColor = 'red'; 
                }   
            if(cchh_cant_acep>0&&cchh_cant_acep<=cchh_acep){
                columnas[21].style.backgroundColor = 'blue';
             }
            else if (cchh_acep>0 &&cchh_cant_acep==0){
                columnas[21].style.backgroundColor = 'black'; 
                }
            else if (cchh_acep<cchh_cant_acep ){
                columnas[21].style.backgroundColor = 'red'; 
                }
            if(cchh_cant_invo>0&&cchh_cant_invo<=cchh_invo){
                columnas[23].style.backgroundColor = 'blue';
             }
            else if (cchh_invo>0 &&cchh_cant_invo==0){
                columnas[23].style.backgroundColor = 'black'; 
                }
            else if (cchh_invo<cchh_cant_invo ){
                columnas[23].style.backgroundColor = 'red'; 
                }    

            if(cchh_cant_ldo>0&&cchh_cant_ldo<=cchh_ldo){
                columnas[25].style.backgroundColor = 'blue';
             }
            else if (cchh_ldo>0 &&cchh_cant_ldo==0){
                columnas[25].style.backgroundColor = 'black'; 
                }  
            else if (cchh_ldo<cchh_cant_ldo ){
                columnas[25].style.backgroundColor = 'red'; 
                } 
     ///////////////////////////////////////       
            if(ovo_cant_lib>0&&ovo_cant_lib<=ovo_lib){
                columnas[27].style.backgroundColor = 'blue';
             }
            else if (ovo_lib>0 &&ovo_cant_lib==0){
                columnas[27].style.backgroundColor = 'black'; 
                }
            else if (ovo_lib<ovo_cant_lib ){
                columnas[27].style.backgroundColor = 'red'; 
                } 

            if(ovo_cant_acep>0&&ovo_cant_acep<=ovo_acep){
                columnas[29].style.backgroundColor = 'blue';
             }
            else if (ovo_acep>0 &&ovo_cant_acep==0){
                columnas[29].style.backgroundColor = 'black'; 
                }
            else if (ovo_acep<ovo_cant_acep ){
                columnas[29].style.backgroundColor = 'red'; 
                } 

            if(ovo_cant_invo>0&&ovo_cant_invo<=ovo_invo){
                columnas[31].style.backgroundColor = 'blue';
             }
            else if (ovo_invo>0 &&ovo_cant_invo==0){
                columnas[31].style.backgroundColor = 'black'; 
                }
            else if (ovo_invo<ovo_cant_invo ){
                columnas[31].style.backgroundColor = 'red'; 
                }
            if(tipo=="2")
            {
                if(ccha_lib<ccha_cant_lib)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(ccha_acep<ccha_cant_acep)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(ccha_invo<ccha_cant_invo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(ccha_ldo<ccha_cant_ldo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchb_lib<cchb_cant_lib)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchb_acep<cchb_cant_acep)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchb_invo<cchb_cant_invo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchb_ldo<cchb_cant_ldo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }  
                else if(cchh_lib<cchh_cant_lib)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchh_acep<cchh_cant_acep)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchh_invo<cchh_cant_invo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(cchh_ldo<cchh_cant_ldo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(ovo_lib<ovo_cant_lib)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(ovo_acep<ovo_cant_acep)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }
                else if(ovo_invo<ovo_cant_invo)
                {
                    verificar_excedido_td=verificar_excedido_td*0;      
                }

            ///HACER MULTIPLICAR POR CERO, Y DESPUES FUERA DEL EACH, HACER UNA COMPARACION GLOBAL NOMAS YA.
            }

            cantidad_total=cantidad_total+ccha_cant_lib+ccha_cant_acep+ccha_cant_invo+ccha_cant_ldo+cchb_cant_lib+
            cchb_cant_acep+cchb_cant_invo+cchb_cant_ldo+cchh_cant_lib+cchh_cant_acep+cchh_cant_invo+cchh_cant_ldo+
            ovo_cant_lib+ovo_cant_acep+ovo_cant_invo;
            cantidad_total_ccha=cantidad_total_ccha+ccha_cant_lib+ccha_cant_acep+ccha_cant_invo+ccha_cant_ldo;
            cantidad_total_cchb=cantidad_total_cchb+cchb_cant_lib+cchb_cant_acep+cchb_cant_invo+cchb_cant_ldo;
            cantidad_total_cchh=cantidad_total_cchh+cchh_cant_lib+cchh_cant_acep+cchh_cant_invo+cchh_cant_ldo;
            cantidad_total_ovo=cantidad_total_ovo+ovo_cant_lib+ovo_cant_acep+ovo_cant_invo ;

                if(ccha_cant_lib>0)
                {
                    if(ccha_cant_lib>ccha_lib){
                        cantidad_excedida++;
                    }//FECHAPUESTA_TIPOHUEVO_CLASIFICADORA_TIPOLOTE_CANTIDAD_CARRITO_UMEDIDA
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHA&LIB&' + ccha_cant_lib+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++; 
                }
                if(ccha_cant_acep>0)
                {
                    if(ccha_cant_acep>ccha_acep){
                        cantidad_excedida++;
                    }
                              
                    
                    
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHA&ACEP&' + ccha_cant_acep+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr  ;
                    }
                    c++;
                }
                if(ccha_cant_invo>0)
                {
                    if(ccha_cant_invo>ccha_invo)
                    {
                        cantidad_excedida++;
                    }            
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHA&INVO&' + ccha_cant_invo+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }
                if(ccha_cant_ldo>0)
                {
                    if(ccha_cant_ldo>ccha_ldo)
                    {
                        cantidad_excedida++;
                    }   
                    arr= fecha_puesta+'&'+tipo_huevo+'&CCHA&LDO&' + ccha_cant_ldo+"&0&ENTERO&LDO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }

                if(cchb_cant_lib>0)
                {
                    if(cchb_cant_lib>cchb_lib)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHB&LIB&' + cchb_cant_lib+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }
                if(cchb_cant_acep>0)
                {
                    if(cchb_cant_acep>cchb_acep)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHB&ACEP&' + cchb_cant_acep+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr  ;
                    }
                    c++;
                }
                if(cchb_cant_invo>0)
                {
                    if(cchb_cant_invo>cchb_invo)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHB&INVO&' + cchb_cant_invo+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {   
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                        c++;
                }
                if(cchb_cant_ldo>0)
                {
                    if(cchb_cant_ldo>cchb_ldo)
                    {
                        cantidad_excedida++;
                    }
                    arr= fecha_puesta+'&'+tipo_huevo+'&CCHB&LDO&' + cchb_cant_ldo+"&0&ENTERO&LDO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }

                if(cchh_cant_lib>0)
                {
                    if(cchh_cant_lib>cchh_lib)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHH&LIB&' + cchh_cant_lib+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }
                if(cchh_cant_acep>0)
                {
                    if(cchh_cant_acep>cchh_acep)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHH&ACEP&' + cchh_cant_acep+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr  ;
                    }
                    c++;
                }
                if(cchh_cant_invo>0)
                {
                    if(cchh_cant_invo>cchh_invo)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&CCHH&INVO&' + cchh_cant_invo+"&0&ENTERO&FCO";
                    if (c == 0) 
                    {   
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                        c++;            
                }
                if(cchh_cant_ldo>0)
                {
                    if(cchh_cant_ldo>cchh_ldo)
                    {
                        cantidad_excedida++;
                    }
                    arr= fecha_puesta+'&'+tipo_huevo+'&CCHH&LDO&' + cchh_cant_ldo+"&0&ENTERO&LDO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }

                if(ovo_cant_lib>0)
                {
                    if(ovo_cant_lib>ovo_lib)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&OVO&LIB&' + ovo_cant_lib+"&0&ENTERO&LDO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                    c++;
                }
                if(ovo_cant_acep>0)
                {
                    if(ovo_cant_acep>ovo_acep)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&OVO&ACEP&' + ovo_cant_acep+"&0&ENTERO&LDO";
                    if (c == 0) 
                    {
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr  ;
                    }
                    c++;
                }
                if(ovo_cant_invo>0)
                {
                    if(ovo_cant_invo>ovo_invo)
                    {
                        cantidad_excedida++;
                    }
                    arr=fecha_puesta+'&'+tipo_huevo+'&OVO&INVO&' + ovo_cant_invo+"&0&ENTERO&LDO";
                    if (c == 0) 
                    {   
                        valores = arr;
                    }
                    else 
                    {
                        valores = valores + ',' + arr;
                    }
                        c++;
                        
                    
                }
        });

        $('#txt_cargados').val(parseInt(cantidad_total)+parseInt(contador_mixto_pedido_log_ccha)+parseInt(contador_mixto_pedido_log_cchb)+parseInt(contador_mixto_pedido_log_cchh)+parseInt(contador_mixto_pedido_log_lavado));
        calculo_mixto_enteros_pedidos();//AQUI SE REALIZA LA SUMA DE TODOS LOS SELECCIONADOS
        sumar_tipos_huevos(tipoA,tipoB,tipoC,tipoD,tipoS,tipoJ);
         
        
        
        if(tipo=='2') //TIPO 2 ES PARA REALIZAR EL REGISTRO.
        {
            if(verificar_excedido_td==0){
                aviso_generico(2,"cantidad no puede se mayor a la disponible")
            }
            else
            {
                if(parseInt($('#txt_disponibilidad').val())<cantidad_total)
                {
                    aviso_generico(2,"CANTIDAD SUPERADA");
                }
                else if( cantidad_total==0)
                {
                     aviso_generico(2,"DEBE INGRESAR CARROS")
                } 
                
                else if(    parseInt($('#txt_tipo_a').val())!=parseInt($('#txt_tipo_ac').val())||parseInt($('#txt_tipo_b').val())!=parseInt($('#txt_tipo_bc').val())
                        ||  parseInt($('#txt_tipo_c').val())!=parseInt($('#txt_tipo_cc').val())||parseInt($('#txt_tipo_d').val())!=parseInt($('#txt_tipo_dc').val())
                        ||  parseInt($('#txt_tipo_s').val())!=parseInt($('#txt_tipo_sc').val())||parseInt($('#txt_tipo_j').val())!=parseInt($('#txt_tipo_jc').val())
                        ||parseInt($('#txt_tipo_mixto').val())!=parseInt($('#txt_tipo_mixtoc').val()))
                {
                     aviso_generico(2,"CANTIDADES DE TIPOS DE HUEVOS NO COINCIDEN CON LO SOLICITADO");
                }
                
                else if(parseInt($('#txt_disponibilidad').val())==0  )
                {
                     aviso_generico(2,"DEBE SELECCIONAR EL CAMION")
                   
                }  
                else if($('#cbox_chofer').val()=="-"  )
                {
                     aviso_generico(2,"DEBE SELECCIONAR EL CHOFER")
                }  
                else if(parseInt($('#txt_disponibilidad').val())>parseInt($('#txt_cargados').val())) 
                {
                      aviso_generico(2,"DEBE COMPLETAR LA CAPACIDAD DEL CAMION")
                } 
                else 
                {
                    var arr=$('#cbox_camion').val().split("_");
                    var codigo_camion=arr[1];
                    
                    if(generacion_pedido=='EDITAR')
                    {
                        registrar_pedido(codigo_camion,$('#txt_disponibilidad').val(),valores,'DESEA MODIFICAR EL PEDIDO?','control_editar_pedido.jsp');
                    }
                    else
                    {
                        registrar_pedido(codigo_camion,$('#txt_disponibilidad').val(),valores,'DESEA GENERAR EL PEDIDO?','control_crear_pedido.jsp');
                    }
                } 
            }
        }
       
    }
    
    function separar_codigo_camion()
    {
        var arr=$('#cbox_camion').val().split("_");
        var cantidad_camion=arr[0];
        
        $('#txt_disponibilidad').val(cantidad_camion);
    }
    
    function celda_editable_selectElement(el)
    {
        var range=document.createRange();
        range.selectNodeContents(el);
        var sel=window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
   
    function aviso_generico(tipo,mensaje,formulario,celdas)
    {
       if(tipo=="1"){
        swal.fire({
                type: 'success',
                text:mensaje,
                confirmButtonText: "CERRAR"
                });
                
                if(formulario=='PEDIDOS'){
                    ir_menu_principal();
                }
                else if (formulario=='ANULAR')
                {
                    ir_pagina('contenedor_pedidos_generados_menu.jsp');                
                }
                else if (formulario=='FACTURA')
                {
                    ir_pagina('contenedor_pedidos_facturar.jsp');                
                }
       }
       else {
           swal.fire({
                type: 'error',
                html:mensaje,
                confirmButtonText: "CERRAR"
                });  
               
            if(formulario=='PEDIDOS'){
                actualizar_celdas(celdas);
            }
            else if(formulario=='EDITAR'){
                actualizar_celdas(celdas);
            }

          
       }
       
       
        
   }  
   
    function seleccionar_mixtos(cod_carrito)
    {
        if($("#"+cod_carrito).html()=="SELECCIONE")
        {
            $("#"+cod_carrito).removeClass('btn-dark ').addClass(' btn-primary  bg1 ')
            $("#"+cod_carrito).html("SELECCIONADO");
        }
        else 
        {
            $("#"+cod_carrito).removeClass(' btn-primary bg1').addClass('btn-dark ')
            $("#"+cod_carrito).html("SELECCIONE");
        }
        
        contar_mixtos_seleccionados();
        
        var mixto_cargado=$('#txt_tipo_mixtoc').val();
        var mixto_ingresado=$('#txt_tipo_mixto').val();
        if(parseInt(mixto_cargado)>parseInt(mixto_ingresado))
        {
            document.getElementById('txt_tipo_mixtoc').style.backgroundColor = 'red';        
        }
        else if(parseInt(mixto_cargado)==parseInt(mixto_ingresado)){
            document.getElementById('txt_tipo_mixtoc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_mixtoc').style.backgroundColor = 'green';        
        }
    }
   
    function contar_mixtos_seleccionados()
    {
        contador_mixto_pedido_log=0;
        var filas_pre = document.querySelectorAll("#tb_preembarque_mixto tbody tr");
        var verificar_excedido_td=1;
        var carro="";
        var boton="";
        var area="";
        var contenido_mixto="";
        array_mixto_pedidos="";
        var cantidad=0;
        contador_mixto_pedido_log_ccha=0;
        contador_mixto_pedido_log_cchb=0;
        contador_mixto_pedido_log_cchh=0;
        contador_mixto_pedido_log_lavado=0;
       
        
        filas_pre.forEach(function (e) 
        {
          var columnas_pre = e.querySelectorAll("td"); 
           carro   =  columnas_pre[0].textContent;
           area   =  columnas_pre[1].textContent;
           puesta   =  columnas_pre[2].textContent;
           boton   =  columnas_pre[4].textContent;
          
           if(boton.length==15)//ES SELECCIONADO
            {
                cantidad++;
                
                if(cantidad==1)
                {
                    array_mixto_pedidos= puesta+"&-&"+area+"&LIB&0&"+carro+"&MIXTO&FCO";
                }
                else 
                {
                    array_mixto_pedidos=array_mixto_pedidos+","+puesta+"&-&"+area+"&LIB&0&"+carro+"&MIXTO&FCO";
                }
               contador_mixto_pedido_log++;
               
        //       FECHAPUESTA_TIPOHUEVO_CLASIFICADORA_TIPOLOTE_CANTIDAD_CARRITO_UMEDIDA
                if(area=="CCHA"){
                 contador_mixto_pedido_log_ccha++;  
               }
                else if(area=="CCHB"){
                 contador_mixto_pedido_log_cchb++;  
               }
                else if(area=="CCHH"){
                 contador_mixto_pedido_log_cchh++;  
               }
               else {
                 contador_mixto_pedido_log_lavado++;  
               }
               
               
            }  
         });
         
        
        calculo_mixto_enteros_pedidos();
        
    }
   
    function calculo_mixto_enteros_pedidos()
    {
        $('#td_ccha').html('CCHA  TOTAL CARGADOS:'+(parseInt(contador_mixto_pedido_log_ccha)+ parseInt(cantidad_total_ccha)));
        $('#td_cchb').html('CCHB  TOTAL CARGADOS:'+(parseInt(contador_mixto_pedido_log_cchb)+ parseInt(cantidad_total_cchb)));
        $('#td_cchh').html('CCHH  TOTAL CARGADOS:'+(parseInt(contador_mixto_pedido_log_cchh)+ parseInt(cantidad_total_cchh)));
        $('#td_ovo').html('LAVADOS  TOTAL CARGADOS:'+(parseInt(contador_mixto_pedido_log_lavado)+ parseInt(cantidad_total_ovo)));
        $('#txt_cargados').val(parseInt(cantidad_total)+parseInt(contador_mixto_pedido_log_ccha)+parseInt(contador_mixto_pedido_log_cchb)+parseInt(contador_mixto_pedido_log_cchh)+parseInt(contador_mixto_pedido_log_lavado));
        
        var total_mixto_entero=parseInt(cantidad_total)+parseInt(contador_mixto_pedido_log_ccha)+parseInt(contador_mixto_pedido_log_cchb)+parseInt(contador_mixto_pedido_log_cchh)+parseInt(contador_mixto_pedido_log_lavado);
       
         $('#txt_tipo_mixtoc').val(parseInt(contador_mixto_pedido_log_ccha)+parseInt(contador_mixto_pedido_log_cchb)+parseInt(contador_mixto_pedido_log_cchh)+parseInt(contador_mixto_pedido_log_lavado));//TEXTO DEL INGRESADOR DE CANTIDADES TOTALES
        if(parseInt($('#txt_disponibilidad').val())<total_mixto_entero)
        {
            $('#txt_cargados').css('background-color', 'red');
        }
        else if(parseInt($('#txt_disponibilidad').val())==total_mixto_entero)
        {
            $('#txt_cargados').css('background-color', 'yellow');
        }
        else 
        {
            $('#txt_cargados').css('background-color', 'green');
        } 
   }
   
    function calculo_mixto_enteros_pedidos_cyo(area)
    {
        $('#td_ccha').html(area+' TOTAL CARGADOS:'+(parseInt(contador_mixto_pedido_log_ccha)+ parseInt(cantidad_total_ccha)));
       
        $('#txt_cargados').val(parseInt(cantidad_total)+parseInt(contador_mixto_pedido_log_ccha));
        
        var total_mixto_entero=parseInt(cantidad_total)+parseInt(contador_mixto_pedido_log_ccha)+parseInt(contador_mixto_pedido_log_cchb)+parseInt(contador_mixto_pedido_log_cchh)+parseInt(contador_mixto_pedido_log_lavado);
       
        if(parseInt($('#txt_disponibilidad').val())<total_mixto_entero)
        {
            $('#txt_cargados').css('background-color', 'red');
        }
        else if(parseInt($('#txt_disponibilidad').val())==total_mixto_entero)
        {
            $('#txt_cargados').css('background-color', 'yellow');
        }
        else 
        {
            $('#txt_cargados').css('background-color', 'green');
        } 
   }
   
   
    function registrar_pedido(id_camion,cantidad_total,contenido,mensaje,pagina)
    {
        var contenido_mixto="";
        if(array_mixto_pedidos.length>0)
        {
            contenido_mixto=","+array_mixto_pedidos;
        }
        
        Swal.fire({
    
        title: 'CONFIRMACION',
        text: mensaje,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI!',
        cancelButtonText: 'NO!' }).then((result) => 
        {
            if (result.value) 
            {
                $.ajax({
                type: "POST",
                url: cruds+pagina,
                data: ({id_camion:id_camion,cantidad_total:cantidad_total,contenido:contenido+contenido_mixto,id_pedido:$('#id_pedido').val(),id_chofer:$('#cbox_chofer').val(),obs:$('#txt_obs').val()}),
                beforeSend: function() 
                {
                    Swal.fire({
                    title: 'PROCESANDO!',
                    html: 'ESPERE<strong></strong>...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft()
                        }, 1000);
                    } 
                    });
                },           
                success: function (res) 
                {
                    aviso_generico(res.tipo_respuesta,res.mensaje,'PEDIDOS',res.carros_excedentes);
                }
                });
               
                
            }
        });  
    }
   
    function registrar_pedido_cyo(contenido,area)
    {
        var contenido_mixto="";
        if(array_mixto_pedidos.length>0)
        {
            contenido_mixto=","+array_mixto_pedidos;
        }
        
        Swal.fire({
    
        title: 'CONFIRMACION',
        text: 'DESEA MODIFICAR EL PEDIDO?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI!',
        cancelButtonText: 'NO!' }).then((result) => 
        {
            if (result.value) 
            {
                $.ajax({
                type: "POST",
                url: cruds+"control_editar_pedido_cyo.jsp",
                data: ({contenido:contenido,id_pedido:$('#id_pedido').val(),area:area}),
                beforeSend: function() 
                {
                    Swal.fire({
                    title: 'PROCESANDO!',
                    html: 'ESPERE<strong></strong>...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft()
                        }, 1000);
                    } 
                    });
                },           
                success: function (res) 
                {
                    aviso_generico(res.tipo_respuesta,res.mensaje,'PEDIDOS');
                }
                });
               
                
            }
        });  
    }
    function anular_pedido(id)
    {
        Swal.fire({
        title: 'CONFIRMACION',
        text: "DESEA ANULAR EL PEDIDO?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI!',
        cancelButtonText: 'NO!' }).then((result) => 
        {
            if (result.value) 
            {
                $.ajax({
                type: "POST",
                url: cruds+'control_anular_pedido.jsp',
                data: ({id:id}),
                beforeSend: function() 
                {
                    Swal.fire({
                    title: 'PROCESANDO!',
                    html: 'ESPERE<strong></strong>...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft()
                        }, 1000);
                    } 
                    });
                },           
            success: function (res) 
            {
                    aviso_generico(res.tipo_respuesta,res.mensaje,'ANULAR')
               
            }
                });
               
                
            }
            });   
    }
    
    function reset_cero_variables()
    {
        contador_mixto_pedido_log_ccha=0;
                contador_mixto_pedido_log_cchb=0;
                contador_mixto_pedido_log_cchh=0;
                contador_mixto_pedido_log_lavado=0;
                array_mixto_pedidos="";
                cantidad_total_ccha=0;
                cantidad_total_cchb=0;
                cantidad_total_cchh=0;
                cantidad_total_ovo=0;
                cantidad_total=0;  
    }
    
    function registrar_factura(id)
    {
        var html;
        html = "   <form id='form_cuadro_facturas'>   \n\
                        <div id='combo' class='form - group'> <a></a>\n\
                            <select  name = 'cbox_factura' id='cbox_factura' class='form - control'    required>\n\
                            </select ><br><br>\n\
                        </div > \n\
                         <br><br><br><input type='submit' style='font-weight:bold'  value='REGISTRAR' class='form-control bg-success btn color_letra' >  \n\
                    </form> ";
        Swal.fire({
        title: 'Registrar factura al pedido',
       // text: "",
        type: 'warning',
        html: html,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCancelButton: false,
        showConfirmButton: false
        });

       $.get(ruta_consultas + 'consulta_option_facturas.jsp',function (res) 
        {
            $("#cbox_factura").html(res.mensaje);
            $('#form_cuadro_facturas').on('submit', function (e) 
            { 
                e.preventDefault(); 
                    $.ajax({
                    type: "POST",
                    url: cruds+'control_confirmar_factura.jsp',
                    data:$("#form_cuadro_facturas").serialize()+"&id="+id,  
                    beforeSend: function() 
                    {
                        Swal.fire({
                        title: 'PROCESANDO!',
                        html: 'ESPERE<strong></strong>...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft()
                            }, 1000);
                        } 
                        });
                    },           
                    success: function (res) 
                    {
                        aviso_generico(res.tipo_respuesta,res.mensaje,'FACTURA');
                    }
                    });
                e.stopPropagation();
            }); 
        });   
    }
    
    function actualizar_celdas(celdas){
    var split_celdas=celdas.split("&");
    var split_valores="";
    for(i = 0; i < split_celdas.length; i++)
        {
            split_valores= split_celdas[i].split(",");
            for(c = 0; c < split_valores.length; c++)
            {
                $('.'+split_valores[0].trim()).html(split_valores[1]);     
            }
        }
        obtener_valores_celda('1');

  }
  
    function cargar_cantidades(){
      
        $.ajax({
                    type: "POST",
                    url: ruta_consultas+'test_carga.jsp',
                    data:({
                        
                        A:$('#txt_tipo_a').val(),B:$('#txt_tipo_b').val(),C:$('#txt_tipo_c').val(),D:$('#txt_tipo_d').val(),S:$('#txt_tipo_s').val(),J:$('#txt_tipo_j').val(),
                        AC:$('#txt_tipo_ac').val(),BC:$('#txt_tipo_bc').val(),CC:$('#txt_tipo_cc').val(),DC:$('#txt_tipo_dc').val(),SC:$('#txt_tipo_sc').val(),JC:$('#txt_tipo_jc').val()
                    
          }),  
                    beforeSend: function() 
                    { 
                    },           
                    success: function (res) 
                    {
                       $('#txt_tipo_a').val(res.A);
                       $('#txt_tipo_b').val(res.B);
                       $('#txt_tipo_c').val(res.C);
                       $('#txt_tipo_d').val(res.D);
                       $('#txt_tipo_s').val(res.S);
                       $('#txt_tipo_j').val(res.J);
                       
                        $('#txt_tipo_ac').val(res.AC);
                       $('#txt_tipo_bc').val(res.BC);
                       $('#txt_tipo_cc').val(res.CC);
                       $('#txt_tipo_dc').val(res.DC);
                       $('#txt_tipo_sc').val(res.SC);
                       $('#txt_tipo_jc').val(res.JC);
                       
                    }
                    });
  }
  
    function consultar_cantidades(){
      
        $.ajax({
                    type: "POST",
                    url: ruta_consultas+'test.jsp',
                 //  data:({A:$('#txt_tipo_a').val(),B:$('#txt_tipo_b').val(),C:$('#txt_tipo_c').val(),D:$('#txt_tipo_d').val(),S:$('#txt_tipo_s').val(),J:$('#txt_tipo_j').val()}),  
                    beforeSend: function() 
                    { 
                    },           
                    success: function (res) 
                    {
                        $('#txt_tipo_a').val(res.A);
                        $('#txt_tipo_b').val(res.B);
                        $('#txt_tipo_c').val(res.C);
                        $('#txt_tipo_d').val(res.D);
                        $('#txt_tipo_s').val(res.S);
                        $('#txt_tipo_j').val(res.J);
                        
                        $('#txt_tipo_ac').val(res.AC);
                        $('#txt_tipo_bc').val(res.BC);
                        $('#txt_tipo_cc').val(res.CC);
                        $('#txt_tipo_dc').val(res.DC);
                        $('#txt_tipo_sc').val(res.SC);
                        $('#txt_tipo_jc').val(res.JC);
                    $('#txt_tipo_ac').bind('DOMSubtreeModified', function(){
  console.log('changed');
});    
                   
                    }   
                    });
  }
  
    function sumar_tipos_huevos(tipoA,tipoB,tipoC,tipoD,tipoS,tipoJ){
         
         $('#txt_tipo_ac').val(tipoA);
         $('#txt_tipo_bc').val(tipoB);
         $('#txt_tipo_cc').val(tipoC);
         $('#txt_tipo_dc').val(tipoD);
         $('#txt_tipo_sc').val(tipoS);
         $('#txt_tipo_jc').val(tipoJ);
          
        var A=  $('#txt_tipo_a').val();
        var B=  $('#txt_tipo_b').val();
        var C=  $('#txt_tipo_c').val();
        var D=  $('#txt_tipo_d').val();
        var S=  $('#txt_tipo_s').val();
        var J=  $('#txt_tipo_j').val();
        
            $('#txt_tipo_af').val((parseInt(A)-parseInt(tipoA)) );
            $('#txt_tipo_bf').val((parseInt(B)-parseInt(tipoB)));
            $('#txt_tipo_cf').val((parseInt(C)-parseInt(tipoC)));
            $('#txt_tipo_df').val((parseInt(D)-parseInt(tipoD)));
            $('#txt_tipo_sf').val((parseInt(S)-parseInt(tipoS)));
            $('#txt_tipo_jf').val((parseInt(J)-parseInt(tipoJ)));
        
        var ac=tipoA;
        var bc=tipoB;
        var cc=tipoC;
        var dc=tipoD;
        var sc=tipoS;
        var jc=tipoJ;
        
        if(parseInt(ac)> parseInt(A))
        {
            document.getElementById('txt_tipo_ac').style.backgroundColor = 'red';  
        }
        else if(parseInt(ac)==parseInt(A)){
            document.getElementById('txt_tipo_ac').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_ac').style.backgroundColor = 'green';        
        }
        if(parseInt(bc)>parseInt(B))
        {
            document.getElementById('txt_tipo_bc').style.backgroundColor = 'red';        
        }
        else if(parseInt(bc)==parseInt(B)){
            document.getElementById('txt_tipo_bc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_bc').style.backgroundColor = 'green';        
        }
        if(parseInt(cc)>parseInt(C))
        {
            document.getElementById('txt_tipo_cc').style.backgroundColor = 'red';        
        }
        else if(parseInt(cc)==parseInt(C)){
            document.getElementById('txt_tipo_cc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_cc').style.backgroundColor = 'green';        
        }
        if(parseInt(dc)>parseInt(D))
        {
            document.getElementById('txt_tipo_dc').style.backgroundColor = 'red';        
        }
        else if(parseInt(dc)==parseInt(D)){
            document.getElementById('txt_tipo_dc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_dc').style.backgroundColor = 'green';        
        }
        if(parseInt(sc)>parseInt(S))
        {
            document.getElementById('txt_tipo_sc').style.backgroundColor = 'red';        
        }
         else if(parseInt(sc)==parseInt(S)){
            document.getElementById('txt_tipo_sc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_sc').style.backgroundColor = 'green';        
        }
        if(parseInt(jc)>parseInt(J))
        {
            document.getElementById('txt_tipo_jc').style.backgroundColor = 'red';        
        }
        else if(parseInt(jc)==parseInt(J)){
            document.getElementById('txt_tipo_jc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_jc').style.backgroundColor = 'green';        
        }
        
        var mixto_cargado=$('#txt_tipo_mixtoc').val();
        var mixto_ingresado=$('#txt_tipo_mixto').val();
        if(parseInt(mixto_cargado)>parseInt(mixto_ingresado))
        {
            document.getElementById('txt_tipo_mixtoc').style.backgroundColor = 'red';        
        }
        else if(parseInt(mixto_cargado)==parseInt(mixto_ingresado)){
            document.getElementById('txt_tipo_mixtoc').style.backgroundColor = 'yellow';        
        }
        else
        {
            document.getElementById('txt_tipo_mixtoc').style.backgroundColor = 'green';        
        }
        
        
    }
    
    function seleccionar_todo_input()
    {
        $("input").blur(function() 
        {
            if ($(this).attr("data-selected-all")) 
            {
                $(this).removeAttr("data-selected-all");
            }
        });
    
        $("input").click(function() 
        {
            if (!$(this).attr("data-selected-all")) {
            try {
                    $(this).selectionStart = 0;
                      $(this).selectionEnd = $(this).value.length + 1;
                      //add atribute allowing normal selecting post focus
                      $(this).attr("data-selected-all", true);
                    } catch (err) {
                      $(this).select();
                      //add atribute allowing normal selecting post focus
                      $(this).attr("data-selected-all", true);
                    }
                  }
                });
                }  
                
    function cargar_cantidades_ingresadas_editar(tipo)
    {
        if(tipo==2)
        {
            $('#txt_tipo_a').val($('#txt_tipo_ac').val());
            $('#txt_tipo_b').val( $('#txt_tipo_bc').val());
            $('#txt_tipo_c').val($('#txt_tipo_cc').val());
            $('#txt_tipo_d').val($('#txt_tipo_dc').val());
            $('#txt_tipo_s').val($('#txt_tipo_sc').val());
            $('#txt_tipo_j').val($('#txt_tipo_jc').val());
            $('#txt_tipo_mixto').val($('#txt_tipo_mixtoc').val());
        }

    }
    
    
     

    function filtro_reporte(tipo){
        switch (tipo) 
        {
            case "7":
                $("#contenedor_fechas").show();
            break;
            case "1":
                $("#contenedor_fechas").hide();
            break;
            case "2":
                $("#contenedor_fechas").hide();
            break;
            case "5":
                $("#contenedor_fechas").show();
            break;
                 
        }
      
    }
    
    function buscar_reporte(){
        
        
         $.ajax({
                    type: "POST",
                    url: ruta_consultas+'generar_grilla_reportes.jsp',
                    data:({estado:$('#cbox_tipo').val(),fecha_desde:$('#desde').val(),fecha_hasta:$('#hasta').val()}),
                    beforeSend: function() 
                    {
                        $('body').loadingModal('show');
                        $('#div_grilla').html("");    
                    },           
                    success: function (res) 
                    {
                            $('#div_grilla').html(res.grilla);  
                            $('body').loadingModal('hide');
                    },
                    error: function (error) 
                    {
                        $('body').loadingModal('hide');
                    }
                }); 
        
    }