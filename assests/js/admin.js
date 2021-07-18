//multi step form wizard builder (core)
//Create by: Hassan Tafreshi
// Email: hasan.tafreshi@gmail.com
// WhiteStudio.team

let state_check_ws_p = 1;
var currentTab_ws = 0;
let valueJson_ws_p = [];
let exportJson_ws = [];
let tabActive_ws = -1;
const proUrl_ws = `https://whitestudio.team/`
let pro_ws = true;
let stepMax_ws = 1
let edit_emsFormBuilder = false;

let formName_ws = `EasyFormBuilder-${Math.random().toString(36).substr(2, 3)}`;
let email_efb = "null";
let trackingCode_efb = 'false';
let form_ID_emsFormBuilder = 0;
let highestAmount_emsFormBuilder;
let form_type_emsFormBuilder = 'form';
let stepNames_ws = [efb_var.text.define, efb_var.text.stepTitles, "null"];
if (localStorage.getItem("valueJson_ws_p")) localStorage.removeItem('valueJson_ws_p');
add_dasboard_emsFormBuilder()

const elements = {
  /*   1: { type: 'button', icon: 'fa-sign-in', pro_ws: false }, */
  2: { type: 'text', icon: 'fa-text-width', pro_ws: false },
  3: { type: 'password', icon: 'fa-lock', pro_ws: false },
  4: { type: 'email', icon: 'fa-envelope-o', pro_ws: false },
  5: { type: 'number', icon: 'fa-sort-numeric-asc', pro_ws: false },
  6: { type: 'file', icon: 'fa-picture-o', pro_ws: false },
  8: { type: 'date', icon: 'fa-calendar', pro_ws: true },
  9: { type: 'tel', icon: 'fa-phone-square', pro_ws: false },
  10: { type: 'textarea', icon: 'fa-align-justify', pro_ws: false },
  11: { type: 'checkbox', icon: 'fa-check-square-o', pro_ws: false },
  12: { type: 'radiobutton', icon: 'fa-dot-circle-o', pro_ws: false },
  13: { type: 'multiselect', icon: 'fa-check-circle-o', pro_ws: false },
  14: { type: 'url', icon: 'fa-link', pro_ws: true },
  15: { type: 'range', icon: 'fa-arrows-h', pro_ws: true },
  16: { type: 'color', icon: 'fa-paint-brush', pro_ws: true },
}
function run_code_ws_1() {
  if (localStorage.getItem("valueJson_ws_p")) {
    valueJson_ws_p = JSON.parse(localStorage.getItem("valueJson_ws_p"));
    // valueJson_ws_p.reverse((a, b) => b.amount - a.amount)[0]
    let step = 0;


    importJson = valueJson_ws_p;
    for (let i of valueJson_ws_p) {
      const r = i.steps;
      step = r > step ? r : step;
    }
    stepMax_ws = Object.keys(importJson).length ? step : stepMax_ws;
    fun_edit_emsFormBuilder();
  } else {
    stepMax_ws = 3;
  }



  ShowTab_emsFormBuilder(currentTab_ws);
  //console.log(document.getElementById("prevBtn").style.display ,'prevBtn')

}

function ShowTab_emsFormBuilder(n) {
  if (n == -1 && currentTab_ws == -1) {
    console.log(n, currentTab_ws, n != -1 && currentTab_ws != -1);
    return
  }
  var x = document.getElementsByClassName("tab");
  if (x[n]) {
    x[n].style.display = "block";
    x[n].classList.add("fadeIn");
  }

  if (n == 0) {
    // console.log(document.getElementById("prevBtn").style.display ,'0')
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById('prevBtn').disabled = true;
  } else {
    document.getElementById("prevBtn").style.display = "inline";

    document.getElementById('prevBtn').disabled = false;
    // console.log(document.getElementById("prevBtn").style.display ,'1')
  }

  /* if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = '<i class="fa fa-angle-double-right"></i>';
  } else {
    document.getElementById("nextBtn").innerHTML = '<i class="fa fa-angle-double-right"></i>';
  } */




  fixStepIndicator(n)

  //console.log(document.getElementById("prevBtn").style.display ,'exit')
}

function nextPrev(n) {

  if (currentTab_ws == 0 && n == -1) {

    return;
  }
  if (n != 0) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm_emsFormBuilder()) return false;

    x[currentTab_ws].style.display = "none";
    currentTab_ws = currentTab_ws + n;
    stepName_emsFormBuilder(currentTab_ws);
    if (n == 1) {
      // موقتی تا باگ نمایش بعد از تغییر تعداد صفحات پیدا شود
      document.getElementById('steps').disabled = true;
    }
  } else {

    document.getElementById("nextprevious").style.display = "block";
    document.getElementById("all-steps").style.display = "";
    document.getElementById("emsFormBuilder-form-title").style.display = "block";
    document.getElementById("emsFormBuilder-text-message-view").style.display = "none";
    document.getElementById("firsTab").style.display = "block";
    for (el of document.querySelectorAll('.finish')) {
      el.classList.remove("finish");
      el.classList.remove("active");
      el.classList.contains('first')
    }

    // console.log(document.getElementById("prevBtn").style.display);
    currentTab_ws = n;
  }



  // این قسمت برای تنظیم که در دراپ زون محتوا قرار دارد یا نه
  // راه حل می توان هر دراپ زون را جدا جدا بررسی کرد یا اینکه قبل از ذخیره سازی دردیتا بیس بررسی شود


  if (x && currentTab_ws >= x.length) {

    document.getElementById("nextprevious").style.display = "none";
    document.getElementById("all-steps").style.display = "none";
    document.getElementById("emsFormBuilder-form-title").style.display = "none";
    document.getElementById("emsFormBuilder-text-message-view").style.display = "block";
    endMessage_emsFormBuilder()


  }


  ShowTab_emsFormBuilder(currentTab_ws);


}



function validateForm_emsFormBuilder() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab_ws].getElementsByTagName("input");
  for (const input of x[currentTab_ws].getElementsByTagName("input")) {
    //require
    if (input.classList.contains("require")) {
      if (input.value == "") {
        input.className += " invalid"; valid = false;
        document.getElementById("message-area").innerHTML = alarm_emsFormBuilder(efb_var.text.pleaseFillInRequiredFields)

      } else {

        if (document.getElementById("alarm_emsFormBuilder")) document.getElementById("message-area").innerHTML = ""
      }
    }else if(input.id=="email__efb"){
      console.log('email');
    }
  }
  if (valid == true) { document.getElementsByClassName("step")[currentTab_ws].className += " finish"; } return valid;
  /* 
    for (i = 0; i < y.length; i++) {
      if (y[i].value == ""  ) { y[i].className += " invalid"; valid = false; }
    } if (valid) { document.getElementsByClassName("step")[currentTab_ws].className += " finish"; } return valid; */
}
function fixStepIndicator(n) { var i, x = document.getElementsByClassName("step"); for (i = 0; i < x.length; i++) { x[i].className = x[i].className.replace(" active", ""); } x[n].className += " active"; }


function run_code_ws_2() {

  document.getElementById("steps").addEventListener("change", (e) => {
    createSteps()

  })// end event change creats tabs
  document.getElementById("form_name").addEventListener("change", (e) => {
    // createSteps()

    const v = document.getElementById("form_name").value;
    formName_ws = v ? v : `Emsfb-${Math.random().toString(36).substr(2, 3)}`
    if (valueJson_ws_p == 0) {
      valueJson_ws_p.push({ formname: formName_ws, email: email_efb, trackingCode: trackingCode_efb })
      saveLocalStorage_emsFormBuilder()
    } else {
      valueJson_ws_p[0].formName=formName_ws;
      saveLocalStorage_emsFormBuilder()

    }


  })// end event change formName_ws

  if(document.getElementById("email__efb")){
    document.getElementById("email__efb").addEventListener("change", (e) => {
      const v = document.getElementById("email__efb").value;
      email_efb = v ? v : email_efb;
      if (valueJson_ws_p == 0) {
        valueJson_ws_p.push({ formname: formName_ws, email: email_efb, trackingCode: trackingCode_efb })
        saveLocalStorage_emsFormBuilder()
      } else {
        const v = document.getElementById("email__efb").value;
        email_efb = v ? v : email_efb;
        valueJson_ws_p[0].email ? valueJson_ws_p[0].email =email_efb :Object.assign(valueJson_ws_p[0], { email: email_efb })
        valueJson_ws_p[0].email ? console.log("exists") : console.log("Nexists")
        saveLocalStorage_emsFormBuilder()
  
      }
  
    })// end event change email__efb

  }//end if


  if (document.getElementById("trackingcode_emsFormBuilder")) {
    document.getElementById("trackingcode_emsFormBuilder").addEventListener("click", (e) => {
      let checked = document.getElementById("trackingcode_emsFormBuilder").checked;
      // console.log(`checked [${checked}]`);
      //  console.log(valueJson_ws_p);
      trackingCode_efb = `${checked}`;


      if (valueJson_ws_p == 0) {
        valueJson_ws_p.push({ formname: formName_ws, email: email_efb, trackingCode: trackingCode_efb })
        saveLocalStorage_emsFormBuilder()
      } else {
        if(valueJson_ws_p[0].trackingCode){
          valueJson_ws_p[0].trackingCode =trackingCode_efb
        }else{
          Object.assign(valueJson_ws_p[0], { trackingCode: trackingCode_efb })
          val.EfbVersion = 1.3;
        }
        saveLocalStorage_emsFormBuilder()
  
      }

    })// end event trackingcode_emsFormBuilder
  }


}


