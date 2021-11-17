
<%@page import="org.json.JSONObject"%>
<%@ page language="java" import="java.sql.*" errorPage="error.jsp" %>
 <%@include  file="../chequearsesion.jsp" %>
<%@ page contentType="application/json; charset=utf-8" %>
    <%
   
        JSONObject ob = new JSONObject();
        ob=new JSONObject();
        String contenedor="";
        String  perfil       = (String) sesionOk.getAttribute("area");

        String menu="";
        
        if(perfil.equals("L")){
            menu="  <div class='col-xl-3 col-md-6 mb-4' onclick='' id='div_cuadro_pedido' > "+
           "   <div class='card border-left-dark   shadow h-100 py-2' > "+
           "     <div class='card-body'>"+
            "      <div class='row no-gutters align-items-center'>"+
           "         <div class='col mr-2'>"+
           "             <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:black;'  >REGISTRO</font></div>"+
           "                 <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:black;'   color='red'>PEDIDO DE EMBARQUE</font></div>"+
            "          <div class='h5 mb-0 font-weight-bold text-black'><font color='black'> </font></div>"+
           "         </div>"+
            "        <div class='col-auto'>"+
           "           <i class='fas fa-truck fa-2x  '></i>"+
           "         </div>"+
          "        </div>"+
          "      </div>"+
          "    </div>"+
         "   </div>      "
                    + " <div class='col-xl-3 col-md-6 mb-4'  id='div_cuadro_pedido_update'  >"+
         "     <div class='card border-left-primary   shadow h-100 py-2' >"+
         "       <div class='card-body'>"+
         "         <div class='row no-gutters align-items-center'>"+
         "           <div class='col mr-2'>"+
         "             <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:red;'   color='red'>MODIFICACION</font></div>"+
         "             <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:red;'   color='red'>PEDIDOS GENERADOS</font></div>"+
          "            <div class='h5 mb-0 font-weight-bold text-black'><font color='red'> </font></div>"+
          "          </div>"+
          "          <div class='col-auto'>"+
          "            <i class='fas fa-plus fa-2x text-rojo '></i>"+
          "          </div>"+
          "        </div>"+
          "      </div>"+
          "    </div>"+
          "  </div>   " +
          " <div class='col-xl-3 col-md-6 mb-4' id='div_cuadro_pedido_rep' >" +
          "    <div class='card border-left-success   shadow h-100 py-2' >" +
          "      <div class='card-body'>" +
          "        <div class='row no-gutters align-items-center'>" +
          "          <div class='col mr-2'>" +
          "            <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:black;'   color='black'>MENU</font></div>" +
          "            <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:black;'   color='black'>REPORTES VARIOS</font></div>" +
          "            <div class='h5 mb-0 font-weight-bold text-black'><font color='black'> </font></div>" +
          "          </div>" +
          "          <div class='col-auto'>" +
          "            <i class='fas fa-list fa-2x text-black'></i>" +
          "          </div>" +
          "        </div>" +
          "      </div>" +
          "    </div>" +
          "  </div>" ;
            
        }
        else if(perfil.equals("F")){
             menu="     <div class='col-xl-3 col-md-6 mb-4'    id='div_cuadro_facturacion' >" +
              " <div class='card border-left-primary   shadow h-100 py-2' >" +
                " <div class='card-body'>" +
                "   <div class='row no-gutters align-items-center'>" +
                "     <div class='col mr-2'>" +
                "       <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:green;'   color='green'>PEDIDOS PENDIENTES A FACTURAR</font></div>" +
                "       <div class='h5 mb-0 font-weight-bold text-black'><font color='green'> </font></div>" +
                "     </div>" +
                "     <div class='col-auto'>" +
                "       <i class='fas fa-file-invoice fa-2x text-verde'></i>" +
                "     </div>" +
                "   </div>" +
                " </div>" +
              " </div>" +
            "  </div> " ;
              
        }
        else {
            
             menu="    <div class='col-xl-3 col-md-6 mb-4'  id='div_cuadro_cyo'  >" +
             "  <div class='card border-left-success   shadow h-100 py-2' >" +
               "  <div class='card-body'>" +
               "    <div class='row no-gutters align-items-center'>" +
               "      <div class='col mr-2'>" +
               "        <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:black;'   color='black'>PEDIDOS DISPONIBLES</font></div>" +
               "        <div class='text-xs font-weight-bold   text-uppercase mb-1'><font style='font-weight: bold;color:black;'   color='black'>CYO</font></div>" +
               "        <div class='h5 mb-0 font-weight-bold text-black'><font color='black'> </font></div>" +
               "      </div>" +
               "      <div class='col-auto'>" +
               "        <i class='fas fa-list-alt fa-2x text-black'></i>" +
               "      </div>" +
               "    </div>" +
               "  </div>" +
              " </div>" +
            "  </div>" ;
        
               
        }
          
        ob.put("menu",menu);
        out.print(ob);
    %>