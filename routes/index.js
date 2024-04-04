const express = require("express");
const route = express.Router();
const { checkAuthentication } = require("../middleware/tokens");
const { dynamicTable } = require("../controller/dynamicTable/dynamicTable")
const { register, registration } = require("../controller/registration/registration")
const { log, login } = require("../controller/Login/login")
const { task } = require("../controller/task/task")
const { kukucube } = require("../controller/kukucube/kukucube")
const { tic_tac_toe } = require("../controller/tic-tac-toe/tic-tac-toe")
const { events } = require("../controller/js_events/events")
const { prac1_web } = require("../controller/practical1_web/pract_web")
const { pract2_web } = require("../controller/practical2_web/pract2_web")
const { pract3_web } = require("../controller/practical3_web/pract3_web")
const { app_form_1 } = require("../controller/job_app_form1/job_app_form")
const { app_form2 } = require("../controller/job_app_form2/job_app_form2")
const { form_get, form_post, lists, userdetails } = require("../controller/crud_fs/crud_fs")
const { frm_get, frm_post, list, userdetail } = require("../controller/crud_db/crud_db")
const { student_list } = require("../controller/student_list/student_list")
const { stud_attend } = require("../controller/stud_attend/stud_attend")
const { stud_result, stud_details } = require("../controller/stud_result/stud_result")
const { dynamic } = require("../controller/dynamic_query/dynamic")
const { search_get, search_post } = require("../controller/search/searching")
const { getForm, postForm, display, update_get, fetch, update_post } = require("../controller/insert_update_form/form")
const { pagination, comment } = require("../controller/json_placeholder/placeholder_pagination")
const { logout } = require("../controller/logout/logout")

route.get("/registration", register)

route.post("/registration", registration)

route.get("/login", log)

route.post("/login", login)

route.get("/task", checkAuthentication, task)

route.get("/dynamictable", checkAuthentication, dynamicTable)

route.get("/kukuCube", checkAuthentication, kukucube)

route.get("/tic-tac-toe", checkAuthentication, tic_tac_toe)

route.get("/events", checkAuthentication, events)

route.get("/practical1", checkAuthentication, prac1_web)

route.get("/practical2", checkAuthentication, pract2_web)

route.get("/practical3", checkAuthentication, pract3_web)

route.get("/Job_app_form_1", checkAuthentication, app_form_1)

route.get("/job_app_form2", checkAuthentication, app_form2)

route.get('/crud_fs/form', checkAuthentication, form_get)

route.post('/crud_fs/form', checkAuthentication, form_post);

route.get('/crud_fs/list', checkAuthentication, lists)

route.get('/userdetails', checkAuthentication, userdetails)

route.get('/crud_db/form', checkAuthentication, frm_get);

route.post('/crud_db/form', checkAuthentication, frm_post);

route.get('/crud_db/list', checkAuthentication, list);

route.get('/userdetail', checkAuthentication, userdetail)

route.get("/student_list", checkAuthentication, student_list);

route.get("/stud_attend", checkAuthentication, stud_attend);

route.get("/stud_result", checkAuthentication, stud_result);

route.get('/student_details', checkAuthentication, stud_details)

route.get("/dynamic", checkAuthentication, dynamic);

route.get("/searching", checkAuthentication, search_get);

route.post("/searching", checkAuthentication, search_post)

route.get("/pagination", checkAuthentication, pagination)

route.get("/comment", checkAuthentication, comment)

route.get("/form", checkAuthentication, getForm)

route.post("/form", checkAuthentication, postForm)

route.get('/display', checkAuthentication, display)

route.get("/update/:id", checkAuthentication, update_get)

route.get("/fetch/:id", checkAuthentication, fetch)

route.post("/update/:id", checkAuthentication, update_post)

route.get("/logout", checkAuthentication, logout)

module.exports = route;