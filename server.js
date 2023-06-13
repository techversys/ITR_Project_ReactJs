let express = require("express");
const path = require("path");
let cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
app.use(cors());
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/public")));

//create connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "companytrack",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("mysql Connected...");
});

var jwtSecret = "UserAuthSecret";

// multer (route to upload images to server)
var imagename = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    // console.log(req.body.body.profile_img,'multerimage')
    console.log(file, "filename");

    imagename = Date.now() + path.extname(file.originalname) + "";
    console.log(imagename);
    cb(null, imagename);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("Filter for file");
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// Verify Token
const verifyJWT = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token, "tokenvalue");
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    token = token.split(" ")[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ auth: false, message: "you are failed to authenticate" });
      } else {
        console.log(decoded, "decodeddata");
        req.userId = decoded.id;
        console.log(req.userId, "userid");
        next();
      }
    });
  }
};

app.post("/register", upload.single("file"), (req, res) => {
  const salt = bcrypt.genSaltSync(11);
  const hashPass = bcrypt.hashSync(req.body.password, salt);

  let data = {
    username: req.body.username,
    phoneno: req.body.phoneno,
    gender: req.body.gender,
    email: req.body.email,
    password: hashPass,
    address: req.body.address,
    dob: req.body.dob,
    profile:req.body.profile,
    profile_img: imagename,
  };

  console.log(data, "data of body");
  let sql =
    "SELECT * FROM users WHERE username ='" + req.body.username + "'";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.log("username exist");
      res.json({ message: "UserName already exists", statusCode: 401 });
    } else {
      let sql2 = "SELECT * FROM users WHERE email ='" + req.body.email + "'";
      conn.query(sql2, (err, result2) => {
        if (err) throw err;
        if (result2.length > 0) {
          console.log("email exist");
          res.json({ message: "Email already exist", statusCode: 401 });
        } else {
          let sql3 = "INSERT INTO users SET?";
          conn.query(sql3, data, (err, result3) => {
            if (err) throw err;
            console.log("data inserted");

            res.json({ message: "Data added Successfully", statusCode: 201 });
          });
        }
      });
    }
  });
});

//route to login
app.post("/login", (req, res) => {
  console.log(req.body, "bodydata");
  let sql = "select * from users where email='" + req.body.email + "'";

  conn.query(sql, async (err, results) => {
    if (err) throw err;
    else {
      if (results.length > 0) {
        const match = await bcrypt.compare(
          req.body.password,
          results[0].password
        );
        console.log(match, "matchpass");
        if (match) {

          const id = results[0].id;
          const token = jwt.sign({ id }, jwtSecret);
          req.session.user = results;
          res.json({
            auth: true,
            token: token,
            results: req.session.user,
            message: "user found successfully",
          });
        } else if (!match) {
          res.json({ auth: false, message: "user details are incorrect" });
        }
      } else {
        res.json({
          message: "please enter the valid email",
          statusText: "invalid",
          auth: false,
          statusCode: 405,
        });
      }
    }
  });
});

//route for specific provider items
app.get("/getusers", (req, res, err) => {
  let sql = "SELECT * FROM users";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

// route to delete from data
app.delete("/deluser/:id", verifyJWT, function (req, res) {
  console.log(req.params, "delete body");
  let sql = "Delete FROM users WHERE id=" + req.params.id;
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.listen(4700, () => {
  console.log(`express server running on 4700`);
});
