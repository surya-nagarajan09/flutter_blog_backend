import { Request, Response } from "express";
import { ReadStream } from "fs";
var fs = require("fs");
import {
  getAllPostQuery,
  joinQuery,
  checkUser,
  loginQuery,
  forgetPasswordQuery,
  getMobileNumber,
  otpVerificationQuery,
  jobDetailsQuery,
  companyDetailsQuery,
  createBlogQuery,
  getAllBlogQuery,
  getAllBlogByIdQuery,
  updateLikeQuery,
  deletePostQuery,
  getAvatarQuery
} from "../models/index.model";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
import { upload, getImageFromS3 } from "../storage/s3";

//sign in
export function join(request: Request, response: Response) {
  const body = request.body;
  console.log(request.body);
  checkUser(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Something went wrong!!");
    } else {
      try {
        if (results && results.length > 0) {
          return response
            .status(200)
            .json({ response: false, results: "Email Already present" });
        } else {
          joinQuery(body, (err: Error, results: any) => {
            if (err) {
              console.log(err);
              return response.status(200).json("something went wrong");
            } else {
              try {
                if (results) {
                  return response.status(200).json({
                    response: true,
                    results: "Created Account Successfully",
                  });
                }
              } catch (err) {
                return response.status(500).json("Error While getting Data");
              }
            }
          });
        }
      } catch (err) {
        return response.status(500).json("Error While getting Data");
      }
    }
  });
}

//login

export function login(request: Request, response: Response) {
  const body = request.body;
  console.log(body);
  loginQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(500).json("Something went wrong");
    } else {
      console.log(results);
      return response.status(200).json(results);
    }
  });
}

export function getAllPost(request: Request, response: Response) {
  const body = request.body;
  getAllPostQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        if (results) {
          return response.status(200).json(results);
        }
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

// forget password

export function forgetPassword(request: Request, response: Response) {
  const body: any = request.body;
  forgetPasswordQuery(body, (err: Error, results: any) => {
    if (err) {
      console.log(err);
      return response.status(200).json("Something went wrong");
    } else {
      try {
        getMobileNumber(body, (err: Error, results: any) => {
          if (err) {
            return response.status(200).json("Internal Server error");
          } else {
            try {
              const result: any = Object.values(
                JSON.parse(JSON.stringify(results))
              );
              const otpSent = client.messages
                .create({
                  body: `Your OTP is ${result[0].otp}`,
                  from: "+17406930853",
                  to: "+918610842684",
                })
                .then((message: { sid: any }) => console.log(message.sid));

              if (otpSent) {
                return response.status(200).json(results);
              }
            } catch (err) {
              return response.status(500).json("Error While getting Data");
            }
          }
        });
      } catch (err) {
        return response.status(200).json("Something went wrong");
      }
    }
  });
}

// otp verification

export function otpVerification(request: Request, response: Response) {
  const body = request.body;
  const { otp } = body;
  otpVerificationQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        const result: any = Object.values(JSON.parse(JSON.stringify(results)));
        if (otp === result[0].otp) {
          return response.status(200).json(results);
        } else {
          return response.status(200).json("OTP verification failed");
        }
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export function jobDetails(request: Request, response: Response) {
  const body = request.body;
  console.log(body);

  jobDetailsQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        console.log(results.insertId);
        return response
          .status(200)
          .json({ results: results.insertId, response: true });
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export function companyDetails(request: Request, response: Response) {
  const body = request.body;
  console.log(body);
  companyDetailsQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        return response
          .status(200)
          .json({ results: results.insertId, response: true });
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export function createBlog(request: Request, response: Response) {
  const { body } = request;
  console.log(body);
  createBlogQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        return response
          .status(200)
          .json({ results: results.insertId, response: true });
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export function getAllBlog(request: Request, response: Response) {
  const body = request.body;
  getAllBlogQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        return response.status(200).json(results);
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export function getBlogById(request: Request, response: Response) {
  const body = request.body;
  console.log(body);
  getAllBlogByIdQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        return response.status(200).json(results);
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export function updateLike(request: Request, response: Response) {
  const body = request.body;
  console.log(body);
  updateLikeQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        console.log(results);
        return response.status(200).json(results);
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}

export async function uploadImage(request: Request, response: Response) {
  const file = request.file;
  const result = await upload(file);
  console.log(result.key);
  if (result) {
    return response.status(200).json({key:result.key});
  } else {
    return response.status(500).json("something went wrong");
  }
}

export function getImage(request: Request, response: Response) {
  console.log("i am called");
  const readStream: any = getImageFromS3("6439cfce240da7a18f2c7a064283c299");
  console.log(readStream);
  response.send(readStream);
}

export function deletePost(request: Request, response: Response) {
  const body = request.body;
  console.log(body.id, "i am body id");
  deletePostQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        console.log(results);
        return response.status(200).json(results);
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}


export function getAvatar(request: Request, response: Response) {
  const body = request.body;
  console.log(body);
  getAvatarQuery(body, (err: Error, results: any) => {
    if (err) {
      return response.status(200).json("Internal Server error");
    } else {
      try {
        return response.status(200).json({"image":results[0].image,"name":results[0].name});
      } catch (err) {
        return response.status(500).json("Error White getting Data");
      }
    }
  });
}