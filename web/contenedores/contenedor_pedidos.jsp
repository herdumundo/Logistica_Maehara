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
    rs = fuente.obtenerDato("select * from  maehara.dbo.[@CAMIONES] where u_estado='Activo' and   u_desc<>'' ");
    rs2 = fuente.obtenerDato("select code,name  from maehara.dbo.[@CHOFERES] where U_estado='activo'");

%>
<div>
    <div id="btn_atras"class="col-xs-12 col-sm-12 col-md-2 col-lg-2" style="display: none">
        <button class="btn btn-warning" onclick="ir_menu_principal()"style="font-weight: bold;color:white;" >volver</button>
    </div>
    <br>
    <a style="font-weight: bold;color:black">SELECCIONE CAMION</a> 
   
    <select id="cbox_camion" class="btn btn-dark"  style="font-weight: bold;color:white;" onchange="separar_codigo_camion();">
        <option value="-">CAMION</option>
        <%while(rs.next())
        { %><option id="<%=rs.getString("u_capacidad")%>_<%=rs.getString("code")%>" value="<%=rs.getString("u_capacidad")%>_<%=rs.getString("code")%>"><%=rs.getString("code")%>-<%=rs.getString("u_desc")%> </option><%  } %>
    </select>
     <a style="font-weight: bold;color:black">SELECCIONE CHOFER</a> 
    <select id="cbox_chofer" class="btn btn-dark"  style="font-weight: bold;color:white;" onchange="separar_codigo_camion();">
        <option value="-">CHOFER</option>
        <%while(rs2.next())
        { %><option id="<%=rs2.getString("code")%>" value="<%=rs2.getString("code")%>"><%=rs2.getString("name")%> </option><%  } %>
    </select>
    
    
    
    
    <a style="font-weight: bold;color:black">DISPONIBILIDAD:</a><input type="text" disabled id="txt_disponibilidad" style="font-weight: bold;color:black" value="0" >
    <a style="font-weight: bold;color:black">CARROS CARGADOS:</a><input type="text" disabled id="txt_cargados" style="font-weight: bold;color:black" value="0" >
    <input type="hidden" id="id_pedido"> 
    <input type="hidden" id="validacion_cantidades"> 
    <input type="hidden" id="validacion_tipos"> 
    
    <br> <br>
   
    
        <form  class="row align-items-end"  action="crud/control_reporte_log_stock_ptc.jsp" target="_blank">
            <input type="button" value="GENERAR PEDIDO" class="form-control col bg-success inline" id="btn_generar"style="font-weight: bold;color:white;"   >
            <input type="submit" value="GENERAR REPORTE" class="form-control col bg-dark "  style="font-weight: bold;color:white;"   >

       </form> <br>
       
       <input type="text" placeholder="Observación (Opcional)" id="txt_obs" class="form-control"><br> 
     
          <div id="contenido_grillas">
    

</div>
    
    <style>
   
 td.something {
  width: 200px;
}
       .bg1 {
  	background-color: blue;
  }
  
  .row {
      background: #3333ff;
  margin-top:  10px;
}

.col {
    border: solid 1px #ffff66;
  padding: 7px;
}
    </style>
    
 