function goBack() {window.history.back();}
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
    object.value = object.value.slice(0, object.maxLength)
}
var topMenu = jQuery("#ToC, #Rlink, .SerMenu"),
offset = -250,
topMenuHeight = topMenu.outerHeight()+offset,
menuItems =  topMenu.find('a[href*="#"]'),
scrollItems = menuItems.map(function(){
    var href = jQuery(this).attr("href"),
    id = href.substring(href.indexOf('#')),
    item = jQuery(id);
    if (item.length) { return item; }
});
menuItems.click(function(e){
    var href = jQuery(this).attr("href"),
    id = href.substring(href.indexOf('#'));
    offsetTop = href === "#" ? 0 : jQuery(id).offset().top-topMenuHeight+3;
    jQuery('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});
jQuery(window).scroll(function(){
    var fromTop = jQuery(this).scrollTop()+topMenuHeight;
    var cur = scrollItems.map(function(){
        if (jQuery(this).offset().top < fromTop)
        return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";               
   
    menuItems.parent().removeClass("active");
    if(id){
        menuItems.parent().end().filter("[href*='#"+id+"']").parent().addClass("active");
    }
});

document.addEventListener("DOMContentLoaded", function(){
    $('.preloader').delay().fadeOut();
});
function counter(){
    var count = setInterval(function(){
        var c = parseInt($(".preloader-counter").text());
        $(".preloader-counter").text((++c).toString());
        if(c == 100) {
            clearInterval(count);
            $(".preloader-counter").addClass("hide");
            $(".preloader").addClass("active");
        }
    },40)
} counter();
$(document).ready(function(){
    if ($(window).width()>992){
        $(window).scroll(function(){
            if ($(this).scrollTop()>10){
                $('.sws-bottom-panel').addClass('hidebottom');
            } else{
                $('.sws-bottom-panel').removeClass('hidebottom');
            }
        });
    };
    $(document).click(function (event) {
        if (!$(event.target).is('.ConSupport *')) {
            $('.ConSupport').collapse('hide');
        }
    });
    var url = window.location;
    $('.navbar-nav li a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
    $('.navbar-nav li .dropdown a').filter(function() {
        if(url == $(this).attr("href")){
            $(this).closest('li .collapse').collapse('show');
        }
        return this.href == url;
    }).closest('.Dropdown').addClass('active');
    
    $('.menubar, .free-estimation').click(function (e) {
        if ($(this).hasClass('collapsed')){
            $('body').css('overflow','inherit');
        } else {
            $('body').css('overflow','hidden');
            e.stopPropagation();
        }
    });
    // Country Select //
    var conr;
    $('.CountryCode .dropdown-menu').find('li').click(function(e) {
        e.preventDefault();
        var spa = $(this).data('text');
        var conc = $(this).data('code');
        $('.CountryCode .dropdown-toggle span').text(spa);
        $('.CountryCode .dropdown-toggle>i').show();
        $('.CountryCode .dropdown-toggle>b').hide();
        $('.CountryCode .dropdown-toggle .flagicon').removeClass("fi-"+conr).addClass("fi-"+conc);
        $('.CountryCode .CounCode').val(spa);
        conr = conc;
    });
    $('.countrylist .SearchConCode').on( "keyup", function() {
        val = $(this).val().toLowerCase();
        $(".countrylist li").each(function () {
            $(this).toggle($(this).text().toLowerCase().includes(val));
        });
    });
});
jQuery.event.special.touchstart={
    setup:function(_, ns, handle){
        this.addEventListener("touchstart", handle,{passive:!ns.includes("noPreventDefault")});
    }
};
jQuery.event.special.touchmove={
    setup:function(_, ns, handle){
        this.addEventListener("touchmove", handle,{passive:!ns.includes("noPreventDefault")});
    }
};
jQuery.event.special.wheel={
    setup:function(_, ns, handle){
        this.addEventListener("wheel", handle,{passive:true});
    }
};
jQuery.event.special.mousewheel ={
    setup:function(_, ns, handle){
        this.addEventListener("mousewheel", handle,{passive:true});
    }
};