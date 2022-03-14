import db from "../db/index";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

export function getAllPostQuery(data: any, callBack: Function) {
  let query = "SELECT * from details";
  db.query(query, (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}
export function checkUser(body: any, callBack: Function) {
  const { email } = body;
  let query = "SELECT * from login_user WHERE email= ?";
  db.query(query, [email], (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

export function joinQuery(body: any, callBack: Function) {
  const { email, password, name,image } = body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err: Error, hash: any) {
    let query =
      "INSERT INTO login_user (email, password,name,image) VALUES ( ? , ?, ?,?)";

    db.query(query, [email, hash, name,image], (error: Error, results: any) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  });
}

//login

export function loginQuery(body: any, callBack: Function) {
  const { email, password } = body;
  let query = "SELECT * FROM login_user WHERE email= ?";
  db.query(query, [email], (error: Error, results: any, token: any) => {
    if (error) {
      callBack(error);
    }
    if (results.length > 0) {
      const compare = bcrypt.compareSync(password, results[0].password);
      if (compare) {
        let key: any = process.env.SECRET;
        let token = jwt.sign({ email: email }, key);
        return callBack(null, {
          result: token,
          response: true,
          user_name: results[0].name,
          user_id: results[0].id,
          image:results[0].image
        });
      } else {
        return callBack(null, {
          result: "Password incorrect",
          response: false,
        });
      }
    } else {
      return callBack(null, { result: "User not Found", response: false });
    }
  });
}

export function forgetPasswordQuery(body: any, callBack: Function) {
  const random: number = Math.floor(100000 + Math.random() * 900000);
  const { email } = body;

  // let query="SELECT * FROM login_user WHERE email= ?";

  let query = `UPDATE login_user SET otp = ? WHERE email = ?`;

  db.query(query, [random, email], (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

export function getMobileNumber(body: any, callBack: Function) {
  const { email } = body;

  let query = "SELECT * FROM login_user WHERE email= ?";

  db.query(query, [email], (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

// verify otp query

export function otpVerificationQuery(body: any, callBack: Function) {
  const { email } = body;

  let query = "SELECT * from login_user WHERE email = ?";
  db.query(query, [email], (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

export function jobDetailsQuery(body: any, callBack: Function) {
  const { companyName, number, type } = body;

  let query =
    "INSERT INTO job_details (company_name,company_size,company_type) VALUES ( ? , ?, ?)";

  db.query(query, [companyName, number, type], (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

export function companyDetailsQuery(body: any, callBack: Function) {
  const { jobName, description, year, id } = body;
  const date = new Date();

  let query = `UPDATE job_details
           SET job_name = ? ,
           job_description= ?,
           job_experience = ?,
           postedTime = ?
           WHERE id = ?`;

  db.query(
    query,
    [jobName, description, year, date, parseInt(id)],
    (error: Error, results: any) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

export function createBlogQuery(body: any, callBack: Function) {
  const { title, subtitle, description, posted_by, user_id,image } = body;
  let posted_time: any = new Date();

  let query =
    "INSERT INTO blog_info (blog_title,blog_subtitle,story,posted_time,posted_by,user_id,image) VALUES ( ? , ?, ?,?,?,?,?)";

  db.query(
    query,
    [title, subtitle, description, posted_time, posted_by, user_id,image],
    (error: Error, results: any) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

export function getAllBlogQuery(body: any, callBack: Function) {
  let query = "SELECT * from blog_info";

  db.query(query, (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

export function getAllBlogByIdQuery(body: any, callBack: Function) {
  const { user_id } = body;
  console.log(user_id);

  let query = "SELECT * from blog_info  WHERE user_id= ?";

  db.query(query, [parseInt(user_id)], (error: Error, results: any) => {
    if (error) {
      callBack(error);
    }
    return callBack(null, results);
  });
}

export function updateLikeQuery(body: any, callBack: Function) {
  const { id, like } = body;
  console.log(id, like);

  let query = `UPDATE blog_info SET likes = ? WHERE id = ?`;

  db.query(
    query,
    [parseInt(like), parseInt(id)],
    (error: Error, results: any) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

export function uploadImageQuery(body: any, callBack: Function) {
  const { id, like } = body;
  console.log(id, like);

  let query = `UPDATE blog_info SET likes = ? WHERE id = ?`;

  db.query(
    query,
    [parseInt(like), parseInt(id)],
    (error: Error, results: any) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}


export function deletePostQuery(body: any, callBack: Function) {

  var query = "DELETE FROM blog_info WHERE id= ?";
  db.query(
    query,
    [body.id],
    (error: Error, results: any) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

export function getAvatarQuery(body: any, callBack: Function) {

  var query = "SELECT * FROM login_user WHERE id= ?";
  db.query(
    query,
    [parseInt(body.id)],
    (error: Error, results: any) => {
      if (error) {
        console.log(error);
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}

