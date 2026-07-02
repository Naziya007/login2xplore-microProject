

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var collegeDBName = "COLLEGE-DB";
var projectRelationName = "PROJECT-TABLE";
var connToken = "90935091|-31949246687862364|90903587";

$('#projectid').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getProjectIdAsJsonObj() {
    var projectid = $('#projectid').val();
    var jsonStr = {
        id: projectid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#projectname').val(data.name);
    $('#assignedto').val(data.assignedTo);
    $('#assigndate').val(data.assignmentDate);
    $('#deadline').val(data.deadline);
}

function resetForm() {
    $('#projectid').val("");
    $('#projectname').val("");
    $('#assignedto').val("");
    $('#assigndate').val("");
    $('#deadline').val("");
    $('#projectid').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#update').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#projectid').focus();
}

function validateData() {
    var projectid, projectname, assignedto, assigndate, deadline;
    projectid = $('#projectid').val();
    projectname = $("#projectname").val();
    assignedto = $("#assignedto").val();
    assigndate = $('#assigndate').val();
    deadline = $("#deadline").val();

    if (projectid === "") {
        alert("Project ID missing");
        $("#projectid").focus();
        return "";
    }
    if (projectname === "") {
        alert("Project Name missing");
        $("#projectname").focus();
        return "";
    }
    if (assignedto === "") {
        alert("Assigned To missing");
        $("#assignedto").focus();
        return "";
    }
    if (assigndate === "") {
        alert("Assignment Date missing");
        $("#assigndate").focus();
        return "";
    }
    if (deadline === "") {
        alert("Deadline missing");
        $("#deadline").focus();
        return "";
    }

    var jsonStrObj = {
        id: projectid,
        name: projectname,
        assignedTo: assignedto,
        assignmentDate: assigndate,
        deadline: deadline
    };
    return JSON.stringify(jsonStrObj);
}

function getProject() {
    var projectIdJsonObj = getProjectIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, collegeDBName, projectRelationName, projectIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status === 400) {
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#projectname").focus();

    } else if (resJsonObj.status === 200) {

        $("#projectid").prop('disabled', true);
        fillData(resJsonObj);

        $("#update").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#projectname").focus();

    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, collegeDBName, projectRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#projectid').focus();
}

function updateData() {
    $('#update').prop("disabled", true);
    var jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, collegeDBName, projectRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#projectid').focus();
}