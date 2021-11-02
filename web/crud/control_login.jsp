<%-- 
    Document   : CERRARSESION
    Created on : 26/01/2021, 08:08:09 PM
    Author     : HERNAN VELAZQUEZ
--%>
<%@page import="clases.controles"%>
<%@page import="java.math.BigInteger"%>
<%@page import="java.security.MessageDigest"%>
<%@page import="javax.swing.JOptionPane"%>
<%@page session="true" %>
<%@page language="java" import="java.sql.*" errorPage="error.jsp"%>
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page" />
<%
    clases.controles.connectarBD();
    fuente.setConexion(clases.controles.connect);
    ResultSet rs;
    String usu = request.getParameter("usuario");
    String cla = request.getParameter("pass");
   
    String html="";
    
  /*  MessageDigest m = MessageDigest.getInstance("MD5");
    m.reset();
    m.update(cla.getBytes());
    byte[] digest = m.digest();
    BigInteger bigInt = new BigInteger(1,digest);
    String hashtext = bigInt.toString(16);

 */
    
     rs = fuente.obtenerDato("select * from usuarios where usuario='"+usu+"' and password='"+cla+"' ");
    if(rs.next())
    {
        HttpSession sesionOk = request.getSession();
        sesionOk.setAttribute("id_usuario",rs.getString("cod_usuario"));
        sesionOk.setAttribute("nombre",rs.getString("nombre"));
        sesionOk.setAttribute("usuario",rs.getString("usuario"));
        sesionOk.setAttribute("area",rs.getString("clasificadora"));
        
        response.sendRedirect("../menu.jsp"); 
        
    } 
    else
    {
        response.sendRedirect("../login_error.jsp");
    } 
    controles.DesconnectarBD();
%>