function addNewElement_emsFormBuilder(elementId, rndm, value) {

  let nameV = "";
  let idV = "";
  let classV = "";
  let tooltipV = "";
  let requiredV = "";
  let allowMultiSelectV = "";
  let clanderV = "";
  let fileV = ""
  let fileDrogAndDropV = "";
  if (value != false) {

    nameV = Object.values(value.find(x => x.name))
    idV = Object.values(value.find(x => x.id))
    classV = Object.values(value.find(x => x.class))
    tooltipV = Object.values(value.find(x => x.tooltip))
    requiredV = (Object.values(value.find(x => x.required)))
    if (elementId == 'date') clanderV = (Object.values(value.find(x => x.clander)))
    else if (elementId == 'file') { fileV = (Object.values(value.find(x => x.file))); fileDrogAndDropV = Object.values(value.find(x => x.fileDrogAndDrop)); }
    else if (elementId == "multiselect") allowMultiSelectV = Object.values(value.find(x => x.allowMultiSelect))
    nameV = nameV == "null" ? "" : nameV;
    idV = idV == "null" ? "" : idV;
    classV = classV == "null" ? "" : classV;
    tooltipV = tooltipV == "null" ? "" : tooltipV;
    requiredV = requiredV == "false" ? false : true;
    allowMultiSelectV = allowMultiSelectV == "false" ? false : true;
    fileDrogAndDropV = fileDrogAndDropV == "false" ? false : true;

  }
  let atr = {
    1: { id: `${rndm}-name_${elementId}`, value: nameV, placeholder: "Name", label: 'label', id_: rndm },
    2: { id: `${rndm}-id_${elementId}`, value: idV, placeholder: "ID", label: 'id' },
    3: { id: `${rndm}-class_${elementId}`, value: classV, placeholder: "Class1,Class2", label: 'class' },
    4: { id: `${rndm}-tooltip_${elementId}`, value: tooltipV, placeholder: "Placeholder or tooltip", label: 'tooltip' },
    5: { id: `${rndm}-required_${elementId}"`, required: requiredV }

  }
  if (elementId == "multiselect") atr = Object.assign(atr, { 6: { id: `${rndm}-allowMultiSelect_${elementId}`, allowMultiSelect: allowMultiSelectV } })
  else if (elementId == "file") atr = Object.assign(atr, { 6: { id: `${rndm}-fileDrogAndDrop_${elementId}`, fileDrogAndDrop: fileDrogAndDropV } })

  let amount;
  let ll = document.getElementsByClassName(`dropZone`);
  ll = document.getElementsByTagName(`a`);
  for (let l of ll) {
    //789
    if (l.dataset.id) amount = Number(l.dataset.id) + 1;
  }
  amount = amount ? amount : 1;
  let newEl = ""
  for (a in atr) {

    if (a < 5) newEl += ` 
    <div class="form-group row ${atr[a].placeholder != "Name" ? `${rndm}-advance" style="display: none;"` : `"`}>
      <label for="${atr[a].id}" class="col-sm-2 col-form-label">${efb_var.text[`${atr[a].label}`]}</label>
      <div class="col-sm-10">
          <input type="text" id="${atr[a].id}" class="insertInput ml-1 mr-1 mt-1 mb-1 ${atr[a].placeholder == "Name" ? "require" : ""}" placeholder="${atr[a].placeholder}" ${atr[a].value !== "" ? `value="${atr[a].value}"` : ""}>
      </div>
    </div>
    `;
    if (atr[a].placeholder == "Name") {
      newEl += `<div class="mt-3 mb-4 mx-1 text-small"> <i class="divder fa fa-caret-right" id="${rndm}-divder" onClick="fun_show_advance_add_atr_emsFormBuilder('${rndm}')"> </i> <span class="mb-0 ml-1 mr-1 mt-1 mb-1"  onClick="fun_show_advance_add_atr_emsFormBuilder('${rndm}')">${efb_var.text.advancedCustomization} </span><hr class="solid" ></div>`;
    }
    if (a == 5) newEl += `<div class="form-check ml-1 mr-1 mt-1 mb-1">
    <input class="insertInput form-check-input" type="checkbox" id="${atr[a].id}" ${atr[a].required ? "checked" : ""}>
    <label class="col-sm-2   form-check-label" for="${atr[a].id}">
    ${efb_var.text.required}  
    </label>
  </div>`;
    //edit below code 789 fun_multiselect_button_emsFormBuilder 

    if (a == 6 && elementId == 'multiselect') newEl += pro_ws == true && form_type_emsFormBuilder != "survey" ? fun_multiselect_button_emsFormBuilder(elementId, pro_ws, atr, a) : `<div class="form-check ml-1 mr-1 mt-1 mb-1" onClick="unlimted_show_emsFormBuilder('${form_type_emsFormBuilder != "survey" ? efb_var.text.availableInProversion : `🚫`}')"><input class="insertInput form-check-input" type="checkbox" id="${atr[a].id}" disabled><label class=" form-check-label" for="${atr[a].id}">${efb_var.text.allowMultiselect} </label><small class=" text-warning"> <b>${efb_var.text.clickHereForActiveProVesrsion}<b></small></div>`;
    //    if (a == 6 && pro_ws==true && elementId=='multiselect') newEl += fun_multiselect_button_emsFormBuilder(elementId,pro_ws,atr,a);
    if (a == 6 && pro_ws == true && elementId == 'file') newEl += fun_dragAndDrop_button_emsFormBuilder(elementId, pro_ws, atr, a) || `<div class="form-check ml-1 mr-1 mt-1 mb-1"  onClick="unlimted_show_emsFormBuilder('${efb_var.text.availableInProversion}')"><input class="insertInput form-check-input" type="checkbox" id="${atr[a].id}"  disabled><label class=" form-check-label" for="${atr[a].id}"">${efb_var.text.DragAndDropUI}</label><small class=" text-warning"> <b>${efb_var.text.clickHereForActiveProVesrsion}</b></small></div>`
    if (a == 6 && pro_ws != true && elementId == 'file') newEl += `<div class="form-check ml-1 mr-1 mt-1 mb-1"  onClick="unlimted_show_emsFormBuilder('${efb_var.text.availableInProversion}')"><input class="insertInput form-check-input" type="checkbox" id="${atr[a].id}"  disabled><label class=" form-check-label" for="${atr[a].id}"">${efb_var.text.DragAndDropUI}</label><small class=" text-warning"> <b>${efb_var.text.clickHereForActiveProVesrsion}</b></small></div>`
  }

  const statusOfDelete = rndm != "emaillogin" && rndm != "passwordlogin" && rndm != "emailRegisterEFB" && rndm != "passwordRegisterEFB" && rndm != "usernameRegisterEFB" ? true : false;

  const newElement = `
  <div id="${rndm}" class="section border border-primary rounded mb-0 h-30 view overlay ml-3 mr-3 mt-2 mb-1" draggable="true">
    <div class="card-header success-color white-text" > 
      <a data-toggle="collapse" data-target="#${rndm}-c" data-id="${amount}" onClick="funIconArrow_emsFormBuilder('${rndm}')" > <i class="fa fa-caret-down" id="${rndm}-icon"> </i> </a> 
      <a class="mb-0 ml-1 mr-1 mt-1 mb-1"   data-toggle="collapse" data-target="#${rndm}-c" id="${rndm}-b" onClick="funIconArrow_emsFormBuilder('${rndm}')">
      ${efb_var.text[elementId]}
      </a>       
    </div>
    <div id="${rndm}-c" class=" ml-3 mt-2 mb-2 mr-3 collapse show">
    <div id="${rndm}-g">
       ${newEl}
       ${ /*elementId == "date" ? `<div class="form-group row"><label for="${atr[1].id_}-date" class="col-sm-3 col-form-label">Calendar</label><div class="col-sm-9"><select class="insertInput ml-1 mr-1 mt-1 mb-1 " id="${atr[1].id_}-date"><option value="Gregorian" ${clanderV=='Gregorian' ||clanderV=='' ? 'selected':''}>Gregorian</option><option value="Persian" ${clanderV=='Persian' ? 'selected':''}>Persian calendar</option><option value="Arabic" ${clanderV=='Arabic' ? 'selected':''}>Arabic calendar</option></select></div></div>`:`` */ ''}
       ${elementId == "file" ? `<div class="form-group row"><label for="${atr[1].id_}-file" class="col-sm-3 col-form-label">${efb_var.text.fileType}</label><div class="col-sm-9"><select class=" ml-1 mr-1 mt-1 mb-1 insertInput" id="${atr[1].id_}-file"><option value="Document" ${fileV == 'Document' ? 'selected' : ''}>${efb_var.text.documents}</option><option value="Image" ${fileV == 'Image' || fileV == '' ? 'selected' : ''}>${efb_var.text.image}</option><option value="Media" ${fileV == 'Media' || fileV == '' ? 'selected' : ''}> ${efb_var.text.media}  ${efb_var.text.videoOrAudio}</option><option value="Zip" ${fileV == 'Zip' || fileV == '' ? 'selected' : ''}>${efb_var.text.zip}</option></select></div></div>` : ``}
       
       <input type="hidden" id="${rndm}-amount" value="${amount}">
        ${elementId == "radiobutton" || elementId == "checkbox" || (elementId == "multiselect") ? `<div id="${rndm}-o" class= "border-top">` : ""}
      </div>
      <button id="${rndm}" class="delete btn btn-danger btn-sm btn-rounded waves-effect waves-light ml-1 mr-1 mt-1 mb-1" type="submit" ${(form_type_emsFormBuilder == 'login' || form_type_emsFormBuilder == 'register') && statusOfDelete == false ? 'disabled' : ''}>${efb_var.text.delete}</button>
  ${elementId === "checkbox" || elementId === "radiobutton" || (elementId == "multiselect") ? ` <button id="${rndm}-oc"class="add-option btn btn-primary btn-sm btn-rounded waves-effect waves-light ml-1 mr-1 mt-1 mb-1 " type="submit" disabled>${efb_var.text.newOption}</button>` : ""}
    <a id="${rndm}-info" class="text-capitalize font-weight-lighter badge badge-warning text-wrap" onClick="${(form_type_emsFormBuilder == 'login' || form_type_emsFormBuilder == 'register') && statusOfDelete == false ? `over_message_emsFormBuilder('${efb_var.text.alert}','${efb_var.text.thisElemantWouldNotRemoveableLoginform}')` : `over_message_emsFormBuilder('${efb_var.text.info}','${efb_var.text.thisElemantAvailableRemoveable}') `}" >${(form_type_emsFormBuilder == 'login' || form_type_emsFormBuilder == 'register') && statusOfDelete == false ? efb_var.text.thisInputLocked : efb_var.text.info} </a>
    </div>
  </div>`;


  return newElement;
}

