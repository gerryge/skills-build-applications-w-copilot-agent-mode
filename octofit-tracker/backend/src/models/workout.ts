import { Schema, model } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true },
    exercises: [{ name: { type: String, required: true }, sets: { type: Number, required: true, min: 1 }, reps: { type: Number, required: true, min: 1 } }],
  },
  { timestamps: true },
)

export const Workout = model('Workout', workoutSchema)
