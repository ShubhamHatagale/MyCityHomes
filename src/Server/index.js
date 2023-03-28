const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const app = express();
app.use(express.json());
app.use(cors());
const fs = require("fs");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "cityhomes",
});
// image upload---->
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })

// var upload = multer({ storage: storage })

/* GET create blog. */
// app.get('/create', function(req, res, next) {
//   res.render('create', {title: 'Create Blog'});
// });

app.post("/addPrimeCategory", upload.single("file"), function (req, res, next) {
  // var fileinfo = req.file;
  // var title = req.body.title;
  const name = req.body.name;
  const image = req.body.image;
  const showon = req.body.showon;
  // console.log(req.file.filename);
  console.log(name, image, showon);
  // res.send(fileinfo);

  db.query(
    "INSERT INTO prime_category (name,image,showon) VALUES (?,?,?)",
    [name, image, showon],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/addEmployee", (req, res) => {
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const address = req.body.address;
  const username = req.body.username;
  const password = req.body.password;
  const sales = req.body.sales;
  const collection = req.body.collection;
  const delivery = req.body.delivery;

  // const sales = req.body.sales;
  // const collection = req.body.collection;
  // const delivery = req.body.delivery;

  db.query(
    "INSERT INTO users (name,mobile,email,address,username,password,sales,collection,delivery) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      name,
      mobile,
      email,
      address,
      username,
      password,
      sales,
      collection,
      delivery,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const sales = req.body.sales;
  // const collection = req.body.collection;
  // const delivery = req.body.delivery;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    // "SELECT * FROM users WHERE username = ? AND password = ? AND sales = ? AND collection = ? AND delivery = ?",
    // [username, password,sales,collection,delivery],
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "wrong username or password" });
      }
    }
  );
});

app.get("/addEmployee/get", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/sales/get", (req, res) => {
  const sqlSelect = "SELECT * FROM users WHERE sales = 1";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//  update employee reg
app.put("/addEmployee/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const address = req.body.address;
  const username = req.body.username;
  const password = req.body.password;
  const sales = req.body.sales;
  const collection = req.body.collection;
  const delivery = req.body.delivery;

  const sqlUpdate =
    "UPDATE users SET name = ?,mobile= ?,email= ?,address= ?,username= ?,password= ?,sales= ?,collection= ?,delivery= ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [
      name,
      mobile,
      email,
      address,
      username,
      password,
      sales,
      collection,
      delivery,
      id,
    ],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

// connectivity of admin
app.post("/adminLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const sales = req.body.sales;
  // const collection = req.body.collection;
  // const delivery = req.body.delivery;

  db.query(
    "SELECT * FROM admin WHERE username = ? AND password = ?",
    [username, password],

    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "wrong username or password" });
      }
    }
  );
});

app.post("/adminReg", (req, res) => {
  const role = 2;
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const address = req.body.address;
  // const sales = req.body.sales;
  // const collection = req.body.collection;
  // const delivery = req.body.delivery;

  db.query(
    "INSERT INTO admin (role,name, username, email, mobile, password, address) VALUES (?,?,?,?,?,?,?)",
    [role, name, username, email, mobile, password, address],
    (err, result) => {
      console.log(err);
    }
  );
});

