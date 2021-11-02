<%-- 
    Document   : generar_grilla_preembarque
    Created on : 16-sep-2021, 8:37:03
    Author     : hvelazquez
--%>

 <%@page import="org.json.JSONArray"%>
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
    ResultSet rs,rs2;
     rs = fuente.obtenerDato(" SELECT * FROM ( select *,convert(varchar,fecha_puesta,103)as fecha_format from  v_mae_preembarque ) T WHERE tipo_huevo NOT IN ('-')   order by 1,2  ");
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
       
              String cabecera_mixto=" <table id='tb_preembarque_mixto' class='table table-bordered table-hover' style='width:100%'>"
            + "<thead>"
               + " <tr>"
            + "<th colspan='6'  style='color: #fff; background: gray;'  class='text-center'  ><b>CARROS MIXTOS</b></th>  </tr>"
            + "<tr>"
            + "<th  style='color: #fff; background: black;'>CARRO</th>      "
               + "<th style='color: #fff; background: green;' >AREA</th>"
               + "<th style='color: #fff; background: green;' >PUESTA</th>"
               + "<th style='color: #fff; background: green;' >DETALLE CAJONES</th>"
               + "<th style='color: #fff; background: green;' >ACCION</th>"
             + "</tr>"
            + "</thead> <tbody >";
     String grilla_html2 ="";  
        rs2 = fuente.obtenerDato("  SELECT cod,clasificadora_ACTUAL,convert(varchar,FECHA_PUESTA,103)AS FECHA_PUESTA,  stuff(( select   ','+  [tipo_huevo] + ':'+convert(varchar,[cantidad])   from [v_mae_stock_linea_mixtos] with (nolock) "
                + "                 where cod_carrito =  cod for XML path('') ),1,1,'')as fecha_involucrada "
                + "                 FROM  ( SELECT cod_carrito as cod,clasificadora_ACTUAL ,FECHA_PUESTA FROM v_mae_stock_linea_cajones12 WHERE cod_carrito not in (select cod_carrito from  mae_log_ptc_det_pedidos where estado=1 and u_medida='MIXTO') ) T ORDER BY 2,3");
       while(rs2.next())
        {
            grilla_html2=grilla_html2+ "<tr>" + "<td  >"+rs2.getString(1 )+"</td>"+  "<td   >"+rs2.getString(2)+"</td>"+   "<td   >"+rs2.getString(3)+"</td>"+ 
                    "<td class='something' >"+rs2.getString(4)+"</td>"+ " <td><div class='btn btn-dark btn-sm' id='"+rs2.getString(1 )+"' onclick='seleccionar_mixtos( "+rs2.getString(1 )+" )'>SELECCIONE</div>   </td> </tr>";
        }
       
        clases.controles.DesconnectarBD();
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        JSONArray array_general = new JSONArray();         

        ob.put("grilla",cabecera+grilla_html+"</tbody></table>");
        ob.put("grilla_mixto",cabecera_mixto+grilla_html2+"</tbody></table>");
        out.print(ob);  %>
        
         