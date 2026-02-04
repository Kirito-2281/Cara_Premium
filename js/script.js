$(document).ready(function(){
    $(document).on  ('click' ,'.round', function () {
        $('.round').removeClass('active');
        $(this).addClass('active');
        var ind = $(this).index('.round');
        $('.photos').first().animate({'margin-left':(ind * - 100)+'%'}, 1000);
        $('.desc').addClass('di-none');
        $('.desc:nth-child('+(ind+1)+')').removeClass('di-none');
    });
});