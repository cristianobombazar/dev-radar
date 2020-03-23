const mongoose = require('mongoose');
import PointSchema from './util/point-schema';

export interface Developer{
    name: string;
    github_username: string,
    bio: string,
    avatar_url: string,
    techs?: Array<String>,
    location?: Location
}

interface Location {
    type: any;
    index: string
}

const DeveloperSchema = mongoose.schema( {
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

export default mongoose.model("DeveloperSchema", DeveloperSchema);