function addOject_emsFormBuilder(id, id_, value, type, value_of, group, step) {
  step = parseInt(step);

  let highestAmount = group !== "option" ? Number(document.getElementById(`${id_}-amount`).value) : null;
  highestAmount_emsFormBuilder = highestAmount;
  let ob = {};
  /* if (value_of != `allowMultiSelect` && value_of != 'required') value = (value.length > 0 && (value.match(/ /g) || []).length < value.length) ? value : ""
  else if (value_of != `fileDrogAndDrop` && value_of != 'required') value = (value.length > 0 && (value.match(/ /g) || []).length < value.length) ? value : "" */

  if (group === "notOption") {


    if (value_of == "name") {
      ob = { id_: id_, name: value, type: type, step: step, amount: highestAmount }
      //${efb_var.text[`${type}`].toUpperCase()}
      document.getElementById(`${id_}-b`).innerHTML = `${value} [${efb_var.text[`${type}`].toUpperCase()}]`;
    } else if (value_of == "id") {
      ob = { id_: id_, id: value, type: type, step: step, amount: highestAmount }
    } else if (value_of == "class") {
      ob = { id_: id_, class: value, type: type, step: step, amount: highestAmount }
    } else if (value_of == "tooltip") {
      ob = { id_: id_, tooltip: value, type: type, step: step, amount: highestAmount }
    } else if (value_of == "required") {
      value = value === false || value === 'false' ? "false" : true
      ob = { id_: id_, required: value, type: type, step: step, amount: highestAmount }
    } else if (value_of == "allowMultiSelect" && pro_ws) {
      ob = fun_allowMultiSelect_pro_emsFormBuilder(id_, value, type, step)

    } else if (value_of == "fileDrogAndDrop") {
      ob = fun_fileDrogAndDrop_ob_pro_emsFormBuilder(id_, value, type, step);


    } else if (type == "date") {
      Object.assign(ob, { clander: "Gregorian" });
    } else if (type == "file") {
      //Object.assign(ob,{file:"Document"}) ;
    }
  } else if (group === "option") {

    // add group to array object  789
    //function addOject_emsFormBuilder
    if (type.search("-") != -1) {
      const parents = type.substring(0, type.search("-"));
      id_ = id.substring(0, type.search("-"));
      value_of = type.substring((type.search("-")) + 1, type.search("_"));

      const test = id.search("date") != -1;

      if (id.search("date") != -1) { type = "date"; value_of = "clander"; }
      else if (id.search("file") != -1) { type = "file"; value_of = "file"; }

    }

    if (value_of == "name") {

      ob = { id_: id_, name: value, parents: type, type: "option", step: step }
    } else if (value_of == "id") {
      ob = { id_: id_, id: value, parents: type, type: "option", step: step }
    } else if (value_of == "class") {
      ob = { id_: id_, class: value, parents: type, type: "option", step: step }
    } else if (value_of == "tooltip") {
      ob = { id_: id_, tooltip: value, parents: type, type: "option", step: step }
    } else if (value_of == "required") {
      value = value === false || value === 'false' ? "false" : true
      ob = { id_: id_, required: value, parents: type, type: "option", step: step }
    } else if (value_of == "allowMultiSelect" && pro_ws) {
      value = value === false || value === 'false' ? "false" : true
      ob = fun_allowMultiSelect_pro_emsFormBuilder(id_, value, type, step)
    } else if (type === "date") {
      value == null || value == undefined ? value = 'Gregorian' : 0;
      ob = fun_date_ob_pro_emsFormBuilder(id_, value, type, step, highestAmount)
    } else if (type === "file") {
      (value == null || value == undefined) && value.length > 2 ? value = 'Document' : 0;
      ob = { id_: id_, file: value, type: type, step: step, amount: highestAmount }
    }


  }

  if (Object.keys(valueJson_ws_p).length === 0) {
    if (ob.id_) valueJson_ws_p.push(ob);
    saveLocalStorage_emsFormBuilder()
  } else {
    let foundIndex = valueJson_ws_p.findIndex(x => x.id_ == id_);
    //items[foundIndex] = item;

    let item = valueJson_ws_p[foundIndex];
    if (foundIndex != -1) {
      // if id_ of elemant exists on list
      let item = valueJson_ws_p[foundIndex];

      valueJson_ws_p[foundIndex] = item;

      switch (value_of) {
        case "name":

          const nm = { name: ob.name }
          valueJson_ws_p[foundIndex].name ? valueJson_ws_p[foundIndex].name = ob.name : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], nm)

          break;
        case "class":
          const clss = { class: ob.class };
          valueJson_ws_p[foundIndex].class ? valueJson_ws_p[foundIndex].class = ob.class : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], clss);

          break;
        case "id":

          const id = { id: ob.id };
          valueJson_ws_p[foundIndex].id ? valueJson_ws_p[foundIndex].id = ob.id : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], id);


          break;
        case "required":
          const required = { required: ob.required };
          valueJson_ws_p[foundIndex].required ? valueJson_ws_p[foundIndex].required = ob.required : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], required);
          break;
        case "tooltip":
          const tooltip = { tooltip: ob.tooltip };
          valueJson_ws_p[foundIndex].tooltip ? valueJson_ws_p[foundIndex].tooltip = ob.tooltip : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], tooltip);
          break;
        case "allowMultiSelect":
          const allowMultiSelect = { allowMultiSelect: ob.allowMultiSelect };
          valueJson_ws_p[foundIndex].allowMultiSelect && pro_ws ? valueJson_ws_p[foundIndex].allowMultiSelect = ob.allowMultiSelect : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], allowMultiSelect);
          break;
        case "clander":
          const clander = { clander: ob.clander };
          valueJson_ws_p[foundIndex].clander ? valueJson_ws_p[foundIndex].clander = ob.clander : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], clander);
          break;
        case "file":
          const file = { file: ob.file };
          valueJson_ws_p[foundIndex].file ? valueJson_ws_p[foundIndex].file = ob.file : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], file);

          break;
        case "fileDrogAndDrop":
          let fileDrogAndDrop = { fileDrogAndDrop: ob.fileDrogAndDrop }

          if (ob.fileDrogAndDrop != undefined) valueJson_ws_p[foundIndex].fileDrogAndDrop ? valueJson_ws_p[foundIndex].fileDrogAndDrop = ob.fileDrogAndDrop : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], fileDrogAndDrop);
          break;

      }

      saveLocalStorage_emsFormBuilder();

    } else {

      if (ob.id_) {

        valueJson_ws_p.push(ob);
        saveLocalStorage_emsFormBuilder();
      }

    }
  }

}// end function

