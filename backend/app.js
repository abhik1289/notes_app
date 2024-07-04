const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
require('dotenv').config();
const PORT = process.env.PORT;
const SEGRET_KEY = process.env.SEGRET_KEY;
const userEmail = process.env.email;
const userPWd = process.env.password;
const nodemailer = require('nodemailer');
const user = require("./model/user");
const note = require("./model/notes");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fileUpload = require('express-fileupload');
require("./DB/Connect");
app.use(fileUpload());
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const auth = require("./middleware/auth");
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images', express.static('images'));


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: userEmail,
        pass: userPWd
    }
});
app.post("/", (req, res) => {
    req.send("aa")
})
app.get("/getData",async (req,res)=>{
    const getData = await user.find();
    res.send(getData);
})
//sign up code
app.post("/signUp", async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, mobile, password } = req.body;

        if (name || email || mobile || password) {
            const checkEmail = await user.findOne({ email: email });
            if (checkEmail) {
                res.status(401).json({ message: "Email exits" });
            } else {
                //hashPWd
                const hashPwd = await bcrypt.hash(password, 10);
                //genrateOtp
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 5; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                const token = jwt.sign({ email: email }, SEGRET_KEY);
                const data = new user({ name, email, mobile, password: hashPwd, otp: OTP, token: token });


                //genrate token

                data.save().then(async () => {
                    const updateToken = jwt.sign({ _id: data._id }, SEGRET_KEY);
                    user.updateOne({ _id: data._id }, {
                        token: updateToken
                    }).then(() => {
                        res.status(200).json({ message: "Data saved" });
                    }).catch((error) => {
                        res.status(400).json({ message: "Data not saved", error });
                    })
                }).catch((error) => {
                    res.status(400).json({ message: "Data not saved", error });
                })
            }
        } else {
            res.status(401).json({ message: "Invalid Data" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.post("/getEditData",async (req,res)=>{
   
})
//edit account
app.post("/basicEdit", async (req, res) => {
    try {



        const { id, name, mobile } = req.body;
     
        if (id || name || mobile || req.files) {
            let file = req.files.file;
            console.log(file)
            let fname = Date.now()+file.name;
            user.updateMany({ _id: id }, {
                name: name, mobile: mobile, lastModify: new Date().toLocaleDateString(), profile: fname
            }).then(() => {
                file.mv("./images/" + fname, function (error) {
                    if (error) {
                        console.log(error)

                        res.send(error)
                    } else {
                        console.log("upload")

                        res.status(200).json({ message: "Note Updated" })
                    }
                })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        } else {
            res.status(401).json({ message: "Invalid Data" });
        }
    } catch (error) {
    }
})
app.post("/constactEdit", async (req, res) => {
    try {
        const { id, email, password } = req.body;
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 5; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        let hashPWd = await bcrypt.hash(password, 10)
        if (id || email || password) {
            user.updateMany({ _id: id }, { email, password: hashPWd, active: "inactive", otp: OTP, lastModify: new Date().toLocaleDateString() }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        } else {
            res.status(401).json({ message: "Invalid Data" });
        }
    } catch (error) {
    }
})
//verify account
app.post("/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const checkEmail = await user.findOne({ email });
        if (checkEmail) {
            const getId = await checkEmail._id;
            const getOtp = await checkEmail.otp;
            if (otp == getOtp) {
                const update = await user.updateOne({
                    _id: getId
                }, {
                    active: "active"
                });
                if (update) {
                    res.status(200).json({ message: "Account verified" });
                } else {
                    res.status(401).json({ message: "Account not verified" });
                }
            } else {
                res.status(401).json({ message: "otp is incorrect" });
            }
        } else {
            res.status(401).json({ message: "Email not exits" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.post("/checkPwd", auth, async (req, res) => {
    try {
        const { password } = req.body;
        const decodeToken = req.user;
        const getId = decodeToken._id;
        const checkEmail = await user.findOne({ _id: getId });
        const getPwd = await checkEmail.password;
        if (password) {
            let isMatch = await bcrypt.compare(password, getPwd);
            if (isMatch) {
                res.status(200).json({ message: "Password Match" })
            } else {
                res.status(401).json({ message: "Password not Match" })
            }
        } else {
            res.status(401).json({ message: "Invalid" });
        }
    } catch (error) {
        console.log(error)
    }
})
//resent code
app.post("/resentOtp", async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                const getId = await checkEmail._id;
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 5; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                const update = await user.updateOne({ _id: getId }, { otp: OTP });
                if (update) {
                    res.status(200).json({ message: "Otp send again" });
                } else {
                    res.status(401).json({ message: "Problem" });
                }
            } else {
                res.status(401).json({ message: "Your Account not find" });
            }

        } else {
            res.status(401).json({ message: "Invalid Information" });
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
});
//forgot code
//---------------checkEmail---------------------//
app.post("/checkEmail", async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                const getId = await checkEmail._id;
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 5; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                const update = await user.updateOne({ _id: getId }, { otp: OTP });
                if (update) {
                    res.status(200).json({ message: "Otp send again" });
                } else {
                    res.status(401).json({ message: "Problem" });
                }
            } else {
                res.status(401).json({ message: "Your Account not find" });
            }
        } else {
            res.status(401).json({ message: "Invalid Data" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
//-----otp check----//
app.post("/checkOTP", async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (email || otp) {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                const getOtp = await checkEmail.otp;
                if (getOtp == otp) {
                    res.status(200).json({ message: "Right Otp" });
                } else {
                    res.status(401).json({ message: "Wrong Otp" });
                }
            } else {
                res.status(401).json({ message: "Your Account not find" });
            }
        } else {
            res.status(401).json({ message: "Invalid Data" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
//---------change Password---------------//
app.post("/changePassword", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email || password) {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                const hashPwd = await bcrypt.hash(password, 10)
                const getId = await checkEmail._id;
                const update = await user.updateOne({ _id: getId }, { password: hashPwd });
                if (update) {
                    res.status(200).json({ message: "Password Changed" });
                } else {
                    res.status(401).json({ message: "Password not Changed" });
                }
            } else {
                res.status(401).json({ message: "Your Account not find" });
            }
        } else {
            res.status(400).json({ message: "Invalid Data" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
//login code
app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email || password) {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                const getPassword = await checkEmail.password;
                const getactive = await checkEmail.active;
                const checkPassword = await bcrypt.compare(password, getPassword);

                const token = jwt.sign({
                    _id: checkEmail._id
                }, SEGRET_KEY);
    
                if (checkPassword && getactive == "active") {

                    res.cookie("jwtoken", token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1 * 24 * 3600 * 1000)
                    });
                    res.status(200).json({ message: "login" });
                } else {
                    res.status(401).json({ message: "Wrong Password" });
                }
            } else {
                res.status(401).json({ message: "Your Account not find" });
            }
        } else {
            res.status(400).json({ message: "Invalid Data" });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});
app.get("/getUserData", auth, async (req, res) => {
    const decodeToken = req.user;
    const getId = decodeToken._id;
    const checkEmail = await user.findOne({ _id: getId });
    if (checkEmail) {
        res.status(200).send(checkEmail)
    } else {
        res.status(401).json({ error: "Error" })
    }
})
app.get("/logout", (req, res) => {
    res.clearCookie("jwtoken", { httpOnly: true, path: '/' });
    res.status(200).json({ message: "Log out successfully" })
});

app.post("/saveNotes", auth, async (req, res) => {
    try {
        const { title, notes } = req.body;
        if (title || notes) {
            const decodeToken = req.user;
            const getID = decodeToken._id;
            const checkEmail = await user.findOne({ _id: getID });
            const getId = checkEmail._id;
            const Savenote = new note({ title, notes, userId: getId });
            Savenote.save().then(() => {
                res.status(200).json({ message: "Notes Saved" });
            }).catch((error) => {
                res.status(401).json({ message: error });
            })
        } else {
            res.status(401).json({ message: "Invalid Data" })
        }
    } catch (error) {
        console.log(error);
    }
});
app.post("/updateNotes", async (req, res) => {
    try {
        const { etitle, enotes, id } = req.body;
        if (etitle || enotes || id) {
            note.updateMany({ _id: id }, {
                notes: enotes, title: etitle, lastModify: new Date().toLocaleDateString()
            }).then(() => {
                res.status(200).json({ message: "Notes Saved" });
            }).catch((error) => {
                res.status(401).json({ message: error });
            })
        } else {
            res.status(401).json({ message: "Invalid Data" })
        }
    } catch (error) {
        console.log(error);
    }
})
app.post("/fetchNotes", auth, async (req, res) => {
    const decodeToken = req.user;
    const getId = decodeToken._id;
    const {searchval} = req.body;
    if(searchval){
        const fetchNote = await note.find({
            notes: {$regex:new RegExp([searchval])},
            $and: [
                {
                    userId: getId
                },
                {
                    trash: false
                },
                {
                    archive: false
                },
            ],
        }).sort({ pin: -1 });
        if (fetchNote) {
            console.log(fetchNote)
            res.status(200).send(fetchNote)
        } else {
            res.status(401).json({ message: "No found" })
        }
    }else{
        const fetchNote = await note.find({
      
            $and: [
                {
                    userId: getId
                },
                {
                    trash: false
                },
                {
                    archive: false
                },
            ],
        }).sort({ pin: -1 });
        if (fetchNote) {
            res.status(200).send(fetchNote)
        } else {
            res.status(401).json({ message: "No found" })
        }
    }
});
app.post("/deleteNote", async (req, res) => {
    try {
        const { id } = req.body;
        note.deleteOne({ _id: id }).then(() => {
            res.status(200).json({ message: "Note delete" })
        }).catch((error) => {
            res.status(500).json({ message: "Notes not delete", error })
        });

    } catch (error) {
        console.log(error);
    }
});
app.post("/archiveNote", async (req, res) => {
    try {
        const { id } = req.body;
        const getNotes = await note.findOne({ _id: id });
        if (getNotes.archive) {
            note.updateOne({ _id: id }, { archive: false }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        } else {
            note.updateOne({ _id: id }, { archive: true }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        }


    } catch (error) {
        console.log(error);
    }
});
app.post("/higlightNote", async (req, res) => {
    try {
        const { id } = req.body;
        const getNotes = await note.findOne({ _id: id });
        if (getNotes.higlight) {
            note.updateOne({ _id: id }, { higlight: false }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        } else {
            note.updateOne({ _id: id }, { higlight: true }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        }

    } catch (error) {
        console.log(error);
    }
});
app.post("/pinNote", async (req, res) => {
    try {
        const { id } = req.body;
        const getNotes = await note.findOne({ _id: id });
        if (getNotes.pin) {
            note.updateOne({ _id: id }, { pin: false }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        } else {
            note.updateOne({ _id: id }, { pin: true }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })
        }

    } catch (error) {
        console.log(error);
    }
});
app.post("/trashNote", async (req, res) => {
    try {
        const { id } = req.body;
        const getNotes = await note.findOne({ _id: id });
        if (getNotes.trash) {
            note.updateOne({ _id: id }, { trash: false }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })

        } else {
            note.updateOne({ _id: id }, { trash: true }).then(() => {
                res.status(200).json({ message: "Note delete" })
            }).catch((error) => {
                res.status(500).json({ message: "Notes not delete", error })
            })

        }


    } catch (error) {
        console.log(error);
    }
});
app.get("/displayTrash", auth, async (req, res) => {
    const decodeToken = req.user;
    const getId = decodeToken._id;
    const checkEmail = await user.findOne({ _id: getId });
    if (checkEmail) {
        const getId = checkEmail._id;
        if (getId) {
            const fetchNote = await note.find({
                $and: [
                    {
                        userId: getId
                    },
                    {
                        trash: true
                    },
                ],
            })
            if (fetchNote) {
                res.status(200).send(fetchNote)
            } else {
                res.status(401).json({ message: "No found" })
            }
        } else {
            console.log("Id not get");
        }
    } else {
        console.log("Email Invalid")
    }
});
app.get("/displayArchive", auth, async (req, res) => {
    const decodeToken = req.user;
    const getId = decodeToken._id;
    const checkEmail = await user.findOne({ _id: getId });
    if (checkEmail) {
        const getId = checkEmail._id;
        if (getId) {
            const fetchNote = await note.find({
                $and: [
                    {
                        userId: getId
                    },
                    {
                        archive: true
                    },
                ],
            })
            if (fetchNote) {
                res.status(200).send(fetchNote)
            } else {
                res.status(401).json({ message: "No found" })
            }
        } else {
            console.log("Id not get");
        }
    } else {
        console.log("Email Invalid")
    }


});
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT} successfully`);
});