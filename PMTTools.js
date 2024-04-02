// ==UserScript==
// @name         PMTTools
// @namespace    http://tampermonkey.net/
// @version      2024-04-02
// @description  try to take over the world!
// @author       TKMSMC
// @match        https://www.physicsandmathstutor.com/advertising/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=physicsandmathstutor.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        GM_notification
// ==/UserScript==

(function() {

    'use strict';

    // Your custom HTML content to replace the page content
    const customHTML = `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Physics & Maths Tutor</title>
  <!-- Include Tailwind CSS -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    @keyframes buttonHover {
      0% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
      100% { transform: translateY(0); }
    }
    .button-animation:hover {
      animation: buttonHover 0.3s ease;
    }
    #windowSize {
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  </style>
</head>
<body class="bg-gray-100">

  <div class="container mx-auto py-10">
    <!-- Title -->
    <h1 class="text-3xl font-semibold text-center mb-8">PHYSICS & MATHS TUTOR: But better</h1>

    <hr class="my-8 border-gray-300">

    <div class="flex justify-center">
      <!-- Maths Section -->
      <div class="inline-block mr-8">
        <h2 class="text-lg font-semibold mb-2">Maths</h2>
        <div class="space-y-4">
          <a href="https://www.physicsandmathstutor.com/maths-revision/a-level-ocr-mei/papers/" class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center button-animation">Past Papers</a>
          <a href="https://www.physicsandmathstutor.com/maths-revision/a-level-ocr-mei/" class="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center button-animation">Topics</a>
        </div>
      </div>

      <!-- Physics Section -->
      <div class="inline-block">
        <h2 class="text-lg font-semibold mb-2">Physics</h2>
        <div class="space-y-4">
          <a href="https://www.physicsandmathstutor.com/past-papers/a-level-physics/" class="inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center button-animation">Past Papers</a>
          <a href="https://www.physicsandmathstutor.com/physics-revision/a-level-ocr-b/" class="inline-block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center button-animation">Topics</a>
        </div>
      </div>
    </div>
    <!-- Separator -->
    <hr class="my-8 border-gray-300">
    <div class="text-center mb-8">
      <select class="bg-white border border-gray-300 rounded-md px-3 py-1 mb-4 inline-block">
        <option>2018</option>
        <option>2019</option>
        <option>2020</option>
        <option>2021</option>
      </select>
    </div>
    <!-- Quick Links Section -->
    <div class="flex justify-center">
      <!-- Maths Quick Links -->
      <div class="mr-10">
        <h2 class="text-lg font-semibold mb-4">Maths</h2>
        <div class="space-y-2">
          <button class="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center button-animation" id="maths1">Paper 1</button>
          <button class="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center button-animation" id="maths2">Paper 2</button>
          <button class="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center button-animation" id="maths3">Paper 3</button>
        </div>
      </div>

      <!-- Physics Quick Links -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Physics</h2>
        <div class="space-y-2">
          <button class="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center button-animation" id="physics1">Paper 1</button>
          <button class="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center button-animation" id="physics2">Paper 2</button>
          <button class="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center button-animation" id="physics3">Paper 3</button>
        </div>
      </div>
    </div>
  </div>

  <div id="windowSize"></div>

  <script>
    function updateWindowSize() {
      const windowSizeElement = document.getElementById('windowSize');
      windowSizeElement.textContent = \`${window.innerWidth}px x ${window.innerHeight}px\`;
    }

    window.addEventListener('resize', updateWindowSize);
    window.addEventListener('DOMContentLoaded', updateWindowSize);
  </script>

</body>
</html>
    `;

    // Replace the page content with the custom HTML
    document.documentElement.innerHTML = customHTML;

    // Function to extract selected year from the selector
    function getSelectedYear() {
        return $('select').val(); // Assuming only one select element on the page
    }

    // Function to display a toast notification
    function showToast(message) {
        // Create toast container
        var toastContainer = document.createElement("div");
        toastContainer.setAttribute("style", "position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 9999;");

        // Create toast notification
        var toast = document.createElement("div");
        toast.setAttribute("style", "background-color: #ff3333; color: #fff; padding: 10px 20px; border-radius: 5px; display: flex; align-items: center;");

        // Add exclamation symbol
        var exclamation = document.createElement("span");
        exclamation.setAttribute("style", "margin-right: 10px; font-size: 20px;");
        exclamation.innerText = "!";

        // Add message text
        var messageText = document.createElement("span");
        messageText.innerText = message;

        // Append elements to the toast notification
        toast.appendChild(exclamation);
        toast.appendChild(messageText);
        toastContainer.appendChild(toast);
        document.body.appendChild(toastContainer);

        // Hide the toast notification after 3 seconds
        setTimeout(function() {
            toastContainer.remove();
        }, 3000);
    }

    // Function to redirect to Maths Paper
    function redirectToMathsPaper(buttonNumber) {
        const year = getSelectedYear();
        let url;
        if (year === "2020" || year === "2021") {
            url = `https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/OCR-MEI/Paper-${buttonNumber}/QP/Nov%20${year}%20QP.pdf`;
        } else {
            url = `https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/OCR-MEI/Paper-${buttonNumber}/QP/June%20${year}%20QP.pdf`;
        }
        checkURLAndRedirect(url);
    }

    // Function to redirect to Physics Paper
    function redirectToPhysicsPaper(buttonNumber) {
        const year = getSelectedYear();
        let url;
        if (year === "2020" || year === "2021") {
            url = `https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/OCR-B/Paper-${buttonNumber}/Nov%20${year}%20QP%20-%20Paper%20${buttonNumber}%20OCR%20(B)%20Physics%20A-level.pdf`;
        } else {
            url = `https://pmt.physicsandmathstutor.com/download/Physics/A-level/Past-Papers/OCR-B/Paper-${buttonNumber}/June%20${year}%20QP%20-%20Paper%20${buttonNumber}%20OCR%20(B)%20Physics%20A-level.pdf`;
        }
        checkURLAndRedirect(url);
    }

    // Function to check URL and redirect
    function checkURLAndRedirect(url) {
        window.open(url, '_blank');
    }

    // Add click event listeners to Maths Paper buttons
    $('#maths1').click(function() { redirectToMathsPaper(1); });
    $('#maths2').click(function() { redirectToMathsPaper(2); });
    $('#maths3').click(function() { redirectToMathsPaper(3); });

    // Add click event listeners to Physics Paper buttons
    $('#physics1').click(function() { redirectToPhysicsPaper(1); });
    $('#physics2').click(function() { redirectToPhysicsPaper(2); });
    $('#physics3').click(function() { redirectToPhysicsPaper(3); });
})();
