const express = require("express");
const router = express.Router();
const places = require("../../Models/AccomadationsModel/AccModel");
const Users = require("../../Models/UserModel/User");
const jsonweb = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcrypteddata = bcrypt.genSaltSync(12);
const booking = require("../../Models/BookingModels/Booking");
const jwtSecret = "sdfxsersdfxdfsersdfxdezxdfxdf";
const fs = require("fs");
const favorite = require("../../Models/FavoriteModel/Favorite");

const multer = require("multer");
const ImageDownloader = require("image-downloader");
//getting all data to show at homepage
router.get("/", async (req, res) => {
  try {
    const fetchAll = await places.find().sort({
      createdAt: -1,
    });
    res.json(fetchAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let emptyfields = [];
  if (!email) {
    emptyfields.push("email");
  }
  if (!password) {
    emptyfields.push("password");
  }
  if (emptyfields.length > 0) {
    res
      .status(400)
      .json({ success: false, message: "Please fill all fields", emptyfields });
  } else {
    try {
      const registered = await Users.findOne({ email });
      if (registered) {
        const passwordIsCorrect = bcrypt.compareSync(
          password,
          registered.password
        );
        if (passwordIsCorrect) {
          const token = jsonweb.sign(
            { email: registered.email, id: registered._id },
            jwtSecret
          );
          res.cookie("token", token).json({ success: true, registered });
        } else {
          res.status(401).json({ success: false, message: "Invalid password" });
        }
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.error("Error occurred during login: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
});
//register user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let emptyfields = [];
    if (!email) {
      emptyfields.push("email");
    }
    if (!name) {
      emptyfields.push("name");
    }
    if (!password) {
      emptyfields.push("password");
    }
    if (emptyfields.length > 0) {
      res.status(400).json({
        success: false,
        message: "Please fill all fields",
        emptyfields,
      });
    } else {
      // Check if the email is already registered
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email is already registered", success: false });
      }
      // If email is not registered, create the new user
      const user = await Users.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypteddata),
      });

      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.error("Error occurred during registration: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//get current logged in user
router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jsonweb.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      try {
        const { name, email, _id } = await Users.findById(userData.id);

        // Send the retrieved user data in the response
        res.json({ name, email, _id });
      } catch (error) {
        console.error("Error occurred while fetching user data: ", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
});
router.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
//selecting images by link
router.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const NewName = "Photo" + Date.now() + ".jpg";
    await ImageDownloader.image({
      url: link,
      dest: __dirname + "../../../uploads/" + NewName,
    });
    res.json(NewName);
  } catch (error) {}
});
//gallery
const photosMulter = multer({
  dest: "uploads",
});
router.post(
  "/upload-gallery",
  photosMulter.array("photos", 100),
  (req, res) => {
    try {
      const uploadedfiles = [];
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        //this will add the complete name in array  like [name,extension]
        const parts = originalname.split(".");
        //this will access the last element of array [name[0],extension[1](parts.length-1)]
        const extension = parts[parts.length - 1]; //
        const newpath = path + "." + extension;
        fs.renameSync(path, newpath);
        uploadedfiles.push(newpath.replace("uploads\\", ""));
      }
      res.json(uploadedfiles);
    } catch (error) {
      res.json(error);
    }
  }
);
//posting new place data to database
router.post("/post-new-place", async (req, res) => {
  //get current user uid
  const { token } = req.cookies;
  const {
    title,
    ownername,
    address,
    price,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    CheckOut,
    MaxGuest,
  } = req.body;

  if (token) {
    jsonweb.verify(token, jwtSecret, {}, async (err, userDat) => {
      if (err) throw err;
      //else create a new place for user
      const newplace = await places.create({
        owner: userDat.id,
        ownername,
        title,
        address,
        photos,
        price,
        description,
        perks,
        extraInfo,
        checkIn,
        CheckOut,
        MaxGuest,
      });
      res.json(newplace);
    });
  }
});
//get all my places
router.get("/myplaces", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jsonweb.verify(token, jwtSecret, {}, async (err, Userdata) => {
      if (err) throw err;
      //get my id

      //search for places with my id as an owner
      const placesData = await places.find({ owner: Userdata.id }).lean(); // Convert to plain JavaScript objects
      res.json(placesData);
    });
  }
});
//get single place
router.get("/getSingle/:id", async (req, res) => {
  const { id } = req.params;
  const getdata = await places.findById(id);
  res.json(getdata);
});

//updateing the place
router.put("/updatePlace/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    price,
    description,
    perks,
    extraInfo,
    checkIn,
    CheckOut,
    MaxGuest,
  } = req.body;
  if (token) {
    jsonweb.verify(token, jwtSecret, {}, async (err, Userdata) => {
      if (err) throw err;
      //get my id

      const updateplace = await places.findById(id);
      if (updateplace.owner.toString() === Userdata.id) {
        updateplace.set({
          title,
          address,
          photos,
          price,
          description,
          perks,
          extraInfo,
          checkIn,
          CheckOut,
          MaxGuest,
        });
        const newplace = await updateplace.save();
        res.json(newplace);
      }
    });
  }
});
//deleting the place
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  if (token) {
    try {
      // Verify the user's token
      const userData = jsonweb.verify(token, jwtSecret);

      // Check if the user is the owner of the accommodation
      const accommodation = await places.findById(id);
      if (!accommodation) {
        return res
          .status(404)
          .json({ success: false, message: "Accommodation not found" });
      }

      if (accommodation.owner.toString() !== userData.id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this accommodation",
        });
      }

      // Delete the accommodation
      const deletedAccommodation = await places.findByIdAndDelete(id);
      if (!deletedAccommodation) {
        return res.status(404).json({
          success: false,
          message: "Accommodation not found for deletion",
        });
      }

      // Delete the associated booking
      const deletedBookings = await booking.deleteMany({ place: id });
      console.log("Deleted bookings:", deletedBookings);

      // Delete the associated favorite
      const deletedFavorites = await favorite.deleteMany({ FavPlace: id });
      console.log("Deleted favorites:", deletedFavorites);

      res.json({
        success: true,
        message: "Accommodation deleted successfully",
      });
    } catch (error) {
      console.error("Error occurred during accommodation deletion: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ success: false, message: "Token not provided" });
  }
});

//submiting bookings
router.post("/bookings", async function (req, res) {
  const { token } = req.cookies;
  if (token) {
    const userData = jsonweb.verify(token, jwtSecret);
    const { place, price, checkIn, checkOut, phone, name, noOfGuests } =
      req.body;
    const newbooking = await booking.create({
      place,
      price,
      checkIn,
      checkOut,
      phone,
      name,
      noOfGuests,
      bookerId: userData.id,
    });
    res.json(newbooking);
  }
});
//getting all my bookings
router.get("/getmybookings", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const userData = jsonweb.verify(token, jwtSecret);
    const allmyboookings = await booking
      .find({ bookerId: userData.id })
      .populate("place")
      .sort({ createdAt: -1 });
    res.json(allmyboookings);
  }
});

router.post("/favorite", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jsonweb.verify(token, jwtSecret);
      const { FavPlace } = req.body;
      const alreadyAdded = await favorite.findOne({
        FavPlace, //place id
        FavUser: userData.id, //favUser(me) id
      });

      if (!alreadyAdded) {
        const favoriteplace = await favorite.create({
          FavPlace,
          FavUser: userData.id,
        });
        res.json(favoriteplace);
      } else {
        res.status(401).json({
          success: false,
          message: "Already added in the Favorites",
        });
      }
    } catch (error) {
      console.error("Error occurred during favorite creation: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ success: false, message: "Token not provided" });
  }
});

router.get("/favorite", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const userData = jsonweb.verify(token, jwtSecret);
    const favoritePlace = await favorite
      .find({
        FavUser: userData.id,
      })
      .populate("FavPlace");
    res.json(favoritePlace);
  }
});

router.delete("/favorite/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  if (token) {
    try {
      const userData = jsonweb.verify(token, jwtSecret);

      const alreadyAdded = await favorite.findOne({
        FavPlace: id,
        FavUser: userData.id,
      });

      if (alreadyAdded) {
        const favoriteplace = await favorite.deleteOne({
          FavPlace: id,
          FavUser: userData.id,
        });
        res.json(favoriteplace);
      } else {
        res.status(401).json({
          success: false,
          message: "No places found in Favorites",
        });
      }
    } catch (error) {
      console.error("Error occurred during favorite removal: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ success: false, message: "Token not provided" });
  }
});

module.exports = router;
