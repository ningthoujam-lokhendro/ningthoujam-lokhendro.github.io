$(document).ready(function(){
    $("#markdown-toc").detach().appendTo('.toc-sidebar');
    //$('.toc-sidebar').attr({"class":"nav nav-pills nav-stacked"});
    //$('#markdown-toc').attr({"class":"nav navbar-nav"});

    //$('.post-content h2').prepend('<span class="glyphicon glyphicon-grain"></span> ');
    //$('.post-content h3').prepend('<span class="glyphicon glyphicon-hand-right"></span> ');
    $('#toc').BootSideMenu({
        side: "left",
        width: "30%",
        autoClose:  true,
        pushBody: false
    });

    $('#markdown-toc').addClass('list-group');
    $('#markdown-toc li').addClass('list-group collapse');
    $('#markdown-toc a').addClass('list-group-item');
    $('#markdown-toc a').filter(function(){
        return $(this).children().length > 0
    }).each(function(){
        $(this).attr({
        "data-toggle":"collapse"
        });
    });
});
