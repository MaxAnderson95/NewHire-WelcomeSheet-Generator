// Get template from Google Docs and name it
var docTemplatePC = "[REMOVED]";
var docTemplateMac = "[REMOVED]";
var docName = "New Hire Welcome Sheet"; //This can be anything.
var NSSCAddress = "[REMOVED]"
var WinderAddress = "[REMOVED]"

// When Form Gets submitted
function onFormSubmit(e) {
  var time_submitted = e.values[0];
  var first_name = e.values[1]; //0 is column A, 1 is column B etc... this sets the variable to the value of whatever the form submitter put in the 1st question box.
  var last_name = e.values[2];
  var full_name = first_name + " " + last_name;
  var first_initial = first_name.substring(0,1).toUpperCase(); //.substring (0,1) says to take the character values From 0 up until 1. This essentially grabs the first letter of the string. 
  var last_initial = last_name.substring(0,1).toUpperCase(); //.toUpperCase() converts all characters to uppercase if they arent already. This has to do with the password being case sensitive.
  var contractor = e.values[3]; //This grabs the value of the contractor question which asks if the user is a contactor. It's either Yes or No.
  var email_address = e.values[4]; //this specifys the email address(es) that we will send the Google Doc to later. The form automatically collects this.
  var campus = e.values[5]; //This grabs what campus the user is on.
  var computer_type = e.values [6]; //This grabs what type of computer the user is on, Mac or PC
  
  var formatted_first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1).toLowerCase();
  var formatted_last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1).toLowerCase();
  var formatted_full_name = formatted_first_name + " " + formatted_last_name;
  
  if (computer_type === "Mac") {
    var docTemplate = docTemplateMac
    }
  
  if (computer_type === "PC") {
    var docTemplate = docTemplatePC
    }

// Setting the variable "folder" the ID of a folder in my drive named "New Hire Sheets". This ID was the last part of the url after the / when browsing to the folder in drive.
  var folder = DriveApp.getFolderById("[REMOVED]"); 
// Get document template, copy it as a new temp doc to the holding folder, and save the Doc’s id.
  var copyId = DriveApp.getFileById(docTemplate)
                .makeCopy(docName + ' for ' + formatted_full_name, folder)
                .getId();
    
// Open the temporary document.
   var copyDoc = DocumentApp.openById(copyId);
  
// Get the document’s body section.
   var copyBody = copyDoc.getActiveSection();
  
// Replace placeholder keys, in the google doc template.
   copyBody.replaceText('keyFirstName', formatted_first_name);
   copyBody.replaceText('keyLastName', formatted_last_name);
   copyBody.replaceText('keyFirstInitial', first_initial);
   copyBody.replaceText('keyLastInitial', last_initial);
   copyBody.replaceText('keyCampus', campus);
   copyBody.replaceText('To create a new hire form from this template go to http://goo.gl/[REMOVED]', " ");
  
  // This checks if the contractor question was answered Yes or No. It will add .contactor to the end of the email address if Yes is chosen.
  if (contractor === "Yes") {
   copyBody.replaceText('keyEmailLastName', formatted_last_name + '.Contractor');
  }
  if (contractor === "No") {
   copyBody.replaceText('keyEmailLastName', formatted_last_name);
  }
  
  //This checks how the campus question was answered and sets the address in the header.
  if (campus === "NSSC") {
    copyBody.replaceText('keyAddress', NSSCAddress);
  }
  
  if (campus === "Winder") {
    copyBody.replaceText('keyAddress', WinderAddress);
  }
  
// Save and close the temporary document
   copyDoc.saveAndClose();
  
// Add link to Google Doc, give permission to edit, and send the email
  copyDoc.addEditor(email_address);
  //copyDoc.setOwner(email_address); //This sets the owner of the doc to the user.
  var subject = "New Hire Welcome Sheet for " + formatted_full_name;
  var body    = "<HTML><BODY>"
  + "Hello!"
  + "<P>" + "A new hire welcome sheet for "
  + formatted_full_name + " was generated at: " + time_submitted + "." 
  + '<P>You can access the <A HREF="' + "https://docs.google.com/a/chicos.com/document/d/" + copyId + '">auto generated welcome sheet here</A>.'
  + "</HTML></BODY>";    
  MailApp.sendEmail(email_address, subject, body, {htmlBody: body});
  
}
