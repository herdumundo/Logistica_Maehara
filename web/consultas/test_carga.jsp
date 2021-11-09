
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@include  file="../chequearsesion.jsp" %>
<%@ page contentType="application/json; charset=utf-8" %>
    <%
    String A     = request.getParameter("A");
    String B     = request.getParameter("B");
    String C     = request.getParameter("C");
    String D     = request.getParameter("D");
    String S     = request.getParameter("S");
    String J     = request.getParameter("J");
        
    String AC     = request.getParameter("AC");
    String BC     = request.getParameter("BC");
    String CC     = request.getParameter("CC");
    String DC     = request.getParameter("DC");
    String SC     = request.getParameter("SC");
    String JC     = request.getParameter("JC");
     
            
            clases.variables.A=A;
            clases.variables.B=B;
            clases.variables.C=C;
            clases.variables.D=D;
            clases.variables.S=S;
            clases.variables.J=J;
            
            clases.variables.AC=AC;
            clases.variables.BC=BC;
            clases.variables.CC=CC;
            clases.variables.DC=DC;
            clases.variables.SC=SC;
            clases.variables.JC=JC;
 /* 
           
            String AC= clases.variables.AC;
            String BC= clases.variables.BC;
            String CC= clases.variables.CC;
            String DC= clases.variables.DC;
            String SC= clases.variables.SC;
            String JC= clases.variables.JC;
*/
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
 
        ob.put("A",A);
        ob.put("B",B);
        ob.put("C",C);
        ob.put("D",D);
        ob.put("S",S);
        ob.put("J",J);
        
        ob.put("AC",AC);
        ob.put("BC",BC);
        ob.put("CC",CC);
        ob.put("DC",DC);
        ob.put("SC",SC);
        ob.put("JC",JC);
        
         out.print(ob);  
    %>