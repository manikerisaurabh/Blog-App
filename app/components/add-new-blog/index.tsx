"use client";
import React, { Fragment, Dispatch, SetStateAction } from 'react';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { InitialBlogFormData } from '../blog-overview';

interface AddNewBlogProps {
    openDialogBox: boolean;
    setOpenDialogBox: (open: boolean) => void;
    loading: boolean;
    setLoading: (open: boolean) => void;
    blogFormData: InitialBlogFormData;
    setBlogFormData: (data: InitialBlogFormData) => void;
    handleSubmit: (data: InitialBlogFormData) => void;
    currentEditedBlogId: string | null;
    setcurrentEditedBlogId: Dispatch<SetStateAction<string | null>>;
}

const AddNewBlog: React.FC<AddNewBlogProps> = ({ openDialogBox, setOpenDialogBox, loading, blogFormData, setBlogFormData, handleSubmit, currentEditedBlogId, setcurrentEditedBlogId }) => {
    console.log("curr id : " + currentEditedBlogId);
    return (
        <Fragment>
            <div>
                <Button onClick={() => { setOpenDialogBox(!openDialogBox) }}>Add New Blog</Button>
            </div>

            <Dialog
                open={openDialogBox}
                onOpenChange={() => { setcurrentEditedBlogId(null); setOpenDialogBox(!openDialogBox) }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>{currentEditedBlogId ? "Edit Blog" : "Add Blog"}</DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                name='title'
                                placeholder='Enter Title'
                                value={blogFormData.title}
                                onChange={(event) => {
                                    setBlogFormData({
                                        ...blogFormData,
                                        title: event.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                className="col-span-3"
                                name='description'
                                placeholder='Enter Description'
                                value={blogFormData.description}
                                onChange={(event) => {
                                    setBlogFormData({
                                        ...blogFormData,
                                        description: event.target.value
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={loading} onClick={() => handleSubmit(blogFormData)} type="button">
                            {loading ? 'Adding new blog' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default AddNewBlog;
