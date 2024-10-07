import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  prompt: {
    type: String,
    required: [true, 'Prompt is required']
  },
  msg: {
    type: String,
    required: [true, 'Message is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  }
}, { 
  timestamps: true,
});

// Add middleware to log document before saving
postSchema.pre('save', function(next) {
  console.log('Saving document:', this.toObject());
  next();
});

// Check if the model already exists before creating it
const PostModel = models.post || model('post', postSchema);

export default PostModel;
