<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
	<meta name="author" content="AdminKit">
	<meta name="keywords" content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="shortcut icon" href="img/icons/icon-48x48.png" />
	<link rel="canonical" href="https://demo-basic.adminkit.io/" />

	<title>Grupo Maehara</title>
        <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
        <link href="estilos/css/sweetalert.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/styles_loading.css" rel="stylesheet">  
        <link href="estilos/css/bootstrap4-toggle.min.css" rel="stylesheet" type="text/css"/>
         <link href="lib/themes/main.css?v=1.0.2" rel="stylesheet" />
        <link href="lib/themes/default.css?v=1.0.2" rel="stylesheet" id="theme_base" />
        <link href="lib/themes/default.date.css?v=1.0.2" rel="stylesheet" id="theme_date" />
        <link href="estilos/css/colores.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/parpadeo.css?v=1.1.0" rel="stylesheet" type="text/css"/>
        <link href="estilos/efecto_boton.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/dataTables.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/select.dataTables.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/checkboxes.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/buttons.bootstrap4.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/DateTimePicker.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
        <link href="estilos/css/jquery-ui.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/jquery-ui.multidatespicker.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/rowGroup.dataTables.min.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/css/modal.css" rel="stylesheet" type="text/css"/>
        <link href="estilos/jquery.loadingModal.css" rel="stylesheet" type="text/css"/>
        <link href="static/css/app.css" rel="stylesheet">
</head>

<body >
	<div class="wrapper">
		<nav id="sidebar" class="sidebar js-sidebar">
			<div class="sidebar-content js-simplebar">
                            <a class="sidebar-brand" onclick="ir_menu_principal()">
          <span class="align-middle">Menu</span>
        </a>

				<ul class="sidebar-nav">
					<li class="sidebar-header">
						Módulos
					</li>
                                        <li class="sidebar-item active">
						<li class="sidebar-item active">
						<a data-bs-target="#pages" data-bs-toggle="collapse" class="sidebar-link" aria-expanded="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout align-middle"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> <span class="sidebar">Pre embarque</span>
						</a>
						<ul id="pages" class="sidebar-dropdown list-unstyled collapse show" data-bs-parent="#sidebar" style="">
							<li class="sidebar-item "   ><a class="sidebar-link" >Pedidos  <i class="align-middle" data-feather="truck"></i></a></li>
							<li class="sidebar-item"><a class="sidebar-link"  >Informe pedidos  <i class="align-middle" data-feather="list"></i></a></li>
                                                </ul>
					</li>
                                </ul>

			
			</div>
		</nav>

		<div class="main">
			<nav class="navbar navbar-expand navbar-light navbar-bg">
				<a class="sidebar-toggle js-sidebar-toggle">
          <i class="hamburger align-self-center"></i>
        </a>

				<div class="navbar-collapse collapse">
					<ul class="navbar-nav navbar-align">
						 
						 
						<li class="nav-item dropdown">
							<a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                <i class="align-middle" data-feather="settings"></i>
              </a>

							<a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
                <img src="static/img/avatars/Yemita.png" class="avatar img-fluid rounded me-1" alt="Yemita" /> <span class="text-dark"><i class="align-middle" data-feather="settings"></i>Opciones</span>
               </a>
							<div class="dropdown-menu dropdown-menu-end">
							 
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="#"> <i class="align-middle" data-feather="log-out"></i> Salir</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>

                             
<br> 
                    <div id="contenido_principal" class="row"  > 
                    
                    </div>
                    
                    


                    <div id="contenido_modulos" > 
                    
                    </div>
                    
                    
                    
                    
                    
                    
			 
		</div>
	</div>

    <script src="static/js/app.js"></script>
    <script src="js/jquery-3.5.1.js" type="text/javascript"></script>
    <script src="js/dataTables.js" type="text/javascript"></script>
    <script src="js/dataTables.select.js" type="text/javascript"></script>
    <script src="estilos/js/checkboxes.js" type="text/javascript"></script>
    <script src="estilos/js/dataTables.buttons.js" type="text/javascript"></script>
    <script src="estilos/js/buttons.bootstrap4.min.js" type="text/javascript"></script>
    <script src="estilos/js/jszip.min.js" type="text/javascript"></script>
    <script src="estilos/js/pdfmake.min.js" type="text/javascript"></script>
    <script src="estilos/js/vfs_fonts.js" type="text/javascript"></script>
    <script src="estilos/js/buttons.html5.min.js" type="text/javascript"></script>
    <script src="estilos/js/buttons.print.min.js" type="text/javascript"></script>
    <script src="js/buttons.colVis.min.js.js" type="text/javascript"></script>
    <script src="estilos/js/dataTables.fixedHeader.min.js" type="text/javascript"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
   
    <script src="estilos/vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="js/multiselect.js"></script>
    <script src="js/bootstrap4-toggle.js" type="text/javascript"></script>
    <script src="js/swetalert_net.js" type="text/javascript"></script>
    <script src="lib/picker.js?v=1.0.0"></script>
    <script src="lib/picker.date.js?v=1.1.0"></script>
    <script src="lib/legacy.js?v=1.1.0"></script>
    <script src="js/grilla.js" type="text/javascript"></script>
     
    <script src="js/multi_select.js" type="text/javascript"></script>
    <script src="estilos/js/jquery-ui.min.js" type="text/javascript"></script>
    <script src="js/modal.js" type="text/javascript"></script>
    <script src="js/dataTables.rowGroup.js" type="text/javascript"></script>
    <script src="js/jquery.loadingModal.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <script src="js/controladores.js?v=1.0" type="text/javascript"></script>
    <script src="js/controladores_viajes.js?v=1.0" type="text/javascript"></script>
    <script src="js/funciones.js" type="text/javascript"></script>
</body>

</html>