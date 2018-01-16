var socket=io.connect(),Base={api:{},components:{},router:{}};!function(a){a.api={auth:{setToken:function(a){document.cookie="token="+a.token},getToken:function(){var a="; "+document.cookie,b=a.split("; token=");return 2==b.length?b.pop().split(";").shift():void 0},logout:function(){var b={token:null};a.api.auth.setToken(b),a.router.controller.goAuthPage()}},server:{module:function(b,c){socket.emit("server",{module:b,request:c.request,respondTo:c.respondTo,token:a.api.auth.getToken(),params:c.params})}},client:{hashObject:function(){var a=window.location.hash.split("/"),b={full:window.location.hash.replace("#/",""),main:null,subs:[]};return _.forEach(a,function(a,c){1===c?b.main=a:c>1&&b.subs.push(a)}),b},appView:function(b){var c=document.getElementById("app-view");c.innerHTML=b,a.api.client.components()},components:function(){var b=[];_.forEach(a.components,function(c,d){b.push(d),_.forEach(a.router.model.runComponents,function(c){var e=null;d==c&&(e=b.indexOf(d),b.splice(e,1),a.components[d].framework.run())})}),_.forEach(b,function(b,c){a.components[b].framework.stop()})}}},socket.on("client",function(b){Object.byString=function(a,b){b=b.replace(/\[(\w+)\]/g,".$1"),b=b.replace(/^\./,"");for(var c=b.split("."),d=0,e=c.length;e>d;++d){var f=c[d];if(!(f in a))return;a=a[f]}return a},Object.byString(a,b.request)(b.data)})}(Base),function(a){var b={name:"dashboard"};a.components[b.name]={model:{flag:{datepickerOpen:!1},html:{currentAlertRow:'<div class="row clearfix" data-alert="@@id@@"><div class="col-1"><span class="prio @@prio@@"></span></div><div class="col-2">@@created_date@@<br/>@@created_time@@</div><div class="col-3">@@customer@@</div><div class="col-4">@@company@@</div><div class="col-5">@@telephone@@</div><div class="col-6 long-description">@@short_description@@<span class="bubble"></span><div class="long-description-text"><span>@@long_description@@</span></div></div><div class="col-7">@@deadline_date@@<br />@@deadline_time@@</div><div class="col-8">@@created_by@@</div><div class="col-9">@@assigned_to@@</div><div class="col-10">@@closed_by@@<span class="done grey"></span></div></div>'},userInfo:{name:null}},view:{notification:function(){Note.view.notification.create("KIM","Er is een nieuwe melding aangemaakt in KIM!","http://192.168.59.50:80/kim/client/dist/assets/images/notification.jpg")},setUsername:function(a){$(".header #username span").text(a)},dropdown:{selection:function(){var a=$(this),b=a.closest("ul"),c=b.find("li");$(c).each(function(){$(this).removeClass("selected")}),a.addClass("selected")},show:function(a){var b=$(".dropdown"),c=b.find("ul li");c.each(function(){$(this).removeClass("selected")}),b.attr("group",a.group),b.attr("row",a.id),b.find(".title").text(a.title),TweenMax.killTweensOf(b),TweenMax.set(b,{scale:0,opacity:0,display:"block",top:a.y,left:a.x}),TweenMax.to(b,.2,{scale:1,opacity:1})},cancel:function(){function b(){a.hide()}var a=$(".dropdown"),c=a.attr("row");$(".row[data-alert="+c+"]").find(".col-10 .done").removeClass("orange").removeClass("grey").addClass("grey"),TweenMax.killTweensOf(a),TweenMax.to(a,.2,{scale:0,opacity:0,onComplete:b,onCompleteParams:[]})},userList:function(a){_.forEach(a,function(a,b){$("<li>"+a.full_name+"</li>").appendTo($(".dropdown .list ul"))})}},datepicker:{trigger:function(){function d(){a.hide()}var a=$("#calendar"),b=null;TweenMax.killTweensOf(a),c.model.flag.datepickerOpen?(c.model.flag.datepickerOpen=!1,b={scale:0,opacity:0,onComplete:d,onCompleteParams:[]}):(c.model.flag.datepickerOpen=!0,TweenMax.set(a,{scale:0,opacity:0,display:"block"}),b={scale:1,opacity:1}),TweenMax.to(a,.2,b)}},assign:{userList:function(){var a=$(this),b=a.closest(".row"),d=b.data("alert"),e={id:d,group:"assign",title:"melding voor",y:a.offset().top-120,x:a.offset().left-60};c.view.dropdown.show(e)}},closeCase:{userList:function(){var a=$(this),b=a.closest(".row"),d=b.data("alert");a.find(".done").removeClass("grey").addClass("orange");var e={id:d,group:"close",title:"afgehandeld",y:a.offset().top+20,x:a.offset().left-60};c.view.dropdown.show(e)}},alerts:{currentAlerts:function(a){$(".current-alerts .table-data").html(""),a.length>0&&_.forEach(a,function(a,b){var d=c.model.html.currentAlertRow;d=d.replace("@@id@@",a.id).replace("@@assigned_to@@",a.assigned_to).replace("@@closed_by@@",a.closed_by).replace("@@company@@",a.company).replace("@@created_by@@",a.created_by).replace("@@created_date@@",c.controller.format.datetime(a.created_on).date).replace("@@created_time@@",c.controller.format.datetime(a.created_on).time).replace("@@customer@@",a.customer).replace("@@deadline_date@@",c.controller.format.datetime(a.deadline).date).replace("@@deadline_time@@",c.controller.format.datetime(a.deadline).time).replace("@@long_description@@",a.long_description).replace("@@prio@@",c.controller.format.priority(a.priority)).replace("@@short_description@@",a.short_description).replace("@@telephone@@",a.telephone),0===a.long_description.length&&(d=d.replace("long-description","")),$(d).appendTo($(".current-alerts .table-data"))}),c.view.alerts.amountCurrent(a.length)},amountCurrent:function(a){$(".current-alerts .title span").text("("+a+")")},amountClosed:function(a){$(".old-alerts .title span").text("("+a+")")},closedAlerts:function(a){$(".old-alerts .table-data").html(""),a.length>0&&_.forEach(a,function(a,b){var d=c.model.html.currentAlertRow;d=d.replace("@@id@@",a.id).replace("@@assigned_to@@",a.assigned_to).replace("@@closed_by@@",a.closed_by).replace("@@company@@",a.company).replace("@@created_by@@",a.created_by).replace("@@created_date@@",c.controller.format.datetime(a.created_on).date).replace("@@created_time@@",c.controller.format.datetime(a.created_on).time).replace("@@customer@@",a.customer).replace("@@deadline_date@@",c.controller.format.datetime(a.deadline).date).replace("@@deadline_time@@",c.controller.format.datetime(a.deadline).time).replace("@@long_description@@",a.long_description).replace("@@prio@@",c.controller.format.priority(a.priority)).replace("@@short_description@@",a.short_description).replace("@@telephone@@",a.telephone),0===a.long_description.length&&(d=d.replace("long-description","")),$(d).appendTo($(".old-alerts .table-data"))}),c.view.alerts.amountClosed(a.length)}}},controller:{userInfo:{get:function(){a.api.server.module("select",{request:"userInfo",respondTo:"components.dashboard.controller.userInfo.set",params:null})},set:function(a){c.model.userInfo.name=a[0].full_name,c.view.setUsername(a[0].full_name)}},dropdown:{getList:function(){a.api.server.module("select",{request:"userList",respondTo:"components.dashboard.view.dropdown.userList"})}},datepicker:{choice:function(){var b=$(this),d=b.data("value"),f=($("#calendar"),d.split("/")),g=parseInt(f[1])+1,h=f[2],i={year:f[0],month:1===String(g).length?"0"+g:String(g),day:1===String(h).length?"0"+h:String(h)},j=i.year+"-"+i.month+"-"+i.day,k=i.day+"-"+i.month+"-"+i.year;c.view.datepicker.trigger(),$("#calendar-trigger .date").text(k),a.api.server.module("select",{request:"closedAlerts",respondTo:"components.dashboard.view.alerts.closedAlerts",params:{date:j}})}},alerts:{getLists:function(){a.api.server.module("select",{request:"currentAlerts",respondTo:"components.dashboard.view.alerts.currentAlerts",params:null}),a.api.server.module("select",{request:"closedAlerts",respondTo:"components.dashboard.view.alerts.closedAlerts",params:null})}},format:{datetime:function(a){var b={date:moment(a).format("DD-MM-YYYY"),time:moment(a).format("H:mm"),calendar:moment().calendar(a,{sameDay:"[Vandaag]",nextDay:"[Gisteren]",lastDay:"[Morgen]"})},c={date:"Vandaag"==b.calendar||"Gisteren"==b.calendar||"Morgen"==b.calendar?b.calendar:b.date,time:b.time};return c},priority:function(a){return 1==a?"red":2==a?"orange":3==a?"yellow":4==a?"green":void 0}},update:{alert:function(){var a=$(".dropdown"),b=a.attr("group");"function"==typeof c.controller.update[b]&&c.controller.update[b]()},assign:function(){var b=$(".dropdown"),c=b.attr("row"),d=b.find(".selected").text();if(0==d.length)return!1;var e={id:c,employee:d};a.api.server.module("update",{request:"assign",respondTo:"components.dashboard.controller.broadcast.assign",params:{data:e}})},close:function(){var b=$(".dropdown"),c=b.attr("row"),d=b.find(".selected").text();if(0==d.length)return!1;var e={id:c,employee:d};a.api.server.module("update",{request:"close",respondTo:"components.dashboard.controller.broadcast.close",params:{data:e}})}},broadcast:{assign:function(a){c.view.dropdown.cancel();var b=$(".row[data-alert="+a.id+"]").find(".col-9");b.text(a.employee),TweenMax.to(b,.3,{color:"orange"}),TweenMax.to(b,.3,{delay:1,color:"#81939f"})},close:function(b){function g(){d.remove(),c.view.alerts.amountCurrent($(".current-alerts .table-data").find(".row").length)}c.view.dropdown.cancel(!1);var d=$(".current-alerts .row[data-alert="+b.id+"]"),e=$(".old-alerts .table-data"),f=e.offset().top;TweenMax.set(d,{position:"absolute"}),TweenMax.to(d,1,{scale:.5,top:f-d.offset().top+100,opacity:0,onComplete:g,onCompleteParams:[]}),setTimeout(function(){var b=$("#calendar-trigger .date").text().split("-"),c=b[0],d=b[1],e=b[2],f=e+"-"+d+"-"+c;a.api.server.module("select",{request:"closedAlerts",respondTo:"components.dashboard.view.alerts.closedAlerts",params:{date:f}})},500)}}},framework:{run:function(){$("#calendar").kendoCalendar(),c.controller.alerts.getLists(),c.controller.dropdown.getList(),c.controller.userInfo.get()},stop:function(){},events:function(){$(document).on("click","#dashboard-page .logout",a.api.auth.logout),$(document).on("click","#calendar td .k-link",c.controller.datepicker.choice),$(document).on("click","#calendar-trigger",c.view.datepicker.trigger),$(document).on("click",".current-alerts .table-data .col-9",c.view.assign.userList),$(document).on("click",".current-alerts .table-data .col-10",c.view.closeCase.userList),$(document).on("click",".dropdown .list li",c.view.dropdown.selection),$(document).on("click",".dropdown .cancel",c.view.dropdown.cancel),$(document).on("click",".dropdown .confirm",c.controller.update.alert)}}};var c=a.components[b.name]}(Base),function(a){var b={name:"login"};a.components[b.name]={model:{flag:{loginAttempt:!1}},view:{login:{attempt:function(){$(".login-error").hide(),c.model.flag.loginAttempt||(c.model.flag.loginAttempt=!0,preloader.active(!0),c.controller.login())},failed:function(){$("#app-wrapper");preloader.active(!1),c.model.flag.loginAttempt=!1,$(".login-error").show()},success:function(){$("#app-wrapper");c.model.flag.loginAttempt=!1,preloader.active(!1),a.router.controller.visit("dashboard")}}},controller:{login:function(){var b=$("#login-page input[name=username]").val(),c=$("#login-page input[name=password]").val();a.api.server.module("auth",{request:"login",respondTo:"components.login.controller.loginResult",params:{username:b,password:c}})},loginResult:function(a){a.error?c.view.login.failed():c.view.login.success()},keyUp:function(a){13==a.keyCode&&c.view.login.attempt()}},framework:{run:function(){},stop:function(){},events:function(){$(document).on("click","#login-page button",c.view.login.attempt),$(document).on("keyup","#login-page input[name=password]",c.controller.keyUp)}}};var c=a.components[b.name]}(Base),function(a){var b={name:"popup"};a.components[b.name]={model:{lightbox:{open:!1},html:{listItem:'<li data-firstname="@@firstname@@" data-lastname="@@lastname@@" data-telephone="@@telephone@@">@@company@@</li>'},flag:{submit:!1}},view:{submit:{error:function(a){var b=$("#form-error");b.find("span").text(a),b.show()}},lightbox:{trigger:function(){function e(){TweenMax.set([a,b],{display:"none"})}var a=$("#blackbox"),b=$("#lightbox-wrapper"),d=b.find(".lightbox");TweenMax.killTweensOf([a,b,d]),c.model.lightbox.open?(c.model.lightbox.open=!1,TweenMax.to(a,.2,{delay:.7,opacity:0,onComplete:e,onCompleteParams:[]}),TweenMax.to(b,.4,{opacity:0,scale:0,ease:Elastic.easeIn.config(1,.75)})):(c.view.form.setDefault(),c.model.lightbox.open=!0,TweenMax.set(a,{display:"block",opacity:0}),TweenMax.set(b,{display:"block",scale:0,opacity:0}),TweenMax.to(a,.2,{opacity:1}),TweenMax.to(b,.6,{delay:.7,opacity:1,scale:1,ease:Elastic.easeOut.config(1,.75)}))}},form:{newContact:function(){var a=$(this),b=a.find(".checkbox"),c="selected",d=b.hasClass("selected")?"removeClass":"addClass";b[d](c)},priorityChoice:function(){var a=$(this),b=a.parent();b.find("li.selected").removeClass("selected"),a.addClass("selected")},timeChoice:function(){var a=$(this).text();console.log(a);var b=$("#time-dropdown");$("input[name=deadline-time]").val(a),b.hide()},timeList:function(){var a=$("#time-dropdown");a.is(":visible")?a.hide():a.show()},showCalendar:function(){var a=$("#calendar-deadline");a.is(":visible")?(TweenMax.killTweensOf(a),TweenMax.to(a,.2,{scale:0,opacity:0}),TweenMax.set(a,{delay:.2,display:"none"})):(TweenMax.killTweensOf(a),TweenMax.set(a,{scale:0,opacity:0,display:"block"}),TweenMax.to(a,.2,{scale:1,opacity:1}))},deadlineDate:function(){var a=$(this),b=a.data("value"),c=$("#calendar-deadline"),d=b.split("/"),e=parseInt(d[1])+1,f=d[2],g={year:d[0],month:1===String(e).length?"0"+e:String(e),day:1===String(f).length?"0"+f:String(f)},h=g.year+"-"+g.month+"-"+g.day,i=g.day+"-"+g.month+"-"+g.year;$(".lightbox-form input[name=deadline-date]").val(i),$(".lightbox-form input[name=deadline-date]").attr("formatted",h),TweenMax.killTweensOf(c),TweenMax.to(c,.2,{scale:0,opacity:0}),TweenMax.set(c,{delay:.2,display:"none"})},updateAssign:function(){var a=$(".dropdown li.selected").text();$(".dropdown").hide(),$("input[name=assign-to]").val(a)},assignList:function(){var b=$(this),c={id:null,group:"create_assign",title:"Melding voor",y:b.offset().top-120,x:b.offset().left};a.components.dashboard.view.dropdown.show(c)},setDefault:function(){var b=$(".lightbox-form");$("#form-error").hide(),b.find("input").each(function(){$(this).val("")}),$("#new-contact-wrapper").show(),b.find("input[name=created-by]").val(a.components.dashboard.model.userInfo.name),b.find("input[name=assign-to]").val("Bas van Heugten"),b.find("input[name=deadline-time]").val("17:00"),b.find("input[name=deadline-date]").val("Vandaag"),b.find(".priority-list li.selected").removeClass("selected"),b.find(".priority-list li:first").addClass("selected"),b.find("#new-contact-wrapper .checkbox").removeClass("selected"),Mat.view.input.updateAll(),c.view.form.autoComplete.hideList()},autoComplete:{list:function(a){var b=$("#auto-complete-list"),d=b.find("ul"),e=c.model.html.listItem;d.html(""),a.length>0?(b.show(),_.forEach(a,function(a,b){var c=null;c=e.replace("@@company@@",a.company).replace("@@firstname@@",a.firstname).replace("@@lastname@@",a.lastname).replace("@@telephone@@",a.telephone),$(c).appendTo(d)})):(d.html(""),b.hide())},hideList:function(){var a=$("#auto-complete-list"),b=a.find("ul");b.html(""),a.hide()},navigateUp:function(){var a=$("#auto-complete-list"),b=a.find("ul"),c=b.find("li"),d=b.find("li.selected");0==d.length?c.last().addClass("selected"):(d.removeClass("selected"),d.prev().addClass("selected"))},navigateDown:function(){var a=$("#auto-complete-list"),b=a.find("ul"),c=b.find("li"),d=b.find("li.selected");0==d.length?c.first().addClass("selected"):(d.removeClass("selected"),d.next().addClass("selected"))},clickItem:function(){var a=$("#auto-complete-list"),b=a.find("ul"),e=(b.find("li"),b.find("li.selected"));e.removeClass("selected"),$(this).addClass("selected"),c.view.form.autoComplete.takeSelected()},takeSelected:function(){var a=$("#auto-complete-list li.selected"),b={company:a.text(),firstname:a.data("firstname"),lastname:a.data("lastname"),telephone:a.data("telephone")};c.view.form.autoComplete.hideList(),c.view.form.autoComplete.autoFillForm(b)},autoFillForm:function(a){var b=$(".lightbox-form"),c=b.find("input[name=company]"),d=b.find("input[name=first-name]"),e=b.find("input[name=last-name]"),f=b.find("input[name=telephone]");c.val(a.company),d.val(a.firstname),e.val(a.lastname),f.val(a.telephone),Mat.view.input.updateAll(),$("#new-contact-wrapper .checkbox").removeClass("selected"),$("#new-contact-wrapper").hide()}}}},controller:{submit:{assamble:function(){var a=$(".lightbox-form");if($("#form-error").hide(),!c.model.flag.submit){c.model.flag.submit=!0;var b={company:a.find("input[name=company]").val(),firstname:a.find("input[name=first-name]").val(),lastname:a.find("input[name=last-name]").val(),telephone:a.find("input[name=telephone]").val(),shortDescription:a.find("input[name=short-description]").val(),longDescription:a.find("input[name=long-description]").val(),createdBy:a.find("input[name=created-by]").val(),assignedTo:a.find("input[name=assign-to]").val(),deadlineDate:a.find("input[name=deadline-date]").attr("formatted")||"",deadlineTime:a.find("input[name=deadline-time]").val(),priority:a.find(".priority-list li.selected").data("prio"),newContact:a.find("#new-contact-wrapper .checkbox").hasClass("selected")};c.controller.submit.validate(b)}},validate:function(a){var b=!1,d=null;0===a.company.length?(b=!0,d="Vul een bedrijfsnaam in"):0===a.firstname.length&&0===a.lastname.length?(b=!0,d="Vul een voornaam of achternaam in"):a.telephone.length<10?(b=!0,d="Vul een (minstens 10 cijferig) telefoonnummer in"):0===a.shortDescription.length&&(b=!0,d="Vul een korte omschrijving in"),b?(c.view.submit.error(d),c.model.flag.submit=!1):(console.log(a),c.controller.submit.send(a))},send:function(b){c.model.flag.submit=!1,c.view.lightbox.trigger(),a.api.server.module("insert",{request:"newAlert",respondTo:"components.popup.controller.broadcast.formSent",params:{data:b}})}},autoComplete:{keyPress:function(b){var d=$(this),e=b.keyCode;38==e?c.view.form.autoComplete.navigateUp():40==e?c.view.form.autoComplete.navigateDown():13==e?c.view.form.autoComplete.takeSelected():d.val().length>1?a.api.server.module("select",{request:"autoComplete",respondTo:"components.popup.view.form.autoComplete.list",params:{value:d.val()}}):c.view.form.autoComplete.hideList()}},broadcast:{formSent:function(){a.api.server.module("select",{request:"currentAlerts",respondTo:"components.dashboard.view.alerts.currentAlerts",params:null})}}},framework:{run:function(){$("#calendar-deadline").kendoCalendar()},stop:function(){},events:function(){$(document).on("click","#new-notification",c.view.lightbox.trigger),$(document).on("click",".lightbox-title .close",c.view.lightbox.trigger),$(document).on("keyup",".lightbox-form input[name=company]",c.controller.autoComplete.keyPress),$(document).on("click","#auto-complete-list li",c.view.form.autoComplete.clickItem),$(document).on("click",".lightbox-form .row-4 .input-wrapper:eq(1)",c.view.form.assignList),$(document).on("click",".lightbox-form .row-4 .input-wrapper:eq(2) input",c.view.form.showCalendar),$(document).on("click",".lightbox-form .row-4 .input-wrapper:eq(3) input",c.view.form.timeList),$(document).on("click",".dropdown[group=create_assign] .confirm",c.view.form.updateAssign),$(document).on("click",".lightbox-form #calendar-deadline td .k-link",c.view.form.deadlineDate),$(document).on("click","#time-dropdown li",c.view.form.timeChoice),$(document).on("click",".lightbox-form .priority-list li",c.view.form.priorityChoice),$(document).on("click",".lightbox-form #new-contact-wrapper",c.view.form.newContact),$(document).on("click","#new-cancel",c.view.lightbox.trigger),$(document).on("click","#new-confirm",c.controller.submit.assamble)}}};var c=a.components[b.name]}(Base),function(a){a.router={model:{pages:null,runComponents:null},controller:{init:function(){b.controller.getPageList(),b.controller.componentsEvents()},events:function(){window.addEventListener("hashchange",b.controller.urlWatcher,!1)},componentsEvents:function(){_.forEach(Base.components,function(a,b){Base.components[b].framework.events()})},getPageList:function(){a.api.server.module("files",{request:"config",respondTo:"router.controller.setPageList",params:null})},setPageList:function(a){b.model.pages=a.json.pages,b.controller.events(),b.controller.urlWatcher()},urlWatcher:function(){var c=a.api.client.hashObject();b.controller.getPage(c.full)},getPage:function(c){return 0==c.length?(b.controller.goDefaultPage(),!1):void _.forEach(b.model.pages,function(d,e){return d.hash==c?(a.api.server.module("pages",{request:d.view,respondTo:"router.controller.showPage",params:null}),b.model.runComponents=null,b.model.runComponents=d.properties.components,!1):void 0})},showPage:function(c){c.auth===!0?a.api.client.appView(c.html):b.controller.goAuthPage()},goDefaultPage:function(){_.forEach(b.model.pages,function(a,c){return a.properties["default"]?(b.controller.visit(a.view),!1):void 0})},goAuthPage:function(){_.forEach(b.model.pages,function(a,c){return a.properties.isAuthPage?(b.controller.visit(a.view),!1):void 0})},visit:function(a){window.location.hash="/"+a}}};var b=a.router;a.router.controller.init()}(Base);