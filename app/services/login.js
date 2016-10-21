$(function() {

    $('.create-user').submit(function(e) {
        e.preventDefault();
        $.post('create', {
            email: $('#email').val(),
            password: $('#password').val()
        }, function(data){console.log(data)});
    });
});
