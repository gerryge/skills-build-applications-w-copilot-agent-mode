import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        // Seed the octofit_db database with test data
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const teams = await Team.insertMany([
            { name: 'Summit Striders', color: '#0f766e', motto: 'Small steps, strong peaks.' },
            { name: 'Morning Momentum', color: '#ea580c', motto: 'Show up and move forward.' },
        ]);
        const users = await User.insertMany([
            { name: 'Maya Chen', email: 'maya.chen@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=47', teamId: teams[0]._id, points: 1240 },
            { name: 'Jordan Ellis', email: 'jordan.ellis@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=12', teamId: teams[0]._id, points: 980 },
            { name: 'Sam Rivera', email: 'sam.rivera@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=32', teamId: teams[1]._id, points: 1120 },
            { name: 'Taylor Brooks', email: 'taylor.brooks@example.com', avatarUrl: 'https://i.pravatar.cc/150?img=5', teamId: teams[1]._id, points: 760 },
        ]);
        await Team.bulkWrite([
            { updateOne: { filter: { _id: teams[0]._id }, update: { memberIds: [users[0]._id, users[1]._id] } } },
            { updateOne: { filter: { _id: teams[1]._id }, update: { memberIds: [users[2]._id, users[3]._id] } } },
        ]);
        await Activity.insertMany([
            { userId: users[0]._id, type: 'run', title: 'Riverside 5K', durationMinutes: 34, calories: 420, completedAt: new Date('2026-08-26T07:15:00Z') },
            { userId: users[1]._id, type: 'strength', title: 'Upper Body Circuit', durationMinutes: 42, calories: 310, completedAt: new Date('2026-08-25T18:00:00Z') },
            { userId: users[2]._id, type: 'cycle', title: 'Hill Intervals', durationMinutes: 50, calories: 560, completedAt: new Date('2026-08-26T06:45:00Z') },
            { userId: users[3]._id, type: 'walk', title: 'Neighborhood Walk', durationMinutes: 28, calories: 145, completedAt: new Date('2026-08-24T09:30:00Z') },
        ]);
        await Leaderboard.insertMany([
            { userId: users[0]._id, teamId: teams[0]._id, points: 1240, rank: 1, week: '2026-W35' },
            { userId: users[2]._id, teamId: teams[1]._id, points: 1120, rank: 2, week: '2026-W35' },
            { userId: users[1]._id, teamId: teams[0]._id, points: 980, rank: 3, week: '2026-W35' },
            { userId: users[3]._id, teamId: teams[1]._id, points: 760, rank: 4, week: '2026-W35' },
        ]);
        await Workout.insertMany([
            { title: 'Core and Control', description: 'A steady core session for balance and posture.', difficulty: 'beginner', durationMinutes: 20, focus: 'Core', exercises: [{ name: 'Dead bug', sets: 3, reps: 10 }, { name: 'Bird dog', sets: 3, reps: 10 }] },
            { title: 'Full-body Strength', description: 'Build practical strength with simple compound movements.', difficulty: 'intermediate', durationMinutes: 35, focus: 'Strength', exercises: [{ name: 'Goblet squat', sets: 4, reps: 10 }, { name: 'Push-up', sets: 3, reps: 12 }] },
            { title: 'Tempo Run Builder', description: 'A progressive run designed to improve endurance.', difficulty: 'advanced', durationMinutes: 45, focus: 'Cardio', exercises: [{ name: 'Easy warm-up', sets: 1, reps: 8 }, { name: 'Tempo intervals', sets: 5, reps: 4 }] },
        ]);
        console.log('Database seeding complete: 2 teams, 4 users, 4 activities, 4 leaderboard entries, and 3 workouts');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
