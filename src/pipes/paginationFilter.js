import {store} from "../App";
import {countItem} from "../actions";

export const paginationPipe = (state,args) => {
    if (!args || !args.perPage || !args.currentPage) {
        return state;
    }
    const location = (args.perPage * (args.currentPage - 1)) || 0 ;
    if(state.length < args.perPage)
    return state;
    else
    return state.slice(location, location + args.perPage);
};
