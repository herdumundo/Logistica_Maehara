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
<%@include  file="../chequearsesion.jsp" %>

<%@page contentType="application/json; charset=utf-8" %>



<%     
    String area       = (String) sesionOk.getAttribute("usuario");

    clases.controles.connectarBD();
    fuente.setConexion(clases.controles.connect);
    String id            = request.getParameter("id");
    String grilla_html="";
    String cabecera=" <table id='tb_preembarque' class='table table-bordered table-hover' style='width:100%'>"
            + "<thead>"
              + " <tr>"
            + "<th rowspan='2'  style='color: #fff; background: gray;'><b>Fecha puesta</b></th>  "
            + " <th rowspan='2' ><b>Tipo</b></th>  "
            + " <th colspan='8' class='text-center' style='color: #fff; background: green;  ' ><b><a id='td_ccha'>CCHA TOTAL CARGADOS:0</a></b></th>   </tr>"
            
            + " <tr>" 
            + " <th  style='color: #fff; background: black;' >LIB</th>      <th style='color: #fff; background: black;' >Cant</th>"
            + " <th  style='color: #fff; background: green;'>Acep</th>      <th style='color: #fff; background: green;' >Cant</th>"
            + " <th  style='color: #fff; background: green;'>Invo</th>      <th  style='color: #fff; background: green;'>Cant</th>"
            + " <th  style='color: #fff; background: green;'>LDO</th>      <th  style='color: #fff; background: green;'>Cant</th>   </tr>"
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
             
     
            grilla_html=grilla_html+
            "<tr   >"
                   + "<td>"+rs.getString(1)+"</td>"
                   + "<td width='35'  class='text-center '> "+rs.getString(2)+" </td>"                                                                                  
                   + "<td  class='text-center'  ><b> "+rs.getString("liberados_"+area)+"    </b></td>   <td "+edit1+"   class='text-center celda_editable single_line'>   "+rs.getString("liberadosing_"+area)+"     </td>"
                   + "<td  class='text-center'  ><b>"+rs.getString("aceptar_"+area)+"       </b></td>   <td "+edit2+"   class='text-center celda_editable single_line'>   "+rs.getString("aceptadosing_"+area)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString("invo_"+area)+"          </b></td>   <td "+edit3+"   class='text-center celda_editable single_line'>   "+rs.getString("involucradosing_"+area)+"     </td>"
                   + "<td class='text-center'   ><b>"+rs.getString("lavados_"+area)+"       </b></td>   <td "+edit4+"   class='text-center celda_editable single_line'>   "+rs.getString("lavadosing_"+area)+"     </td>"
                  
        +   " </tr>";
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
                + "                 FROM  ( SELECT cod_carrito as cod,clasificadora_ACTUAL ,FECHA_PUESTA FROM v_mae_stock_linea_cajones12 WHERE cod_carrito not in (select cod_carrito from  mae_log_ptc_det_pedidos where estado=1 and u_medida='MIXTO' and id_cab not in("+id+")) ) T ORDER BY 2,3");
       while(rs2.next())
        {
            grilla_html2=grilla_html2+ "<tr>" + "<td  >"+rs2.getString(1 )+"</td>"+  "<td   >"+rs2.getString(2)+"</td>"+   "<td   >"+rs2.getString(3)+"</td>"+ 
                    "<td class='something' >"+rs2.getString(4)+"</td>"+ " <td><div class='btn btn-dark btn-sm' id='"+rs2.getString(1 )+"' onclick='seleccionar_mixtos( "+rs2.getString(1 )+" )'>SELECCIONE</div>   </td> </tr>";
        }
       
       String cod_camion="";
           rs3 = fuente.obtenerDato(" select * from mae_log_pct_cab_pedidos WHERE ID="+id);
       while(rs3.next())
        {
            cod_camion=rs3.getString("cantidad")+"_"+rs3.getString("id_camion");
        }
           
       String carros_mixtos="";
       int i=0;
       rs4 = fuente.obtenerDato(" select cod_carrito from  mae_log_ptc_det_pedidos where estado=1 and u_medida='MIXTO' and id_cab   in("+id+" )");
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
 
        ob.put("grilla",cabecera+grilla_html+"</tbody></table>");
        ob.put("grilla_mixto",cabecera_mixto+grilla_html2+"</tbody></table>");
        ob.put("cod_camion",cod_camion);
        ob.put("carros_mixtos",carros_mixtos);
        ob.put("id_pedido",id);
        
        
        out.print(ob);  %>
        
         