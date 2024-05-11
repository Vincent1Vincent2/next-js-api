import mongoose, { Schema, SchemaTypes } from "mongoose";

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  imageId: { type: SchemaTypes.ObjectId, required: false },
  price: { type: Number, required: false },
  username: { type: String, ref: "User", required: false },
  imagesContainer: [
    { type: Schema.Types.ObjectId, ref: "images", required: false },
  ],
});

PostSchema.virtual("imageUrl").get(function () {
  return "/api/images/" + this.imageId;
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
