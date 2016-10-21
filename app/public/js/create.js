$(function() {

    $('.create-user').submit(function(e) {
        e.preventDefault();
        $.post('create', {
            firstName: $('#firstName').val(),
            lastName: $('#firstName').val(),
            role: $('#role').val(),
            email: $('#email').val(),
            password: $('#password').val()
        }, function(data){console.log(data)});
    });
});
