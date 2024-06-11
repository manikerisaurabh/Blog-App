import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi, { string } from "joi";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



const AddNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
});

export async function POST(req: NextRequest) {
    try {
        console.log("request reached: " + req.body)
        await connectToDB();

        const { title, description } = await req.json();


        const { error } = AddNewBlog.validate({ title, description });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            });
        }

        const newBlog = await Blog.create({
            title: title,
            description: description
        });

        if (newBlog) {
            return NextResponse.json({
                success: true,
                message: "Blog added succefully"
            })
        }

        return NextResponse.json({
            success: false,
            message: "Failed to add new blog"
        });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
}