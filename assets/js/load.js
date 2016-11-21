$(document).ready(function(){
    $("#markdown-toc").detach().appendTo('.toc-sidebar');
    //$('.toc-sidebar').attr({"class":"nav nav-pills nav-stacked"});
    //$('#markdown-toc').attr({"class":"nav navbar-nav"});
    $('.post-content h2').prepend('<span class="glyphicon glyphicon-grain"></span> ');
    $('.post-content h3').prepend('<span class="glyphicon glyphicon-hand-right"></span> ');
    $('#toc').BootSideMenu({
        side: "left",
        width: "30%"
    });
});
