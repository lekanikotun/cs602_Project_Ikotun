$(function() {

    $('.login-form').submit(function(e) {
        e.preventDefault();
        $.post('login', {
            email: $('#email').val(),
            password: $('#password').val()
        }, function(data){console.log(data)});
    });
});
