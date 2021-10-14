const bar = document.getElementById('bar');
const menu = document.getElementById('menu-visible');
const settings=document.getElementById("settings");
const settingsDropdown=document.getElementById("settings-dropdown");
const createJoinDropdown=document.getElementById("create-join-dropdown");
const create=document.getElementById("create");
//left nav bar slide in slide out
bar.addEventListener('click', function (e) {
  e.stopPropagation();
  menu.classList.toggle('menu-active');
});

menu.addEventListener('click', function (e) {
  e.stopPropagation();
});

document.addEventListener('click', function () {
  menu.classList.remove('menu-active');
});


//settings dropdown
settings.addEventListener('click',function(e){
  settingsDropdown.classList.toggle("settings-dropdown-active");
  console.log("dropdown should work");
});

//create/join dropdown
create.addEventListener('click',function(e){
  createJoinDropdown.classList.toggle("create-join-dropdown-active");
  console.log("create join dropdown should work");
});