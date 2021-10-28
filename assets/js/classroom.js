const copyButton = document.getElementById("copy-code-btn");
copyButton.addEventListener('click',function(e){
    /* Get the text field */
    var copyText = document.getElementById("classroom-code");
  
    /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.dataset.classroomCode);
    // console.log("should have been to copied to clipboard:"+copyText.dataset.classroomCode);
    /* Alert the copied text */
    alert("Copied the text: " + copyText.dataset.classroomCode);
});