import { Request, Response } from "express";
var jwt = require("jsonwebtoken");

export default function auth(request: Request, response: Response, next: any) {
  const token: any = request.headers.auth || "";
  let secret: string = process.env.SECRET || "";
  let decoded = jwt.verify(JSON.parse(token), secret);

  if (token) {
    if (decoded) {
      next();
    } else {
      return response.status(200).send("inValid token");
    }
  } else {
    return response.status(500).send("unAuthorized User");
  }
}
