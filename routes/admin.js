var express = require("express");
const cors = require('cors');
var exe = require("./../connection");
var router = express.Router();

router.get("/",function(req,res){
    res.render("admin/home.ejs");
});
router.get("/sliderapi",async function(req,res){
    var slider = await exe (`SELECT * FROM slider`);
    var obj = {"slider":slider};
    res.send(obj);
});

// about section start

router.get("/add_about_info",function(req,res){
    res.render("admin/about.ejs");
});

router.post("/save_about_info",async function(req,res){
    var photo = "";
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
        }
    }
    var d = req.body;
    d.title = d.title.replaceAll("'","\\'");
    d.description = d.description.replaceAll("'","\\'");
    var sql = `INSERT INTO about(title,description,type,photo)VALUES('${d.title}','${d.description}','${d.type}','${photo}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_about_info");
});

router.get("/about_list",async function(req,res){
    var about = await exe (`SELECT * FROM about`);
    var obj = {"about":about};
    res.render("admin/about_list.ejs",obj);
});

router.get("/delete_about_info/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM about WHERE about_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/about_list");
});

router.get("/edit_about_info/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM about WHERE about_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_about_info.ejs",obj);
});

router.post("/update_about_info",async function(req,res){
    var id = req.body.about_id;
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
            var sql2 = `UPDATE about SET photo = '${photo}' WHERE about_id = '${id}'`;
            var data2 = await exe(sql2);
            console.log(data2);
        }
    }
    var d = req.body;
    var sql = `UPDATE about SET 
               title = '${d.title}',
               description = '${d.description}',
               type = '${d.type}'
               WHERE about_id = '${id}'
              `; 
    var data = await exe(sql);
    res.redirect("/admin/about_list");
});

// about section end

// gallary section start

router.get("/add_photo",function(req,res){
    res.render("admin/photo.ejs");
});

router.post("/save_photo",async function(req,res){
    var photo = "";
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
        }
    }
    var sql = `INSERT INTO gallary(photo)VALUES('${photo}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_photo");
});

router.get("/photo_list",async function(req,res){
    var gallary = await exe (`SELECT * FROM gallary`);
    var obj = {"gallary":gallary};
    res.render("admin/photo_list.ejs",obj);
});

router.get("/delete_photo/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM gallary WHERE gallary_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/photo_list");
});

router.get("/edit_photo/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM gallary WHERE gallary_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_photo.ejs",obj);
});

router.post("/update_photo",async function(req,res){
    var id = req.body.gallary_id;
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
            var sql = `UPDATE gallary SET photo = '${photo}' WHERE gallary_id = '${id}'`;
            var data = await exe(sql);
            res.redirect("/admin/photo_list");
        }
    }
});

// gallary section end

// slider section start

router.get("/add_slider_photo",function(req,res){
    res.render("admin/slider_photo.ejs");
});

router.post("/save_slider_photo",async function(req,res){
    var photo = "";
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
        }
    }
    var sql = `INSERT INTO slider(photo)VALUES('${photo}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_slider_photo");
});

router.get("/slider_photo_list",async function(req,res){
    var slider = await exe (`SELECT * FROM slider`);
    var obj = {"slider":slider};
    res.render("admin/slider_photo_list.ejs",obj);
});

router.get("/delete_slider_photo/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM slider WHERE slider_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/slider_photo_list");
});

router.get("/edit_slider_photo/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM slider WHERE slider_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_slider_photo.ejs",obj);
});

router.post("/update_slider_photo",async function(req,res){
    var id = req.body.slider_id;
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
            var sql = `UPDATE slider SET photo = '${photo}' WHERE slider_id = '${id}'`;
            var data = await exe(sql);
            res.redirect("/admin/slider_photo_list");
        }
    }
});

// slider section end

//whychoose section start

router.get("/add_info",function(req,res){
    res.render("admin/whychoose.ejs");
});

router.post("/save_info",async function(req,res){
    var icon = "";
    if(req.files)
    {
        if(req.files.icon)
        {
            var icon = new Date().getTime()+req.files.icon.name;
            req.files.icon.mv("public/uploads/"+icon);
        }
    }
    var d = req.body;
    d.title = d.title.replaceAll("'","\\'");
    var sql = `INSERT INTO whychoose(title,icon)VALUES('${d.title}','${icon}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_info");
});

router.get("/info_list",async function(req,res){
    var whychoose = await exe (`SELECT * FROM whychoose`);
    var obj = {"whychoose":whychoose};
    res.render("admin/info_list.ejs",obj);
});

router.get("/delete_whychoose_info/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM whychoose WHERE whychoose_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/info_list");
});

router.get("/edit_whychoose_info/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM whychoose WHERE whychoose_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_whychoose_info.ejs",obj);
});

router.post("/update_whychoose_info",async function(req,res){
    var id = req.body.whychoose_id;
    if(req.files)
    {
        if(req.files.icon)
        {
            var icon = new Date().getTime()+req.files.icon.name;
            req.files.icon.mv("public/uploads/"+icon);
            var sql2 = `UPDATE whychoose SET icon = '${icon}' WHERE whychoose_id = '${id}'`;
            var data2 = await exe(sql2);
            console.log(data2);
        }
    }
    var d = req.body;
    var sql = `UPDATE whychoose SET 
               title = '${d.title}'
               WHERE whychoose_id = '${id}'
              `; 
    var data = await exe(sql);
    res.redirect("/admin/info_list");
});

