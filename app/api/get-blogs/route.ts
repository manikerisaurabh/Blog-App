import Blog from '@/models/blog';
import connectToDB from '../../../database/index';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDB();
        const allBlogs = await Blog.find({});
        if (allBlogs.length == 0) {
            return NextResponse.json({
                success: true,
                message: "No blog is present"
            })
        }

        return NextResponse.json({
            success: true,
            data: allBlogs
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
}