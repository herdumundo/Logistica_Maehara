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
     rs = fuente.obtenerDato(" select a.id,FORMAT (a.fecha_registro, 'dd/MM/yyyy hh:mm') as fecha_registro,concat(code,'-',name) as camion "
             + "                from mae_log_pct_cab_pedidos a "
             + "                inner join maehara.dbo.[@CAMIONES] b    on a.id_camion=b.Code collate database_default and estado   in (1)"); %>
    
       
       
      <div id="btn_atras"class="col-xs-12 col-sm-12 col-md-2 col-lg-2" >
        <button class="btn btn-warning" onclick="ir_menu_principal()"style="font-weight: bold;color:white;" >volver</button>
    </div>
    <br>
             <table class="table table-striped">  
                 <thead>
                    <tr> 
                        <th>NRO PEDIDO</th> 
                        <th>FECHA</th> 
                        <th>CAMION</th> 
                        <th>ACCION</th> 
                    </tr> 
                 </thead>
                 <tbody>
                     <% while (rs.next()) {  %>
                        <tr>
                            <td><%=rs.getString("id") %></td>
                            <td><%=rs.getString("fecha_registro") %></td>
                            <td><%=rs.getString("camion") %></td>
                            <td><input type="button" value="IR AL PEDIDO" class="form-control btn-black" onclick="ir_pedido(2,<%=rs.getString("id")%>)"></td>
                            <td><input type="button" value="ANULAR" class="form-control btn-danger" onclick="anular_pedido(<%=rs.getString("id")%>)"></td>
                        </tr>                             
                        <% }
                     %>
                     
                     
                 </tbody>
                 
             </table>