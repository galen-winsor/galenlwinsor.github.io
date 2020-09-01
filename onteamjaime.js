// shows the upload button and name of the input file once the user uploads
// a file
function findFile(input) {
  if (input.files && input.files[0]) {
    document.getElementById('file-label').innerHTML = input.files[0].name;
    document.getElementById('submit').style.display = 'inline';
  }
}

// toggles visibility of an element
function showHide(element) {
  var x = document.getElementById(element);
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

// hides an element
function hide(element) {
  document.getElementById(element).style.display = "none";
}

function show(e) {
  document.getElementById(e).style.opacity = "1";
  document.getElementById(e).style.zIndex = "2";
}

function expand(e) {
  document.getElementById(e).style.height = "auto";
}

// fetches an image from an api, creating a url object from that image blob
// and inserting it into a img element
function fetchImage(e) {
  const myRequest = new Request('https://wlcs.wombat-labs.com/photoframer/upload', {
    method: 'POST',
    mode: 'cors',
    body: new FormData(document.getElementById('avatar-form')),
    redirect: 'follow'
  });

  const myImage = document.getElementById('avatar-generated');

  document.getElementById('display-box').style.display = "flex";

  fetch(myRequest)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(myBlob => {
      const url = URL.createObjectURL(myBlob);
      myImage.src = url;
      document.getElementById('download').href = url;
    })
    .catch(error => {
      alert("Oops! There was an issue with your upload. Please try again.");
      document.getElementById('display-box').style.zIndex = "-1";
      console.error('There has been a problem with your fetch operation:', error);
    });

  return false;
}
