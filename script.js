const signupbtn=document.getElementById('btn_signup');
const signinbtn=document.getElementById('btn_signin');
const container = document.getElementById('container');
signupbtn .addEventListener('click',() => {
    container.classList.add('mystyle');
    console.log("vks");
});
    
signinbtn.addEventListener('click', () => {
    container.classList.remove('mystyle');
    container.classList.add('content');
});