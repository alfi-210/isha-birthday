BIRTHDAY SURPRISE V5 - RESPONSIVE + ANSWER SAVING

1. PHOTO
Put your photo in the assets folder and rename it exactly:
  birthday-photo.jpg

The website already points to assets/birthday-photo.jpg.

2. VIDEO
Put your video in the assets folder and rename it exactly:
  birthday-video.mp4

The website already points to assets/birthday-video.mp4.

Optional: add a thumbnail/poster image named:
  video-poster.jpg

3. PERSONAL TEXT / DOB
Open config.js. Change:
  name
  birthday (YYYY-MM-DD)
  wish
  question
  photoCaption
  videoIntro
  finalTitle
  finalMessage
  signature

4. SEE HER ANSWER
The website can save her answer to a Google Sheet.

A) Create a blank Google Sheet.
B) Open Extensions -> Apps Script.
C) Delete the starter code and paste:

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const answer = (e.parameter.answer || "").trim();
  const name = (e.parameter.name || "").trim();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Answer"]);
  }
  sheet.appendRow([new Date(), name, answer]);
  return ContentService.createTextOutput("Saved");
}

D) Click Deploy -> New deployment.
E) Select Web app.
F) Set Execute as: Me.
G) Set Who has access: Anyone.
H) Deploy and copy the Web app URL ending in /exec.

Then open config.js and paste that URL between the quotes:
  answerWebhook: "PASTE-YOUR-WEB-APP-URL-HERE",

Now, when she submits the question, her answer is added to your Google Sheet with the date/time.

IMPORTANT:
- Do not put your Google Sheet URL into the website. Use only the Apps Script Web App /exec URL.
- Test it once yourself before sending the birthday link.
- The answer-saving feature requires the website to be hosted online; opening the files locally is not the final setup.

5. RESPONSIVE DESIGN
The page is designed to fit normal phone and desktop screens without needing browser zoom. Small screens can scroll naturally if content is taller than the viewport.


V5 FIXES
- Fixed the photo filename mismatch: index.html now uses assets/birthday-photo.jpg.
- The full photo stays inside the Polaroid frame.
- Chapter content above the photo is no longer cut off on phones.
- Short phone screens can scroll naturally within each chapter.
- Normal phone and desktop view should not require browser zoom.

MEDIA
Photo: assets/birthday-photo.jpg
Video: assets/birthday-video.mp4
Optional poster: assets/video-poster.jpg
