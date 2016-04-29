# NewHire-WelcomeSheet-Generator
Generates a welcome sheet in Google Docs for a new hire based on the information from a Google Form

## Instructions
1. Create your templates in Google Docs
![ScreenShot](https://raw.github.com/MaxAnderson95/NewHire-WelcomeSheet-Generator/master/Template_PC.png)
![ScreenShot](https://raw.github.com/MaxAnderson95/NewHire-WelcomeSheet-Generator/master/Template_Mac.png)
2. Create your form
![ScreenShot](https://raw.github.com/MaxAnderson95/NewHire-WelcomeSheet-Generator/master/Form.png)
3. Go to the auto generated Responses Google Sheet and open the script editor and paste the script
![ScreenShot](https://raw.github.com/MaxAnderson95/NewHire-WelcomeSheet-Generator/master/Responses_Google_Sheet.PNG)



## Things to note
* Note that when you see [REMOVED] in the script, that must be replaced with your relavent information.
* This script is currently configured to work in a Google Apps for Business environemnt. Google Apps for Business adds an aditional feature to Google Forms to allow the form to automatically collect the username (email address) of the user who submitted the form. Therefore if you wish to adopt this to a standard Google account that isn't for business or education, you'll need to add an additional mandatory field to your form to have the submitter add their email address so that they can recieve the creted welcome sheet.
* You attach this google script to the Google Sheet that collects the information from the Form, not to the Form itself.