function fillinput_emsFormBuilder() {
  if (Object.keys(valueJson_ws_p).length !== 0) {

    for (const item of valueJson_ws_p) {

      if (item.type !== "option") {
        if (item.name) {
          const id = `${item.id_}-name_${item.type}`

          if (document.getElementById(id)) document.getElementById(id).value = item.name;
        }
        if (item.id) {
          const id = `${item.id_}-id_${item.type}`

          if (document.getElementById(id)) document.getElementById(id).value = item.id;
        }
        if (item.class) {
          const id = `${item.id_}-class_${item.type}`

          if (document.getElementById(id)) document.getElementById(id).value = item.class;
        }
        if (item.tooltip) {
          const id = `${item.id_}-tooltip_${item.type}`

          if (item.tooltip != "null" && document.getElementById(id)) document.getElementById(id).value = item.tooltip
        }
        if (item.required == true || item.required == false) {
          const id = `${item.id_}-required_${item.type}`
          item.required = item.required === "false" ? false : true
          if (document.getElementById(id)) document.getElementById(id).checked = item.required;
        }
      }
      else if (item.type === "option") {

        if (item.name) {
          const id = `${item.id_}-name_${item.parents}`

          if (document.getElementById(id)) document.getElementById(id).value = item.name;
        }
        if (item.id) {
          const id = `${item.id_}-id_${item.parents}`

          if (document.getElementById(id)) document.getElementById(id).value = item.id;
        }
        if (item.class) {
          const id = `${item.id_}-class_${item.parents}`

          if (document.getElementById(id)) document.getElementById(id).value = item.class;
        }
        if (item.required == true || item.required == false) {
          const id = `${item.id_}-required_${item.parents}`
          if (document.getElementById(id)) document.getElementById(id).checked = item.required;
        }


      }

    }

  }
}//end function fillinput_emsFormBuilder
//edit_emsFormBuilder content of dropZone
function fun_edit_emsFormBuilder() {
  valueJson_ws_p = importJson;
  document.getElementById('steps').disabled = true;
  let foundIndex = valueJson_ws_p.findIndex(x => x.steps == stepMax_ws);
  for (let v of valueJson_ws_p) {

    let ob = [];
    let id_ = ""
    if (v.steps) {
      //console.log(v,v.trackingCode)
      document.getElementById('steps').value = v.steps;
      document.getElementById('form_name').value = v.formName;
      if (formName_ws != "login" && formName_ws != "register" && v.trackingCode) document.getElementById('trackingcode_emsFormBuilder').checked = v.trackingCode == "true" ? true : false;
      if (formName_ws != "login" && formName_ws != "register" && v.email) document.getElementById('email__efb').value = v.email;
 //     if (formName_ws != "login" && formName_ws != "register" ) document.getElementById('email__efb_div').classList.add('invisible')
      createSteps();
      for (let i = 1; i <= v.steps; i++) {
        //777
        const item = valueJson_ws_p[foundIndex];
        const icon = item[`icon-${i}`] ? item[`icon-${i}`] : `fa-object-group`;
        document.getElementById(`tabName_${i}`).value = item[`name-${i}`];

        document.getElementById(`stepIcon-${i - 1}`).innerHTML = `<i class="fa ${icon}"></i>`

        const tb = document.getElementById(`tabicon_${i}`)
        tb.placeholder = icon;
        let indexOp = 0
        for (const op in tb.options) {
          if (tb.options[op].value == icon) { indexOp = op };
          tb.selectedIndex = indexOp;
        }

      }
      //تابع سازده استپ ها اینجا صدا زده شود
      //مقدار های عنوان و ایکون بعد از ساخت استپ ها وارد شود
    }
    if (v.type != "option") {

      id_ = v.id_
      v.name != undefined && v.name != "" ? ob.push({ name: v.name }) : ob.push({ name: "null" });

      v.id != undefined && v.id != "" ? ob.push({ id: v.id }) : ob.push({ id: "null" });
      v.tooltip != undefined && v.tooltip != "" ? ob.push({ tooltip: v.tooltip }) : ob.push({ tooltip: "null" });
      v.class != undefined && v.class != "" ? ob.push({ class: v.class }) : ob.push({ class: "null" });
      v.required != undefined && v.required != "" ? ob.push({ required: v.required }) : ob.push({ required: "false" });
      v.clander != undefined && v.clander != "" ? ob.push({ clander: v.clander }) : ob.push({ clander: "Gregorian" });
      v.fileDrogAndDrop != undefined && v.fileDrogAndDrop != "" ? ob.push({ fileDrogAndDrop: v.fileDrogAndDrop }) : ob.push({ fileDrogAndDrop: "Document" });
      v.file != undefined && v.file != "" ? ob.push({ file: v.file }) : ob.push({ file: "Zip" });
      v.allowMultiSelect != undefined && v.allowMultiSelect != "" && v.allowMultiSelect ? ob.push({ allowMultiSelect: v.allowMultiSelect }) : ob.push({ allowMultiSelect: "false" });
      const dropZone = document.getElementById(`dropZone-${v.step}`)
      if (dropZone) {
        dropZone.innerHTML += addNewElement_emsFormBuilder(v.type, id_, ob);
        document.getElementById(`${id_}-b`).innerHTML = `${v.name != undefined ? v.name : ''} [${v.type.toUpperCase()}]`
        if (v.type == "radiobutton" || v.type == "checkbox") {
          v.name ? document.getElementById(`${id_}-oc`).disabled = false : document.getElementById(`${id_}-oc`).disabled = true;
        } else if (v.type == "multiselect" && pro_ws) {
          fun_multiselect_pro_emsFormBuilder(id_, v)
        }
      }
    }
    else if (v.type == "option") {
      const id_ = v.id_ + "_" + v.parents

      v.name != undefined ? ob.push({ name: v.name }) : ob.push({ name: "null" });

      v.id != undefined ? ob.push({ id: v.id }) : ob.push({ id: "null" });
      v.tooltip != undefined ? ob.push({ tooltip: v.tooltip }) : ob.push({ tooltip: "null" });
      v.class != undefined ? ob.push({ class: v.class }) : ob.push({ class: "null" });
      //new code 
      let id = v.parents;

      document.getElementById(v.parents + "-o").innerHTML += `<div id="${id_}" class= "border-top">
        <button type="button" class="close remove btn  btn-outline-danger" aria-label="Close" id="remove_${id_}">
          <span aria-hidden="true">×</span>
        </button>
        <input type="text" id="${id_}-name_${v.parents}" class="insertInput ml-1 mr-1 mt-1 mb-1" placeholder="name" ${v.name != undefined ? `value="${v.name}"` : ""}>
        <input type="text" id="${id_}-id_${v.parents}" class="insertInput ml-1 mr-1 mt-1 mb-1" placeholder="ID" ${v.id != undefined ? `value="${v.id}"` : ""}>
        <input type="text" id="${id_}-class_${v.parents}" class="insertInput ml-1 mr-1 mt-1 mb-1" placeholder="Class1,Class2" ${v.class != undefined ? `value="${v.class}"` : ""}>
        <input type="text" id="${id_}-tooltip_${v.parents}" class="insertInput ml-1 mr-1 mt-1 mb-1" placeholder="Placeholder or tooltip" ${v.tooltip != undefined ? `value="${v.tooltip}"` : ""}>`;

      document.getElementById(`remove_${id_}`).addEventListener("click", (e) => {

        e.preventDefault();
        let id = id_;

        document.getElementById(id).remove();
        id = id_

        let foundIndex = Object.keys(valueJson_ws_p).length > 0 ? valueJson_ws_p.findIndex(x => x.id_ == id) : -1


        valueJson_ws_p.splice(foundIndex, 1);

        saveLocalStorage_emsFormBuilder();
      });
      //end new code
    }


    //dropZone.innerHTML += addNewElement_emsFormBuilder(el,rndm,false);
    deleteButtonCreator_emsFormBuilder();



  }//end foreach el

  //


  for (const dropZone of document.querySelectorAll(".dropZone")) {
    eventCreatorOfInsertInput_emsFormBuilder(dropZone);
  }
  for (const el of document.querySelectorAll(".add-option")) {

    optionCreator_emsFormBuilder(el);
  }
}//end edit_emsFormBuilder 


function deleteButtonCreator_emsFormBuilder() {
  for (const el of document.querySelectorAll(".delete")) {
    el.addEventListener("click", (e) => {

      //  e.preventDefault();
      const id = el.id;



      if (el != null) {

        if (document.getElementById(id)) document.getElementById(id).remove();
      }

      let foundIndex = Object.keys(valueJson_ws_p).length > 0 ? valueJson_ws_p.findIndex(x => x.id_ == el.id) : -1

      let found = Object.keys(valueJson_ws_p).length > 0 ? valueJson_ws_p.find(x => x.id_ == el.id) : -1;


      if (foundIndex != -1) valueJson_ws_p.splice(foundIndex, 1);

      if (found && found !== -1 && (found.type === "radiobutton" || found.type === "checkbox" || found.type === "multiselect")) {
        const id = found.id_;

        //  foundIndex = -1;
        while (foundIndex != -1) {
          foundIndex = valueJson_ws_p.findIndex(x => x.parents == id);

          if (foundIndex != -1) { valueJson_ws_p.splice(foundIndex, 1) }
        }

        saveLocalStorage_emsFormBuilder()
      }
      saveLocalStorage_emsFormBuilder()
    });
  }
}
//777
function optionCreator_emsFormBuilder(el) {
  el.addEventListener("click", (e) => {
    const rndm = Math.random().toString(36).substr(2, 9);
    e.preventDefault();

    let id = el.id.substring(0, el.id.search("-"));

    const elementId = id;
    id = id + "-o"
    console.log(`id:${id}`, document.getElementById(id));

    document.getElementById(id).innerHTML += `<div id="${rndm}-${elementId}" class= "border-top">
            <button type="button" class="close remove btn  btn-outline-danger" aria-label="Close" id="remove_${rndm}-${elementId}">
              <span aria-hidden="true">×</span>
            </button>
            <input type="text" id="${rndm}-name_${elementId}" class="insertInput-${rndm} ml-1 mr-1 mt-1 mb-1" placeholder="name">
            <input type="text" id="${rndm}-id_${elementId}" class="insertInput-${rndm} ml-1 mr-1 mt-1 mb-1" placeholder="ID">
            <input type="text" id="${rndm}-class_${elementId}" class="insertInput-${rndm} ml-1 mr-1 mt-1 mb-1" placeholder="Class1,Class2">
            <input type="text" id="${rndm}-tooltip_${elementId}" class="insertInput-${rndm} ml-1 mr-1 mt-1 mb-1" placeholder="Placeholder or tooltip">
            </div>
`;
    for (const el of document.querySelectorAll(".remove")) {
      ;
      el.addEventListener("click", (e) => {
        e.preventDefault();

        let id = el.id.substring(el.id.search("_") + 1, el.id.length);
        document.getElementById(id).remove();
        id = id.substring(0, id.search("-"));

        let foundIndex = Object.keys(valueJson_ws_p).length > 0 ? valueJson_ws_p.findIndex(x => x.id_ == id) : -1

        //let found = Object.keys(valueJson_ws_p).length > 0 ?  valueJson_ws_p.find(x => x.id_ == id):-1;

        valueJson_ws_p.splice(foundIndex, 1);


      });
    }


    for (const el of document.querySelectorAll(`.insertInput-${rndm}`)) {

      el.addEventListener("change", (e) => {

        e.preventDefault();
        const id = el.id;
        const id_ = el.id.substring(0, el.id.search("-"));
        const type = el.id.substring((el.id.search("_") + 1), el.id.length);

        const value_of = el.id.substring((el.id.search("-") + 1), el.id.search("_"));
        let value = "";

        group = "option";
        value = document.getElementById(el.id).value;
        addOject_emsFormBuilder(id, id_, value, type, value_of, group);

      });

    }
    fillinput_emsFormBuilder();


  });


}//end function optionCreator_emsFormBuilder

