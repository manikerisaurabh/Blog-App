import React from 'react'
import BlogOverview from '../components/blog-overview'

const fetchAllList = async () => {
    try {
        const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
            method: 'GET',
            cache: 'no-store'
        });

        const result = await apiResponse.json();
        console.log(result);
        return result?.data;

    } catch (error) {
        console.log(error);


    }
}

const Blogs = async () => {
    const blogList = await fetchAllList();
    console.log("bloglist : " + blogList);
    return (
        <div>
            <BlogOverview blogList={blogList} />

        </div>
    )
}

export default Blogs