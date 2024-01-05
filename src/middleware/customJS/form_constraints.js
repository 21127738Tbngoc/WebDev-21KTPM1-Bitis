const User = require("../../model/user")

async function dataValidate(Data)
{
    let info = await axios.get('http://localhost:3000/admin/', {
        params: Data
    })
    if (info) return `${Data.keys()[0]} không hợp lệ hoặc đã tồn tại`;
    else return `${Data.keys()[0]} có thể sử dụng`;
}

function checkPasswordStrength(password) {
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
    if (specialCharRegex.test(password)) {
        return 'Mật khẩu phải chứa ít nhất một ký tự đặt biệt (!@#$%^&*()_+\-=[\]{};\':"\\|,.<>/?)'
    }
  
    return 'Mật khẩu hợp lệ'
  }

function formControl()
{
    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    $('#username-notice').innerHTML = dataValidate({username: username.value})
    $('#password-notice').innerHTML = checkPasswordStrength(password)
    $('#email-notice').innerHTML = dataValidate({email: email.value})
}

// form>
//             <label for="username">Username</label>
//             <input type="text" id="username" name="username" placeholder="nguyenvana" required>
//             <label for="username">Email</label>
//             <input type="text" id="email" name="username" placeholder="nguyenvana@gmail.com" required>
//             <label for="password">Mật khẩu</label>
//             <input type="password" id="password" name="username" placeholder="••••••••••••••••" required>
//             <p class="additional-text">Quên mật khẩu?</p>
//             <button type="submit" class="btn primary-button">Đăng ký</button>
//             <br>
//             <p>Đã có tài khoản? <a class="link-button-small" href="#">Đăng nhập ngay</a></p>
//         </form>