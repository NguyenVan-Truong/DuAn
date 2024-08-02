import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		name : {
            type: String,
            required: true,
            unique: true,
            default: "Uncategorized",
        },
        slug : {
            type: String,
            required: true,
            unique: true,
            default: "uncategorized",
        },
        products :[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product" 
            }
        ]
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Category", categorySchema);
