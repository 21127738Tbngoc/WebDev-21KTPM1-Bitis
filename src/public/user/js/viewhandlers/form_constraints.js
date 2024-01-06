async function dataValidate(Data)
{
    let info = await $.ajax(
        {
            url: 'http://localhost:3000/admin/',
            method: 'GET',
            data: {filter:Data},
            success: (data,status) => {return {data: data, status: status}},
            error: (errors) => errors
        });

    if (info.length > 0 ) return `${Object.keys(Data)[0]} không hợp lệ hoặc đã tồn tại`;
    else return `${Object.keys(Data)[0]} có thể sử dụng`;
}

async function checkPasswordStrength(password) {
    // Độ dài tối thiểu của mật khẩu
    const minLength = 8;

    // Biểu thức chính quy để kiểm tra ký tự chữ hoa, chữ thường, số và ký tự đặc biệt
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Kiểm tra độ dài của mật khẩu
    if (password.length < minLength) {
        return 'Mật khẩu quá ngắn'
    }

    // Kiểm tra sự xuất hiện của chữ hoa, chữ thường, số và ký tự đặc biệt
    if (!uppercaseRegex.test(password)) {
        return 'Mật khẩu phải chứa ít nhất 1 chữ cái VIẾT HOA'
    }
    if (!lowercaseRegex.test(password)) {
        return 'Mật khẩu phải chứa ít nhất 1 chữ cái viết thường'
    }
    if (!digitRegex.test(password)) {
        return 'Mật khẩu phải chứa ít nhất một chữ số'
    }
    if (!specialCharRegex.test(password)) {
        return 'Mật khẩu phải chứa ít nhất một ký tự đặt biệt (!@#$%^&*()_+\-=[\]{};\':"\\|,.<>/?)'
    }

    return 'Mật khẩu hợp lệ'
}

async function formControl()
{
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let notice = username.value ===''? 'Username không hợp lệ': await dataValidate({username: username.value});
    document.getElementById('username-notice').innerText  = notice;
    document.getElementById('password-notice').innerText = await checkPasswordStrength(password);
    notice = email.value ===''? 'email không hợp lệ': await dataValidate({email: email.value});
    document.getElementById('email-notice').innerText = notice;
}

$('#username').blur(formControl)
$('#password').blur(formControl)
$('#email').blur(formControl)

console.log(query)