//whychoose section end


// article section Start

router.get("/add_article",function(req,res){
    res.render("admin/article.ejs");
});

router.post("/save_article",async function(req,res){
    var photo = "";
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
        }
    }
    var sql = `INSERT INTO article(photo)VALUES('${photo}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_article");
});

router.get("/article_list",async function(req,res){
    var article = await exe (`SELECT * FROM article`);
    var obj = {"article":article};
    res.render("admin/article_list.ejs",obj);
});

router.get("/delete_article/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM article WHERE article_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/article_list");
});

router.get("/edit_article/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM article WHERE article_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_article.ejs",obj);
});

router.post("/update_article",async function(req,res){
    var id = req.body.article_id;
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
            var sql = `UPDATE article SET photo = '${photo}' WHERE article_id = '${id}'`;
            var data = await exe(sql);
            res.redirect("/admin/article_list");
        }
    }
});


// article section end

// courses section Start

router.get("/add_course",function(req,res){
    res.render("admin/course.ejs");
});

router.post("/save_course",async function(req,res){
    var photo = "";
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
        }
    }
    var d = req.body;
    d.course_title = d.course_title.replaceAll("'","\\'");
    d.description = d.description.replaceAll("'","\\'");
    d.duration = d.duration.replaceAll("'","\\'");
    var sql = `INSERT INTO course(course_title,description,duration,old_price,new_price,photo)VALUES('${d.course_title}','${d.description}','${d.duration}','${d.old_price}','${d.new_price}','${photo}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_course");
});

router.get("/course_list",async function(req,res){
    var course = await exe (`SELECT * FROM course`);
    var obj = {"course":course};
    res.render("admin/course_list.ejs",obj);
});

router.get("/delete_course/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM course WHERE course_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/course_list");
});

router.get("/edit_course/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM course WHERE course_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_course.ejs",obj);
});

router.post("/update_course",async function(req,res){
    var id = req.body.course_id;
    if(req.files)
    {
        if(req.files.photo)
        {
            var photo = new Date().getTime()+req.files.photo.name;
            req.files.photo.mv("public/uploads/"+photo);
            var sql2 = `UPDATE course SET photo = '${photo}' WHERE course_id = '${id}'`;
            var data2 = await exe(sql2);
            console.log(data2);
        }
    }
    var d = req.body;
    var sql = `UPDATE course SET 
               course_title = '${d.course_title}',
               description = '${d.description}',
               duration = '${d.duration}',
               old_price = '${d.old_price}',
               new_price = '${d.new_price}'
               WHERE course_id = '${id}'
              `; 
    var data = await exe(sql);
    res.redirect("/admin/course_list");
});

// courses section end

//center section start

router.get("/add_center",function(req,res){
    res.render("admin/center.ejs");
});

router.post("/save_center",async function(req,res){
    var d = req.body;
    d.area_name = d.area_name.replaceAll("'","\\'");
    d.address = d.address.replaceAll("'","\\'");
    var sql = `INSERT INTO center(area_name,address,mobile,link)VALUES('${d.area_name}','${d.address}','${d.mobile}','${d.link}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/add_center");
});

router.get("/center_list",async function(req,res){
    var center = await exe (`SELECT * FROM center`);
    var obj = {"center":center};
    res.render("admin/center_list.ejs",obj);
});

router.get("/delete_center/:id",async function(req,res){
    var id = req.params.id;
    var sql =`DELETE FROM center WHERE center_id ='${id}'`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/center_list");
});

router.get("/edit_center/:id",async function(req,res){
    var id = req.params.id;
    var data = await exe(`SELECT * FROM center WHERE center_id ='${id}'`);
    var obj = {"info":data[0]};
    res.render("admin/edit_center.ejs",obj);
});

router.post("/update_center",async function(req,res){
    var id = req.body.center_id;
    var d = req.body;
    var sql = `UPDATE center SET 
               area_name= '${d.area_name}',
               address = '${d.address}',
               mobile = '${d.mobile}',
               link = '${d.link}'
               WHERE center_id = '${id}'
              `; 
    var data = await exe(sql);
    res.redirect("/admin/center_list");
});

//center section end

//contact section start

router.get("/contact",async function(req,res){
    var data = await exe(`SELECT * FROM contact`);
    var obj = {"info":data[0]}
    res.render("admin/contact.ejs",obj);
});

router.post("/save_contact",async function(req,res){
    var d = req.body;
    var sql = `UPDATE contact SET
               email = '${d.email}',
               mobile = '${d.mobile}',
               address = '${d.address}',
               i_link ='${d.i_link}',
               y_link ='${d.y_link}',
               f_link ='${d._link}',
               t_link ='${d.t_link}'
               WHERE contact_id =1
             `;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/admin/contact");
});

//contact section end

//api

router.get("/about_api",async function(req,res){
    var sql = `select * from about`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/gallary_api",async function(req,res){
    var sql = `select * from gallary`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/whychoose_api",async function(req,res){
    var sql = `select * from whychoose`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/slider_api",async function(req,res){
    var sql = `select * from slider`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/center_api",async function(req,res){
    var sql = `select * from center`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/article_api",async function(req,res){
    var sql = `select * from article`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/course_api",async function(req,res){
    var sql = `select * from course`;
    var data = await exe(sql);
    res.send(data);
});

router.get("/contact_api",async function(req,res){
    var sql = `select * from contact`;
    var data = await exe(sql);
    res.send(data);
});


//api

module.exports = router;
