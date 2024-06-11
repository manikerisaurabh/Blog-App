"use client";
import React, { useEffect, useState } from 'react';

import AddNewBlog from '../add-new-blog';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';

export interface InitialBlogFormData {
    title: string;
    description: string;
}

interface BlogViewProps {
    blogList: [{ _id: string, title: string, description: string }];
}

const BlogOverview: React.FC<BlogViewProps> = ({ blogList }) => {
    const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [blogFormData, setBlogFormData] = useState<InitialBlogFormData>({ title: "", description: "" });
    const [currentEditedBlogId, setcurrentEditedBlogId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router]);

    const handleSubmit = async (data: InitialBlogFormData) => {
        console.log("Submitted Blog Data:", data);
        setLoading(true);
        try {
            const res = currentEditedBlogId !== null ?
                await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
                    method: 'PUT',
                    body: JSON.stringify(blogFormData)
                })
                : await fetch('/api/add-blog', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            const result = await res.json();
            if (result?.success) {
                console.log("Data submitted successfully");
                setBlogFormData({ title: "", description: "" });
                setLoading(false);
                setOpenDialogBox(false);
                router.refresh();
                setcurrentEditedBlogId(null)
            } else {
                console.error("Failed to submit data");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        console.log("delete clicked with id: " + id);
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
                method: 'DELETE'
            });
            const result = await apiResponse.json();
            console.log(result);
            if (result.success) {
                router.refresh();
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleEdit = (blog: any) => {
        setcurrentEditedBlogId(blog?._id);
        setBlogFormData({
            title: blog?.title,
            description: blog?.description
        });
        setOpenDialogBox(true);
    };

    console.log(currentEditedBlogId);

    return (
        <div className='min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6'>
            <div>
                <AddNewBlog
                    openDialogBox={openDialogBox}
                    setOpenDialogBox={setOpenDialogBox}
                    loading={loading}
                    setLoading={setLoading}
                    blogFormData={blogFormData}
                    setBlogFormData={setBlogFormData}
                    handleSubmit={handleSubmit}
                    currentEditedBlogId={currentEditedBlogId}
                    setcurrentEditedBlogId={setcurrentEditedBlogId}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
                {blogList && blogList.length > 0 ?
                    blogList.map(blogItem => (
                        <Card key={blogItem._id} className='p-5'>
                            <CardContent>
                                <CardTitle className='mb-5'>{blogItem?.title}</CardTitle>
                                <CardDescription>{blogItem?.description}</CardDescription>
                                <div className='mt-5 flex gap-5 items-center'>
                                    <Button onClick={() => { handleEdit(blogItem) }}>Edit</Button>
                                    <Button onClick={() => { handleDelete(blogItem._id) }} >Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                    : <Label className='text-3xl font-extrabold'>OOPS! No Blog Found.... Add Blog to start </Label>}
            </div>
        </div>
    );
};

export default BlogOverview;
