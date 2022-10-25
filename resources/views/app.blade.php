<!DOCTYPE html> 
<html  dir="<?php  echo isset($_COOKIE["current_language"]) ? $_COOKIE["current_language"]==='en' ?   'ltr' : 'rtl'  : 'rtl' ?>" lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height: 100%;overflow-y: auto;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Kafo</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <!-- Styles -->
    <!-- -->
    <?PHP


    // if($_COOKIE["current_language"]){
    //     echo $_COOKIE["current_language"]==='ar';
    // }



    if(isset($_SESSION['lang']))
{
    switch($_SESSION['lang']):
    case 'eng':
        // LTR Style
        ?>
        <link href="{{ asset('react/css/app.css?20210220') }}" rel="stylesheet"> 

        <?PHP
    break;
    case 'ar':
        // RTL Style
        ?>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@coreui/coreui-pro@4.2.1/dist/css/coreui.rtl.min.css" integrity="sha384-GHQI6zsjRwqe9o8uAkyd92DfQSKrP4hKmN66MYm9WxJkOqC7DAJ/Glff/Iioxyit" crossorigin="anonymous">
        <?PHP

    break;
    default:
        ?>
                <link href="{{ asset('react/css/app.css?20210220') }}" rel="stylesheet"> 

      
        <?PHP
    endswitch;
}
?>
</head>

<body>
    <div id="app">
        <!--style="margin-right: 7px;"-->
    </div>
    <script src="{{ asset('react/main/js/app.js?20210220') }}" defer></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-q9CRHqZndzlxGLOj+xrdLDJa9ittGte1NksRmgJKeCV9DrM7Kz868XYqsKWPpAmn" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@coreui/coreui-pro@4.2.1/dist/js/coreui.min.js" integrity="sha384-FI3ZcGr5XHHHMfE5DC/gMVe03mmQB8MxeP3No4FUxOrL3a9qvDedrviBTkX+qHtz" crossorigin="anonymous"></script> -->
    <style>
        body {
           
            font-size:'0.875rem';
            overflow: unset !important;
            padding-right: 0px!important;
        }
    </style>
</body>




</html>
<script>
  //  console.log = function() {}
//
  //
// Creating a cookie after the document is ready
$(document).ready(function () {
    createCookie("current_language", localStorage.getItem('current_language') || 'ar', "10");
});
</script>