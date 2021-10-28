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
  e.stopPropagation();
});
settings.addEventListener('click',function(e){
  settingsDropdown.classList.toggle("settings-dropdown-active");
  createJoinDropdown.classList.remove('create-join-dropdown-active');
  console.log("dropdown should work");
});
settingsDropdown.addEventListener('click', function (e) {
  e.stopPropagation();
});

document.addEventListener('click', function () {
  settingsDropdown.classList.remove('settings-dropdown-active');
});


//create/join dropdown
create.addEventListener('click',function(e){
  e.stopPropagation();
});
create.addEventListener('click',function(e){
  createJoinDropdown.classList.toggle("create-join-dropdown-active");
  settingsDropdown.classList.remove('settings-dropdown-active');
  console.log("create join dropdown should work");
});
createJoinDropdown.addEventListener('click', function (e) {
  e.stopPropagation();
});

document.addEventListener('click', function () {
  createJoinDropdown.classList.remove('create-join-dropdown-active');
});

function joinClassroom(){
  console.log("working");
  var x=document.getElementById("join");
      x.style.display = "block";
  }
  function closejoinclassroom(){
    var x=document.getElementById("join");
      x.style.display = "none";
  }