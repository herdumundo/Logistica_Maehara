<%@ page session="true" %>
<%
    HttpSession sesionOk = request.getSession();
    sesionOk.setMaxInactiveInterval(-1);
    if (sesionOk.getAttribute("usuario") == null ) 
    {
        clases.controles.connect.close();
        response.sendRedirect("../login_sesion.jsp");
    }
%>