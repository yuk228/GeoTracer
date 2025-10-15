import { NextResponse } from "next/server";

export const Ok = (message: string = "Ok") => {
  return NextResponse.json({ message }, { status: 200 });
};

export const BadRequest = (message: string = "Bad Request") => {
  return NextResponse.json({ message }, { status: 400 });
};

export const Unauthorized = (message: string = "Unauthorized") => {
  return NextResponse.json({ message }, { status: 401 });
};

export const NotFound = (message: string = "Not Found") => {
  return NextResponse.json({ message }, { status: 404 });
};

export const InternalServerError = (
  message: string = "Internal Server Error"
) => {
  return NextResponse.json({ message }, { status: 500 });
};
