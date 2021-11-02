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
        
    $(document).ready(function()
    {
        $('body').loadingModal({text: 'Consultando...', 'animation': 'wanderingCubes'});
        ir_menu_principal();
        $('body').loadingModal('hide');
                       
    });
   
    function generar_grilla_pedido(tipo,codigo)
    {
        var pagina="";
        if(tipo==1){
            pagina="generar_grilla_preembarque.jsp";
        }
        else {
            pagina="generar_grilla_preembarque_editar_log.jsp?id="+codigo;
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
                $("#first").html(res.grilla  );
                $("#second").html(res.grilla_mixto);
                
                if(tipo==2)
                { //SI EL TIPO ES IGUAL A 2 ENTONCES YA ES UN PEDIDO GENERADO.
                    var arr=res.cod_camion.split("_");
                    var codigo_camion=arr[1];
                    var capacidad=arr[0];
                    $('#txt_disponibilidad').val(capacidad);
                    $("#"+res.cod_camion).attr({"selected": true});//SELECCIONA PARA PRIMERA OPCION

                    if(res.carros_mixtos.length>0)
                    {
                        var mySplitResult = res.carros_mixtos.split(",");
                        for(i = 0; i < mySplitResult.length; i++)
                        {
                            $("#"+mySplitResult[i]).removeClass('btn-dark ').addClass(' btn-primary  bg1 ')
                            $("#"+mySplitResult[i]).html("SELECCIONADO");
                        }
                        contar_mixtos_seleccionados();
                    }
                    $('#id_pedido').val(res.id_pedido);
                }
               
                $("td").focus(function(){
                    var range = document.createRange();
                    range.selectNodeContents(this);  
                    var sel = window.getSelection(); 
                    sel.removeAllRanges(); 
                    sel.addRange(range);
                    grilla_preembarque('1');
                });
                
                $(".single_line").keydown(function (e) 
                {
                    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||  ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) || (e.keyCode >= 35 && e.keyCode <= 40)) 
                    {
                        return;
                    }
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) 
                    {
                        e.preventDefault();
                    }
                });
                
                $('body').loadingModal('hide');
                $("#btn_atras").show();
                
                $("#ok").click(function() 
                {
                    grilla_preembarque('2');
                });
                    grilla_preembarque('1');
            },
            error: function (error) 
            {
                //$.get(ruta_consultas+'generar_grilla_preembarque.jsp', function(res){$("#contenido").html(res.grilla); });
                ir_pedido_generar();
            }
            
                });  
    }
    
    function grilla_preembarque(tipo,generacion_pedido)
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
        
        if(tipo=='2') //TIPO 2 ES PARA REALIZAR EL REGISTRO.
        {
            if(verificar_excedido_td==0){
                alert("cantidad no puede se mayor a la disponible")
            }
            else
            {
                if(parseInt($('#txt_disponibilidad').val())<cantidad_total)
                {
                    alert("CANTIDAD SUPERADA");
                }
                else if( cantidad_total==0)
                {
                    alert("DEBE INGRESAR CARROS");
                } 
                else if(parseInt($('#txt_disponibilidad').val())==0  )
                {
                    alert("DEBE SELECCIONAR EL CAMION");
                }  
                else if(parseInt($('#txt_disponibilidad').val())>parseInt($('#txt_cargados').val())) 
                {
                    alert("DEBE COMPLETAR LA CAPACIDAD DEL CAMION");
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
   
    function aviso_generico(tipo,mensaje,formulario)
    {
       if(tipo=="1"){
        swal.fire({
                type: 'success',
                text:mensaje,
                confirmButtonText: "CERRAR"
                });
                
                if(formulario=='PEDIDOS'){
                    ir_pedido(1);
                }
                else if (formulario=='ANULAR')
                {
                    ir_pagina('contenedor_pedidos_generados_menu.jsp');                
                }
                else if (formulario=='FACTURA')
                {
                    ir_pagina('contenedor_pedidos_generados.jsp');                
                }
       }
       else {
           swal.fire({
                type: 'error',
                html:mensaje,
                confirmButtonText: "CERRAR"
                });  
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
           // cantidad++;
          
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
                data: ({id_camion:id_camion,cantidad_total:cantidad_total,contenido:contenido+contenido_mixto,id_pedido:$('#id_pedido').val()}),
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
                         <br><br><br><input type='submit' value='REGISTRAR' class='form-control bg-success btn color_letra' >  \n\
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