(function () {
  var currentScript = document.currentScript;
  if (!currentScript) {
    return;
  }

  var headerUrl = currentScript.getAttribute('data-header-url') || '/assets/partials/site-header.html';

  try {
    var request = new XMLHttpRequest();
    request.open('GET', headerUrl, false);
    request.send(null);

    var isSuccess = (request.status >= 200 && request.status < 300) || request.status === 0;
    if (!isSuccess) {
      throw new Error('Unexpected status ' + request.status);
    }

    currentScript.insertAdjacentHTML('afterend', request.responseText);
    currentScript.remove();
  } catch (error) {
    console.error('Failed to load shared site header:', error);
  }
})();
