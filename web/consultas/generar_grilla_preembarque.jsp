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
 
    ResultSet rs,rs2,rs3;
    String grilla_html="";
    String fp_a="N/A";
    String fp_b="N/A";
    String fp_c="N/A";
    String fp_d="N/A";
    String fp_s="N/A";
    String fp_j="N/A";
    String cant_a="0";
    String cant_b="0";
    String cant_c="0";
    String cant_d="0";
    String cant_s="0";
    String cant_j="0";
    String style_a="style='display:none'";
    String style_b="style='display:none'";
    String style_c="style='display:none'";
    String style_d="style='display:none'";
    String style_s="style='display:none'";
    String style_j="style='display:none'";
     //rs3 = fuente.obtenerDato("  select min(convert(date,fecha_puesta)) as fecha_puesta ,tipo_huevo from  v_mae_preembarque  with(nolock)  group by tipo_huevo  ");
     rs3 = fuente.obtenerDato("  select min(convert(date,fecha_puesta)) as fecha_puesta ,tipo_huevo ,SUM(cantidad) AS cantidad from [v_mae_log_stock_1] as cantidad  with(nolock)  group by tipo_huevo  ");
    
     
      
     while(rs3.next())
        {
            if(rs3.getString("tipo_huevo").equals("A")){
              fp_a=  rs3.getString("fecha_puesta");
              style_a="";
              cant_a= rs3.getString("cantidad");
            }
            else if(rs3.getString("tipo_huevo").equals("B")){
              fp_b=  rs3.getString("fecha_puesta");
              cant_b= rs3.getString("cantidad");
              style_b="";
            }
             else if(rs3.getString("tipo_huevo").equals("C")){
              fp_c=  rs3.getString("fecha_puesta");
              cant_c= rs3.getString("cantidad");
              style_c="";
            }
             else if(rs3.getString("tipo_huevo").equals("D")){
              fp_d=  rs3.getString("fecha_puesta");
              cant_d= rs3.getString("cantidad");
              style_d="";
            }
             else if(rs3.getString("tipo_huevo").equals("S")){
              fp_s=  rs3.getString("fecha_puesta");
              cant_s= rs3.getString("cantidad");
              style_s="";
            }
             else if(rs3.getString("tipo_huevo").equals("J")){
              fp_j=  rs3.getString("fecha_puesta");
              cant_j= rs3.getString("cantidad");
              style_j="";
            }
        }
    
    String cabecera="<table><thead><tr><th>TIPO</th><th>PEDIDO</th><th>CARGADOS</th><th>RESTANTES</th><th>FECHA PUESTA VIEJA</th><th>DISPONIBLE</th><tbody >"
            + "<tr  "+style_a+"><td>A</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_a'   ></td>   <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_ac'        ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_af'        ></td>                       <td><input type='text' style='font-weight: bold; color: black;' value='"+fp_a+"' readonly     ></td><td><input type='text' style='font-weight: bold; color: black;' value='"+cant_a+"' readonly     ></td>   </tr>"
            + "<tr  "+style_b+"><td>B</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_b'    ></td>  <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_bc'        ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_bf'        ></td>            <td><input type='text' style='font-weight: bold; color: black;' value='"+fp_b+"' readonly     ></td> <td><input type='text' style='font-weight: bold; color: black;' value='"+cant_b+"' readonly     ></td>   </tr>"
            + "<tr  "+style_c+"><td>C</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_c'    ></td>  <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_cc'        ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_cf'        ></td>              <td><input type='text' style='font-weight: bold; color: black;' value='"+fp_c+"' readonly     ></td> <td><input type='text' style='font-weight: bold; color: black;' value='"+cant_c+"' readonly   ></td>   </tr>"
            + "<tr  "+style_d+"><td>D</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_d'    ></td>  <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_dc'        ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_df'        ></td>             <td><input type='text' style='font-weight: bold; color: black;' value='"+fp_d+"' readonly     ></td><td><input type='text' style='font-weight: bold; color: black;' value='"+cant_d+"' readonly     ></td>   </tr>"
            + "<tr  "+style_s+"><td>S</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_s'    ></td>  <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_sc'        ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_sf'        ></td>             <td><input type='text' style='font-weight: bold; color: black;' value='"+fp_s+"' readonly     ></td> <td><input type='text' style='font-weight: bold; color: black;' value='"+cant_s+"' readonly     ></td>   </tr>"
            + "<tr  "+style_j+"><td>J</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_j'   ></td>   <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_jc'        ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_jf'        ></td>             <td><input type='text' style='font-weight: bold; color: black;' value='"+fp_j+"' readonly     ></td>  <td><input type='text' style='font-weight: bold; color: black;' value='"+cant_j+"' readonly     ></td>   </tr>"
            + "<tr><td>MIXTO</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_mixto'   ></td>        <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_mixtoc'    ></td>      <td><input type='text'  style='font-weight: bold; color: black;'    value='0'   readonly    id='txt_tipo_mixtof'    ></td>   </tr>"
            + "</tbody > </tr></thead>"
            + "</table>"
            + " <div id='div_grilla' style=' margin: left;'  class='table_wrapper' >"
            + "<div id='container' style='width: 2000px; margin: auto;'>"
            + "<div id='first' style=' width: 1800px; float: left; height: 1000px;'> "
            
            
            + "<table id='tb_preembarque' class='stripe row-border order-column' style='width:100%'>"
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
    int cont_id=0;
      rs = fuente.obtenerDato(" SELECT * FROM ( select *,convert(varchar,fecha_puesta,103)as fecha_format from  v_mae_preembarque  with(nolock) ) T WHERE tipo_huevo NOT IN ('-')   order by 1,2  ");
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
               
              edit1="contenteditable='true'  style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(4)>0){
              edit2="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'";  
            }
                if(rs.getInt(5)>0){
              edit3="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  

            }
                if(rs.getInt(6)>0){
              edit4="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLavados'";  
            }
                if(rs.getInt(7)>0){
              edit5="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(8)>0){
              edit6="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'";  
            }
                if(rs.getInt(9)>0){
              edit7="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  
            }
                if(rs.getInt(10)>0){
              edit8="contenteditable='true'style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLavados'";  
            }
                if(rs.getInt(11)>0){
              edit9="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(12)>0){
              edit10="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'";  
            }
                if(rs.getInt(13)>0){
              edit11="contenteditable='true'style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  
            }
                if(rs.getInt(14)>0){
              edit12="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLavados'";  
            }
                if(rs.getInt(15)>0){
              edit13="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nLiberados'";  
            }
                if(rs.getInt(16)>0){
              edit14="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nAceptados tal cual'" ;  
            }
                if(rs.getInt(17)>0){
              edit15="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(23)+"\nTipo de huevo: "+rs.getString(2)+"\nFechas involucradas'";  
            }
              String fecha_form=rs.getString(23).replaceAll("/", "");
           grilla_html=grilla_html+
           "<tr class='item-model-number'  >"
                   + "<td   >"+rs.getString(23 )+"</td>"
                   + "<td width='35'  class='text-center '> "+rs.getString(2)+" </td>"          ;                                                                        
                    
                    cont_id++;
                    
                    String id_td=String.valueOf(cont_id);
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(3)>0){
                        id_td="ID";
                    }
                    
                    grilla_html=grilla_html+ "<td  style='font-weight:bold' class='text-center "+ "LIB_"+id_td+"_"+fecha_form+"_CCHA_"+rs.getString(2)+"'  >"+rs.getString(3)+"    </td>   <td "+edit1+"      class='text-center celda_editable single_line'  >   0 </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(4)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html + "<td  style='font-weight:bold'  class='text-center "+ "ACEP_"+id_td+"_"+fecha_form+"_CCHA_"+rs.getString(2)+"' >     "+rs.getString(4)+"    </td>     <td "+edit2+"       class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++; 
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(5)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html + "<td style='font-weight:bold'   class='text-center "+ "INVO_"+id_td+"_"+fecha_form+"_CCHA_"+rs.getString(2)+"' >     "+rs.getString(5)+" </td>        <td "+edit3+"       class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(6)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html  + "<td style='font-weight:bold'   class='text-center "+ "LDO_"+id_td+"_"+fecha_form+"_CCHA_"+rs.getString(2)+"'  >    "+rs.getString(6)+" </td>        <td "+edit4+"       class='text-center celda_editable single_line'  >   0   </td>";
                   
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(7)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html  + "<td  style='font-weight:bold'  class='text-center "+ "LIB_"+id_td+"_"+fecha_form+"_CCHB_"+rs.getString(2)+"'  >    "+rs.getString(7)+" </td>        <td "+edit5+"       class='text-center celda_editable single_line'  >   0   </td>";
                   
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(8)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html  + "<td style='font-weight:bold'   class='text-center "+ "ACEP_"+id_td+"_"+fecha_form+"_CCHB_"+rs.getString(2)+"' >    "+rs.getString(8)+" </td>        <td "+edit6+"       class='text-center celda_editable single_line'  >   0   </td>";
                   
                    cont_id++; 
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(9)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html + "<td  style='font-weight:bold'  class='text-center "+ "INVO_"+id_td+"_"+fecha_form+"_CCHB_"+rs.getString(2)+"' >     "+rs.getString(9)+" </td>        <td "+edit7+"       class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++; 
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(10)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html  + "<td style='font-weight:bold'   class='text-center "+ "LDO_"+id_td+"_"+fecha_form+"_CCHB_"+rs.getString(2)+"'  >    "+rs.getString(10)+" </td>       <td "+edit8+"       class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(11)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html  + "<td style='font-weight:bold'   class='text-center "+ "LIB_"+id_td+"_"+fecha_form+"_CCHH_"+rs.getString(2)+"'  >    "+rs.getString(11)+" </td>       <td "+edit9+"       class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(12)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html   + "<td  style='font-weight:bold'  class='text-center "+ "ACEP_"+id_td+"_"+fecha_form+"_CCHH_"+rs.getString(2)+"' >   "+rs.getString(12)+" </td>       <td "+edit10+"      class='text-center celda_editable single_line'  >   0   </td>";
                   
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(13)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html   + "<td style='font-weight:bold'   class='text-center  "+ "INVO_"+id_td+"_"+fecha_form+"_CCHH_"+rs.getString(2)+"' >    "+rs.getString(13)+" </td>       <td "+edit11+"      class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(14)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html   + "<td  style='font-weight:bold'  class='text-center "+ "LDO_"+id_td+"_"+fecha_form+"_CCHH_"+rs.getString(2)+"'  >    "+rs.getString(14)+" </td>       <td "+edit12+"      class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(15)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html    + "<td style='font-weight:bold'   class='text-center "+ "LIB_"+id_td+"_"+fecha_form+"_OVO_"+rs.getString(2)+"'  >    "+rs.getString(15)+" </td>       <td "+edit13+"      class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(16)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html   + "<td  style='font-weight:bold'  class='text-center "+ "ACEP_"+id_td+"_"+fecha_form+"_OVO_"+rs.getString(2)+"' >    "+rs.getString(16)+" </td>       <td "+edit14+"      class='text-center celda_editable single_line'  >   0   </td>";
                    
                    cont_id++;
                    id_td=String.valueOf(cont_id);
                    if(rs.getInt(17)>0){
                        id_td="ID";
                    }
                    grilla_html=grilla_html   + "<td style='font-weight:bold'   class='text-center  "+ "INVO_"+id_td+"_"+fecha_form+"_OVO_"+rs.getString(2)+"'  >   "+rs.getString(17)+" </td>       <td "+edit15+"      class='text-center celda_editable single_line'  >   0   </td> "
        + " </tr>";
          cont_fila++; 
        }
       
              String cabecera_mixto="<div id='second' style=' width: 200px;  float: right;  height: 5s00px;'> <table id='tb_preembarque_mixto' class='table table-bordered table-hover' style='width:100%'>"
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
            + "</thead> <tbody > ";
     String grilla_html2 ="";  
        rs2 = fuente.obtenerDato("  SELECT cod,clasificadora_ACTUAL,convert(varchar,FECHA_PUESTA,103)AS FECHA_PUESTA,  stuff(( select   ','+  [tipo_huevo] + ':'+convert(varchar,[cantidad])   "
                + "from [v_mae_stock_linea_mixtos] with (nolock) "
                + "                 where cod_carrito =  cod for XML path('') ),1,1,'')as fecha_involucrada "
                + "                 FROM  ( SELECT cod_carrito as cod,clasificadora_ACTUAL ,FECHA_PUESTA FROM v_mae_stock_linea_cajones12 with(nolock) "
                + "WHERE cod_carrito not in (select cod_carrito from  mae_log_ptc_det_pedidos with(nolock) where estado in (1,2) and u_medida='MIXTO') ) T ORDER BY 2,3");
       while(rs2.next())
        {
            grilla_html2=grilla_html2+ 
                    "<tr>" + 
                    "<td  >"+rs2.getString(1 )+"</td>"+  
                    "<td   >"+rs2.getString(2)+"</td>"+   "<td   >"+rs2.getString(3)+"</td>"+ 
                    "<td class='something' >"+rs2.getString(4)+"</td>"+ " <td><div class='btn btn-dark btn-sm' id='"+rs2.getString(1 )+"' onclick='seleccionar_mixtos( "+rs2.getString(1 )+" )'>SELECCIONE</div>   </td> </tr>";
        }
       
        clases.controles.DesconnectarBD();
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
 
        ob.put("grilla",cabecera+grilla_html+"</tbody></table></div>");
        ob.put("grilla_mixto",cabecera_mixto+grilla_html2+"</tbody></table></div></div></div></div>");
        out.print(ob);  %>
        
         