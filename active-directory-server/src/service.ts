import { Inject, Injectable } from '@nestjs/common';
import { ActiveDirectory } from "./activeDirectory";
import { Converter } from "./converter";
import { UsersDto } from "./types";

@Injectable()
export class ActiveDirectoryService {
    
    constructor(private readonly activeDirectory: ActiveDirectory, private readonly converter: Converter) {}
 
    async GetUsers(query: any): Promise<UsersDto> {
        const users = await this.activeDirectory.GetUsers();

        if(!users) return {users: [], totalCount: 0}
        const usersInfo = this.converter.userInfoToUserDto(users)
        // const usersInfo = this.converter.userInfoToUserDto(users.slice(query.skip, query.skip + query.limit))
        
        return usersInfo
    }
}
