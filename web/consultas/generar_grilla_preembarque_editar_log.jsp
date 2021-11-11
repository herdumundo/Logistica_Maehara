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
    String id            = request.getParameter("id");
    String grilla_html="";
    String cabecera=" <table><thead><tr><th>TIPO</th><th>PEDIDO</th><th>CARGADOS</th><tbody >"
            + "<tr><td>A</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_a'   ></td><td><input type='text' style='font-weight: bold; color: black;' value='0' readonly  id='txt_tipo_ac'   ></td></tr>"
            + "<tr><td>B</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_b'    ></td><td><input type='text'     style='font-weight: bold; color: black;'  value='0' readonly  id='txt_tipo_bc'  ></td></tr>"
            + "<tr><td>C</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_c'    ></td><td><input type='text'  style='font-weight: bold; color: black;'  value='0'  readonly  id='txt_tipo_cc'  ></td></tr>"
            + "<tr><td>D</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_d'    ></td><td><input type='text'    style='font-weight: bold; color: black;' value='0'  readonly  id='txt_tipo_dc'  ></td></tr>"
            + "<tr><td>S</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_s'    ></td><td><input type='text'    style='font-weight: bold; color: black;' value='0' readonly   id='txt_tipo_sc'  ></td></tr>"
            + "<tr><td>J</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_j'   ></td><td><input type='text'    style='font-weight: bold; color: black;'  value='0' readonly   id='txt_tipo_jc'  ></td></tr>"
            + "<tr><td>MIXTO</td><td><input type='number' value='0' style='font-weight: bold; color: black;' class='txt_cargas' id='txt_tipo_mixto'   ></td><td><input type='text'    style='font-weight: bold; color: black;'  value='0' readonly   id='txt_tipo_mixtoc'  ></td></tr>"
            + "</tbody > </tr></thead> </table> <div id='div_grilla'  class='table_wrapper' >   "
            + "<div id='container' style='width: 2000px; margin: auto;'>"
            + "<div id='first' style=' width: 1800px; float: left; height: 700px;'> "
            + "<table id='tb_preembarque' class='table table-bordered table-hover' style='width:100%'>"
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
        ResultSet rs,rs2,rs3,rs4;
        rs = fuente.obtenerDato(" exec mae_log_select_pedidos_gen @id="+id+"  ");
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
               
              edit1="contenteditable='true'  style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+"\nIngresada:"+rs.getString(4)+"'";  
            }
                if(rs.getInt(5)>0){
              edit2="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+ "\nIngresada:"+rs.getString(6)+"'";  
            }
                if(rs.getInt(7)>0){
              edit3="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+   "\nIngresada:"+rs.getString(8)+"'";   

            }
                if(rs.getInt(9)>0){
              edit4="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+ "\nIngresada:"+rs.getString(10)+"'";   
            }
                if(rs.getInt(11)>0){
              edit5="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+    "\nIngresada:"+rs.getString(12)+"'";   
            }
                if(rs.getInt(13)>0){
              edit6="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+ "\nIngresada:'"+rs.getString(14)+"'";   
            }
                if(rs.getInt(15)>0){
              edit7="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+  "\nIngresada:"+rs.getString(16)+"'";  
            }
                if(rs.getInt(17)>0){
              edit8="contenteditable='true'style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+ "\nIngresada:"+rs.getString(18)+"'";   
            }
                if(rs.getInt(19)>0){
              edit9="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+    "\nIngresada:"+rs.getString(20)+"'";   
            }
                if(rs.getInt(21)>0){
              edit10="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+  "\nIngresada:"+rs.getString(22)+"'";   
            }
                if(rs.getInt(23)>0){
              edit11="contenteditable='true'style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+  "\nIngresada:"+rs.getString(24)+"'";   
            }
                if(rs.getInt(25)>0){
              edit12="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+     "\nIngresada:"+rs.getString(26)+"'";  
            }
                if(rs.getInt(27)>0){
              edit13="contenteditable='true' style='color: #fff; background: black;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+    "\nIngresada:"+rs.getString(28)+"'";   
            }
                if(rs.getInt(29)>0){
              edit14="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+  "\nIngresada:"+rs.getString(30)+"'";  
            }
                if(rs.getInt(31)>0){
              edit15="contenteditable='true' style='color: #fff; background: green;' title='Fecha puesta: "+rs.getString(1)+"\nTipo de huevo: "+rs.getString(2)+ "\nIngresada:"+rs.getString(32)+"'";   
            }
              
                
           grilla_html=grilla_html+
           "<tr   >"
                   + "<td   >"+rs.getString(1)+"</td>"
                   + "<td width='35'  class='text-center '> "+rs.getString(2)+" </td>"                                                                                  
                   + "<td  class='text-center'  ><b> "+rs.getString(3)+"    </b></td>   <td "+edit1+"      class='text-center celda_editable single_line'   >   "+rs.getString(4)+"     </td>"
                   + "<td  class='text-center'  ><b>"+rs.getString(5)+"   </b></td>     <td "+edit2+"       class='text-center celda_editable single_line'  >   "+rs.getString(6)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(7)+"</b></td>        <td "+edit3+"       class='text-center celda_editable single_line'  >   "+rs.getString(8)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(9)+"</b></td>        <td "+edit4+"       class='text-center celda_editable single_line'  >   "+rs.getString(10)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(11)+"</b></td>        <td "+edit5+"       class='text-center celda_editable single_line'  >   "+rs.getString(12)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(13)+"</b></td>        <td "+edit6+"       class='text-center celda_editable single_line'  >   "+rs.getString(14)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(15)+"</b></td>        <td "+edit7+"       class='text-center celda_editable single_line'  >   "+rs.getString(16)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(17)+"</b></td>       <td "+edit8+"       class='text-center celda_editable single_line'  >   "+rs.getString(18)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(19 )+"</b></td>       <td "+edit9+"       class='text-center celda_editable single_line'  >   "+rs.getString(20)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(21)+"</b></td>       <td "+edit10+"      class='text-center celda_editable single_line'  >   "+rs.getString(22)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(23)+"</b></td>       <td "+edit11+"      class='text-center celda_editable single_line'  >   "+rs.getString(24)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(25)+"</b></td>       <td "+edit12+"      class='text-center celda_editable single_line'  >   "+rs.getString(26)+"     </td>"
                   + "<td  class='text-center'  ><b>"+rs.getString(27)+"</b></td>       <td "+edit13+"      class='text-center celda_editable single_line'  >   "+rs.getString(28)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(29)+"</b></td>       <td "+edit14+"      class='text-center celda_editable single_line'  >   "+rs.getString(30)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString(31)+"</b></td>       <td "+edit15+"      class='text-center celda_editable single_line'  >   "+rs.getString(32)+"     </td> "
        + " </tr>";
          cont_fila++; 
        }
       
              String cabecera_mixto=" <div id='second' style=' width: 200px;  float: right;  height: 700px;'>  <table id='tb_preembarque_mixto' class='table table-bordered table-hover' style='width:100%'>"
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
        rs2 = fuente.obtenerDato("  SELECT "
                + " cod,clasificadora_ACTUAL,convert(varchar,FECHA_PUESTA,103)AS FECHA_PUESTA,  stuff(( select   ','+  [tipo_huevo] + ':'+convert(varchar,[cantidad])   "
                + " from [v_mae_stock_linea_mixtos] with (nolock) "
                + "                 where cod_carrito =  cod for XML path('') ),1,1,'')as fecha_involucrada "
                + "                 FROM  ( SELECT cod_carrito as cod,clasificadora_ACTUAL ,FECHA_PUESTA "
                + "     FROM v_mae_stock_linea_cajones12 with (nolock) WHERE cod_carrito not in ("
                + " select cod_carrito from  mae_log_ptc_det_pedidos with (nolock) where estado IN (1,2) and u_medida='MIXTO' and id_cab not in("+id+")) ) T ORDER BY 2,3");
       while(rs2.next())
        {
            grilla_html2=grilla_html2+ "<tr>" + "<td  >"+rs2.getString(1 )+"</td>"+  "<td   >"+rs2.getString(2)+"</td>"+   "<td   >"+rs2.getString(3)+"</td>"+ 
                    "<td class='something' >"+rs2.getString(4)+"</td>"+ " <td><div class='btn btn-dark btn-sm' id='"+rs2.getString(1 )+"' onclick='seleccionar_mixtos( "+rs2.getString(1 )+" )'>SELECCIONE</div>   </td> </tr>";
        }
       
       String cod_camion="";
       String cod_chofer="";
           rs3 = fuente.obtenerDato(" select * from mae_log_pct_cab_pedidos with (nolock) WHERE ID="+id);
       while(rs3.next())
        {
            cod_camion=rs3.getString("cantidad")+"_"+rs3.getString("id_camion");
            cod_chofer=rs3.getString("id_chofer");
        }
           
       String carros_mixtos="";
       int i=0;
       rs4 = fuente.obtenerDato(" select cod_carrito from  mae_log_ptc_det_pedidos with (nolock) where estado IN (1,2) and u_medida='MIXTO' and id_cab   in("+id+" )");
       while(rs4.next())
        {
            if(i==0){
            carros_mixtos=rs4.getString("cod_carrito") ;
            }
            else{
            carros_mixtos=carros_mixtos+","+rs4.getString("cod_carrito") ;
            }
            i++;
        }
       
        clases.controles.DesconnectarBD();
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
 
        ob.put("grilla",cabecera+grilla_html+"</tbody></table></div>");
        ob.put("grilla_mixto",cabecera_mixto+grilla_html2+"</tbody></table></div></div></div></div>");
        ob.put("cod_camion",cod_camion);
        ob.put("cod_chofer",cod_chofer);
        ob.put("carros_mixtos",carros_mixtos);
        ob.put("id_pedido",id);
        
        out.print(ob);  %>         