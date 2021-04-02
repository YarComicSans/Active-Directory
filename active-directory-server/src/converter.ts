import { AdQuery, UserDto, UsersDto } from "./types";
import { Injectable, Query } from "@nestjs/common";

@Injectable()
export class Converter {
    oDataToAdQuery(odataQuery: typeof Query) { //returns adQuery
        let result : {[id: string]: any} = {};
        
        const skip = odataQuery['$skip']
        if(skip) result['skip'] = Number(skip)

        const limit = odataQuery['$top']
        if(limit) result['limit'] = Number(limit)

        return result
    }

    userInfoToUserDto(users: UserDto[]): UsersDto{
        return {
            users: users,
            totalCount: users.length
        }
    }
}