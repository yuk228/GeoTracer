import { NextResponse } from "next/server";

export const Ok = (message: string = "Ok") => {
  return NextResponse.json({ message }, { status: 200 });
};

export const BadRequest = (message: string = "Bad Request") => {
  return NextResponse.json({ message }, { status: 400 });
};

export const Unauthorized = (message: string) => {
  return NextResponse.json({ message }, { status: 401 });
};

export const NotFound = (message: string) => {
  return NextResponse.json({ message }, { status: 404 });
};

export const InternalServerError = (message: string) => {
  return NextResponse.json({ message }, { status: 500 });
};
