M.AutoInit();
document.addEventListener('DOMContentLoaded', function() {
   let elems = document.querySelectorAll('.modal');
   const options = {
      startingTop: '10%',
      endingTop: '10%'
   }
   let instances = M.Modal.init(elems, options);
 });