function saveLocalStorage_emsFormBuilder() {

  localStorage.setItem('valueJson_ws_p', JSON.stringify(valueJson_ws_p));
  localStorage.setItem('valueJson_ws_p', JSON.stringify(valueJson_ws_p));
}


function alarm_emsFormBuilder(val) {
  return `<div class="alert alert-warning alert-dismissible fade show " role="alert" id="alarm_emsFormBuilder">
    <div class="emsFormBuilder"><i class="fas fa-exclamation-triangle faa-flash animated"></i></div>
    <strong>${efb_var.text.alert} </strong>${val}
  </div>`
}

function funIconArrow_emsFormBuilder(id) {
  //console.log(id);
  const el = document.getElementById(`${id}-icon`);
  // el.className = el.className == "fa fa-caret-right" ? "fa fa-caret-down" : "fa fa-caret-right";
  if (el.className == "fa fa-caret-down") {
    el.className = "fa fa-caret-right";
    document.getElementById(`${id}-c`).style.display = "none";
  } else {
    el.className = "fa fa-caret-down";
    document.getElementById(`${id}-c`).style.display = "block";
  }
  //
  //${rndm}-icon
  //document.getElementById(`${rndm}-icon`).className
}

function eventCreatorOfInsertInput_emsFormBuilder(dropZone) {


  for (const el of document.querySelectorAll(".insertInput")) {

    el.addEventListener("keyup", (e) => {

      e.preventDefault();
      const id = el.id;
      const id_ = el.id.substring(0, el.id.search("-"));
      const type = el.id.substring((el.id.search("_") + 1), el.id.length);
      let group = "notOption";
      let value_of = el.id.substring((el.id.search("-") + 1), el.id.search("_"));
      let value = "";
      if (value_of != 'name' || value_of != 'id' || value_of != 'class' || value_of != 'tooltipe') {

        if (id.includes('name') === true) {
          value_of = 'name';
        } else if (id.includes('id') === true) {
          value_of = 'id';
        } else if (id.includes('class') === true) {
          value_of = 'class';
        } else if (id.includes('tooltipe') === true) {
          value_of = 'tooltipe';
        }

      }


      if (type == "text" || type == "password" || type == "button" || type == "number" || type == "tel" || type == "textarea" || type == "image" || type == "email" || type == "date" || type == "url" || type == "color" || type == "range" || type == "file") {

        value = document.getElementById(el.id).value;
      } else if (type == "radiobutton" || type == "checkbox" || type == "multiselect") {
        value = document.getElementById(el.id).value;
      } else {
        group = "option";
        value = document.getElementById(el.id).value;
      }

      if ((type == "radiobutton" || type == "checkbox" || type == "multiselect") && Object.keys(valueJson_ws_p).length >= 0) {
        let checkState = false;

        //check validiton of new option
        for (const v of valueJson_ws_p) {
          if ((v.type == "radiobutton" || v.type == "checkbox" || v.type == "multiselect") && v.id_ == id_) {

            for (const el of document.querySelectorAll(".add-option")) {

              if (el.id.substring(0, el.id.search("-")) == id_) {

                v.name && v.name !== "" ? el.disabled = false : el.disabled = true;
              }


            }
          } else {
            for (const el of document.querySelectorAll(".add-option")) {

              //   el.classList.contains("disabled")===false  ? el.classList.add("disabled") : "";

            }
          }
        }//end for const v of valueJson_ws_p
        //end check validiton of new option
      }

      if (value_of == "required" || (value_of == "allowMultiSelect" && pro_ws)) {

        const id = el.id;
        value = document.getElementById(id).checked;

      }

      if ((type == "radiobutton" || type == "checkbox" || type == "multiselect") && (!e.target.id.includes("required") && !e.target.id.includes("allowMultiSelect"))) {
        const r = value.length > 0 ? false : true;
        document.getElementById(`${id_}-oc`).disabled = r


      }

      const step = dropZone.id.substring((dropZone.id.search("-") + 1), dropZone.id.length)
      addOject_emsFormBuilder(id, id_, value, type, value_of, group, step);

    });
  }

  // showloading_emsFormBuilder() //این قسمت دیلی ایجاد می کنه که محتوای که قرار است در دراپ زون قرار بگیرند درست ست بشن
}


function loading_emsFormBuilder() {
  return `<div  id="loading_emsFormBuilder"><div class="spinner-border text-warning" role="status">
    <span class="sr-only">loading_emsFormBuilder...</span>
  </div></div>`

}

function showloading_emsFormBuilder() {
  const time = stepMax_ws < 3 ? 700 : stepMax_ws * 200;

  //document.getElementById(`body`).innerHTML+=loading_emsFormBuilder();
  document.getElementById("body").classList.add = "wait";
  if (body.style.pointerEvents == "none") body.style.pointerEvents = "auto";
  else body.style.pointerEvents = "none";
  setTimeout(() => {
    document.getElementById("body").classList.remove = "wait";
    if (body.style.pointerEvents == "none") body.style.pointerEvents = "auto";
    else body.style.pointerEvents = "none";

  }, time);
}


function endMessage_emsFormBuilder() {

  let notfilled = []
  for (i = 1; i <= stepMax_ws; i++) {
    if (-1 == (valueJson_ws_p.findIndex(x => x.step == i))) notfilled.push(i);
  }

  let str = efb_var.text.allStep;
  if (notfilled.length > 0) {
    for (no of notfilled) {
      if (no.length > 1) str += ` <b> ${stepNames_ws[no + 1]} </b> ${efb_var.text.step}, `;
    }

    document.getElementById('emsFormBuilder-text-message-view').innerHTML = `<h1 class='emsFormBuilder'><i class="fas fa-exclamation-triangle faa-flash animated text-danger""></i></h1><h3>${efb_var.text.formNotBuilded}</h3> <span>${efb_var.text.someStepsNotDefinedCheck}  ${str}</span>
    <div class="display-btn"> <button type="button" id="prevBtn" onclick="nextPrev(0)" class="p-3" style="display;"><i class="fa fa-angle-double-left"></i></button></div>`;
    // faild form
  } else {
    document.getElementById('emsFormBuilder-text-message-view').innerHTML = `<h1 class="fas fa-sync fa-spin text-primary emsFormBuilder"></h1> <h3>${efb_var.text.pleaseWaiting}<h3>`
    actionSendData_emsFormBuilder()
    //  Ok form

  }



}

