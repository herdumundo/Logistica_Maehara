<%@page import="clases.controles"%>
<%@page import="clases.fuentedato"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@ page session="true" %>
<%@include  file="../chequearsesion.jsp" %>

<jsp:useBean id="fuente" class="clases.fuentedato" scope="page" />
 <%     
    clases.controles.connectarBD();
    fuente.setConexion(clases.controles.connect);
    ResultSet rs,rs2,rs3,rs4; 
    String  area       = (String) sesionOk.getAttribute("area");
    
    if(area.equals("A")){
       area="CCHA"; 
    }
    else if(area.equals("B")){
       area="CCHB"; 
    }
    else if(area.equals("H")){
       area="CCHH"; 
    }
    else if(area.equals("O")){
       area="OVO"; 
    }
     rs = fuente.obtenerDato(" 	select id,fecha_registro,camion,sum(cantidad) as cantidad from "
			+"("
			
			+"	select id_cab as id, FORMAT(b.fecha_registro, 'dd/MM/yyyy HH:mm') as fecha_registro,concat(code,'-',name) as camion,1 as cantidad, carro"
			+"  from mae_log_ptc_det_mixtos_pedidos a "
			+"  inner join mae_log_pct_cab_pedidos b on a.id_cab=b.id"
			+"   inner join maehara.dbo.[@CAMIONES] c on b.id_camion=c.Code collate database_default "
			+"  where a.estado=2 and a.clasificadora='"+area+"' "
			+"  group by a.id_cab,b.fecha_registro,code,name ,carro"
			+" union all"
			+" select distinct a.id,FORMAT (a.fecha_registro, 'dd/MM/yyyy HH:mm') as fecha_registro,concat(code,'-',name) as camion  ,"
			+"	sum(c.cantidad) as cantidad, 0 as carro  from mae_log_pct_cab_pedidos a    "
			+"	inner join maehara.dbo.[@CAMIONES] b     on a.id_camion=b.Code collate database_default     and a.estado IN (2)    " 
			+"	inner join mae_log_ptc_det_pedidos c on a.id=c.id_cab and c.estado<>4 and c.clasificadora='"+area+"' "
			+"	and a.id in ( select distinct id_cab from mae_log_ptc_det_pedidos where estado=2 and clasificadora='"+area+"') "
                        + "group by a.id,a.fecha_registro,code,name ) t "
			+"group by  id,fecha_registro,camion "); %>
             
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
                                <th  style='color: #fff; background: black;'> FECHA DE PUESTA</th>  
                                <th  style='color: #fff; background: green;'>TIPO</th>    
                                <th  style='color: #fff; background: black;'>CANTIDAD</th> 
                            </tr>
                        </thead>    
                    <tbody>
                  <%
                        rs2 = fuente.obtenerDato("select sum(cantidad ) as cantidad,clasificadora,tipo_huevo,CONVERT(VARCHAR,fecha_puesta,103) as fecha_puesta "
                                + " from mae_log_ptc_det_pedidos "
                                + " where id_cab="+id+"  and u_medida='ENTERO' AND estado<>4 and clasificadora='"+area+"' "
                                + " group by clasificadora,tipo_huevo,fecha_puesta ");

                        while (rs2.next())
                {  %>             
                        <tr> 
                            <td><%=rs2.getString("fecha_puesta")%></td>
                            <td><%=rs2.getString("tipo_huevo")%></td>
                            <td><%=rs2.getString("cantidad")%></td>
                        </tr>
                        <% 
                        }
                        %>
                        
                    </tbody>
                    
                  
                </table> 
                   <%
                       int comprobar_mixto=0;
                        rs4 = fuente.obtenerDato("  SELECT clasificadora ,carrito as carro ,  stuff(( select   ','+  [tipo_huevo] + ':'+convert(varchar,[cantidad])    "
                                + " from mae_log_ptc_det_mixtos_pedidos with (nolock)  where carro =  carrito for XML path('') ),1,1,'')as cajones  "
                                + "FROM  (  select clasificadora,carro as carrito,tipo_huevo,cantidad from mae_log_ptc_det_mixtos_pedidos where id_cab= "+id+"  and clasificadora='"+area+"' and estado=2  )  T  "
                                + "  group by clasificadora ,carrito");

                        while (rs4.next())
                {
                    
                     comprobar_mixto++;   
                }
                  if(comprobar_mixto>0){
                      %>        
                 <table class="  table table-striped" style='width:10%'>
                        <thead>
                            <tr>  
                                <th  style='color: #fff; background: black;'> CARRO</th>  
                                <th  style='color: #fff; background: green;'>CAJONES</th>    
                             </tr>
                        </thead>    
                    <tbody>
                  <%
                        rs3 = fuente.obtenerDato("  SELECT clasificadora ,carrito as carro ,  stuff(( select   ','+  [tipo_huevo] + ':'+convert(varchar,[cantidad])    "
                                + " from mae_log_ptc_det_mixtos_pedidos with (nolock)  where ESTADO=2 AND carro =  carrito for XML path('') ),1,1,'')as cajones  "
                                + "FROM  (  select clasificadora,carro as carrito,tipo_huevo,cantidad "
                                + "         from mae_log_ptc_det_mixtos_pedidos where id_cab= "+id+"   and clasificadora='"+area+"'  and estado =2 "
                                        + ")  T  "
                                + "  group by clasificadora ,carrito");

                        while (rs3.next())
                {  %>             
                        <tr> 
                            <td><%=rs3.getString("carro")%></td>
                            <td><%=rs3.getString("cajones")%></td>
                         </tr>
                        <% 
                        }
                        %>
                        
                    </tbody>
                    
                  
                </table>        
                        <% }%>
                        
                        

                        <input type="button" value="MODIFICAR PEDIDO" class="btn-dark" onclick="ir_pedido(3,<%=id%>)" >
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
 