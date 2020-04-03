import { Theater } from '../theater/theater';

export class Session {
    id?: String;
    original_title?: String;
    overview?: String;
    poster_path?: String;
    release_date?: String;
    status?: String;
    title?: String;
    vote_average?: String;
    movie_id?: Number;
    theater?: Theater;
    start_date?: string;
    end_date?: string;
}