function createSteps() {
  //console.log('event789');
  const addSteps = document.getElementById("addStep");
  const tabList = document.getElementById("tabList");
  const tabInfo = document.getElementById("tabInfo");

  //remove all elements in (end)

  // check value of maxstep get from user (Start)
  const form_name = document.getElementById("form_name").value;
  const c = (document.getElementById("steps").value < 3 && document.getElementById("steps").value > 0 && !pro_ws) || (pro_ws && document.getElementById("steps").value < 21 && document.getElementById("steps").value > 0) ? document.getElementById("steps").value : -1
  if (c != -1) {
    document.getElementById("nextBtn").disabled = false;
    document.getElementById("alarm_emsFormBuilder") ? document.getElementById("alarm_emsFormBuilder").remove() : ""
    document.getElementById("steps").classList.remove('invalid');
  } else {
    // document.getElementById("nextBtn").disabled = true;
    /// document.getElementById("nextBtn").display = "none";
    const message = !pro_ws ? `${efb_var.text.youCouldCreateMinOneAndMaxtwo} <br>  ${efb_var.text.ifYouNeedCreateMoreThan2Steps} <a href="${proUrl_ws}" target="_blank">${efb_var.text.proVersion}</a>` : `${efb_var.text.youCouldCreateMinOneAndMaxtwenty}`;
    document.getElementById("wpwrap").innerHTML += unlimted_version_emsFormBuilder(message, 1)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const spts = document.getElementById("steps");
    spts.classList.add('invalid');
    document.getElementById("form_name").value = form_name;
    spts.addEventListener("change", (e) => { createSteps() })// end event change creats tabs

    return
  }
  //document.getElementById("nextBtn").style.display = "none";
  // check value of maxstep get from user (end)
  stepMax_ws = c;


  //remove all elements in (start)
  if (addSteps.hasChildNodes()) {
    while (addSteps.hasChildNodes()) {
      addSteps.removeChild(addSteps.childNodes[0]);
    }
  }

  if (tabList.hasChildNodes()) {
    while (tabList.hasChildNodes()) {
      tabList.removeChild(tabList.childNodes[0]);
    }
  }
  if (tabInfo.hasChildNodes()) {
    while (tabInfo.hasChildNodes()) {
      tabInfo.removeChild(tabInfo.childNodes[0]);
    }
  }

  //create option list of icon (start)
  let optionsOfSelect = null
  const showIcon = getOS_emsFormBuilder();
  for (const n in listIcons) {

    const icon = listIcons[`${n}`];
    const name = n.substring(3, n.length)
    optionsOfSelect == null ? optionsOfSelect = ` <option value="fa ${n}">${name}    ${showIcon ? icon : ''}</option>` : optionsOfSelect += `<option value="fa ${n}" id="${n}">${name}<i>${showIcon ? icon : ''}</i></option>`
  }
  //create option list of icon (end)

  for (let i = 1; i <= c; i++) {

    let tags = ""
    for (const e in elements) {

      if ((pro_ws == elements[e].pro_ws) || (pro_ws == true)) {
        tags += `<div class="el el-${elements[e].type} btn  ${form_type_emsFormBuilder == 'login' || (form_type_emsFormBuilder == 'register' && elements[e].type == "password") ? ` ` : `btn-dark `}  btn-m btn-block mat-shadow" id="${elements[e].type}-${i}" ${form_type_emsFormBuilder == 'login' || (form_type_emsFormBuilder == 'register' && elements[e].type == "password") ? ` onClick="over_message_emsFormBuilder('${efb_var.text.alert}','${efb_var.text.thisElemantWouldNotRemoveableLoginform}')" ` : `draggable="true"`}  ><i class="fa ${elements[e].icon} bttn"></i>${efb_var.text[`${elements[e].type}`]}</div>`
      } else {
        tags += `<div class="el el-${elements[e].type} limited btn ${form_type_emsFormBuilder == 'login' || (form_type_emsFormBuilder == 'register' && elements[e].type == "password") ? ` ` : `btn-warning `} btn-m btn-block" id="${elements[e].type}-${i}" ${form_type_emsFormBuilder == 'login' || (form_type_emsFormBuilder == 'register' && elements[e].type == "password") ? `  onClick="over_message_emsFormBuilder('${efb_var.text.alert}','${efb_var.text.thisElemantWouldNotRemoveableLoginform}')" ` : ` draggable="true"`} ><i class="fa fa-unlock-alt bttn"></i>${efb_var.text[`${elements[e].type}`]}</div>`
      }
    }
    document.getElementById("tabInfo").innerHTML += `
             <div class="border-bottom mt-4">
             <h5>${efb_var.text.titleOfStep} ${i}</h5>
             <p><input type="text" class="tabC require emsFormBuilder" name="Tab" placeholder="Tab ${i}"    id="tabName_${i}"></p>
             <h5><i class="fa fa-object-group" id="icon-step-${i}"> </i>${efb_var.text.IconOfStep} ${i}  </h5>
             <select class="selectpicker tabC emsFormBuilder" name="Tab" placeholder="fa-user-circle" data-live-search="true" id="tabicon_${i}" >
             ${optionsOfSelect};
             </select>
             </div>
             `;

    //<span class="step"><i class="fa fa-shopping-bag"></i></span> 
    document.getElementById("addStep").innerHTML += `<span class="step" id="stepIcon-${i - 1}"><i class="fa fa-object-group"></i></span>`
    document.getElementById("tabList").innerHTML += ` <div class="tab" >        
             <div class="container" id="container">
             <div class="container" id="container">
             <div class="row">
               <div class="col-4 ">
               ${efb_var.text.elements}
                 <div class="row element-list ml-1 mr-1 mt-1 mb-1" id="elements-${i}">                
                 </div>
               </div>
               <div class="col-8 ">          
                 <div class="row border border-light view overlay list-group h-100 dropZone black_box mat-shadow-dz" id="dropZone-${i}">          
                 </div>
                 <div class="col-1">
                   <input type="hidden" id="export" name="export" value="3487">
                 </input>
               </div>
             </div>          
         </div>`

    document.getElementById(`elements-${i}`).innerHTML = tags;
  }//end for

  for (const el of document.querySelectorAll(`.tabC`)) {

    el.addEventListener("change", (e) => {
      const no = el.id.substring((el.id.search("_") + 1), el.id.length)
      let name = el.id.substring(0, (el.id.search("_")))

      name = name == "tabName" ? "name" : "icon";

      //emsfb version of form creator emsfb:1 ,
      const ob = { steps: stepMax_ws, [`${name}-${no}`]: el.value, formName: formName_ws, EfbVersion: 1.3, type: form_type_emsFormBuilder, trackingCode: trackingCode_efb,email:email_efb }
      //console.log(ob);

      if (name == "icon") {
        document.getElementById(`stepIcon-${no - 1}`).innerHTML = `<i class="fa ${el.value}"></i>`;
        document.getElementById(`icon-step-${no}`).className = el.value;

      }
      if (name == "name") {
        const v = stepNames_ws.length >= 4
        const nno = parseInt(no);

        v != false && nno + 1 != stepNames_ws.length - 1 ? stepNames_ws[1 + nno] = el.value : stepNames_ws.splice(1 + nno, 0, el.value);

      }
      if (Object.keys(valueJson_ws_p).length === 0) {

        valueJson_ws_p.push(ob);

      } else {
        let foundIndex = valueJson_ws_p.findIndex(x => x.steps == stepMax_ws);
        if (foundIndex != -1) {
          let item = valueJson_ws_p[foundIndex];
          item[`${name}-${no}`] ? valueJson_ws_p[foundIndex][`${name}-${no}`] = el.value : valueJson_ws_p[foundIndex] = Object.assign(valueJson_ws_p[foundIndex], { [`${name}-${no}`]: el.value })

          saveLocalStorage_emsFormBuilder()
        } else {
          valueJson_ws_p[0] = ob;
        }

      }

      //console.log(valueJson_ws_p);
    })
  }
  for (const el of document.querySelectorAll(`.limited`)) {

    el.addEventListener("click", (e) => {
      document.getElementById('message-area').innerHTML += unlimted_version_emsFormBuilder(efb_var.text.availableInProversion, 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    })
  }

  for (const dropZone of document.querySelectorAll(`.dropZone`)) {


    dropZone.addEventListener("dragover", (e) => {

      e.preventDefault();
    });



    dropZone.addEventListener("drop", (e) => {

      e.preventDefault();
      let el = e.dataTransfer.getData("text/plain");

      el = el.substring(0, el.search("-"))
      if (el !== "step" && el != null && el != "") {
        const rndm = Math.random().toString(36).substr(2, 9);
        dropZone.innerHTML += addNewElement_emsFormBuilder(el, rndm, false);

      }


      //here
      fillinput_emsFormBuilder();


      //here
      eventCreatorOfInsertInput_emsFormBuilder(dropZone);

      for (const el of document.querySelectorAll(".add-option")) {

        optionCreator_emsFormBuilder(el);
      }


      deleteButtonCreator_emsFormBuilder();

    }); // end drogZone



    dropZone.addEventListener("click", (e) => {
      for (const el of document.querySelectorAll(".insertInput")) {

        el.addEventListener("change", (e) => {

          e.preventDefault();
          const id = el.id;
          const id_ = el.id.substring(0, el.id.search("-"));
          const type = el.id.substring((el.id.search("_") + 1), el.id.length);
          let group = "notOption";
          const value_of = el.id.substring((el.id.search("-") + 1), el.id.search("_"));
          let value = "";
          let amount = 0;



          if (type == "text" || type == "password" || type == "button" || type == "number" || type == "tel" || type == "textarea" || type == "image" || type == "email" || type == "date" || type == "file") {

            value = document.getElementById(el.id).value;
          } else if (type == "radiobutton" || type == "checkbox") {
            value = document.getElementById(el.id).value;
          } else {
            group = "option";
            value = document.getElementById(el.id).value;
          }

          if ((type == "radiobutton" || type == "checkbox") && Object.keys(valueJson_ws_p).length >= 0) {
            let checkState = false;

            //check validiton of new option
            for (const v of valueJson_ws_p) {
              if (v.type == "radiobutton" && v.id_ == id_) {
                for (const el of document.querySelectorAll(".add-option")) {


                  el.id.substring(0, el.id.search("-")) == id_ && (v.name && v.name !== "") ? el.disabled = false : el.disabled = true;

                }
              } else {
                for (const el of document.querySelectorAll(".add-option")) {

                  //   el.classList.contains("disabled")===false  ? el.classList.add("disabled") : "";

                }
              }
            }//end for const v of valueJson_ws_p
            //end check validiton of new option
          }



          if (value_of == "required" || value_of == 'allowMultiSelect' || value_of == 'fileDrogAndDrop') {

            const id = el.id;
            value = document.getElementById(id).checked;

          }



          const step = dropZone.id.substring((dropZone.id.search("-") + 1), dropZone.id.length)

          addOject_emsFormBuilder(id, id_, value, type, value_of, group, step);
        });
      }

    });

  }

  for (const el of document.querySelectorAll(`.el`)) {

    el.addEventListener("dragstart", (e) => {

      e.dataTransfer.setData("text/plain", el.id)

    });

  }
  if (c != -1) document.getElementById("nextBtn").style.display = "inline";

  // console.log('this run');

}

function helpLink_emsFormBuilder() {
  window.open("https://www.youtube.com/watch?v=7jS01CEtbDg", "_blank")
}

function stepName_emsFormBuilder(i) {
  document.getElementById('step-name').innerHTML = stepNames_ws[i] != "null" && stepNames_ws[i] != undefined ? `${efb_var.text.stepName}: ${stepNames_ws[i]}` : "";

}


function actionSendData_emsFormBuilder() {
  document.getElementById('emsFormBuilder-form-id').innerHTML = `<h1 class='emsFormBuilder'><i class="fas fa-thumbs-up faa-bounce animated text-primary""></i></h1><h1 class='emsFormBuilder'>${efb_var.text.done}</h1></br> <span>${efb_var.text.goodJob}, ${efb_var.text.formIsBuild}</span></br></br>
  <a href="" class="btn btn-dark btn-lg btn-block">DownLoad Form</a>`;
  
}


function unlimted_version_emsFormBuilder(m, s) {

  //const clickFun = s==1 ? 'window.location.reload();':`close_overpage_emsFormBuilder()`;


  return `<div class=" overpage ${efb_var.rtl == 1 ? 'rtl-text' : ''}" id="overpage">
  <div class="overpage-mbox">
  <div class="card-body">
    <h4 class="card-title"><i class="fa fa-unlock-alt"></i> ${efb_var.text.proVersion}</h4>
    <h5 class="card-text">${m}</h5>    
   ${(!pro_ws) ? `</br><a href="${proUrl_ws}" class="btn btn-primary" target="_blank">${efb_var.text.getProVersion}</a>` : '</br>'} 
    <button class="btn btn-danger" onClick="close_overpage_emsFormBuilder(1)">${efb_var.text.close}</a>
  </div>
  <div>
</div>`;

}



function over_message_emsFormBuilder(title, message) {
  console.log('over_message_emsFormBuilder')

  document.getElementById('message-area').innerHTML += `<!--testAdd --><div class=" overpage ${efb_var.rtl == 1 ? 'rtl-text' : ''}" id="overpage" style="display:block;">
  <div class="overpage-mbox">
  <div class="card-body">
    <h4 class="card-title"><i class="fa fa-info-circle"></i> <span  id="title-over">${title}</span</h4>
    <h5 class="card-text my-3" id="message-over">${message}</h5>    
    <button class="btn btn-danger" onClick=" close_overpage_emsFormBuilder(1)"">${efb_var.text.close}</a>
  </div>
  <div>
</div>`;
  window.scrollTo({ top: 0, behavior: 'smooth' });



}

function unlimted_show_emsFormBuilder(m) {

  document.getElementById('message-area').innerHTML += unlimted_version_emsFormBuilder(m, 0);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function close_overpage_emsFormBuilder(i) {
  document.getElementById('overpage').remove();

  if (i == 2) demo_emsFormBuilder = false;


}

function preview_emsFormBuilder() {
  demo_emsFormBuilder = true;
  currentTab_emsFormBuilder = 0;
  let content = `<h5 class="text-white"> ${efb_var.text.formNotCreated} </br> ${efb_var.text.atFirstCreateForm} </h5>`;
  if (valueJson_ws_p.length > 1) {

    //887799
    // یک شرط که اگر فرم در بادی موجود نبود ساخته شود
    content = fun_render_view_core_emsFormBuilder(0);

    document.getElementById('message-area').innerHTML += `<div class=" overpage preview-overpage ${efb_var.rtl == 1 ? 'rtl-text' : ''}" id="overpage">
  <div class="overpage-mbox bg-dark">
  <div class="card-body m-13">
    <h4 class="card-title text-white"><i class="px-2 fa fa-eye "></i> ${efb_var.text.preview}</h4>
    </br>
   <div id ="body_emsFormBuilder"> ${content}</div>
    </br>
    <button class="btn btn-danger m-2" onClick=" close_overpage_emsFormBuilder(2)">${efb_var.text.close}</a>    
    </div>
    <div>
  </div>`;


    ShowTab_emsFormBuilder_view(currentTab_emsFormBuilder);

    createStepsOfPublic()

  } else {
    document.getElementById('message-area').innerHTML += `<div class=" overpage" id="overpage">
    <div class="overpage-mbox bg-dark">
    <div class="card-body m-13">
      <h4 class="card-title text-white"><i class="fa fa-eye "></i> ${efb_var.text.preview}</h4>
      </br>
     <div id ="body_emsFormBuilder"> ${content}</div>
      </br>
      <button class="btn btn-danger m-2" onClick=" close_overpage_emsFormBuilder(1)">${efb_var.text.close}</a>
      
    </div>
    <div>
  </div>`;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

}



function getOS_emsFormBuilder() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;
  valid = false

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
    valid = true;
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return valid;
}


function add_form_builder_emsFormBuilder() {
  console.log(formName_ws);
  const value = `  
  <div class="m-4">
    <div class="row d-flex justify-content-center align-items-center ${efb_var.rtl == 1 ? 'rtl-text' : ''}">
      <div class="col-md-12">
        <div id="emsFormBuilder-form" >
        <form id="emsFormBuilder-form-id">
          <h1 id="emsFormBuilder-form-title"></h1>
          <div class="all-steps" id="all-steps"> 
            <span class="step"><i class="fa fa-tachometer"></i></span> 
            <span class="step"><i class="fa fa-briefcase"></i></span> 
            <div class="addStep" id="addStep" >
            </div>
            <span class="step"><i class="px-1 fa fa-floppy-o"></i></span> 
          </div>
          <div class="all-steps" > 
            <h5 class="step-name f-setp-name" id ="step-name"> ${efb_var.text.define}  </h5> 
          </div>
          <div id="message-area"></div>
          <div class="tab" id="firsTab">
            <h5> ${efb_var.text.formName}  </h5>
            <input placeholder="" type="text"  name="setps" class="require emsFormBuilder" id="form_name">
            </br>
            <h5> ${efb_var.text.numberSteps}: *</h5>
            <input placeholder="1,2,3.." type="number"  name="setps" class="require emsFormBuilder" id="steps" max="20">            
            ${formName_ws != "login" && formName_ws != "register" ? ` </br><div id="email__efb_div" class="test"><h5> ${efb_var.text.alertEmail}: <small>${efb_var.text.whenEasyFormBuilderRecivesNewMessage} </small></h5><input placeholder="1,2,3.." type="email"  name="email__efb" class=" emsFormBuilder" id="email__efb" ></div>  ` : ``}     
            <div class="form-group mx-3">
            </br>
            <!-- show tracking code in form creator -->
            ${formName_ws != "login" && formName_ws != "register" && formName_ws != "survey" ? ` <input type="checkbox" class="form-check-input emsFormBuilder " id="trackingcode_emsFormBuilder"><label class="form-check-label px-2" for="trackingcode_emsFormBuilder">${efb_var.text.showTrackingCode}</label>` : ``}     
             </div>
          </div>
          <div class="tab" id="tabInfo">
          </div>
          <div  id="tabList">
          </div>      
          <div class="thanks-message text-center" id="emsFormBuilder-text-message-view"> 
            <h3>Done</h3> <span>Great, Your form is builded successfully</span>
          </div>
          <div style="overflow:auto;" id="nextprevious">
            <div style="float:right;"> <button type="button" id="prevBtn" class="mat-shadow emsFormBuilder p-3" onclick="nextPrev(-1)"><i class="fa fa-angle-double-left"></i></button> <button type="button" id="nextBtn" class="mat-shadow emsFormBuilder p-3" onclick="nextPrev(1)"><i class="fa fa-angle-double-right"></i></button> </div>
            <div style="float:left;"> 
              <button type="button" class="mat-shadow emsFormBuilder p-3" onClick="helpLink_emsFormBuilder()"><i class="fa fa-question" placeholder="Help"></i></button>
              <button type="button" class="mat-shadow emsFormBuilder p-3" id="button-preview-emsFormBuilder" onClick="preview_emsFormBuilder()"><i class="fa fa-eye" placeholder="preview"></i></button>
            </div>
          </div>
        </form>      
        </div>
      </div>
    </div>
    <div id="body_emsFormBuilder" style="display:none"> </div> </div> </div>`;
  document.getElementById('tab_container').innerHTML = value;
  run_code_ws_1();
  run_code_ws_2();
  //console.log('add to form builder');


}


function add_dasboard_emsFormBuilder() {

  const boxs = [
    { id: 'form', title: efb_var.text.newForm, desc: efb_var.text.createBlankMultistepsForm, status: true, icon: 'fa-check-square' },
    { id: 'contact', title: efb_var.text.contactusForm, desc: efb_var.text.createContactusForm, status: true, icon: 'fa-envelope' },
    { id: 'register', title: efb_var.text.registerForm, desc: efb_var.text.createRegistrationForm, status: false, icon: 'fa-user-plus' },
    { id: 'login', title: efb_var.text.loginForm, desc: efb_var.text.createLoginForm, status: false, icon: 'fa-sign-in' },
    { id: 'subscription', title: efb_var.text.subscriptionForm, desc: efb_var.text.createnewsletterForm, status: false, icon: 'fa-bell' },
    { id: 'support', title: efb_var.text.supportForm, desc: efb_var.text.createSupportForm, status: false, icon: 'fa-life-ring' },
    { id: 'survey', title: efb_var.text.survey, desc: efb_var.text.createsurveyForm, status: false, icon: 'fa-bar-chart' },
    { id: 'reservation', title: efb_var.text.reservation, desc: efb_var.text.createReservationyForm, status: false, icon: 'fa-calendar-plus-o' },
  ]
  let value = `<!-- boxs -->`;
  for (let i of boxs) {

    value += `<div class="col-sm-6 my-2 ${efb_var.rtl == 1 ? 'rtl-text' : ''}">
        <div class="card emsFormBuilder-form-card">
        ${i.status == false ? `<a href="https://wordpress.org/plugins/easy-form-builder/"  target="_blank"><div class="overlay-emsFormBuilder"><i class="fa fa-lock"></i><p>${efb_var.text.EasyFormBuilder}</p></div></a>` : ``}
          <div class="card-body">
            <h5 class="card-title"><i class="fa ${i.icon}" aria-hidden="true"></i> ${i.title}</h5>
            <p class="card-text">${i.desc}</p>
            <a href="#" id="${i.id}" class="btn  emsFormBuilder efbCreateNewForm">${efb_var.text.create}</a>
          </div></div></div>`
  }

  document.getElementById('tab_container').innerHTML = `<div class="row"><div class="row  my-3 col-2"></div><div class="row mx-5 my-2 col-8 center">${value}</div><div class="row  my-5 col-2"></div></div>`


  const newform_ = document.getElementsByClassName("efbCreateNewForm")
  for (const n of newform_) {

    n.addEventListener("click", (e) => {
      form_type_emsFormBuilder = n.id;
      create_form_by_type_emsfb(n.id);

    })
  }

}



function create_form_by_type_emsfb(id) {
  const state = false;

  if (id === "form") {
    //console.log('add')
    // if the blank form clicked just active create form
    //required: true
    form_type_emsFormBuilder = "form"
    formName_ws = form_type_emsFormBuilder
  } else if (id === "contact") {
    // if contact has clicked add Json of contact and go to step 3
    //contactUs
    form_type_emsFormBuilder = "form";
    formName_ws = efb_var.text.contactUs
    const json = [{ "steps": "1", "name-1": efb_var.text.contactUs, "formName": efb_var.text.contactUs, "EfbVersion": 1.3, "type": "contact", "icon-1": "fa fa-envelope", "trackingCode": "true" }, { "id_": "xnr4fjtik", "name": efb_var.text.firstName, "type": "text", "step": 1, "amount": 1, "required": true }, { "id_": "ng98mihl7", "name": efb_var.text.lastName, "type": "text", "step": 1, "amount": 2, "required": true }, { "id_": "ihfqg325b", "name": efb_var.text.email, "type": "email", "step": 1, "amount": 3, "required": true }, { "id_": "x7cs8pqk6", "name": efb_var.text.phone, "type": "tel", "step": 1, "amount": 4 }, { "id_": "bd1i5oe9j", "name": efb_var.text.message, "type": "textarea", "step": 1, "amount": 5, "required": true }]
    localStorage.setItem('valueJson_ws_p', JSON.stringify(json))
    valueJson_ws_p = json;
  } else if (id === "register") {
    // if register has clicked add Json of contact and go to step 3
    form_type_emsFormBuilder = "register";
    formName_ws = "register";
    json = [{ "steps": "1", "name-1": efb_var.text.register, "formName": efb_var.text.register, "EfbVersion": 1.3, "type": "register", "icon-1": "fa fa-user-plus", "trackingCode": "false" }, { "id_": "usernameRegisterEFB", "name": efb_var.text.username, "type": "text", "step": 1, "amount": 1, "required": true }, { "id_": "emailRegisterEFB", "name": efb_var.text.email, "type": "email", "step": 1, "amount": 2, "required": true }, { "id_": "passwordRegisterEFB", "name": efb_var.text.password, "type": "password", "step": 1, "amount": 3, "required": true }];
    valueJson_ws_p = json;
    localStorage.setItem('valueJson_ws_p', JSON.stringify(json))
  } else if (id === "login") {
    // if login has clicked add Json of contact and go to step 3
    form_type_emsFormBuilder = "login";
    formName_ws = form_type_emsFormBuilder;
    json = [{ "steps": "1", "name-1": efb_var.text.login, "formName": efb_var.text.login, "EfbVersion": 1.3, "type": "login", "icon-1": "fa fa-sign-in", "trackingCode": "false" }, { "id_": "emaillogin", "name": efb_var.text.emailOrUsername, "type": "text", "step": 1, "amount": 1, "required": true }, { "id_": "passwordlogin", "name": efb_var.text.password, "type": "password", "step": 1, "amount": 2, "required": true }];
    valueJson_ws_p = json;
    localStorage.setItem('valueJson_ws_p', JSON.stringify(json))

  } else if (id === "support") {
    // if support has clicked add Json of contact and go to step 3
    form_type_emsFormBuilder = "form";
    formName_ws = form_type_emsFormBuilder
    const json = [{ "steps": "1", "name-1": " ", "formName": efb_var.text.support, "EfbVersion": 1.3, "type": "form", "icon-1": "fa fa-support", "trackingCode": "true" }, { "id_": "khlewd90v", "required": true, "type": "multiselect", "step": 1, "amount": 1, "name": "How can we help you?" }, { "id_": "4polea9sp", "name": "Accounting & Sell question", "parents": "khlewd90v", "type": "option", "step": null }, { "id_": "5o6k6epyd", "name": "Technical & support question", "parents": "khlewd90v", "type": "option", "step": null }, { "id_": "sophw2b2q", "name": "General question", "parents": "khlewd90v", "type": "option", "step": null }, { "id_": "4rcet7l27", "name": efb_var.text.subject, "type": "text", "step": 1, "amount": 2 }, { "id_": "0i98gvfyw", "name": efb_var.text.message, "type": "textarea", "step": 1, "amount": 3, "required": true }];
    localStorage.setItem('valueJson_ws_p', JSON.stringify(json))
    valueJson_ws_p = json;
  } else if (id === "subscription") {
    // if subscription has clicked add Json of contact and go to step 3
    form_type_emsFormBuilder = "subscribe";
    formName_ws = form_type_emsFormBuilder
    const json = [{ "steps": "1", "name-1": " ", "formName": efb_var.text.subscribe, "EfbVersion": 1.3, "type": "subscribe", "icon-1": "fa fa-bell", "trackingCode": "false" }, { "id_": "92os2cfq22", "name": efb_var.text.firstName, "type": "text", "step": 1, "amount": 1, "required": false }, { "id_": "92os2cfqc", "name": efb_var.text.email, "type": "email", "step": 1, "amount": 2, "required": true }];
    localStorage.setItem('valueJson_ws_p', JSON.stringify(json))
    valueJson_ws_p = json;
  } else if (id == "survey") {
    form_type_emsFormBuilder = "survey";
    formName_ws = form_type_emsFormBuilder
     const  json =[{"steps":"1","name-1":efb_var.text.survey,"formName":efb_var.text.survey,"EfbVersion":1.3,"type":"survey","icon-1":"fa fa-bell"},{"id_":"a1ssso13a","name":"What is your favorite color ?","type":"radiobutton","step":1,"amount":1,"required":true},{"id_":"64xmuzowk","name":"Blue","parents":"a1ssso13a","type":"option","step":null},{"id_":"kgy5ezwda","name":"Green","parents":"a1ssso13a","type":"option","step":null},{"id_":"uceyp8e9i","name":"Red","parents":"a1ssso13a","type":"option","step":null},{"id_":"m78afg3gl","name":"Black","parents":"a1ssso13a","type":"option","step":null},{"id_":"hj1t2ehe2","name":"White","parents":"a1ssso13a","type":"option","step":null}];
  
      localStorage.setItem('valueJson_ws_p', JSON.stringify(json))
      valueJson_ws_p =json;
    

  } else if (id == "reservation") {

  }

  add_form_builder_emsFormBuilder();

}


function fun_show_advance_add_atr_emsFormBuilder(id) {
  for (let el of document.querySelectorAll(`.${id}-advance`)) {
    el.style.display = el.style.display == "none" ? "block" : "none";
  }
  el = document.getElementById(`${id}-divder`);
  el.className = el.className == "fa fa-caret-down" ? "fa fa-caret-right" : "fa fa-caret-down";
  //console.log(`id[${id}]`);
  //${id}-divder
  /* 
    if(el.className=="fa fa-caret-right"){
      el.className="fa fa-caret-down";
      document.getElementById(`${id}-c`).style.display = "none";
    }else{
      el.className ="fa fa-caret-right";
      document.getElementById(`${id}-c`).style.display = "block";
    }
  */

}

function add_div_over_emsFormBuilder() {
  console.log('testAdd');
  document.getElementById('emsFormBuilder-form').innerHTML += `<!--testAdd --><div class=" overpage ${efb_var.rtl == 1 ? 'rtl-text' : ''}" id="overpage" style="display:none;">
  <div class="overpage-mbox">
  <div class="card-body">
    <h4 class="card-title"><i class="fa fa-info-circle"></i> <span  id="title-over"></span</h4>
    <h5 class="card-text my-3" id="message-over"></h5>    
    <button class="btn btn-danger" onClick=" close_overpage_emsFormBuilder(1)"">${efb_var.text.close}</a>
  </div>
  <div>
</div>`;

}


