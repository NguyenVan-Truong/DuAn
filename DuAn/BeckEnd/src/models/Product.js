import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
// import mongoosePaginate from "mongoose-paginate";
const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);
