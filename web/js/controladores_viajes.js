    function ir_pagina(pagina)
    {
            $.ajax({
                        type: "POST",
                        url: ruta_contenedores+pagina,
                        beforeSend: function() 
                        {
                            $('body').loadingModal('show');
                            $("#contenido_principal").html("");
                        },           
                        success: function (res) 
                        {
                            $("#contenido_modulos").html(res);
                            $('body').loadingModal('hide');
                        },
                        error: function (error) 
                        {
                         $('body').loadingModal('hide');
                         alert("HA OCURRIDO UN ERROR, INTENTE DE NUEVO.")
                        }
                });  
    }
      
    function ir_menu_principal()
    {
         $.ajax({
                    type: "POST",
                    url: ruta_contenedores+'contenedor_menu.jsp',
                    beforeSend: function() 
                    {
                        $('body').loadingModal('show');
                        $('#contenido_principal').html("");    
                    },           
                    success: function (res) 
                    {
                        $("#contenido_modulos").html("");
                        $('#contenido_principal').html(res);  
                        $('body').loadingModal('hide');
                    },
                    error: function (error) 
                    {
                        $('body').loadingModal('hide');
                    }
                });  
    }  
    

    function ir_pedido(tipo,codigo)
    {
        $.ajax({
                type: "POST",
                url: ruta_contenedores+'contenedor_pedidos.jsp',
            beforeSend: function() 
            {
                $("#contenido_principal").html("");
                reset_cero_variables();
            },           
            success: function (res) 
            {
                $("#contenido_modulos").html(res);
                generar_grilla_pedido(tipo,codigo);
            },
            error: function (error) 
            {
                if(tipo==1)
               {
                    ir_pedido(1);
               }
               else 
               {
                   
               }
            }
            
                });  
    }
    
    
    
     function calculo_cantidades_grilla_cyo(tipo,generacion_pedido,area)
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
            var tipo_a=0;    
            var tipo_b=0;    
            var tipo_c=0;    
            var tipo_d=0;    
            var tipo_j=0;    
            var tipo_s=0;    
            var tipo_g=0;  
        
        var c = 0;
        var valores = '';
        var cantidad_excedida=0;       
         cantidad_total=0;
         var incorrecto =0;
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
           
            
            var validacion_cantidades= $("#validacion_cantidades").val();
            if(ccha_cant_lib>0)
            {
               switch (tipo_huevo.trim()) {
                    case "A":
                      tipo_a=parseInt(tipo_a)+parseInt(ccha_cant_lib);
                      break;
                    case "B":
                      tipo_b=parseInt(tipo_b)+parseInt(ccha_cant_lib);
                      break;
                     case "C":
                      tipo_c=parseInt(tipo_c)+parseInt(ccha_cant_lib);
                      break;
                        case "D":
                      tipo_d=parseInt(tipo_d)+parseInt(ccha_cant_lib);
                      break;
                    case "S":
                      tipo_s=parseInt(tipo_s)+parseInt(ccha_cant_lib);
                      break;
                     case "J":
                      tipo_j=parseInt(tipo_j)+parseInt(ccha_cant_lib);
                      break;
                   
                  }
                
              if(!validacion_cantidades.trim().includes(tipo_huevo.trim()))
                {
                    
                    incorrecto++;
                } 
            }
            
             if(ccha_cant_acep>0)
            {
                switch (tipo_huevo.trim()) {
                    case "A":
                      tipo_a=parseInt(tipo_a)+parseInt(ccha_cant_acep);
                      break;
                    case "B":
                      tipo_b=parseInt(tipo_b)+parseInt(ccha_cant_acep);
                      break;
                     case "C":
                      tipo_c=parseInt(tipo_c)+parseInt(ccha_cant_acep);
                      break;
                        case "D":
                      tipo_d=parseInt(tipo_d)+parseInt(ccha_cant_acep);
                      break;
                    case "S":
                      tipo_s=parseInt(tipo_s)+parseInt(ccha_cant_acep);
                      break;
                     case "J":
                      tipo_j=parseInt(tipo_j)+parseInt(ccha_cant_acep);
                      break;
                   
                  }
              if(!validacion_cantidades.trim().includes(tipo_huevo.trim()))
                {
                    incorrecto++;
                 } 
            }
            
             if(ccha_cant_invo>0)
            {
                 switch (tipo_huevo.trim()) {
                    case "A":
                      tipo_a=parseInt(tipo_a)+parseInt(ccha_cant_invo);
                      break;
                    case "B":
                      tipo_b=parseInt(tipo_b)+parseInt(ccha_cant_invo);
                      break;
                     case "C":
                      tipo_c=parseInt(tipo_c)+parseInt(ccha_cant_invo);
                      break;
                        case "D":
                      tipo_d=parseInt(tipo_d)+parseInt(ccha_cant_invo);
                      break;
                    case "S":
                      tipo_s=parseInt(tipo_s)+parseInt(ccha_cant_invo);
                      break;
                     case "J":
                      tipo_j=parseInt(tipo_j)+parseInt(ccha_cant_invo);
                      break;
                   
                  }
              if(!validacion_cantidades.trim().includes(tipo_huevo.trim()))
                {
                    incorrecto++;
                 } 
            }
            
             if(ccha_cant_ldo>0)
            {
                  switch (tipo_huevo.trim()) {
                    case "A":
                      tipo_a=parseInt(tipo_a)+parseInt(ccha_cant_ldo);
                      break;
                    case "B":
                      tipo_b=parseInt(tipo_b)+parseInt(ccha_cant_ldo);
                      break;
                     case "C":
                      tipo_c=parseInt(tipo_c)+parseInt(ccha_cant_ldo);
                      break;
                        case "D":
                      tipo_d=parseInt(tipo_d)+parseInt(ccha_cant_ldo);
                      break;
                    case "S":
                      tipo_s=parseInt(tipo_s)+parseInt(ccha_cant_ldo);
                      break;
                     case "J":
                      tipo_j=parseInt(tipo_j)+parseInt(ccha_cant_ldo);
                      break;
                   
                  }
              if(!validacion_cantidades.trim().includes(tipo_huevo.trim()))
                {
                    incorrecto++;
                 } 
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
        
            if(tipo=="2")
            { //VALIDACION PARA QUE LA CANTIDAD INGRESADA NO SEA MAYOR A LA DISPONIBLE.
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
              ///HACER MULTIPLICAR POR CERO, Y DESPUES FUERA DEL EACH, HACER UNA COMPARACION GLOBAL NOMAS YA.
            }

                cantidad_total=cantidad_total+ccha_cant_lib+ccha_cant_acep+ccha_cant_invo+ccha_cant_ldo;
             
                if(ccha_cant_lib>0)
                {
                    if(ccha_cant_lib>ccha_lib){
                        cantidad_excedida++;
                    }//FECHAPUESTA_TIPOHUEVO_CLASIFICADORA_TIPOLOTE_CANTIDAD_CARRITO_UMEDIDA
                    arr=fecha_puesta+'&'+tipo_huevo+'&'+area+'&LIB&' + ccha_cant_lib+"&0&ENTERO&FCO";
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
                              
                    
                    
                    arr=fecha_puesta+'&'+tipo_huevo+'&'+area+'&ACEP&' + ccha_cant_acep+"&0&ENTERO&FCO";
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
                    arr=fecha_puesta+'&'+tipo_huevo+'&'+area+'&INVO&' + ccha_cant_invo+"&0&ENTERO&FCO";
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
                    arr= fecha_puesta+'&'+tipo_huevo+'&'+area+'&LDO&' + ccha_cant_ldo+"&0&ENTERO&LDO";
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
        
         calculo_mixto_enteros_pedidos_cyo(area);//AQUI SE REALIZA LA SUMA DE TODOS LOS SELECCIONADOS
        if(tipo=='2') //TIPO 2 ES PARA REALIZAR EL REGISTRO.
        {
          
                var tipos_cantidad_grilla="";
            
                var cont=0;
                 
                if(parseInt(tipo_a)>0){
                    if(cont==0){
                     tipos_cantidad_grilla=tipos_cantidad_grilla+"A_"+tipo_a;
                    }
                    else 
                    {
                       tipos_cantidad_grilla=tipos_cantidad_grilla+",A_"+tipo_a; 
                    }
                    cont++;
                }
                if(parseInt(tipo_b)>0){
                     if(cont==0){
                     tipos_cantidad_grilla=tipos_cantidad_grilla+"B_"+tipo_b;
                    }
                    else {
                       tipos_cantidad_grilla=tipos_cantidad_grilla+",B_"+tipo_b; 
                    }
                    cont++;
                }
                if(parseInt(tipo_c)>0){
                     if(cont==0){
                     tipos_cantidad_grilla=tipos_cantidad_grilla+"C_"+tipo_c;
                    }
                    else {
                       tipos_cantidad_grilla=tipos_cantidad_grilla+",C_"+tipo_c; 
                    }
                    cont++;
                }
                if(parseInt(tipo_d)>0){
                     if(cont==0){
                     tipos_cantidad_grilla=tipos_cantidad_grilla+"D_"+tipo_d;
                    }
                    else {
                       tipos_cantidad_grilla=tipos_cantidad_grilla+",D_"+tipo_d; 
                    }
                    cont++;
                }
                if(parseInt(tipo_s)>0){
                     if(cont==0){
                     tipos_cantidad_grilla=tipos_cantidad_grilla+"S_"+tipo_s;
                    }
                    else {
                       tipos_cantidad_grilla=tipos_cantidad_grilla+",S_"+tipo_s; 
                    }
                    cont++;
                }
                if(parseInt(tipo_j)>0){
                     if(cont==0){
                     tipos_cantidad_grilla=tipos_cantidad_grilla+"J_"+tipo_j;
                    }
                    else {
                       tipos_cantidad_grilla=tipos_cantidad_grilla+",J_"+tipo_j; 
                    }
                    cont++;
                }
                
                
                var contenido_tipos="";
                var contenido_tipostest="";
                var array_tipos= tipos_cantidad_grilla.split(",");
                    for(i = 0; i < array_tipos.length; i++)
                    {
                        contenido_tipostest=array_tipos[i].split("_"); ;
                        if(i==0)
                        {
                            contenido_tipos=contenido_tipostest[0];
                        }
                        else 
                        {
                            contenido_tipos=contenido_tipos+","+contenido_tipostest[0];
                        }
                    }
                    
                var tipo_a_pedido=0;    
                var tipo_b_pedido=0;    
                var tipo_c_pedido=0;    
                var tipo_d_pedido=0;    
                var tipo_j_pedido=0;    
                var tipo_s_pedido=0;    
                var tipo_g_pedido=0;  
                
                var longitud_tipos_ingresados=contenido_tipos.length;
                var longitud_tipos_correspondientes=$('#validacion_tipos').val().length;
                var array_validacion=$('#validacion_cantidades').val();
               
                var array_tipos_cantidad_pedido=array_validacion.split(",");
                var cantidad_pedido_tipo="";        
                for(i = 0; i < array_tipos_cantidad_pedido.length; i++)
                {
                        cantidad_pedido_tipo=array_tipos_cantidad_pedido[i].split("_"); ;
                        switch (cantidad_pedido_tipo[0])
                        {
                            case "A":
                                tipo_a_pedido= cantidad_pedido_tipo[1];
                            break;
                            case "B":
                                tipo_b_pedido= cantidad_pedido_tipo[1];
                            break;
                            case "C":
                              tipo_c_pedido= cantidad_pedido_tipo[1];
                            break;
                            case "D":
                                tipo_d_pedido= cantidad_pedido_tipo[1];
                            break;
                            case "S":
                                tipo_s_pedido= cantidad_pedido_tipo[1];
                            break;
                            case "J":
                                tipo_j_pedido= cantidad_pedido_tipo[1];
                            break;
                        } 
                }
                
                var validacion_cantidades_grillas=tipo_a+""+tipo_b+""+tipo_c+""+tipo_d+""+tipo_j+""+tipo_s;
                var validacion_cantidades_pedido=tipo_a_pedido+""+tipo_b_pedido+""+tipo_c_pedido+""+tipo_d_pedido+""+tipo_j_pedido+""+tipo_s_pedido;
                         
                
               
                if (validacion_cantidades_grillas!=validacion_cantidades_pedido)
                {
                    aviso_generico(2,"CANTIDADES DE TIPOS DE HUEVOS NO COINCIDEN CON EL PEDIDO ORIGINAL");
                }
                
                else if(verificar_excedido_td==0){
                    aviso_generico(2,"CANTIDAD NO DEBE SER MAYOR A LA DISPONIBLE");

                }
                else if   (parseInt($('#txt_disponibilidad').val())<parseInt($('#txt_cargados').val())  )
                {
                    aviso_generico(2,"CANTIDAD SUPERADA");
                }
                else if( cantidad_total==0)
                {
                    aviso_generico(2,"DEBE INGRESAR CARROS");

                } 
                else if(parseInt($('#txt_disponibilidad').val())==0  )
                {
                    aviso_generico(2,"DEBE SELECCIONAR EL CAMION");
                }  
                else if(parseInt($('#txt_disponibilidad').val())>parseInt($('#txt_cargados').val())) 
                {
                    aviso_generico(2,"DEBE COMPLETAR LA CAPACIDAD DE LO ASIGNADO ");

                } 
                else if(parseInt(incorrecto)>0) 
                {
                    aviso_generico(2,"TIPO DE HUEVO NO CORRESPONDE");
                } 
                
                
                else 
                {
                    var arr=$('#cbox_camion').val().split("_");
                    var codigo_camion=arr[1];
                     registrar_pedido_cyo(valores,area);
                } 
          // }
        } 

      
    }
    
    