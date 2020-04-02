import { Theater } from '../theater/theater';

export class Session {
    id?: String;
    name?: String;
    movie_id?: Number;
    theater?: Theater;
    start_date?: string;
    end_date?: string;
}