<%-- 
    Document   : CERRARSESION
    Created on : 26/01/2016, 08:08:09 PM
    Author     : HERNAN VELAZQUEZ
--%>

<%@page import="clases.controles"%>
<%@ page session="true" %>
<%
    
try {
        HttpSession sesionOk = request.getSession();
sesionOk.invalidate();request.getSession().invalidate();
controles.connectSesion.close();
    } catch (Exception e) {
    }
    

%>
<meta http-equiv="Refresh" content="1;url=index.html">