app.put("/adminReg/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const address = req.body.address;

  const sqlUpdate =
    "UPDATE admin SET name = ?,username = ?,email = ?,mobile = ?,password = ?,address = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [name, username, email, mobile, password, address, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

// update data from registered admins
// app.put('/adminReg/update', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     db.query(
//         "UPDATE admin SET admin = ? WHERE id = ?",
//         // "SELECT * FROM users WHERE username = ? AND password = ? AND sales = ? AND collection = ? AND delivery = ?",
//         // [username, password,sales,collection,delivery],
//         [id],
//         (err, result) => {
//             if (err) {
//                 res.send({ err: err });
//             }
//             if (result.length > 0) {
//                 res.send(result);
//             }
//             else {
//                 res.send({ message: "wrong username or password" });
//             }
//         }
//     );
// })

app.get("/adminReg/get", (req, res) => {
  const sqlSelect = "SELECT * FROM admin";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// products and services---->addPrimeCategory,-->registerPrimeCategory

// app.post('/addPrimeCategory', (req, res) => {
//     const name = req.body.name;
//     const image = req.body.image;
//     const showon = req.body.showon;

//     db.query(
//         "INSERT INTO prime_category (name,image,showon) VALUES (?,?,?)",
//         [name,image,showon],
//         (err, result) => {
//             console.log(err);
//         }
//     );
// })
// -->registerPrimeCategory
app.get("/addPrimeCategory/get", (req, res) => {
  const sqlSelect = "SELECT * FROM prime_category";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/addPrimeCategory/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const image = req.body.image;

  const sqlUpdate = "UPDATE prime_category SET name = ?,image= ? WHERE id = ?";

  db.query(sqlUpdate, [name, image, id], (err, result) => {
    if (err) console.log(err);
  });
});

// products and services---->addSubCategory,-->registerSubCategory
app.post("/addSubCategory", (req, res) => {
  const primeCatId = req.body.primeCatId;
  const name = req.body.name;
  const image = req.body.image;
  const demo = req.body.demo;
  const showon = req.body.showon;

  db.query(
    "INSERT INTO sub_category (primeCatId,name,image,demo,showon) VALUES (?,?,?,?,?)",
    [primeCatId, name, image, demo, showon],
    (err, result) => {
      console.log(err);
    }
  );
});
// -->registerSubCategory
app.get("/addSubCategory/get", (req, res) => {
  const sqlSelect = "SELECT * FROM sub_category";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// products and services---->addBrand,-->registerBrand
app.post("/addBrand", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;

  db.query(
    "INSERT INTO add_brand (name,image) VALUES (?,?)",
    [name, image],
    (err, result) => {
      console.log(err);
    }
  );
});
// -->registerBrand
app.get("/addBrand/get", (req, res) => {
  const sqlSelect = "SELECT * FROM add_brand";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// products and services---->addunit,-->registerunit
app.post("/addunit", (req, res) => {
  const name = req.body.name;

  db.query("INSERT INTO add_unit (name) VALUES (?)", [name], (err, result) => {
    console.log(err);
  });
});
// -->registerunit
app.get("/addUnit/get", (req, res) => {
  const sqlSelect = "SELECT * FROM add_unit";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/unit/delete", (req, res) => {
  const id = req.body.id;

  db.query(
    "DELETE FROM add_unit WHERE id = ?",
    [id],
    (err, result) => {
      console.log(err);
    }
  );
});

  // app.get("/unit/Delete", (req, res) => {
  //   const delid = req.body.delid;

  //   const sqlSelect = "DELETE FROM add_unit WHERE delid = ?",
  //   [delid],

  //   (err, result) => {
  //     console.log(err);
  //   }
  // });

// products and services---->addProduct,-->registeProduct
// app.post('/addProduct', (req, res) => {
//     const name = req.body.name;

//     db.query(
//         "INSERT INTO add_product (name) VALUES (?)",
//         [name],
//         (err, result) => {
//             console.log(err);
//         }
//     );
// })
// // -->registeProduct
// app.get('/addProduct/get', (req, res) => {
//     const sqlSelect = "SELECT * FROM add_product";
//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//     });
// })

// -->AddProduct
app.post("/addProducts", (req, res) => {
  const primeCatId = req.body.primeCatId;
  const subCatId = req.body.subCatId;
  const brand = req.body.brand;
  const vendor = req.body.vendor;
  const name = req.body.name;
  const shortDescc = req.body.shortDescc;
  const longDescc = req.body.longDescc;
  const min_qty = req.body.min_qty;
  const basePrice = req.body.basePrice;
  const marketPrice = req.body.marketPrice;
  const ourPrice = req.body.ourPrice;
  const unit = req.body.unit;
  const fixed = req.body.fixed;
  const percent = req.body.percent;
  const allowance = req.body.allowance;
  const varName = req.body.varName;
  const varbasePrice = req.body.varbasePrice;
  const varMarketPrice = req.body.varMarketPrice;
  const varourPrice = req.body.varourPrice;

  db.query(
    "INSERT INTO products (primeCatId,subCatId,brand,vendor,name,shortDescc,longDescc,min_qty,basePrice,marketPrice,ourPrice,unit,fixed,percent,allowance,varName,varbasePrice,varMarketPrice,varourPrice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      primeCatId,
      subCatId,
      brand,
      vendor,
      name,
      shortDescc,
      longDescc,
      min_qty,
      basePrice,
      marketPrice,
      ourPrice,
      unit,
      fixed,
      percent,
      allowance,
      varName,
      varbasePrice,
      varMarketPrice,
      varourPrice,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

// add ProductsImages->

// app.use("static", express.static("uploads"));

// app.post("/uploadFile", upload.single("avatar"), (req,res) => {
//     let fileType = req.file.mimetype.split("/")[1];
//     let image = req.file.filename + "." + fileType;
//     console.log(`./uploads/${image}`);

//     fs.rename(
//         `./uploads/${req.file.filename}`,
//         `./uploads/${image}`,

//         function () {
//             console.log("callback");
//             res.send("200")

//             db.query(
//                 "INSERT INTO prod_images (image) VALUES (?)",
//                 [image],
//                 (err, result) => {
//                     console.log(err);
//                 }
//             );
//         }
//     )

// })

app.use("static", express.static("uploads"));
app.post("/addServices", upload.single("avatar"), (req, res) => {
  let fileType = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + fileType;
  let name = req.body.name;
  let shortdesc = req.body.shortdesc;
  let longdesc = req.body.longdesc;

  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  db.query(
    "INSERT INTO services (name,img,shortdesc,longdesc) VALUES (?,?,?,?)",
    [name, img, shortdesc, longdesc],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/addServices/get", (req, res) => {
  const sqlSelect = "SELECT * FROM services";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// app.put('/addServices/update', upload.single("avatar"), (req, res) => {
//     let fileType = req.file.mimetype.split("/")[1];
//     let img = req.file.filename + "." + fileType;
//     let name = req.body.name;
//     let shortdesc = req.body.shortdesc;
//     let longdesc = req.body.longdesc;
//     let id = req.body.id;
//     console.log(`./uploads/${img}`);
//     // console.log(name)

//     fs.rename(
//         `./uploads/${req.file.filename}`,
//         `./uploads/${img}`,

//         function () {
//             console.log("callback");
//             res.send("200")
//         }
//     )

//     const sqlUpdate =
//         "UPDATE services SET name = ?,img = ?, shortdesc = ?, longdesc = ?, WHERE id = ?";

//     db.query(sqlUpdate,
//         [name, img, shortdesc, longdesc, id],
//         (err, result) => {
//             if (err) console.log(err);
//         }
//     );
// })

// Add Vendor ------------>
// app.post('/addVendors', (req, res) => {
//     const name = req.body.name;
//     const bname = req.body.bname;
//     const addr = req.body.addr;
//     const gst = req.body.gst;
//     const desc = req.body.desc;
//     const cont = req.body.cont;
//     const contac = req.body.contac;

//     db.query(
//         "INSERT INTO vendors(name,bname,addr,gst,desc,cont,contac) VALUES(?,?,?,?,?,?,?)",
//         [name,bname,addr,gst,desc,cont,contac],
//         (err, result) => {
//             console.log(err);
//         }
//     );
// })

app.post("/Addvendors", (req, res) => {
  const name = req.body.name;
  const bname = req.body.bname;
  const addr = req.body.addr;
  const gst = req.body.gst;
  const descr = req.body.descr;
  const cont = req.body.cont;
  const contac = req.body.contac;

  db.query(
    "INSERT INTO vendors (name,bname,addr,gst,descr,cont,contac) VALUES (?,?,?,?,?,?,?)",
    [name, bname, addr, gst, descr, cont, contac],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/Addvendors/get", (req, res) => {
  const sqlSelect = "SELECT * FROM vendors";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/Addvendors/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const bname = req.body.bname;
  const addr = req.body.addr;
  const gst = req.body.gst;
  const descr = req.body.descr;
  const cont = req.body.cont;
  const contac = req.body.contac;

  const sqlUpdate =
    "UPDATE vendors SET name = ?,bname = ?,addr = ?,gst = ?,descr = ?,cont = ?,contac = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [name, bname, addr, gst, descr, cont, contac, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.post("/AddCustNumbers", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;

  db.query(
    "INSERT INTO custnumbers (name,username) VALUES (?,?)",
    [name, username],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/AddCustNumbers/get", (req, res) => {
  const sqlSelect = "SELECT * FROM custnumbers";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/AddCustNumbers/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const username = req.body.username;

  const sqlUpdate = "UPDATE custnumbers SET name = ?,username = ? WHERE id = ?";
  db.query(sqlUpdate, [name, username, id], (err, result) => {
    if (err) console.log(err);
  });
});

// addReward --------->>>>>
app.post("/addReward", upload.single("reward"), (req, res) => {
  let ft = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + ft;
  let name = req.body.name;

  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  db.query(
    "INSERT INTO rewards (name,img) VALUES (?,?)",
    [name, img],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/addReward/get", (req, res) => {
  const sqlSelect = "SELECT * FROM rewards";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/addReward/update", upload.single("reward"), (req, res) => {
  let ftupdate = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + ftupdate;
  let name = req.body.name;
  let id = req.body.id;

  console.log(id, name, img);
  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  const sqlUpdate = "UPDATE rewards SET name = ?,img = ? WHERE id = ?";
  db.query(sqlUpdate, [name, img, id], (err, result) => {
    if (err) console.log(err);
  });
});

// ------Add HomeScreenBanners----------------------------->>>>>>>
app.post("/addHomeScreenBanner", upload.single("reward"), (req, res) => {
  let ft = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + ft;
  let name = req.body.name;

  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  db.query(
    "INSERT INTO home_screen_banners (name,img) VALUES (?,?)",
    [name, img],
    (err, result) => {
      console.log(err);
    }
  );
});
app.get("/addHomeScreenBanner/get", (req, res) => {
  const sqlSelect = "SELECT * FROM home_screen_banners";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/addHomeScreenBanner/update", upload.single("reward"), (req, res) => {
  let ftupdate = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + ftupdate;
  let name = req.body.name;
  let id = req.body.id;

  console.log(id, name, img);
  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  const sqlUpdate =
    "UPDATE home_screen_banners SET name = ?,img = ? WHERE id = ?";
  db.query(sqlUpdate, [name, img, id], (err, result) => {
    if (err) console.log(err);
  });
});

// ---------------->>>>>>>>>>AddCategoryBanners------>

app.post("/addCategoryBanners", upload.single("reward"), (req, res) => {
  let ft = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + ft;
  let name = req.body.name;
  let category = req.body.category;

  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  db.query(
    "INSERT INTO cat_banners (name,img,category) VALUES (?,?,?)",
    [name, img, category],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/addCategoryBanners/get", (req, res) => {
  const sqlSelect = "SELECT * FROM cat_banners";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/addCategoryBanners/update", upload.single("reward"), (req, res) => {
  let ftupdate = req.file.mimetype.split("/")[1];
  let img = req.file.filename + "." + ftupdate;
  let name = req.body.name;
  // let category = req.body.category;
  let id = req.body.id;

  console.log(id, name, img);
  console.log(`./uploads/${img}`);
  // console.log(name)

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${img}`,

    function () {
      console.log("callback");
      res.send("200");
    }
  );
  const sqlUpdate = "UPDATE cat_banners SET name = ?,img = ? WHERE id = ?";
  db.query(sqlUpdate, [name, img, id], (err, result) => {
    if (err) console.log(err);
  });
});

// AddAboutUs====------->>>>>>>>>>>>>
app.post("/addAboutUs", (req, res) => {
  const name = req.body.name;
  db.query("INSERT INTO aboutus (name) VALUES (?)", [name], (err, result) => {
    console.log(err);
  });
});

// ContacUs====------->>>>>>>>>>>>>
app.post("/addContacUs", (req, res) => {
  const name = req.body.name;
  db.query("INSERT INTO contacus (name) VALUES (?)", [name], (err, result) => {
    console.log(err);
  });
});

// customers for==== pending customers------->>>>>>>>>>>>>
app.get("/customers/get", (req, res) => {
  const sqlSelect = "SELECT * FROM customers";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.put("/customers/update", (req, res) => {
  const id = req.body.id;
  const contac = req.body.contac;
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const siteaddress = req.body.siteaddress;
  const sales = req.body.sales;

  const sqlUpdate =
    "UPDATE customers SET contac = ?,name = ?,address = ?,email = ?,siteaddress = ?,sales = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [contac, name, address, email, siteaddress, sales, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.put("/reject/update", (req, res) => {
    const id = req.body.id;
    const rejected = req.body.rejected;
  
    const sqlUpdate = "UPDATE customers SET rejected = ? WHERE id = ?";
  
    db.query(sqlUpdate, [rejected, id], (err, result) => {
      if (err) console.log(err);
    });
  });

  app.get("/Verifiedcustomers/get", (req, res) => {
    const sqlSelect = "SELECT * FROM customers WHERE rejected = 0";
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });
  
  app.get("/Rejectedcustomers/get", (req, res) => {
    const sqlSelect = "SELECT * FROM customers WHERE rejected = 1";

    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });

  app.get("/orderDetails/get", (req, res) => {
    const sqlSelect = "SELECT * FROM orders";

    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });

  app.put("/assign_pay_del/update", (req, res) => {
    const id = req.body.id;
    const assign_pay_del = req.body.assign_pay_del;
  
    const sqlUpdate = "UPDATE orders SET assign_pay_del = ? WHERE id = ?";
  
    db.query(sqlUpdate, [assign_pay_del, id], (err, result) => {
      if (err) console.log(err);
    });
  });

  // app.get("/getCustName", (req, res) => {
  //   const id = req.body.id;

  //   const sqlSelect = "SELECT * FROM customers where id = ? ";

  //   db.query(sqlSelect,[id] (err, result) => {
  //     res.send(result);
  //   });
  // });


//   app.get("/Rejectedcustomers/Delete", (req, res) => {
//     const sqlSelect = "DELETE FROM customers WHERE rejected = 1";

//     db.query(sqlSelect, (err, result) => {
//       res.send(result);
//     });
//   });


//   app.get("/Rejectedcustomers/get", (req, res) => {
//     const sqlSelect = "SELECT * FROM customers WHERE rejected = 1";
//     db.query(sqlSelect, (err, result) => {
//       res.send(result);
//     });
//   });

app.listen(3002, () => {
  console.log("running on port 3002");
});
