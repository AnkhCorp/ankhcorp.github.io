var textarea = $('.term');

var i = 0;
var count = 0;

var start = 'ankhcorp.me'
var data = [
  './ankhcorp.me',
  'Ankh',
  '********',
  'Yes\n',
  'andre-rocha-',
  '@wicked1',
  '@coldx',
]

var info = [
  "Please state the user you would like to add > ",
  "Please set the password for 'Ankh' > ",
  "Shall we create a home directory for 'Ankh' > ",
  "Directory Created, time for your socials!\n\nPlease state your Linkedin username, if none put 'N/A' > ",
  "Please state your TryHackMe username, if none put 'N/A' > ",
  "Please state your Blog username, if none put 'N/A' > ",
  "Please state your Email, if none put 'N/A' > ",
];

runner(start)
 
function runner(text) {
  if (text) textarea.append(`<span style="color:rgb(255, 94, 102);">` + text.charAt(i) + `</span>`)

  i++;
  setTimeout(
    function() {
      if (i < text.length) {
        runner(text);
      } else {
        // textarea.append("</span>")
        textarea.append("<br>")
        i = 0;
        textarea.append(info[count])
        count++;
        runner(data[count])
        if (count >= data.length) {
          setTimeout(function() {feedbacker();}, 650);
        }
      }
    }, Math.floor(Math.random() * 80) + 55)
}

var count = 0;
var time = 1;

function feedbacker() {
  textarea.append("[" + count / 1000 + "] " + output[i] + "<br>");
  if (time % 2 == 0) {
    i++;
    textarea.append("[" + count / 1000 + "] " + output[i] + "<br>");
  }
  if (time == 3) {
    i++;
    textarea.append("[" + count / 1000 + "] " + output[i] + "<br>");
    i++;
    textarea.append("[" + count / 1000 + "] " + output[i] + "<br>");
    i++;
    textarea.append("[" + count / 1000 + "] " + output[i] + "<br>");
  }
  window.scrollTo(0, document.body.scrollHeight);  
  i++;
  time = Math.floor(Math.random() * 4) + 1;
  count += time;
  setTimeout(
    function() {
      if (i < output.length - 2)
        feedbacker();
      else {
        textarea.append("<br>Initialising...<br>");
        setTimeout(function() {$(".load").fadeOut(2000);}, 1000);
      }
    },time);
}

var output = [
  "\nInformation complete! Initializing database.",
  "debug: Creating user account 'Ankh'",
  "debug: Setting user account password",
  "debug: Creating user home directory, /home/Ankh",
  "debug: Granting sudo privileges to user 'Ankh'",
  "debug: Setting Linkedin account name 'andre-rocha-'",
  "debug: Setting TryHackMe username '@wicked1'",
  "debug: Setting Medium username '@coldx'",
  "debug: Account initialized!"
];
