//Code from github example of cropper js

window.addEventListener('DOMContentLoaded', function () {
    var avatar = document.getElementById('profile');
    var image = document.getElementById('image');
    var input = document.getElementById('input');

    var $alert = $('.alert');
    var $modal = $('#modal');
    var cropper;

    $('[data-toggle="tooltip"]').tooltip();

    input.addEventListener('change', function (e) {
      var files = e.target.files;
      var done = function (url) {
        input.value = '';
        image.src = url;
        $alert.hide();
        $modal.modal('show');
      };
      var reader;
      var file;
      var url;

      if (files && files.length > 0) {
        file = files[0];

        if (URL) {
          done(URL.createObjectURL(file));
        } else if (FileReader) {
          reader = new FileReader();
          reader.onload = function (e) {
            done(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });

    $modal.on('shown.bs.modal', function () {
      cropper = new Cropper(image, {
        aspectRatio: 4/3,
        viewMode: 2,//Best mode
      });
    }).on('hidden.bs.modal', function () {
      cropper.destroy();
      cropper = null;
    });

    document.getElementById('crop').addEventListener('click', function () {
      var initialAvatarURL;
      var canvas;
      
      $modal.modal('hide');
      console.log("HERE")
      if (cropper) {
        canvas = cropper.getCroppedCanvas({
          width: 800,
          height: 600,
        });
        initialAvatarURL = avatar.src;
        avatar.src = canvas.toDataURL();
       
        $alert.removeClass('alert-success alert-warning');
        canvas.toBlob(async function (blob) {
          blob=await blob.text();
          blob=canvas.toDataURL('image/jpeg');
         

        },'image/jpeg');
      }
    });
  });