import mongoose from 'mongoose';

interface ISubscription extends mongoose.Document {
    subscriber: mongoose.Schema.Types.ObjectId,
    channel: mongoose.Schema.Types.ObjectId
}

const subscriptionSchema = new mongoose.Schema<ISubscription>({
    subscriber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true}
)

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema)