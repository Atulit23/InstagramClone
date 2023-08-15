import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Email from "./cards.mjs";
import Profile from "./profileCards.mjs";
import Follow from "./userFollowers.mjs";
import Chat from "./chatcards.mjs";
import Post from "./postcards.mjs";
import Story from "./storycards.mjs";
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8001;

const url =
  "mongodb+srv://atulitgaur:sanjayashaS28@cluster0.zbmbdhh.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);

app.post("/signup", (req, res) => {
  const emailCard = req.body;
  Email.create(emailCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put("/signup", (req, res) => {
  const emailCard = req.body;
  const email = req.body.email;
  const password = req.body.password;
  Email.findOne(
    { email: req.body.email, password: req.body.password },
    (err, data) => {
      if (email == req.body.email && password == req.body.password) {
        console.log("login succesful");
      } else {
        console.log("User doesn't exist");
      }
    }
  );
});

app.get("/signup", (req, res) => {
  Email.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/profile", (req, res) => {
  const profileCard = req.body;
  Profile.create(profileCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/profile", (req, res) => {
  Profile.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/follow", (req, res) => {
  const followCard = req.body;
  Follow.create(followCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/follow", (req, res) => {
  Follow.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/follow", (req, res) => {
  const followers = req.body.followers;
  const following = req.body.following;
  const dummyFollowers = req.body.dummyFollowers;
  const username = req.body.username;

  Follow.findOneAndUpdate(
    { username: req.body.username },
    {
      $set: {
        followers: req.body.followers,
        following: req.body.following,
        dummyFollowers: req.body.dummyFollowers,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.post("/chat", (req, res) => {
  const followCard = req.body;
  Chat.create(followCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/chat", (req, res) => {
  Chat.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/chat", (req, res) => {
  const from = req.body.from;
  const to = req.body.to;
  Chat.findOneAndUpdate(
    { from: req.body.from, to: req.body.to },
    {
      $set: {
        chats: req.body.chats,
        which: req.body.which,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.post("/post", (req, res) => {
  const postCard = req.body;
  Post.create(postCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/post", (req, res) => {
  Post.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put("/post", (req, res) => {
  Post.findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        comments: req.body.comments,
        likeBy: req.body.likeBy,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.post("/story", (req, res) => {
  const storycard = req.body;
  Story.create(storycard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/story", (req, res) => {
  Story.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// if (process.env.NODE_ENV = "production") {
//     app.use(express.static("/build"));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }

app.listen(port, () => console.log(`listening on port ${port}`));
