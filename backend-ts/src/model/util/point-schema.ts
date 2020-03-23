import {Schema, model, Document} from "mongoose";

interface PointSchema extends Document{
    type: Type;
    coordinates: Coordinates
}

interface Type {
    type: string;
    enum: Array<string>,
    required: boolean
}

interface Coordinates {
    type: any;
    required: boolean
}

const PointSchema: Schema = new Schema( {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export default model<PointSchema>("PointSchema", PointSchema);