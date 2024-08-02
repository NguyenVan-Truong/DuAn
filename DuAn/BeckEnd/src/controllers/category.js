// import Category from "../models/category.js";

import Category from "../models/Category.js";

export const getAllCategory = async (req, res) => {
    try {
        const data = await Category.find({}).populate("products");
        if(!data) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}
export const getCategoryById = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id).populate("products");
        if(!data) return res.status(404).json({ message: "Category not found" });
        return res.status(201).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}
export const createCategory = async (req, res) => {
    try {
        const data = await Category.create(req.body);
        if(!data) return res.status(404).json({ message: "Create not successful Category" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}
export const updateCategory = async (req, res) => {
    try {
        const data = await Category.findByIdAndUpdate(req.params.id , req.body, {new: true});
        if(!data) return res.status(404).json({ message: "Update not successful Category" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        if(!data) return res.status(404).json({ message: "Delete not successful Category" });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ message: error.message });   
    }
}