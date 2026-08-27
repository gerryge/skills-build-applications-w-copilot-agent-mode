import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    color: { type: String, required: true },
    motto: { type: String, required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
export const Team = model('Team', teamSchema);
