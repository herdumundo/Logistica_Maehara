<%@page import="clases.controles"%>
<%@page import="clases.fuentedato"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@ page session="true" %>
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page" />
 <%     
    clases.controles.connectarBD();
    fuente.setConexion(clases.controles.connect);
    ResultSet rs,rs2;
     rs = fuente.obtenerDato(" select a.id,FORMAT (a.fecha_registro, 'dd/MM/yyyy hh:mm') as fecha_registro,concat(code,'-',name) as camion ,a.cantidad"
             + "                from mae_log_pct_cab_pedidos a "
             + "                inner join maehara.dbo.[@CAMIONES] b    on a.id_camion=b.Code collate database_default and a.estado IN (1)"); %>
    <div id="btn_atras"class="col-xs-12 col-sm-12 col-md-2 col-lg-2"  >
        <button class="btn btn-warning" onclick="ir_menu_principal()"style="font-weight: bold;color:white;" >volver</button>
    </div>
    <script>
    $( function() {
      $( "#accordion" ).accordion({ 

heightStyle: "content" 

});
    } );
    </script>
  <div id="accordion" >
  <%
    try {
        int i=0;
        while (rs.next()){
            String id=rs.getString("id");
            String contenido_cab="Pedido nro. "+rs.getString("id")+"  Fecha registro: "+rs.getString("fecha_registro")+"  Camion:"+rs.getString("camion")+" TOTAL CARROS:"+rs.getString("cantidad"); %> 
            <h3><%=contenido_cab%></h3> <div>
                <p>
                <table class="  table table-striped" style='width:10%'>
                        <thead>
                            <tr>  
                                <th  style='color: #fff; background: black;' >AREA</th>  
                                <th  style='color: #fff; background: green;'>TIPO</th>    
                                <th  style='color: #fff; background: black;'>CANTIDAD</th> 
                            </tr>
                        </thead>    
                    <tbody>
                  <%
                        rs2 = fuente.obtenerDato(" select convert(int,sum(cantidad)/12) as cantidad,clasificadora,tipo_huevo from ( "+
                        "   select sum(cantidad*4320) as cantidad,clasificadora,tipo_huevo from mae_log_ptc_det_pedidos where id_cab="+id+"  and u_medida='ENTERO' group by clasificadora,tipo_huevo"+
                        "   union all"+
                        "    select case tipo_huevo when 'G' then  sum(cantidad*180) else sum(cantidad*360) end   as cantidad ,clasificadora,tipo_huevo  "
                                + "from mae_log_ptc_det_mixtos_pedidos	where id_cab="+id+"    group by clasificadora ,tipo_huevo  ) hgh "+
                                 "   group by clasificadora,tipo_huevo"+
                        "   order by 2,3");

                        while (rs2.next())
                {  %>             
                        <tr> 
                            <td><%=rs2.getString("clasificadora")%></td>
                            <td><%=rs2.getString("tipo_huevo")%></td>
                            <td><%=rs2.getString("cantidad")%></td>
                        </tr>
                        <% 
                        }
                        %>
                        
                    </tbody>
                    
                  
                </table> 
                        <input type="button" value="CONFIRMAR CARGA A FACTURA" class="btn-success" onclick="registrar_factura(<%=id%>);" >
              </p>
            </div> <%
            i++; 
        }

            if(i==0){
            %>
            <div class="alert alert-danger alert-dismissible" role="alert">
                 <div class="alert-icon">
                    <i class="far fa-fw fa-bell"></i>
                </div>
                <div class="alert-message">
                    <center><strong>NO SE ENCONTRARON PEDIDOS PENDIENTES</strong>  </center>
                </div>
            </div>
										 
        <% 
        }
        } catch (Exception e) {
String as=e.getMessage();
                }
        %>
        
        
        
        
        
       
            
    </div>
 