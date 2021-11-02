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
                
                if(tipo==2){ //SI ES PEDIDO GENERADO, ENTONCES EL CLIC DE GENERAR PEDIDO, HARA OTRA COSA.
                $('#btn_generar').click(function(){
                    grilla_preembarque('2','EDITAR');
                });
                }
                else {
                    $('#btn_generar').click(function(){
                    grilla_preembarque('2','REGISTRO');
                });                }
 
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
    