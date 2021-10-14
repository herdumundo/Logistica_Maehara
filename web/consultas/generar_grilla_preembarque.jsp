<%-- 
    Document   : generar_grilla_preembarque
    Created on : 16-sep-2021, 8:37:03
    Author     : hvelazquez
--%>

 <%@page import="clases.controles"%>
<%@page import="clases.fuentedato"%>
<%@page import="org.json.JSONObject"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@ page session="true" %>
  <jsp:useBean id="fuente" class="clases.fuentedato" scope="page" />
<%@page contentType="application/json; charset=utf-8" %>



<%     
    clases.controles.connectarBD();
    fuente.setConexion(clases.controles.connect);
    JSONObject ob = new JSONObject();
    ob=new JSONObject();
    String grilla_html="";
    String cabecera=" <table id='tb_preembarque' class='table table-bordered table-hover' style='width:100%'>"
            + "<thead>"
              + " <tr>"
            + "<th rowspan='2'  style='color: #fff; background: gray;'><b>Fecha puesta</b></th>  "
            + " <th rowspan='2' ><b>Tipo</b></th>  "
            + " <th colspan='8' class='text-center' style='color: #fff; background: green;  ' ><b><a id='td_ccha'>CCHA TOTAL CARGADOS:0</a></b></th>  "
            + " <th colspan='8' class='text-center'style='color: #fff; background: black;' ><b><a id='td_cchb'>CCHB TOTAL CARGADOS:0</a></b></th>  "
            + " <th colspan='8' class='text-center' style='color: #fff; background: green;' ><b><a id='td_cchh'>CCHH TOTAL CARGADOS:0</a></b></th>  "
            + " <th colspan='6' class='text-center' style='color: #fff; background: black;' ><b><a id='td_ovo'>LAVADOS TOTAL CARGADOS:0</a></b></th>   </tr>"
            
            + " <tr>" 
            + " <th  style='color: #fff; background: black;' >LIB</th>      <th style='color: #fff; background: black;' >Cant</th>"
            + " <th  style='color: #fff; background: green;'>Acep</th>      <th style='color: #fff; background: green;' >Cant</th>"
            + " <th  style='color: #fff; background: green;'>Invo</th>      <th  style='color: #fff; background: green;'>Cant</th>"
            + " <th  style='color: #fff; background: green;'>LDO</th>      <th  style='color: #fff; background: green;'>Cant</th>"
            + " <th  style='color: #fff; background: black;' >LIB</th>      <th style='color: #fff; background: black;'>Cant</th>"
            + " <th style='color: #fff; background: green;'>Acep</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th style='color: #fff; background: green;'>Invo</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th style='color: #fff; background: green;'>LDO</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th  style='color: #fff; background: black;'>LIB</th>      <th style='color: #fff; background: black;'>Cant</th>"
            + " <th  style='color: #fff; background: green;'>Acep</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th  style='color: #fff; background: green;'>Invo</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th  style='color: #fff; background: green;'>LDO</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th style='color: #fff; background: black;'>LIB</th>      <th style='color: #fff; background: black;'>Cant</th>"
            + " <th style='color: #fff; background: green;'>Acep</th>      <th style='color: #fff; background: green;'>Cant</th>"
            + " <th style='color: #fff; background: green;'>Invo</th>      <th style='color: #fff; background: green;'>Cant</th></tr>"
            + "</thead> <tbody >";
    int cont_fila=0;
    ResultSet rs;
     rs = fuente.obtenerDato(" select *,convert(varchar,fecha_puesta,103)as fecha_format from  v_mae_preembarque    order by 1,2  ");
       while(rs.next())
        {
            String edit1="";//contenteditable='true'
            String edit2="";//contenteditable='true'
            String edit3="";//contenteditable='true'
            String edit4="";//contenteditable='true'
            String edit5="";//contenteditable='true'
            String edit6="";//contenteditable='true'
            String edit7="";//contenteditable='true'
            String edit8="";//contenteditable='true'
            String edit9="";//contenteditable='true'
            String edit10="";//contenteditable='true'
            String edit11="";//contenteditable='true'
            String edit12="";//contenteditable='true'
            String edit13="";//contenteditable='true'
            String edit14="";//contenteditable='true'
            String edit15="";//contenteditable='true'
            String edit1t="";//contenteditable='true'
     
                if(rs.getInt(3)>0){
               
              edit1="contenteditable='true'  style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(4)>0){
              edit2="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'";  
            }
                if(rs.getInt(5)>0){
              edit3="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  

            }
                if(rs.getInt(6)>0){
              edit4="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLavados'";  
            }
                if(rs.getInt(7)>0){
              edit5="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(8)>0){
              edit6="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'";  
            }
                if(rs.getInt(9)>0){
              edit7="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  
            }
                if(rs.getInt(10)>0){
              edit8="contenteditable='true'style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLavados'";  
            }
                if(rs.getInt(11)>0){
              edit9="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(12)>0){
              edit10="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'";  
            }
                if(rs.getInt(13)>0){
              edit11="contenteditable='true'style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  
            }
                if(rs.getInt(14)>0){
              edit12="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLavados'";  
            }
                if(rs.getInt(15)>0){
              edit13="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(16)>0){
              edit14="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'" ;  
            }
                if(rs.getInt(17)>0){
              edit15="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(19)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  
            }
              
           grilla_html=grilla_html+
           "<tr   >"
                   + "<td   >"+rs.getString(19 )+"</td>"
                   + "<td width='35'  class='text-center '> "+rs.getString(2)+" </td>"                                                                                  
                   + "<td  class='text-center'  ><b> "+rs.getString(3)+"    </b></td>   <td "+edit1+"      class='text-center celda_editable single_line'  >   0 </td>"
                   + "<td  class='text-center'  ><b>"+rs.getString(4)+"   </b></td>     <td "+edit2+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(5)+"</b></td>        <td "+edit3+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(6)+"</b></td>        <td "+edit4+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(7)+"</b></td>        <td "+edit5+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(8)+"</b></td>        <td "+edit6+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(9)+"</b></td>        <td "+edit7+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(10)+"</b></td>       <td "+edit8+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(11)+"</b></td>       <td "+edit9+"       class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(12)+"</b></td>       <td "+edit10+"      class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(13)+"</b></td>       <td "+edit11+"      class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(14)+"</b></td>       <td "+edit12+"      class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td  class='text-center'  ><b>"+rs.getString(15)+"</b></td>       <td "+edit13+"      class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(16)+"</b></td>       <td "+edit14+"      class='text-center celda_editable single_line'  >   0   </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(17)+"</b></td>       <td "+edit15+"      class='text-center celda_editable single_line'  >   0   </td> "
                   + " </tr>";
          cont_fila++; 
        }
        
        clases.controles.DesconnectarBD();
        ob.put("grilla",cabecera+grilla_html+"</tbody></table>");
        out.print(ob);  %>
        
         