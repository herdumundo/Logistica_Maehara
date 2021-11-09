
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONArray"%>
<%@page import="org.json.JSONObject"%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
<jsp:useBean id="fuente" class="clases.fuentedato" scope="page"/>
<%@include  file="../chequearsesion.jsp" %>
<%@ page contentType="application/json; charset=utf-8" %>
    <%
       
      
            String A= clases.variables.A;
            String B= clases.variables.B;
            String C= clases.variables.C;
            String D= clases.variables.D;
            String S= clases.variables.S;
            String J= clases.variables.J;
            
            
            String AC= clases.variables.AC;
            String BC= clases.variables.BC;
            String CC= clases.variables.CC;
            String DC= clases.variables.DC;
            String SC= clases.variables.SC;
            String JC= clases.variables.JC;

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