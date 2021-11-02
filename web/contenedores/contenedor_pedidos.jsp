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
    ResultSet rs;
    rs = fuente.obtenerDato("select * from  maehara.dbo.[@CAMIONES] where u_estado='Activo'");

%>
<div>
    <div id="btn_atras"class="col-xs-12 col-sm-12 col-md-2 col-lg-2" style="display: none">
        <button class="btn btn-warning" onclick="ir_menu_principal()"style="font-weight: bold;color:white;" >volver</button>
    </div>
    <br>
    <a style="font-weight: bold;color:black">SELECCIONE CAMION</a><br>
   
    <select id="cbox_camion" class="btn btn-dark" style="font-weight: bold;color:white;" onchange="separar_codigo_camion();">
        <option value="-">CAMION</option>
        <%while(rs.next())
        { %><option id="<%=rs.getString("u_capacidad")%>_<%=rs.getString("code")%>" value="<%=rs.getString("u_capacidad")%>_<%=rs.getString("code")%>"><%=rs.getString("code")%>-<%=rs.getString("name")%> </option><%  } %>
    </select>
    
    <a style="font-weight: bold;color:black">DISPONIBILIDAD:</a><input type="text" disabled id="txt_disponibilidad" style="font-weight: bold;color:black" value="0" >
    <a style="font-weight: bold;color:black">CARROS CARGADOS:</a><input type="text" disabled id="txt_cargados" style="font-weight: bold;color:black" value="0" >
    <input type="text" id="id_pedido"> 
    <br> <br>
    
    <div id="div_grilla"  class="table_wrapper" >
        <div id="container">
            <div id="first"></div>
            <div id="second"></div>
         </div>

    </div>

    <input type="button" value="GENERAR PEDIDO" class="form-control bg-black" id="btn_generar"style="font-weight: bold;color:white;"   >


</div>
    
    <style>
   
 td.something {
  width: 200px;
}
       .bg1 {
  	background-color: blue;
  }   
    </style>