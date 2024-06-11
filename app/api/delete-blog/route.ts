import connectToDB from "@/database";
import Blog from "@/models/blog";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();

        const { searchParams } = new URL(req.url);

        const getCurrId = searchParams.get('id');

        if (!getCurrId) {
            return NextResponse.json({
                success: false,
                message: 'Blog ID is required'
            });
        }

        const blog = await Blog.findByIdAndDelete(getCurrId);
        if (!blog) {
            return NextResponse.json({
                success: false,
                message: 'Blog is not present'
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
}